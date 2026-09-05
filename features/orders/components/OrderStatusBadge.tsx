import { cn } from "@/lib/utils";
import type { OrderStatus } from "../types/order.types";

const labels: Record<OrderStatus, string> = {
  pending: "Menunggu Pembayaran",
  paid: "Sudah Dibayar",
  processing: "Diproses",
  ready: "Siap Diambil",
  delivering: "Dalam Pengiriman",
  completed: "Selesai",
  cancelled: "Dibatalkan",
};

const classes: Record<OrderStatus, string> = {
  pending: "bg-brass-tint text-brass-dark",
  paid: "bg-till-tint text-till-dark",
  processing: "bg-till-tint text-till-dark",
  ready: "bg-till-tint text-till-dark",
  delivering: "bg-till-tint text-till-dark",
  completed: "bg-till text-paper",
  cancelled: "bg-brick-tint text-brick",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={cn(
        "inline-block rounded-sm px-2 py-0.5 font-mono text-xs font-medium",
        classes[status],
      )}
    >
      {labels[status]}
    </span>
  );
}
