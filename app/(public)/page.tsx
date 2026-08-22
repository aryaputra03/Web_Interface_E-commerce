"use client";

import { useState } from "react";
import {
  useProducts,
  ProductGrid,
  ProductFilterBar,
} from "@/features/products";
import type { ProductListFilters } from "@/features/products";

// Etalase produk customer — "/" sesuai sitemap (dokumen kebutuhan Bab 6.2).
export default function HomePage() {
  const [filters, setFilters] = useState<ProductListFilters>({
    page: 1,
    limit: 20,
  });
  const { data, isLoading } = useProducts(filters);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
      <h1 className="text-xl font-semibold">Etalase Produk</h1>
      <ProductFilterBar value={filters} onChange={setFilters} />
      <ProductGrid products={data?.items} isLoading={isLoading} />
    </div>
  );
}
