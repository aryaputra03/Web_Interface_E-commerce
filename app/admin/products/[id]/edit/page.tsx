"use client";

import { useRouter } from "next/navigation";
import {
  useProductDetail,
  useUpdateProduct,
  ProductForm,
} from "@/features/products";
import type { ProductFormValues } from "@/features/products";

export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { data: product, isLoading } = useProductDetail(params.id);
  const updateProduct = useUpdateProduct(params.id);

  if (isLoading) {
    return <p className="text-sm text-gray-500">Memuat data produk...</p>;
  }

  if (!product) {
    return <p className="text-sm text-red-500">Produk tidak ditemukan.</p>;
  }

  const handleSubmit = (values: ProductFormValues) => {
    updateProduct.mutate(values, {
      onSuccess: () => router.push("/admin/products"),
    });
  };

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4">
      <h1 className="text-lg font-semibold">Edit Produk</h1>
      <ProductForm
        defaultValues={product}
        onSubmit={handleSubmit}
        isSubmitting={updateProduct.isPending}
        submitLabel="Simpan Perubahan"
      />
      {updateProduct.isError && (
        <p className="text-sm text-red-500">
          Gagal menyimpan perubahan. Coba lagi.
        </p>
      )}
    </div>
  );
}
