export class Password {
  static async hash(password: string): Promise<string> {
    return Bun.password.hash(password, {
      algorithm: 'bcrypt',
      cost: 10,
    });
  }

  static async verify(password: string, hashedPassword: string) {
    return Bun.password.verify(password, hashedPassword);
  }
}
