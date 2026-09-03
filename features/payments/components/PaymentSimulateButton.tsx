"use client";

import { Button } from "@/components/ui/Button";
import { useSimulatePayment } from "../hooks/useSimulatePayment";

export function PaymentSimulateButton({
  paymentId,
  onSuccess,
}: {
  paymentId: string;
  onSuccess: () => void;
}) {
  const simulateMutation = useSimulatePayment();

  return (
    <Button
      type="button"
      onClick={() =>
        simulateMutation.mutate(paymentId, {
          onSuccess: (response) => {
            if (response.data?.payment.status === "success") onSuccess();
          },
        })
      }
      isLoading={simulateMutation.isPending}
      className="w-full"
    >
      Simulasikan Pembayaran
    </Button>
  );
}
