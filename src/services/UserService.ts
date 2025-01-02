import { ConflictError, InternalServerError } from '../errors';
import type {
  IRegisterUserRequest,
  IRegisterUserResponse,
} from '../models/UserModel';
import { UserRepository } from '../repositories';
import { Password } from '../utils/password';
import { Validator } from '../utils/validator';
import { UserValidation } from '../validations';

export class UserService {
  static async registerUser(
    request: IRegisterUserRequest,
  ): Promise<IRegisterUserResponse> {
    const validData = Validator.validate(UserValidation.REGISTER, request);

    const userExist = await UserRepository.findByEmail(validData.email);

    if (userExist) {
      throw new ConflictError('User is already registered');
    }

    const hashedPassword = await Password.hash(validData.password);

    if (!hashedPassword) {
      throw new InternalServerError();
    }

    const user = await UserRepository.create(
      validData.email,
      hashedPassword,
      validData.name,
    );

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
