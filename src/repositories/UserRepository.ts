import { database } from '../configs/database';

export class UserRepository {
  static async create(email: string, hashedPassword: string, name: string) {
    return database.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
      },
    });
  }

  static async findByEmail(email: string) {
    return database.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  static async findById(id: number) {
    return database.user.findUnique({
      where: {
        id: id,
      },
    });
  }
}
