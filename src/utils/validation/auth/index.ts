import z from 'zod';
import { passwordValidation } from '../passwordValidation';

export const loginSchema = z.object({
  phone: z
    .string({
      required_error: 'Phone number is required',
    })
    .min(10, {
      message: 'Phone number must be 10 digits',
    })
    .max(10, 'Phone number must be 10 digits')
    .regex(/^[0-9]+$/, 'Phone number must be numeric'),
  password: passwordValidation,
});
