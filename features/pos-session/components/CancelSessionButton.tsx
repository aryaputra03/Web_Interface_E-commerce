"use client";
import { useState } from "react";
import { useCancelSession } from "../hooks/useCancelSession";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/Toast";
import { extractApiErrorMessage } from "@/lib/utils";

export interface CancelSessionButtonProps {
  sessionId: string;
}

export function CancelSessionButton({ sessionId }: CancelSessionButtonProps) {
  const { mutate, isPending } = useCancelSession();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConfirm = () => {
    mutate(sessionId, {
      onSuccess: () => {
        setIsDialogOpen(false);
        toast("Sesi dibatalkan.", "info");
      },
      onError: (error) => {
        setIsDialogOpen(false);
        toast(
          extractApiErrorMessage(error, "Gagal membatalkan sesi."),
          "error",
        );
      },
    });
  };

  return (
    <>
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="flex-1"
      >
        Batalkan Sesi
      </Button>
      <Modal
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Batalkan Sesi?"
      >
        <p className="mb-4 text-sm text-slate-600">Sesi ini akan dihapus dari daftar aktif dan stok tidak berubah. Tindakan ini tidak bisa dibatalkan.</p>
        <div className="flex justify-end gap-3">
          <Button type="button" onClick={() => setIsDialogOpen(false)} disabled={isPending}>Kembali</Button>
          <Button type="button" onClick={handleConfirm} isLoading={isPending}>Ya, Batalkan</Button>
        </div>
      </Modal>
    </>
  );
}
