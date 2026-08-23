"use client";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/modal";
import { useRegenerateKey } from "../hooks/useRegenerateKey";
import type { Device, RegenerateKeyResponseData } from "../types/device.types";

interface RegenerateKeyDialogProps {
  device: Device | null;
  onClose: () => void;
  onRegenerated: (data: RegenerateKeyResponseData) => void;
}

export function RegenerateKeyDialog({ device, onClose, onRegenerated }: RegenerateKeyDialogProps) {
  const regenerateMutation = useRegenerateKey();
  if (!device) return null;

  function handleConfirm() {
    regenerateMutation.mutate(device!.id, {
      onSuccess: (response) => {
        if (response.data) onRegenerated(response.data);
        onClose();
      },
    });
  }

  return (
    <Modal open={Boolean(device)} onClose={onClose} title="Regenerate API Key">
      <div className="space-y-4">
        <p className="text-sm text-slate-600">
          Key lama untuk device <span className="font-medium">{device.name}</span> ({device.deviceId}) akan langsung tidak valid setelah ini. Firmware ESP32-S3 di device fisik wajib diperbarui dengan key baru. Lanjutkan?
        </p>
        <div className="flex gap-2">
          <Button type="button" onClick={handleConfirm} isLoading={regenerateMutation.isPending} className="flex-1">Ya, Regenerate</Button>
          <button type="button" onClick={onClose} disabled={regenerateMutation.isPending} className="flex-1 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50">Batal</button>
        </div>
      </div>
    </Modal>
  );
}
