import z from 'zod';

export const schemaMessage = z.object({
  message: z
    .string()
    .trim()
    .min(1, { message: 'Please enter your message' })
    .max(300, { message: 'Message must be at most 300 characters long!' }),
});

export type MessageFormData = z.infer<typeof schemaMessage>;
