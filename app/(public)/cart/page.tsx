"use client";
import { CartItem } from "@/features/cart/components/CartItem";
import { CartSummary } from "@/features/cart/components/CartSummary";
import { useCart } from "@/features/cart/hooks/useCart";

export default function CartPage() {
  const { data: cart, isLoading, isError } = useCart();
  const items = cart?.items ?? [];

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-ink">Keranjang</h1>

      {isError && (
        <p className="mb-4 text-sm text-brick">
          Tidak dapat terhubung ke server.
        </p>
      )}

      {isLoading ? (
        <p className="text-sm text-ink-muted">Memuat keranjang...</p>
      ) : items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-line-strong p-10 text-center">
          <p className="text-sm text-ink-muted">Keranjang masih kosong.</p>
        </div>
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
          <CartSummary
            totalItems={cart?.totalItems ?? 0}
            totalPrice={cart?.totalPrice ?? 0}
          />
        </>
      )}
    </div>
  );
}
