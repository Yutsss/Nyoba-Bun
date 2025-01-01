import { HTTPException } from "hono/http-exception";
import { StatusCodes } from "http-status-codes";

export class UnauthorizedError extends HTTPException {
  constructor(message: string = "Unauthorized!") {
    super(StatusCodes.UNAUTHORIZED, { message });
  }
}




