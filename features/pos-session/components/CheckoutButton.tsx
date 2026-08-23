"use client";
import { useState } from "react";
import { useCheckoutSession } from "../hooks/useCheckoutSession";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/Toast";
import { formatCurrency, extractApiErrorMessage } from "@/lib/utils";

export interface CheckoutButtonProps {
  sessionId: string;
}

export function CheckoutButton({ sessionId }: CheckoutButtonProps) {
  const { mutate, isPending } = useCheckoutSession();
  const { toast } = useToast();
  const [confirmation, setConfirmation] = useState<{
    orderCode: string;
    total: number;
  } | null>(null);

  const handleCheckout = () => {
    mutate(
      { id: sessionId, payload: { voucherCode: null } },
      {
        onSuccess: (res) => {
          const data = res.data.data;
          if (data)
            setConfirmation({ orderCode: data.orderCode, total: data.total });
        },
        onError: (error) =>
          toast(
            extractApiErrorMessage(error, "Gagal menyelesaikan transaksi."),
            "error",
          ),
      },
    );
  };

  return (
    <>
      <Button
        isLoading={isPending}
        onClick={handleCheckout}
        className="flex-1"
      >
        Selesaikan Transaksi
      </Button>
      <Modal
        open={!!confirmation}
        onClose={() => setConfirmation(null)}
        title="Transaksi Berhasil"
      >
        {confirmation && (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-gray-600">
              Kode Order:{" "}
              <span className="font-mono font-medium text-gray-900">
                {confirmation.orderCode}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Total:{" "}
              <span className="font-medium text-gray-900">
                {formatCurrency(confirmation.total)}
              </span>
            </p>
            <Button onClick={() => setConfirmation(null)}>Tutup</Button>
          </div>
        )}
      </Modal>
    </>
  );
}
