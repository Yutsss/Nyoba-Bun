import { Hono, Context } from "hono";
import { HealthController } from "../controllers";

export const healthRoute = new Hono

healthRoute.get("/health", HealthController.getHealth); 
