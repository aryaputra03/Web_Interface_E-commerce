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
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="group flex items-center gap-2.5 text-[var(--depths)]">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--depths)] text-sm font-black text-white shadow-md transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-105">K</span>
          <span className="text-lg font-bold tracking-tight">Kasir Pintar</span>
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium sm:gap-5">
          <Link href="/feedback" className="text-[var(--muted-ink)] transition-colors hover:text-[var(--twilight)]">Feedback</Link>
          <Link href="/cart" className="relative text-[var(--muted-ink)] transition-colors hover:text-[var(--twilight)]">Keranjang{totalItems > 0 && <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--twilight)] px-1 text-[10px] font-bold text-white shadow-sm">{totalItems}</span>}</Link>
          {isAuthenticated ? <Link href="/profile" className="max-w-24 truncate rounded-lg bg-[var(--breeze)] px-2.5 py-1.5 text-[var(--depths)] transition-colors hover:bg-[var(--drift)] sm:max-w-none">{user?.name ?? "Profil"}</Link> : <Link href="/login" className="rounded-lg bg-[var(--depths)] px-3 py-1.5 text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[var(--twilight)]">Masuk</Link>}
        </nav>
      </div>
    </header>
  );
}
