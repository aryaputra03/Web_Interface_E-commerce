import { useQuery } from "@tanstack/react-query";
import { POLLING_INTERVAL } from "@/lib/constants";
import { queryKeys } from "@/lib/query-keys";
import { notificationService } from "../services/notification.service";

export function useNotifications() {
  return useQuery({
    queryKey: queryKeys.notifications.all,
    queryFn: async () => {
      const response = await notificationService.getAll();
      return response.data ?? [];
    },
    refetchInterval: POLLING_INTERVAL.NOTIFICATIONS,
  });
}
