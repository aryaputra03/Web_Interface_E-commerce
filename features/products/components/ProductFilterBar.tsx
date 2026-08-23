"use client";

import { useState } from "react";
import { useCategories } from "@/features/categories";
import type { ProductListFilters } from "../types/product.types";

interface ProductFilterBarProps {
  value: ProductListFilters;
  onChange: (filters: ProductListFilters) => void;
}

// Dipakai baik di etalase customer maupun list produk admin.
export function ProductFilterBar({ value, onChange }: ProductFilterBarProps) {
  const { data: categories } = useCategories();
  const [search, setSearch] = useState(value.search ?? "");

  return (
    <div className="surface-card flex flex-wrap items-center gap-3 rounded-2xl p-3">
      <input
        className="min-w-52 flex-1 rounded-xl border border-[var(--mist)] bg-white/90 px-3.5 py-2.5 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--horizon)] focus:ring-2 focus:ring-[var(--breeze)]"
        placeholder="Cari produk..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onChange({ ...value, search, page: 1 });
        }}
      />

      <select
        className="rounded-xl border border-[var(--mist)] bg-white/90 px-3.5 py-2.5 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--horizon)] focus:ring-2 focus:ring-[var(--breeze)]"
        value={value.category ?? ""}
        onChange={(e) =>
          onChange({ ...value, category: e.target.value || undefined, page: 1 })
        }
      >
        <option value="">Semua Kategori</option>
        {categories?.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        className="rounded-xl border border-[var(--mist)] bg-white/90 px-3.5 py-2.5 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--horizon)] focus:ring-2 focus:ring-[var(--breeze)]"
        value={value.sort ?? ""}
        onChange={(e) =>
          onChange({ ...value, sort: e.target.value || undefined, page: 1 })
        }
      >
        <option value="">Urutkan</option>
        <option value="price_asc">Harga Terendah</option>
        <option value="price_desc">Harga Tertinggi</option>
        <option value="newest">Terbaru</option>
      </select>
    </div>
  );
}
