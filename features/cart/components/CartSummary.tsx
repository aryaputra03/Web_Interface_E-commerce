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
    <div className="rounded-lg border border-slate-200 p-4">
      <div className="flex justify-between text-sm text-slate-500">
        <span>Total item</span>
        <span>{totalItems}</span>
      </div>
      <div className="mt-1 flex justify-between text-base font-semibold">
        <span>Total</span>
        <span>{formatCurrency(totalPrice)}</span>
      </div>
      <Link href="/checkout" className="mt-4 block">
        <Button type="button" className="w-full" disabled={totalItems === 0}>
          Checkout
        </Button>
      </Link>
    </div>
  );
}
