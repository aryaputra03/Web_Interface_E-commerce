import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { deviceService } from "../services/device.service";
import type { RegisterDevicePayload } from "../types/device.types";

export function useRegisterDevice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: RegisterDevicePayload) => deviceService.register(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.devices.all }),
  });
}
