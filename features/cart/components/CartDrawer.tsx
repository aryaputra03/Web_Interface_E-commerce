"use client";

import { useCart } from "../hooks/useCart";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { data: cart, isLoading } = useCart();
  if (!isOpen) return null;
  const items = cart?.items ?? [];
  return <div className="fixed inset-0 z-30"><div className="absolute inset-0 bg-black/30" onClick={onClose} /><div className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-xl"><div className="flex items-center justify-between border-b border-slate-100 px-4 py-3"><span className="text-sm font-medium">Keranjang</span><button type="button" onClick={onClose} className="text-sm text-slate-400 hover:text-slate-600">Tutup</button></div><div className="flex-1 overflow-y-auto px-4">{isLoading ? <p className="py-6 text-center text-sm text-slate-400">Memuat...</p> : items.length === 0 ? <p className="py-6 text-center text-sm text-slate-400">Keranjang masih kosong.</p> : items.map((item) => <CartItem key={item.id} item={item} />)}</div>{items.length > 0 && <div className="border-t border-slate-100 p-4"><CartSummary totalItems={cart?.totalItems ?? 0} totalPrice={cart?.totalPrice ?? 0} /></div>}</div></div>;
}
