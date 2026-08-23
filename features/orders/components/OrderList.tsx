"use client";

import { formatCurrency, formatDate } from "@/lib/utils";
import { useCancelOrder } from "../hooks/useCancelOrder";
import type { Order } from "../types/order.types";
import { OrderStatusBadge } from "./OrderStatusBadge";

export function OrderList({ orders, isLoading, isError }: { orders: Order[]; isLoading: boolean; isError: boolean }) {
  const cancelMutation = useCancelOrder();
  if (isError) return <p className="text-sm text-slate-500">Tidak dapat terhubung ke server.</p>;
  if (isLoading) return <div className="space-y-2">{Array.from({ length: 3 }, (_, index) => <div key={index} className="h-16 animate-pulse rounded-lg bg-slate-100" />)}</div>;
  if (orders.length === 0) return <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-400">Belum ada pesanan.</div>;
  return <div className="space-y-3">{orders.map((order) => <div key={order.id} className="rounded-lg border border-slate-200 p-4"><div className="flex items-center justify-between"><div><p className="text-sm font-medium">{order.orderCode}</p><p className="text-xs text-slate-400">{formatDate(order.createdAt)}</p></div><OrderStatusBadge status={order.status} /></div><div className="mt-2 text-sm text-slate-500">{order.items.length} item · {formatCurrency(order.total)}</div>{order.status === "pending" && <button type="button" onClick={() => { if (confirm(`Batalkan pesanan ${order.orderCode}?`)) cancelMutation.mutate(order.id); }} disabled={cancelMutation.isPending} className="mt-3 text-xs text-red-500 hover:underline disabled:opacity-50">Batalkan Pesanan</button>}</div>)}</div>;
}
