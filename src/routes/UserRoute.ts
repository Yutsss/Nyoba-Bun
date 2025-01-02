import { Hono } from 'hono';

import { UserController } from '../controllers';
import { authMiddleware } from '../middlewares/auth-middleware';

export const userRoute = new Hono();

userRoute.post('/register', UserController.registerUser);
userRoute.post('/login', UserController.loginUser);
userRoute.get('/me', authMiddleware, UserController.getUser);
userRoute.put('/me', authMiddleware, UserController.updateUser);
