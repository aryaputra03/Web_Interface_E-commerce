"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CartItem } from "@/features/cart/components/CartItem";
import { useCart } from "@/features/cart/hooks/useCart";
import { OrderDetail } from "@/features/orders/components/OrderDetail";
import { useCreateOrder } from "@/features/orders/hooks/useCreateOrder";
import type { Order } from "@/features/orders/types/order.types";
import { PaymentSimulateButton } from "@/features/payments/components/PaymentSimulateButton";
import { formatCurrency } from "@/lib/utils";
type CheckoutStep = "review" | "awaiting-payment" | "success";
export default function CheckoutPage() {
  const { data: cart, isLoading } = useCart();
  const createOrderMutation = useCreateOrder();
  const [step, setStep] = useState<CheckoutStep>("review");
  const [order, setOrder] = useState<Order | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const items = cart?.items ?? [];
  const handleCreateOrder = () =>
    createOrderMutation.mutate(
      { fulfillmentType: "pickup", voucherCode: null },
      {
        onSuccess: (response) => {
          if (response.data) {
            setOrder(response.data.order);
            setPaymentId(response.data.payment.id);
            setStep("awaiting-payment");
          }
        },
      },
    );

  if (step === "success" && order)
    return (
      <div className="mx-auto max-w-lg px-4 py-8">
        <h1 className="mb-1 text-2xl font-semibold text-ink">
          Pembayaran Berhasil
        </h1>
        <p className="mb-6 text-sm text-ink-muted">
          Pesanan kamu sudah dibuat dan stok sudah diperbarui di sistem.
        </p>
        <OrderDetail order={order} />
        <Link
          href="/profile/orders"
          className="mt-6 block text-center text-sm text-till hover:underline"
        >
          Lihat Riwayat Pesanan
        </Link>
      </div>
    );

  if (step === "awaiting-payment" && order && paymentId)
    return (
      <div className="mx-auto max-w-lg px-4 py-8">
        <h1 className="mb-1 text-2xl font-semibold text-ink">
          Selesaikan Pembayaran
        </h1>
        <p className="mb-6 text-sm text-ink-muted">
          Pesanan{" "}
          <span className="font-medium text-ink">{order.orderCode}</span> sudah
          dibuat — sisa satu langkah lagi.
        </p>
        <OrderDetail order={order} />
        <div className="mt-6">
          <PaymentSimulateButton
            paymentId={paymentId}
            onSuccess={() => setStep("success")}
          />
        </div>
      </div>
    );

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-ink">Checkout</h1>
      {isLoading ? (
        <p className="text-sm text-ink-muted">Memuat keranjang...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-ink-muted">Keranjang masih kosong.</p>
      ) : (
        <>
          <div className="mb-6 rounded-lg border border-line-strong bg-paper-raised px-4">
            {items.map((item, index) => (
              <div key={item.id}>
                {index > 0 && <div className="till-tape" />}
                <CartItem item={item} />
              </div>
            ))}
          </div>
          <div className="mb-6 flex justify-between font-mono text-base font-semibold text-ink">
            <span>Total</span>
            <span>{formatCurrency(cart?.totalPrice ?? 0)}</span>
          </div>
          {createOrderMutation.isError && (
            <p className="mb-4 text-sm text-brick">
              Tidak dapat membuat pesanan. Coba lagi.
            </p>
          )}
          <Button
            type="button"
            onClick={handleCreateOrder}
            isLoading={createOrderMutation.isPending}
            className="w-full"
          >
            Buat Pesanan
          </Button>
        </>
      )}
    </div>
  );
}
