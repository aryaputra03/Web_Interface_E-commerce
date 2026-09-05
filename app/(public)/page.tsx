"use client";

import { useState } from "react";
import {
  useProducts,
  ProductGrid,
  ProductFilterBar,
} from "@/features/products";
import type { ProductListFilters } from "@/features/products";

export default function HomePage() {
  const [filters, setFilters] = useState<ProductListFilters>({
    page: 1,
    limit: 20,
  });
  const { data, isLoading } = useProducts(filters);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-8 sm:py-12">
      <section className="grid items-center gap-8 sm:grid-cols-[1.3fr_1fr]">
        <div className="max-w-md">
          <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Belanja dari toko langgananmu, tanpa antre dua kali.
          </h1>
          <p className="mt-4 text-sm leading-6 text-ink-muted sm:text-base">
            Harga di sini sama persis dengan yang ada di kasir. Pilih barang,
            checkout, dan pesananmu langsung tercatat rapi.
          </p>
        </div>

        <div className="mx-auto w-full max-w-[220px] rounded-lg border border-line-strong bg-paper-raised p-5 font-mono text-xs text-ink-muted">
          <p className="text-ink">Kasir Pintar</p>
          <p className="mt-0.5">
            {new Intl.DateTimeFormat("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }).format(new Date())}
          </p>
          <div className="till-tape my-3" />
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span>Kopi Sachet</span>
              <span>12.000</span>
            </div>
            <div className="flex justify-between">
              <span>Gula 1kg</span>
              <span>15.500</span>
            </div>
            <div className="flex justify-between">
              <span>Minyak Goreng</span>
              <span>28.000</span>
            </div>
          </div>
          <div className="till-tape my-3" />
          <div className="flex justify-between font-semibold text-ink">
            <span>Total</span>
            <span>55.500</span>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-ink">Etalase Produk</h2>
        <ProductFilterBar value={filters} onChange={setFilters} />
        <ProductGrid products={data?.items} isLoading={isLoading} />
      </section>
    </div>
  );
}
