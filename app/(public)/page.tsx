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
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-7 sm:py-10">
      <section className="relative overflow-hidden rounded-3xl bg-[linear-gradient(125deg,var(--depths),var(--twilight))] px-6 py-8 text-white shadow-[0_22px_45px_rgba(64,83,128,0.25)] sm:px-9 sm:py-10">
        <div className="absolute -right-14 -top-20 h-56 w-56 rounded-full bg-[var(--breeze)] opacity-20 blur-2xl" />
        <div className="relative max-w-xl">
          <p className="mb-3 text-xs font-bold tracking-[0.18em] text-[var(--breeze)]">PILIHAN TERBAIK HARI INI</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Belanja simpel, cepat, dan menyenangkan.</h1>
          <p className="mt-3 text-sm leading-6 text-white/75 sm:text-base">Temukan kebutuhanmu di etalase Kasir Pintar dengan harga yang transparan dan proses checkout yang praktis.</p>
        </div>
      </section>
      <div><h2 className="text-xl font-bold text-[var(--depths)]">Etalase Produk</h2><p className="mt-1 text-sm text-[var(--muted-ink)]">Cari produk yang kamu butuhkan.</p></div>
      <ProductFilterBar value={filters} onChange={setFilters} />
      <ProductGrid products={data?.items} isLoading={isLoading} />
    </div>
  );
}
