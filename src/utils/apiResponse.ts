import { Context } from 'hono';
import { ZodError } from 'zod'; 
import { InternalServerError } from '../errors';
import { HTTPException } from 'hono/http-exception';
import { StatusCodes } from 'http-status-codes';
import { ContentfulStatusCode } from 'hono/utils/http-status';

export const successResponse = (c: Context, code: ContentfulStatusCode, message: string, data?: any) => {
  if (data === undefined) {
    return c.json({
      resultCode: code,
      resultMessage: message,
    }, code);
  } else {
    return c.json({
      resultCode: code,
      resultMessage: message,
      data: data,
    }, code);
  }
};

export const errorResponse = (c: Context, error: Error) => {
  if (error instanceof HTTPException) {
    return c.json({
      errorCode: error.status,
      errorMessage: error.message,
    }, error.status);
  } else if (error instanceof ZodError) {
    return c.json({
      errorCode: StatusCodes.BAD_REQUEST,
      errorMessage: error.errors[0]?.message || "Validation Error",
    }, StatusCodes.BAD_REQUEST);
  } else {
    const internalError = new InternalServerError();
    return c.json({
      errorCode: internalError.status,
      errorMessage: internalError.message,
    }, internalError.status);
  }
};
