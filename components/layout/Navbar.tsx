"use client";

import Link from "next/link";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useCart } from "@/features/cart/hooks/useCart";
import { useCartStore } from "@/features/cart/store/cartStore";

export function Navbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const totalItems = useCartStore((state) => state.totalItems);
  useCart();
  return <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4"><Link href="/" className="text-lg font-semibold">Kasir Pintar</Link><nav className="flex items-center gap-4 text-sm"><Link href="/cart" className="relative text-slate-600 hover:text-slate-900">Keranjang{totalItems > 0 && <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-medium text-white">{totalItems}</span>}</Link>{isAuthenticated ? <Link href="/profile/orders" className="text-slate-600 hover:text-slate-900">{user?.name ?? "Profil"}</Link> : <Link href="/login" className="text-slate-600 hover:text-slate-900">Masuk</Link>}</nav></div></header>;
}
