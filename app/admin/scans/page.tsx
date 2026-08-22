"use client";

import { useDeviceScans } from "@/features/device-scans/hooks/useDeviceScans";
import { ScanLogTable } from "@/features/device-scans/components/ScanLogTable";

export default function AdminScansPage() {
  const {
    data: scans = [],
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useDeviceScans();

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-semibold">Log Scan Device</h1>
        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="text-sm text-blue-600 hover:underline disabled:opacity-50"
        >
          {isFetching ? "Memuat..." : "Refresh"}
        </button>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Versi sederhana untuk Gate 1 — filter & pemetaan barcode menyusul di
        Fase 7. Refresh manual dulu, belum polling.
      </p>

      <ScanLogTable scans={scans} isLoading={isLoading} isError={isError} />
    </div>
  );
}
