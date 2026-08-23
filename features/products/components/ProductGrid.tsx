import type { Product } from "../types/product.types";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductGridProps {
  products?: Product[];
  isLoading?: boolean;
}

// Loading state (Skeleton) & empty state disiapkan sejak Fase 5 — bukan
// ditunda ke Fase 14 — supaya begitu dipasang di halaman etalase, sudah
// langsung punya pengalaman yang layak, bukan blank/flicker.
export function ProductGrid({ products, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square w-full rounded-2xl bg-[var(--breeze)]" />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        title="Belum ada produk"
        description="Produk yang ditambahkan admin akan muncul di sini."
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
