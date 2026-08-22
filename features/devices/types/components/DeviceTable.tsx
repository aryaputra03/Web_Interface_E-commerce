"use client";

import type { Device } from "../types/device.types";
import { formatDate } from "@/lib/utils";
import { ErrorMessage } from "@/components/feedback-ui/ErrorMessage";

interface DeviceTableProps {
  devices: Device[];
  isLoading: boolean;
  isError: boolean;
}

export function DeviceTable({ devices, isLoading, isError }: DeviceTableProps) {
  if (isError) {
    return <ErrorMessage message="Tidak dapat terhubung ke server." />;
  }

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 rounded bg-gray-100" />
        ))}
      </div>
    );
  }

  if (devices.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-400">
        Belum ada device terdaftar.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-gray-500">
              Nama
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-500">
              Device ID
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-500">
              Status
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-500">
              Terakhir Terlihat
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {devices.map((device) => (
            <tr key={device.id}>
              <td className="px-4 py-2">{device.name}</td>
              <td className="px-4 py-2 font-mono text-xs">{device.deviceId}</td>
              <td className="px-4 py-2">
                <span
                  className={
                    device.isActive
                      ? "inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700"
                      : "inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500"
                  }
                >
                  {device.isActive ? "Aktif" : "Nonaktif"}
                </span>
              </td>
              <td className="px-4 py-2 text-gray-500">
                {device.lastSeenAt ? formatDate(device.lastSeenAt) : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
