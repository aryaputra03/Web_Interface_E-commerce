"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/modal";

interface ApiKeyRevealModalProps {
  isOpen: boolean;
  apiKey: string | null;
  note?: string;
  onClose: () => void;
}

export function ApiKeyRevealModal({ isOpen, apiKey, note, onClose }: ApiKeyRevealModalProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!apiKey) return;
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Key tetap dapat disalin manual bila Clipboard API tidak tersedia.
    }
  }

  function handleClose() {
    setCopied(false);
    onClose();
  }

  if (!apiKey) return null;

  return (
    <Modal open={isOpen} onClose={handleClose} title="API Key Device">
      <div className="space-y-4">
        <p className="text-sm font-medium text-red-600">
          Salin kunci ini sekarang — kunci ini tidak akan ditampilkan lagi setelah modal ini ditutup.
        </p>
        <div className="select-all break-all rounded-md border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-xs">
          {apiKey}
        </div>
        {note && <p className="text-xs text-slate-400">{note}</p>}
        <div className="flex gap-2">
          <Button type="button" onClick={handleCopy} className="flex-1">
            {copied ? "Tersalin!" : "Salin ke Clipboard"}
          </Button>
          <button type="button" onClick={handleClose} className="flex-1 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Tutup
          </button>
        </div>
      </div>
    </Modal>
  );
}
