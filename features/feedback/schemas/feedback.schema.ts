import { z } from "zod";

export const feedbackSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
  rating: z.coerce.number().min(1).max(5).optional(),
});

export type FeedbackSchema = z.infer<typeof feedbackSchema>;
export type FeedbackFormInput = z.input<typeof feedbackSchema>;
