import z from 'zod';
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from '@shared/constants/constants';

export const schemaRegister = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, 'Max image size is 10MB 🫠')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported 😶',
    )
    .optional()
    .nullable(),
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
  display_name: z
    .string()
    .trim()
    .min(3, { message: 'Display name must be at least 3 characters long!' })
    .max(32, { message: 'Display name must be at most 32 characters long!' })
    .regex(/^[a-zA-Z\s]*$/),
  phone_number: z
    .string()
    .trim()
    .regex(/^\+996(5|7|9|2|3)\d{2}\d{3}\d{3}$/, {
      message:
        'Phone number is not valid! Only Kyrgyzstan numbers are allowed :D \n Example: +996123456789 \n',
    }),
});

export type RegisterFormData = z.infer<typeof schemaRegister>;
