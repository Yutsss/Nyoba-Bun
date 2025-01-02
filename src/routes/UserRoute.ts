import { Hono } from 'hono';

import { UserController } from '../controllers';

export const userRoute = new Hono();

userRoute.post('/register', UserController.registerUser);
