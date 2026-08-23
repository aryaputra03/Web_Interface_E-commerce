"use client";
import { useEffect, useState } from "react";
import type { PosSession } from "../types/posSession.types";
import { PosSessionItemList } from "./PosSessionItemList";
import { PosSessionSubtotal } from "./PosSessionSubtotal";
import { CheckoutButton } from "./CheckoutButton";
import { CancelSessionButton } from "./CancelSessionButton";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/lib/utils";

export interface PosSessionCardProps {
  session: PosSession;
}
const HIGHLIGHT_DURATION_MS = 3000;

interface HighlightTrackingState {
  signature: string;
  quantities: Record<string, number>;
  highlightedIds: Set<string>;
}
const initialTrackingState: HighlightTrackingState = {
  signature: "",
  quantities: {},
  highlightedIds: new Set(),
};

export function PosSessionCard({ session }: PosSessionCardProps) {
  const [tracking, setTracking] =
    useState<HighlightTrackingState>(initialTrackingState);
  const itemsSignature = session.items
    .map((i) => `${i.productId}:${i.quantity}`)
    .join(",");

  // "Adjusting state during render" - pola resmi React untuk derived state yang
  // harus dihitung ulang saat props (hasil polling) berubah.
  if (itemsSignature !== tracking.signature) {
    const changed = new Set<string>();
    const nextQuantities: Record<string, number> = {};
    for (const item of session.items) {
      const prevQty = tracking.quantities[item.productId];
      if (prevQty === undefined || item.quantity > prevQty)
        changed.add(item.productId);
      nextQuantities[item.productId] = item.quantity;
    }
    setTracking({
      signature: itemsSignature,
      quantities: nextQuantities,
      highlightedIds: changed,
    });
  }

  useEffect(() => {
    if (tracking.highlightedIds.size === 0) return;
    const timeout = setTimeout(
      () => setTracking((prev) => ({ ...prev, highlightedIds: new Set() })),
      HIGHLIGHT_DURATION_MS,
    );
    return () => clearTimeout(timeout);
  }, [tracking.highlightedIds]);

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {session.deviceId}
          </p>
          <p className="text-xs text-gray-500">
            Scan terakhir {formatRelativeTime(session.lastScanAt)}
          </p>
        </div>
        {tracking.highlightedIds.size > 0 && (
          <Badge variant="success" className="animate-pulse">
            Item baru
          </Badge>
        )}
      </div>
      <PosSessionItemList
        items={session.items}
        highlightedIds={tracking.highlightedIds}
      />
      <PosSessionSubtotal items={session.items} />
      <div className="flex gap-2 pt-2">
        <CheckoutButton sessionId={session.id} />
        <CancelSessionButton sessionId={session.id} />
      </div>
    </div>
  );
}
