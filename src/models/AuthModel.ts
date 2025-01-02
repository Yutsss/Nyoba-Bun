import type { Context } from 'hono';
import type { JWTPayload } from 'hono/utils/jwt/types';

export interface IAuthRequest extends Context {
  user: {
    id: number;
    email: string;
    name: string;
  };
}

export interface ITokenPayload extends JWTPayload {
  sub: number;
  iat: number;
  exp: number;
}
