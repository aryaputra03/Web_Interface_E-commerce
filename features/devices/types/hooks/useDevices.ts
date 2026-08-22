import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { deviceService } from "../services/device.service";

export function useDevices() {
  return useQuery({
    queryKey: queryKeys.devices.all,
    queryFn: async () => {
      const response = await deviceService.getAll();
      return response.data ?? [];
    },
  });
}
