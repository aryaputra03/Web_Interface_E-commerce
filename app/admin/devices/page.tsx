"use client";

import { useState } from "react";
import { ApiKeyRevealModal } from "@/features/devices/components/ApiKeyRevealModal";
import { DeviceTable } from "@/features/devices/components/DeviceTable";
import { RegisterDeviceForm } from "@/features/devices/components/RegisterDeviceForm";
import { RegenerateKeyDialog } from "@/features/devices/components/RegenerateKeyDialog";
import { useDevices } from "@/features/devices/hooks/useDevices";
import type { Device, RegenerateKeyResponseData, RegisterDeviceResponseData } from "@/features/devices/types/device.types";

export default function AdminDevicesPage() {
  const { data: devices = [], isLoading, isError } = useDevices();
  const [revealedKey, setRevealedKey] = useState<{ apiKey: string; note?: string } | null>(null);
  const [deviceToRegenerate, setDeviceToRegenerate] = useState<Device | null>(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  function handleRegistered(data: RegisterDeviceResponseData) {
    setShowRegisterForm(false);
    setRevealedKey({ apiKey: data.apiKey, note: data.note });
  }

  function handleRegenerated(data: RegenerateKeyResponseData) {
    setRevealedKey({ apiKey: data.apiKey, note: data.note });
  }

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Manajemen Device</h1>
        <button type="button" onClick={() => setShowRegisterForm((value) => !value)} className="text-sm text-blue-600 hover:underline">
          {showRegisterForm ? "Batal" : "+ Daftarkan Device"}
        </button>
      </div>
      <p className="mb-6 text-sm text-slate-500">Unit ESP32-S3 terdaftar. Status & terakhir terlihat ter-update otomatis mengikuti polling.</p>
      {showRegisterForm && <div className="mb-6 max-w-md rounded-lg border border-slate-200 p-4"><RegisterDeviceForm onRegistered={handleRegistered} /></div>}
      <DeviceTable devices={devices} isLoading={isLoading} isError={isError} onRegenerateKey={setDeviceToRegenerate} />
      <ApiKeyRevealModal isOpen={Boolean(revealedKey)} apiKey={revealedKey?.apiKey ?? null} note={revealedKey?.note} onClose={() => setRevealedKey(null)} />
      <RegenerateKeyDialog device={deviceToRegenerate} onClose={() => setDeviceToRegenerate(null)} onRegenerated={handleRegenerated} />
    </div>
  );
}
