import { sign, verify } from 'hono/jwt';
import type { JWTPayload } from 'hono/utils/jwt/types';

import { JWT_SECRET, JWT_EXPIRES_IN_MINUTES } from '../constants/jwt-constants';
import type { ITokenPayload } from '../models/AuthModel';

export class JWTUtils {
  static generatePayload(userId: number): ITokenPayload {
    const expireInMinute = Number(JWT_EXPIRES_IN_MINUTES) * 60;
    const now = Math.floor(Date.now() / 1000);

    return {
      sub: userId,
      iat: now,
      exp: now + expireInMinute,
    };
  }

  static async sign(payload: ITokenPayload): Promise<string> {
    return sign(payload, JWT_SECRET);
  }

  static async verify(token: string): Promise<JWTPayload> {
    return verify(token, JWT_SECRET);
  }
}
