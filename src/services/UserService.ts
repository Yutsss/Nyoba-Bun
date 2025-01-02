import {
  ConflictError,
  InternalServerError,
  UnauthorizedError,
} from '../errors';
import type {
  IRegisterUserRequest,
  IRegisterUserResponse,
  ILoginUserRequest,
  ILoginUserResponse,
  IGetUserRequest,
  IGetUserResponse,
} from '../models/UserModel';
import { UserRepository } from '../repositories';
import { JWTUtils } from '../utils/jwt-utils';
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

  static async loginUser(
    request: ILoginUserRequest,
  ): Promise<ILoginUserResponse> {
    const validData = Validator.validate(UserValidation.LOGIN, request);

    const user = await UserRepository.findByEmail(validData.email);

    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isPasswordMatch = await Password.verify(
      validData.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const payload = await JWTUtils.generatePayload(user.id);

    const accessToken = await JWTUtils.sign(payload);

    return {
      accessToken,
    };
  }

  static async getUser(request: IGetUserRequest): Promise<IGetUserResponse> {
    const userId = request.id as number;
    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedError();
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
