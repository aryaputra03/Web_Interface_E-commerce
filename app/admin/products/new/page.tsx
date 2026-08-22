"use client";

import { useRouter } from "next/navigation";
import { ProductForm, useCreateProduct } from "@/features/products";
import type { ProductFormValues } from "@/features/products";

export default function NewProductPage() {
  const router = useRouter();
  const createProduct = useCreateProduct();

  const handleSubmit = (values: ProductFormValues) => {
    createProduct.mutate(
      { ...values, images: [] },
      {
        onSuccess: () => router.push("/admin/products"),
      },
    );
  };

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4">
      <h1 className="text-lg font-semibold">Tambah Produk</h1>
      <ProductForm
        onSubmit={handleSubmit}
        isSubmitting={createProduct.isPending}
        submitLabel="Tambah Produk"
      />
      {createProduct.isError && (
        <p className="text-sm text-red-500">
          Gagal menyimpan produk. Coba lagi.
        </p>
      )}
    </div>
  );
}
