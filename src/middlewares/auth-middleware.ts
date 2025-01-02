import type { Context, Next } from 'hono';

import { UnauthorizedError } from '../errors';
import { JWTUtils } from '../utils/jwt-utils';

export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization');

  if (!authHeader) {
    throw new UnauthorizedError();
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = await JWTUtils.verify(token);

    if (!payload.sub) {
      throw new UnauthorizedError();
    }

    c.set('userId', payload.sub);

    return await next();
  } catch (error) {
    if (error instanceof Error && error.name === 'JwtTokenExpired') {
      throw new UnauthorizedError('Token expired, please login again');
    }

    if (error instanceof Error && error.name === 'JwtTokenInvalid') {
      throw new UnauthorizedError();
    }

    throw error;
  }
}
