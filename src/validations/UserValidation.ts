// eslint-disable-next-line
import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email format')
      .min(10, 'Email must contain at least 10 character')
      .max(100, 'Email cannot be longer than 100 characters'),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8, 'Password must contain at least 8 character')
      .max(50, 'Password cannot be longer than 100 characters'),
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(4, 'Name must contain at least 1 character')
      .max(100, 'Name cannot be longer than 100 characters'),
  });

  static readonly LOGIN: ZodType = z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email format')
      .min(10, 'Email must contain at least 10 character')
      .max(100, 'Email cannot be longer than 100 characters'),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8, 'Password must contain at least 8 character')
      .max(50, 'Password cannot be longer than 100 characters'),
  });

  static readonly UPDATE_USER: ZodType = z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(4, 'Name must contain at least 1 character')
      .max(100, 'Name cannot be longer than 100 characters'),
  });
}
