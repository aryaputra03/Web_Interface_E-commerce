import type { PosSessionItem } from "../types/posSession.types";
import { formatCurrency, cn } from "@/lib/utils";

export interface PosSessionItemListProps {
  items: PosSessionItem[];
  highlightedIds?: Set<string>;
}

export function PosSessionItemList({
  items,
  highlightedIds,
}: PosSessionItemListProps) {
  return (
    <ul className="flex flex-col divide-y divide-gray-100 text-sm">
      {items.map((item) => (
        <li
          key={item.productId}
          className={cn(
            "flex items-center justify-between py-1.5 transition-colors",
            highlightedIds?.has(item.productId) ? "bg-green-50" : "",
          )}
        >
          <span className="text-gray-700">
            {item.name} <span className="text-gray-400">x{item.quantity}</span>
          </span>
          <span className="text-gray-900">
            {formatCurrency(item.priceSnapshot * item.quantity)}
          </span>
        </li>
      ))}
    </ul>
  );
}
