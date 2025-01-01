import { HTTPException } from "hono/http-exception";
import { StatusCodes } from "http-status-codes";

export class InternalServerError extends HTTPException {
  constructor(message: string = "Internal Server Error") {
    super(StatusCodes.INTERNAL_SERVER_ERROR, { message });
  }
}




