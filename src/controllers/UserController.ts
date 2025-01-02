import type { Context } from 'hono';
import { StatusCodes } from 'http-status-codes';

import { UserService } from '../services/UserService';
import type {
  IRegisterUserRequest,
  ILoginUserRequest,
  IGetUserRequest,
} from './../models/UserModel';
import { successResponse } from './../utils/api-response';

export class UserController {
  static async registerUser(c: Context) {
    const request: IRegisterUserRequest =
      (await c.req.json()) as IRegisterUserRequest;

    const user = await UserService.registerUser(request);

    return successResponse(
      c,
      StatusCodes.CREATED,
      'User registered successfully',
      user,
    );
  }

  static async loginUser(c: Context) {
    const request: ILoginUserRequest =
      (await c.req.json()) as ILoginUserRequest;

    const user = await UserService.loginUser(request);

    return successResponse(
      c,
      StatusCodes.OK,
      'User logged in successfully',
      user,
    );
  }

  static async getUser(c: Context) {
    const request: IGetUserRequest = {
      id: c.get('userId'),
    };

    const user = await UserService.getUser(request);

    return successResponse(c, StatusCodes.OK, 'Success Getting User', user);
  }
}
