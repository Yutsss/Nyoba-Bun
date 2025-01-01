import { Context } from "hono";
import { successResponse } from "../utils/apiResponse";
import { StatusCodes } from "http-status-codes";

export class HealthController {
  static async getHealth(c: Context) {
    try {
      return successResponse(c, StatusCodes.OK, "ok");
    } catch (error) {
      throw error;
    }
  }
}