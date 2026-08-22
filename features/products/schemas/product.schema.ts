// Validasi form produk (React Hook Form + Zod).
// `barcode` WAJIB diisi minimal 8 karakter, sesuai dokumen kebutuhan Bab 8.
// Validasi keunikan barcode tetap dilakukan Backend — Front-End cukup
// validasi format non-kosong.

import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Nama produk wajib diisi"),
  barcode: z.string().min(8, "Barcode wajib diisi sesuai QR fisik produk"),
  categoryId: z.string().min(1, "Kategori wajib dipilih"),
  price: z
    .number({ invalid_type_error: "Harga wajib diisi" })
    .positive("Harga harus lebih dari 0"),
  discountPrice: z.number().positive().optional(),
  stock: z
    .number({ invalid_type_error: "Stok wajib diisi" })
    .int("Stok harus bilangan bulat")
    .nonnegative("Stok tidak boleh negatif"),
  unit: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type ProductFormValues = z.infer<typeof productSchema>;
