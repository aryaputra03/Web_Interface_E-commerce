"use client";
/* eslint-disable @next/next/no-img-element */

import { formatCurrency } from "@/lib/utils";
import { useRemoveCartItem } from "../hooks/useRemoveCartItem";
import { useUpdateCartItem } from "../hooks/useUpdateCartItem";
import type { CartItem as CartItemType } from "../types/cart.types";

export function CartItem({ item }: { item: CartItemType }) {
  const updateMutation = useUpdateCartItem();
  const removeMutation = useRemoveCartItem();
  const changeQuantity = (quantity: number) => { if (quantity >= 1) updateMutation.mutate({ itemId: item.id, quantity }); };
  return <div className="flex items-center gap-3 border-b border-slate-100 py-3">
    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-slate-100">{item.image && <img src={item.image} alt={item.productName} className="h-full w-full object-cover" />}</div>
    <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{item.productName}</p><p className="text-sm text-slate-500">{formatCurrency(item.price)}</p></div>
    <div className="flex items-center gap-2"><button type="button" onClick={() => changeQuantity(item.quantity - 1)} disabled={updateMutation.isPending} className="h-7 w-7 rounded border border-slate-300 text-sm hover:bg-slate-50 disabled:opacity-50" aria-label={`Kurangi ${item.productName}`}>−</button><span className="w-6 text-center text-sm">{item.quantity}</span><button type="button" onClick={() => changeQuantity(item.quantity + 1)} disabled={updateMutation.isPending} className="h-7 w-7 rounded border border-slate-300 text-sm hover:bg-slate-50 disabled:opacity-50" aria-label={`Tambah ${item.productName}`}>+</button></div>
    <button type="button" onClick={() => removeMutation.mutate(item.id)} disabled={removeMutation.isPending} className="text-xs text-red-500 hover:underline disabled:opacity-50">Hapus</button>
  </div>;
}
