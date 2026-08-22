"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { deviceScanService } from "../services/deviceScan.service";
import type { MapProductPayload } from "../types/deviceScan.types";

export function useMapProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: MapProductPayload }) =>
      deviceScanService.mapProduct(id, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.deviceScans.all }),
  });
}
