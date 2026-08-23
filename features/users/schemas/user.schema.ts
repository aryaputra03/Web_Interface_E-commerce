import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  phone: z.string().optional(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;

export const addressSchema = z.object({
  label: z.string().min(1, "Label alamat wajib diisi (contoh: Rumah, Kantor)"),
  recipientName: z.string().min(1, "Nama penerima wajib diisi"),
  phone: z.string().min(1, "Nomor telepon wajib diisi"),
  addressLine: z.string().min(1, "Alamat lengkap wajib diisi"),
  city: z.string().min(1, "Kota wajib diisi"),
  postalCode: z.string().min(1, "Kode pos wajib diisi"),
  isDefault: z.boolean().optional(),
});

export type AddressSchema = z.infer<typeof addressSchema>;
