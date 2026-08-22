"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { posSessionService } from "../services/posSession.service";
import type { CheckoutPayload } from "../types/posSession.types";

export function useCheckoutSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: CheckoutPayload }) =>
      posSessionService.checkout(id, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.posSessions.active }),
  });
}
