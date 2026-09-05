"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useCategories } from "@/features/categories";
import type { ProductListFilters } from "../types/product.types";

interface ProductFilterBarProps {
  value: ProductListFilters;
  onChange: (filters: ProductListFilters) => void;
}

export function ProductFilterBar({ value, onChange }: ProductFilterBarProps) {
  const { data: categories } = useCategories();
  const [search, setSearch] = useState(value.search ?? "");

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-lg border border-line p-3">
      <div className="min-w-52 flex-1">
        <Input
          placeholder="Cari produk..."
          aria-label="Cari produk"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onChange({ ...value, search, page: 1 });
          }}
        />
      </div>

      <Select
        aria-label="Filter kategori"
        className="w-auto"
        value={value.category ?? ""}
        onChange={(e) =>
          onChange({ ...value, category: e.target.value || undefined, page: 1 })
        }
        options={[
          { label: "Semua Kategori", value: "" },
          ...(categories?.map((c) => ({ label: c.name, value: c.id })) ?? []),
        ]}
      />

      <Select
        aria-label="Urutkan produk"
        className="w-auto"
        value={value.sort ?? ""}
        onChange={(e) =>
          onChange({ ...value, sort: e.target.value || undefined, page: 1 })
        }
        options={[
          { label: "Urutkan", value: "" },
          { label: "Harga Terendah", value: "price_asc" },
          { label: "Harga Tertinggi", value: "price_desc" },
          { label: "Terbaru", value: "newest" },
        ]}
      />
    </div>
  );
}
