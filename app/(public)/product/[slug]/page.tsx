"use client";

import { use } from "react";
import { useProductDetail } from "@/features/products";
import { formatCurrency } from "@/lib/utils";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const { data: product, isLoading, isError } = useProductDetail(slug);

  if (isLoading) {
    return <p className="p-6 text-sm text-gray-500">Memuat produk...</p>;
  }

  if (isError || !product) {
    return <p className="p-6 text-sm text-red-500">Produk tidak ditemukan.</p>;
  }

  const price = product.discountPrice ?? product.price;

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-6 md:flex-row">
      <div className="aspect-square w-full max-w-sm overflow-hidden rounded-lg bg-gray-100">
        {product.images?.[0] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">{product.name}</h1>
        <span className="text-lg font-bold text-gray-900">
          {formatCurrency(price)}
        </span>
        {product.stock <= 0 && (
          <span className="text-sm text-red-500">Stok habis</span>
        )}
        <p className="text-sm text-gray-600">{product.description}</p>
      </div>
    </div>
  );
}
