"use client";
import { CartItem } from "@/features/cart/components/CartItem";
import { CartSummary } from "@/features/cart/components/CartSummary";
import { useCart } from "@/features/cart/hooks/useCart";
export default function CartPage() { const { data: cart, isLoading, isError } = useCart(); const items = cart?.items ?? []; return <div className="mx-auto max-w-2xl px-4 py-8"><h1 className="mb-6 text-2xl font-semibold">Keranjang</h1>{isError && <p className="mb-4 text-sm text-slate-500">Tidak dapat terhubung ke server.</p>}{isLoading ? <p className="text-sm text-slate-400">Memuat keranjang...</p> : items.length === 0 ? <p className="text-sm text-slate-400">Keranjang masih kosong.</p> : <><div className="mb-6">{items.map((item) => <CartItem key={item.id} item={item} />)}</div><CartSummary totalItems={cart?.totalItems ?? 0} totalPrice={cart?.totalPrice ?? 0} /></>}</div>; }
