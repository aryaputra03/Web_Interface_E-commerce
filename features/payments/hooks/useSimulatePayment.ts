import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { paymentService } from "../services/payment.service";

export function useSimulatePayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (paymentId: string) =>
      paymentService.simulate(paymentId, "success"),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all }),
  });
}
