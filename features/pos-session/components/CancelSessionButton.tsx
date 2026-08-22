"use client";
import { useState } from "react";
import { useCancelSession } from "../hooks/useCancelSession";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { useToast } from "@/components/ui/Toast";
import { extractApiErrorMessage } from "@/lib/utils";

export interface CancelSessionButtonProps {
  sessionId: string;
}

export function CancelSessionButton({ sessionId }: CancelSessionButtonProps) {
  const { mutate, isPending } = useCancelSession();
  const { showToast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConfirm = () => {
    mutate(sessionId, {
      onSuccess: () => {
        setIsDialogOpen(false);
        showToast("Sesi dibatalkan.", "info");
      },
      onError: (error) => {
        setIsDialogOpen(false);
        showToast(
          extractApiErrorMessage(error, "Gagal membatalkan sesi."),
          "error",
        );
      },
    });
  };

  return (
    <>
      <Button
        size="sm"
        variant="danger"
        onClick={() => setIsDialogOpen(true)}
        className="flex-1"
      >
        Batalkan Sesi
      </Button>
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirm}
        title="Batalkan Sesi?"
        description="Sesi ini akan dihapus dari daftar aktif dan stok tidak berubah. Tindakan ini tidak bisa dibatalkan."
        confirmLabel="Ya, Batalkan"
        isConfirmDanger
        isLoading={isPending}
      />
    </>
  );
}
