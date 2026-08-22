"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { posSessionService } from "../services/posSession.service";

export function useCancelSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => posSessionService.cancel(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.posSessions.active }),
  });
}
