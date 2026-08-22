import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { deviceScanService } from "../services/deviceScan.service";

export function useDeviceScans() {
  return useQuery({
    queryKey: queryKeys.deviceScans.all,
    queryFn: async () => {
      const response = await deviceScanService.getAll();
      return response.data ?? [];
    },
  });
}
