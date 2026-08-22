import type { PosSessionItem } from "../types/posSession.types";
import { formatCurrency } from "@/lib/utils";

export interface PosSessionSubtotalProps {
  items: PosSessionItem[];
}

// Subtotal murni tampilan client-side, BUKAN sumber kebenaran harga (Bab 9)
export function PosSessionSubtotal({ items }: PosSessionSubtotalProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.priceSnapshot * item.quantity,
    0,
  );
  return (
    <div className="flex items-center justify-between border-t border-gray-100 pt-2 text-sm font-medium">
      <span className="text-gray-600">Subtotal</span>
      <span className="text-gray-900">{formatCurrency(subtotal)}</span>
    </div>
  );
}
