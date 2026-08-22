"use client";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { POLLING_INTERVAL } from "@/lib/constants";
import { posSessionService } from "../services/posSession.service";

export function useActiveSessions() {
  return useQuery({
    queryKey: queryKeys.posSessions.active,
    queryFn: async () => {
      const res = await posSessionService.getActive();
      return res.data.data ?? [];
    },
    refetchInterval: POLLING_INTERVAL.POS_SESSIONS,
  });
}
