import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  phone: z.string().optional(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;

export const addressSchema = z.object({
  label: z.string().min(1, "Label alamat wajib diisi (contoh: Rumah, Kantor)"),
  fullAddress: z.string().min(1, "Alamat lengkap wajib diisi"),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
  isDefault: z.boolean().optional(),
});

export type AddressSchema = z.infer<typeof addressSchema>;
