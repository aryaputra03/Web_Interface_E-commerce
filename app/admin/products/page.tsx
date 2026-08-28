"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useProducts,
  useDeleteProduct,
  ProductFilterBar,
} from "@/features/products";
import type { ProductListFilters } from "@/features/products";
import { formatCurrency } from "@/lib/utils";

export default function AdminProductsPage() {
  const [filters, setFilters] = useState<ProductListFilters>({
    page: 1,
    limit: 20,
  });
  const { data, isLoading, isError } = useProducts(filters);
  const deleteProduct = useDeleteProduct();
  const products = data?.items ?? [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Produk</h1>
        <Link
          href="/admin/products/new"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Tambah Produk
        </Link>
      </div>

      <ProductFilterBar value={filters} onChange={setFilters} />

      {isLoading && <p className="text-sm text-gray-500">Memuat produk...</p>}
      {isError && (
        <p className="text-sm text-red-500">Tidak dapat terhubung ke server.</p>
      )}

      {!isLoading && !isError && (
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-[720px] w-full border-collapse text-sm">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="py-2">Nama</th>
              <th className="py-2">Barcode</th>
              <th className="py-2">Harga</th>
              <th className="py-2">Stok</th>
              <th className="py-2">Status</th>
              <th className="py-2 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 text-center text-gray-400">
                  Belum ada produk.
                </td>
              </tr>
            )}
            {products.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="py-2">{p.name}</td>
                <td className="py-2 font-mono text-xs">{p.barcode}</td>
                <td className="py-2">{formatCurrency(p.price)}</td>
                <td className="py-2">{p.stock}</td>
                <td className="py-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      p.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {p.isActive ? "Aktif" : "Nonaktif"}
                  </span>
                </td>
                <td className="py-2 text-right">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="mr-3 text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      if (confirm(`Hapus produk "${p.name}"?`)) {
                        deleteProduct.mutate(p.id);
                      }
                    }}
                    className="text-red-500 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}
