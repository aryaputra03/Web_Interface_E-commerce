"use client";

import { useLowStock } from "../hooks/useLowStock";

export function LowStockBanner() {
  const { data: items = [], isLoading } = useLowStock();
  if (isLoading || items.length === 0) return null;

  return <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
    <p className="text-sm font-medium text-amber-800">{items.length} produk mendekati atau kehabisan stok</p>
    <ul className="mt-1 space-y-0.5 text-xs text-amber-700">
      {items.slice(0, 5).map((item) => <li key={item.productId}>{item.productName} — sisa {item.stock} (batas {item.threshold})</li>)}
      {items.length > 5 && <li>+{items.length - 5} produk lainnya</li>}
    </ul>
  </div>;
}
