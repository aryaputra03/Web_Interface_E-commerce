"use client";

import { formatCurrency, formatDate } from "@/lib/utils";
import { useCancelOrder } from "../hooks/useCancelOrder";
import type { Order } from "../types/order.types";
import { OrderStatusBadge } from "./OrderStatusBadge";

export function OrderList({
  orders,
  isLoading,
  isError,
}: {
  orders: Order[];
  isLoading: boolean;
  isError: boolean;
}) {
  const cancelMutation = useCancelOrder();

  if (isError)
    return (
      <p className="text-sm text-ink-muted">Tidak dapat terhubung ke server.</p>
    );

  if (isLoading)
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index}
            className="h-16 animate-pulse rounded-lg bg-till-tint"
          />
        ))}
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="rounded-lg border border-dashed border-line-strong p-8 text-center text-ink-muted">
        Belum ada pesanan.
      </div>
    );

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <div
          key={order.id}
          className="rounded-lg border border-line-strong bg-paper-raised p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ink">{order.orderCode}</p>
              <p className="text-xs text-ink-muted">
                {formatDate(order.createdAt)}
              </p>
            </div>
            <OrderStatusBadge status={order.status} />
          </div>
          <div className="mt-2 flex items-baseline justify-between font-mono text-sm text-ink-muted">
            <span>{order.items.length} item</span>
            <span className="font-medium text-ink">
              {formatCurrency(order.total)}
            </span>
          </div>
          {order.status === "pending" && (
            <button
              type="button"
              onClick={() => {
                if (confirm(`Batalkan pesanan ${order.orderCode}?`))
                  cancelMutation.mutate(order.id);
              }}
              disabled={cancelMutation.isPending}
              className="mt-3 text-xs text-brick hover:underline disabled:opacity-50"
            >
              Batalkan Pesanan
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
