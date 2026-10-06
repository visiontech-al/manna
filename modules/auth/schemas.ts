import { z } from 'zod';

import { MIN_PASSWORD_LENGTH } from '@/constants/app';

const email = z.string().trim().min(1, 'Email is required').pipe(z.email('Enter a valid email'));

export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters'),
    email,
    password: z
      .string()
      .min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters`),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
