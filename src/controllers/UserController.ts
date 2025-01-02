import type { Context } from 'hono';
import { StatusCodes } from 'http-status-codes';

import { UserService } from '../services/UserService';
import type { IRegisterUserRequest } from './../models/UserModel';
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
}
