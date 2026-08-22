"use client";

import { useCategories } from "../hooks/useCategories";

interface CategorySelectProps {
  value?: string;
  onChange: (categoryId: string) => void;
  error?: string;
}

// Dipakai di ProductForm (Fase 5) untuk memilih kategori produk.
export function CategorySelect({
  value,
  onChange,
  error,
}: CategorySelectProps) {
  const { data: categories, isLoading, isError } = useCategories();

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">Kategori</label>
      <select
        className="rounded-md border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading}
      >
        <option value="" disabled>
          {isLoading ? "Memuat kategori..." : "Pilih kategori"}
        </option>
        {categories?.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      {isError && (
        <span className="text-xs text-red-500">
          Gagal memuat kategori dari server.
        </span>
      )}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
