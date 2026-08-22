"use client";

import { useDevices } from "@/features/devices/hooks/useDevices";
import { DeviceTable } from "@/features/devices/components/DeviceTable";

export default function AdminDevicesPage() {
  const { data: devices = [], isLoading, isError } = useDevices();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Manajemen Device</h1>
      <p className="text-sm text-gray-500 mb-6">
        Versi sederhana untuk Gate 1 — registrasi, toggle status, dan regenerate
        key menyusul di Fase 8.
      </p>

      <DeviceTable devices={devices} isLoading={isLoading} isError={isError} />
    </div>
  );
}
