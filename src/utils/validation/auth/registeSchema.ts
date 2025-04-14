import { z } from 'zod';

import { loginSchema } from '.';

export const registerSchema = loginSchema
  .extend({
    email: z.string().email(),
    name: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword', 'password'],
      });
    }
  });
