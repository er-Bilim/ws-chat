import z from 'zod';

export const schemaLogin = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: 'Username must be at least 3 characters long!' })
    .max(25, { message: 'Username must be at most 12 characters long!' })
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Your username must contain only letters and numbers!',
    ),
  password: z
    .string()
    .trim()
    .min(8, { message: 'Password must be at least 8 characters long!' })
    .max(32, { message: 'Password must be at most 32 characters long!' }),
});

export type LoginFormData = z.infer<typeof schemaLogin>;
