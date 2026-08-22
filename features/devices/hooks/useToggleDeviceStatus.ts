import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { deviceService } from "../services/device.service";

export function useToggleDeviceStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) => deviceService.toggleStatus(id, isActive),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.devices.all }),
  });
}
