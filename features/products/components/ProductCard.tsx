import Link from "next/link";
import type { Product } from "../types/product.types";
import { formatCurrency } from "@/lib/utils";
import { AddToCartButton } from "@/features/cart/components/AddToCartButton";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const price = product.discountPrice ?? product.price;
  const hasDiscount =
    !!product.discountPrice && product.discountPrice < product.price;
  const outOfStock = product.stock <= 0;

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-line p-3 transition-colors hover:border-line-strong">
      <Link
        href={`/product/${product.slug}`}
        className="flex flex-1 flex-col gap-3"
      >
        <div className="relative aspect-square w-full overflow-hidden rounded-md bg-till-tint">
          {product.images?.[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          )}
          {hasDiscount && (
            <span className="absolute left-2 top-2 rounded-sm bg-brass px-1.5 py-0.5 font-mono text-[10px] font-semibold text-paper">
              Diskon
            </span>
          )}
        </div>

        <div>
          <h3 className="line-clamp-2 text-sm font-medium text-ink">
            {product.name}
          </h3>
          <div className="mt-1 flex items-baseline gap-2 font-mono">
            <span className="text-sm font-semibold text-till-dark">
              {formatCurrency(price)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-ink-muted line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {outOfStock ? (
        <span className="w-fit rounded-sm bg-brick-tint px-2 py-0.5 font-mono text-xs font-medium text-brick">
          Stok habis
        </span>
      ) : (
        <AddToCartButton productId={product.id} size="sm" compact />
      )}
    </div>
  );
}
