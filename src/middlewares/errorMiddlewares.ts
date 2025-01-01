import { Context } from "hono";
import { errorResponse } from "../utils/apiResponse";

export const errorHandler = (err: Error, c: Context) => {
  return errorResponse(c, err);
}