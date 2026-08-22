"use client";
import { useMemo } from "react";
import { useActiveSessions, PosSessionCard } from "@/features/pos-session";
import type { PosSession } from "@/features/pos-session";
import { SkeletonRows } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
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
      {isLoading && <SkeletonRows rows={4} />}
      {isError && <ErrorMessage onRetry={() => refetch()} />}
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
