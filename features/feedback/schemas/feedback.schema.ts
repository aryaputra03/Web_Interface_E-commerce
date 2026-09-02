import { z } from "zod";

export const feedbackSchema = z.object({
  category: z.string().min(1, "Kategori wajib diisi"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
});

export type FeedbackSchema = z.infer<typeof feedbackSchema>;
export type FeedbackFormInput = z.input<typeof feedbackSchema>;
