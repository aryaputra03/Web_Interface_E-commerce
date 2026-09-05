"use client";
/* eslint-disable @next/next/no-img-element */

import { formatCurrency } from "@/lib/utils";
import { useRemoveCartItem } from "../hooks/useRemoveCartItem";
import { useUpdateCartItem } from "../hooks/useUpdateCartItem";
import type { CartItem as CartItemType } from "../types/cart.types";

export function CartItem({ item }: { item: CartItemType }) {
  const updateMutation = useUpdateCartItem();
  const removeMutation = useRemoveCartItem();
  const changeQuantity = (quantity: number) => {
    if (quantity >= 1) updateMutation.mutate({ itemId: item.id, quantity });
  };

  return (
    <div className="flex items-center gap-3 py-3">
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-line bg-till-tint">
        {item.image && (
          <img
            src={item.image}
            alt={item.productName}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink">
          {item.productName}
        </p>
        <p className="font-mono text-xs text-ink-muted">
          {formatCurrency(item.price)} / pcs
        </p>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => changeQuantity(item.quantity - 1)}
          disabled={updateMutation.isPending}
          className="flex h-7 w-7 items-center justify-center rounded-sm border border-line-strong text-sm text-ink transition-colors hover:border-ink disabled:opacity-50"
          aria-label={`Kurangi ${item.productName}`}
        >
          −
        </button>
        <span className="w-6 text-center font-mono text-sm text-ink">
          {item.quantity}
        </span>
        <button
          type="button"
          onClick={() => changeQuantity(item.quantity + 1)}
          disabled={updateMutation.isPending}
          className="flex h-7 w-7 items-center justify-center rounded-sm border border-line-strong text-sm text-ink transition-colors hover:border-ink disabled:opacity-50"
          aria-label={`Tambah ${item.productName}`}
        >
          +
        </button>
      </div>

      <span className="w-24 shrink-0 text-right font-mono text-sm font-medium text-ink">
        {formatCurrency(item.price * item.quantity)}
      </span>

      <button
        type="button"
        onClick={() => removeMutation.mutate(item.id)}
        disabled={removeMutation.isPending}
        className="shrink-0 text-xs text-brick hover:underline disabled:opacity-50"
      >
        Hapus
      </button>
    </div>
  );
}
