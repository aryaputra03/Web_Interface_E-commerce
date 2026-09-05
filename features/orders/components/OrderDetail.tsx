import { formatCurrency, formatDate } from "@/lib/utils";
import type { Order } from "../types/order.types";
import { OrderStatusBadge } from "./OrderStatusBadge";

export function OrderDetail({ order }: { order: Order }) {
  return (
    <div className="rounded-lg border border-line-strong bg-paper-raised p-5 font-mono text-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="font-medium text-ink">{order.orderCode}</p>
          <p className="text-xs text-ink-muted">
            {formatDate(order.createdAt)}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="till-tape mb-2" />

      <div className="space-y-1.5">
        {order.items.map((item) => (
          <div
            key={item.productId}
            className="flex justify-between text-ink-muted"
          >
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>{formatCurrency(item.subtotal)}</span>
          </div>
        ))}
      </div>

      <div className="till-tape my-3" />

      <div className="flex justify-between text-base font-semibold text-ink">
        <span>Total</span>
        <span>{formatCurrency(order.total)}</span>
      </div>
    </div>
  );
}
