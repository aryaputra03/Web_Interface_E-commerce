"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

export function CartSummary({
  totalItems,
  totalPrice,
}: {
  totalItems: number;
  totalPrice: number;
}) {
  return (
    <div className="rounded-lg border border-line-strong bg-paper-raised p-4">
      <div className="flex justify-between text-sm text-ink-muted">
        <span>Total item</span>
        <span className="font-mono">{totalItems}</span>
      </div>
      <div className="till-tape my-3" />
      <div className="flex justify-between text-base font-semibold text-ink">
        <span>Total</span>
        <span className="font-mono">{formatCurrency(totalPrice)}</span>
      </div>
      <Link href="/checkout" className="mt-4 block">
        <Button type="button" className="w-full" disabled={totalItems === 0}>
          Checkout
        </Button>
      </Link>
    </div>
  );
}
