import { sign } from 'hono/jwt';

import { database } from '../../src/configs/database';
import { JWT_SECRET } from '../../src/constants/jwt-constants';

export class UserTestUtils {
  static async delete() {
    await database.user.deleteMany({
      where: {
        name: 'test',
      },
    });
  }

  static async deleteUpdatedUser() {
    await database.user.deleteMany({
      where: {
        name: 'test2',
      },
    });
  }

  static async create() {
    await database.user.create({
      data: {
        name: 'test',
        email: 'test@mail.com',
        password: await Bun.password.hash('test1234', {
          algorithm: 'bcrypt',
          cost: 10,
        }),
      },
    });
  }

  static async findByName(name: string) {
    return database.user.findFirst({
      where: {
        name: name,
      },
    });
  }

  static async findByEmail(email: string) {
    return database.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  static async deleteByEmail(email: string) {
    await database.user.deleteMany({
      where: {
        email: email,
      },
    });
  }

  static async generateExpiredToken(userId: number) {
    const expiredTime = Math.floor(Date.now() / 1000) - 60;

    return sign(
      {
        sub: userId,
        exp: expiredTime,
        iat: expiredTime - 60,
      },
      JWT_SECRET,
    );
  }
}
