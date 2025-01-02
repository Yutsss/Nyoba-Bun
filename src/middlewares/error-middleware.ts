import type { Context } from 'hono';

import { errorResponse } from '../utils/api-response';

export const errorHandler = (error: Error, c: Context) =>
  errorResponse(c, error);
