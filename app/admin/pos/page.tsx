"use client";
import { useMemo } from "react";
import { useActiveSessions } from "@/features/pos-session/hooks/useActiveSessions";
import { PosSessionCard } from "@/features/pos-session/components/PosSessionCard";
import type { PosSession } from "@/features/pos-session/types/posSession.types";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorMessage } from "@/components/feedback-ui/ErrorMessage";

function groupByDevice(sessions: PosSession[]): Array<[string, PosSession[]]> {
  const map = new Map<string, PosSession[]>();
  for (const session of sessions) {
    const list = map.get(session.deviceId) ?? [];
    list.push(session);
    map.set(session.deviceId, list);
  }
  return Array.from(map.entries());
}

export default function PosPage() {
  const { data: sessions, isLoading, isError, refetch } = useActiveSessions();
  const grouped = useMemo(() => groupByDevice(sessions ?? []), [sessions]);

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-xl font-semibold text-gray-900">Kasir Offline</h1>
      {isLoading && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-52 w-full" />
          ))}
        </div>
      )}
      {isError && (
        <div className="flex flex-col gap-3">
          <ErrorMessage />
          <button type="button" onClick={() => refetch()} className="w-fit text-sm font-medium text-blue-600 hover:underline">Coba lagi</button>
        </div>
      )}
      {!isLoading && !isError && grouped.length === 0 && (
        <EmptyState
          title="Belum ada transaksi aktif"
          description="Sesi baru akan muncul otomatis begitu ada scan mode 'buy' dari hardware."
        />
      )}
      {!isLoading &&
        !isError &&
        grouped.map(([deviceId, deviceSessions]) => (
          <section key={deviceId} className="flex flex-col gap-3">
            <h2 className="text-sm font-medium text-gray-500">{deviceId}</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {deviceSessions.map((session) => (
                <PosSessionCard key={session.id} session={session} />
              ))}
            </div>
          </section>
        ))}
    </div>
  );
}
