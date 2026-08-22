import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { deviceService } from "../services/device.service";

export function useRegenerateKey() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deviceService.regenerateKey(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.devices.all }),
  });
}
