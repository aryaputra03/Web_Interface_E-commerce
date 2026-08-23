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
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-white/80 p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--horizon)] hover:shadow-[0_18px_35px_rgba(64,83,128,0.16)]"
    >
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-[var(--breeze)]">
        {product.images?.[0] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <h3 className="mt-3 line-clamp-2 text-sm font-semibold text-[var(--depths)]">
        {product.name}
      </h3>
      <div className="mt-1 flex items-center gap-2">
        <span className="text-sm font-bold text-[var(--twilight)]">
          {formatCurrency(price)}
        </span>
        {hasDiscount && (
          <span className="text-xs text-[var(--muted-ink)] line-through">
            {formatCurrency(product.price)}
          </span>
        )}
      </div>
      {product.stock <= 0 && (
        <span className="mt-2 w-fit rounded-full bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-600">Stok habis</span>
      )}
    </Link>
  );
}
