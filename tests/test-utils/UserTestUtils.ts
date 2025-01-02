import { database } from '../../src/configs/database';

export class UserTestUtils {
  static async delete() {
    await database.user.deleteMany({
      where: {
        name: 'test',
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
}
