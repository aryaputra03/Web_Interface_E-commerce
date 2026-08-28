"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productSchema,
  type ProductFormValues,
} from "../schemas/product.schema";
import { CategorySelect } from "@/features/categories";

interface ProductFormProps {
  defaultValues?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

// Dipakai di app/admin/products/new dan app/admin/products/[id]/edit.
// Field `barcode` WAJIB ada di form ini (dokumen kebutuhan Bab 8) — jangan
// dihapus meskipun terasa berlebihan untuk demo, karena hardware kasir
// bergantung pada field ini untuk mencocokkan hasil scan QR fisik.
export function ProductForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = "Simpan Produk",
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      isActive: true,
      ...defaultValues,
    },
  });

  // `watch()` dari useForm() tidak aman di-memoize oleh React Compiler
  // (warning: "incompatible library"). `useWatch` adalah versi yang aman —
  // ia subscribe ke satu field lewat `control`, bukan memanggil fungsi
  // yang di-return utuh dari useForm().
  const categoryId = useWatch({ control, name: "categoryId" });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          SKU <span className="text-red-500">*</span>
        </label>
        <input
          className="rounded-md border border-gray-300 px-3 py-2 text-sm font-mono"
          placeholder="Contoh: MIN-001"
          {...register("sku")}
        />
        {errors.sku && (
          <span className="text-xs text-red-500">{errors.sku.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Nama Produk</label>
        <input
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          {...register("name")}
        />
        {errors.name && (
          <span className="text-xs text-red-500">{errors.name.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Barcode <span className="text-red-500">*</span>
        </label>
        <input
          className="rounded-md border border-gray-300 px-3 py-2 text-sm font-mono"
          placeholder="Sesuai QR fisik produk, mis. 8991002123456"
          {...register("barcode")}
        />
        {errors.barcode && (
          <span className="text-xs text-red-500">{errors.barcode.message}</span>
        )}
        <span className="text-xs text-gray-400">
          Wajib diisi — dipakai hardware kasir untuk mencocokkan hasil scan QR.
        </span>
      </div>

      <CategorySelect
        value={categoryId}
        onChange={(id) => setValue("categoryId", id, { shouldValidate: true })}
        error={errors.categoryId?.message}
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Harga</label>
          <input
            type="number"
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <span className="text-xs text-red-500">{errors.price.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Stok</label>
          <input
            type="number"
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
            {...register("stock", { valueAsNumber: true })}
          />
          {errors.stock && (
            <span className="text-xs text-red-500">{errors.stock.message}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Satuan</label>
        <input
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          placeholder="pcs, botol, karton, dst"
          {...register("unit")}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Deskripsi</label>
        <textarea
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          rows={3}
          {...register("description")}
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" {...register("isActive")} />
        Produk aktif (tampil di etalase)
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Menyimpan..." : submitLabel}
      </button>
    </form>
  );
}
