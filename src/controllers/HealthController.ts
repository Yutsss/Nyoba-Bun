import type { Context } from 'hono';
import { StatusCodes } from 'http-status-codes';

import { successResponse } from '../utils/api-response';

export class HealthController {
  static async getHealth(c: Context) {
    try {
      return successResponse(c, StatusCodes.OK, 'ok');
    } catch (error) {
      throw error;
    }
  }
}
