"use client";

import { OrderList } from "@/features/orders/components/OrderList";
import { useOrders } from "@/features/orders/hooks/useOrders";

export default function ProfileOrdersPage() {
  const { data: orders = [], isLoading, isError } = useOrders();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Riwayat Pesanan</h1>
      <OrderList orders={orders} isLoading={isLoading} isError={isError} />
    </div>
  );
}
