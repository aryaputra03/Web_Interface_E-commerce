"use client";

import { useState } from "react";
import { LowStockBanner } from "@/features/stock/components/LowStockBanner";
import { StockHistoryTable } from "@/features/stock/components/StockHistoryTable";
import { useStockHistory } from "@/features/stock/hooks/useStockHistory";
import type { StockReferenceType } from "@/features/stock/types/stock.types";
import { cn } from "@/lib/utils";

const TABS: { label: string; value: StockReferenceType | undefined }[] = [
  { label: "Semua", value: undefined },
  { label: "Order Online", value: "order" },
  { label: "Restock Manual", value: "manual" },
  { label: "Scan Hardware", value: "device_scan" },
];

export default function AdminHistoryPage() {
  const [referenceType, setReferenceType] = useState<StockReferenceType | undefined>();
  const { data, isLoading, isError } = useStockHistory({ referenceType });
  const entries = data ?? [];

  return <div>
    <h1 className="mb-1 text-2xl font-semibold">Riwayat Stok</h1>
    <p className="mb-4 text-sm text-slate-500">Mutasi stok dari order online, restock manual, dan scan hardware.</p>
    <LowStockBanner />
    <div className="mb-4 flex gap-2 border-b border-slate-200">
      {TABS.map((tab) => <button key={tab.label} type="button" onClick={() => setReferenceType(tab.value)} className={cn("-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors", referenceType === tab.value ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700")}>{tab.label}</button>)}
    </div>
    <StockHistoryTable entries={entries} isLoading={isLoading} isError={isError} />
  </div>;
}
