"use client";

import type { DeviceScan } from "../types/deviceScan.types";
import { formatDate } from "@/lib/utils";
import { ErrorMessage } from "@/components/feedback-ui/ErrorMessage";

interface ScanLogTableProps {
  scans: DeviceScan[];
  isLoading: boolean;
  isError: boolean;
}

export function ScanLogTable({ scans, isLoading, isError }: ScanLogTableProps) {
  if (isError) {
    return <ErrorMessage message="Tidak dapat terhubung ke server." />;
  }

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 rounded bg-gray-100" />
        ))}
      </div>
    );
  }

  if (scans.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-400">
        Belum ada data scan masuk.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-gray-500">
              Device
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-500">
              Mode
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-500">
              Barcode
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-500">
              Status
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-500">
              Diterima
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {scans.map((scan) => (
            <tr key={scan.id}>
              <td className="px-4 py-2 font-mono text-xs">{scan.deviceId}</td>
              <td className="px-4 py-2 capitalize">{scan.mode}</td>
              <td className="px-4 py-2 font-mono text-xs">{scan.barcode}</td>
              <td className="px-4 py-2">
                <span
                  className={
                    scan.status === "matched"
                      ? "inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700"
                      : "inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700"
                  }
                >
                  {scan.status === "matched" ? "Matched" : "Unmatched"}
                </span>
              </td>
              <td className="px-4 py-2 text-gray-500">
                {formatDate(scan.receivedAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
