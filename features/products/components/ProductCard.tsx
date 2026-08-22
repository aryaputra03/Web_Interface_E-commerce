import Link from "next/link";
import type { Product } from "../types/product.types";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const price = product.discountPrice ?? product.price;
  const hasDiscount =
    !!product.discountPrice && product.discountPrice < product.price;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="flex flex-col rounded-lg border border-gray-200 p-3 transition hover:shadow-md"
    >
      <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-100">
        {product.images?.[0] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <h3 className="mt-2 line-clamp-2 text-sm font-medium text-gray-800">
        {product.name}
      </h3>
      <div className="mt-1 flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-900">
          {formatCurrency(price)}
        </span>
        {hasDiscount && (
          <span className="text-xs text-gray-400 line-through">
            {formatCurrency(product.price)}
          </span>
        )}
      </div>
      {product.stock <= 0 && (
        <span className="mt-1 text-xs text-red-500">Stok habis</span>
      )}
    </Link>
  );
}
