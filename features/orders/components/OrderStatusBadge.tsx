import { cn } from "@/lib/utils";
import type { OrderStatus } from "../types/order.types";
const labels: Record<OrderStatus, string> = { pending: "Menunggu Pembayaran", paid: "Sudah Dibayar", processing: "Diproses", completed: "Selesai", cancelled: "Dibatalkan" };
const classes: Record<OrderStatus, string> = { pending: "bg-amber-100 text-amber-700", paid: "bg-blue-100 text-blue-700", processing: "bg-blue-100 text-blue-700", completed: "bg-green-100 text-green-700", cancelled: "bg-slate-100 text-slate-500" };
export function OrderStatusBadge({ status }: { status: OrderStatus }) { return <span className={cn("inline-block rounded-full px-2 py-0.5 text-xs", classes[status])}>{labels[status]}</span>; }
