"use client";

import { use } from "react";

import { AddToCartButton } from "@/features/cart/components/AddToCartButton";
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
    return <p className="p-6 text-sm text-ink-muted">Memuat produk...</p>;
  }

  if (isError || !product) {
    return <p className="p-6 text-sm text-brick">Produk tidak ditemukan.</p>;
  }

  const price = product.discountPrice ?? product.price;
  const hasDiscount =
    !!product.discountPrice && product.discountPrice < product.price;
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-8 md:flex-row">
      <div className="aspect-square w-full max-w-sm overflow-hidden rounded-lg border border-line bg-till-tint">
        {product.images?.[0] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <h1 className="text-xl font-semibold text-ink">{product.name}</h1>

        <div className="flex items-baseline gap-2 font-mono">
          <span className="text-lg font-semibold text-till-dark">
            {formatCurrency(price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-ink-muted line-through">
              {formatCurrency(product.price)}
            </span>
          )}
        </div>

        {isOutOfStock && (
          <span className="w-fit rounded-sm bg-brick-tint px-2 py-0.5 font-mono text-xs font-medium text-brick">
            Stok habis
          </span>
        )}

        <p className="text-sm leading-6 text-ink-muted">
          {product.description}
        </p>

        <div className="mt-2 max-w-xs">
          <AddToCartButton productId={product.id} disabled={isOutOfStock} />
        </div>
      </div>
    </div>
  );
}
