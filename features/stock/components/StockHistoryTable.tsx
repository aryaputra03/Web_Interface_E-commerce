"use client";

import { ErrorMessage } from "@/components/feedback-ui/ErrorMessage";
import { cn, formatDate } from "@/lib/utils";
import type {
  StockHistoryEntry,
  StockReferenceType,
} from "../types/stock.types";

const REFERENCE_LABEL: Record<StockReferenceType, string> = {
  order: "Order Online",
  manual: "Restock Manual",
  device_scan: "Scan Hardware",
};

const REFERENCE_BADGE_CLASS: Record<StockReferenceType, string> = {
  order: "bg-blue-100 text-blue-700",
  manual: "bg-slate-100 text-slate-700",
  device_scan: "bg-purple-100 text-purple-700",
};

interface StockHistoryTableProps {
  entries: StockHistoryEntry[];
  isLoading: boolean;
  isError: boolean;
}

export function StockHistoryTable({
  entries,
  isLoading,
  isError,
}: StockHistoryTableProps) {
  if (isError)
    return <ErrorMessage message="Tidak dapat terhubung ke server." />;
  if (isLoading)
    return (
      <div className="animate-pulse space-y-2">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="h-10 rounded bg-slate-100" />
        ))}
      </div>
    );
  if (entries.length === 0)
    return (
      <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-400">
        Belum ada riwayat stok untuk filter ini.
      </div>
    );

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-slate-500">
              Produk
            </th>
            <th className="px-4 py-2 text-left font-medium text-slate-500">
              Perubahan
            </th>
            <th className="px-4 py-2 text-left font-medium text-slate-500">
              Sumber
            </th>
            <th className="px-4 py-2 text-left font-medium text-slate-500">
              Catatan
            </th>
            <th className="px-4 py-2 text-left font-medium text-slate-500">
              Waktu
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td className="px-4 py-2">{entry.productId?.name ?? "-"}</td>
              <td
                className={cn(
                  "px-4 py-2 font-medium",
                  entry.quantity < 0 ? "text-red-600" : "text-green-600",
                )}
              >
                {entry.quantity > 0 ? `+${entry.quantity}` : entry.quantity}
              </td>
              <td className="px-4 py-2">
                <span
                  className={cn(
                    "inline-block rounded-full px-2 py-0.5 text-xs",
                    REFERENCE_BADGE_CLASS[entry.referenceType],
                  )}
                >
                  {REFERENCE_LABEL[entry.referenceType]}
                </span>
              </td>
              <td className="px-4 py-2 text-slate-500">{entry.note ?? "-"}</td>
              <td className="px-4 py-2 text-slate-500">
                {formatDate(entry.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
