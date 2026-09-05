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
    <header className="sticky top-0 z-40 border-b border-line-strong bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2.5 text-ink">
          <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-till font-mono text-sm font-semibold text-paper">
            K
          </span>
          <span className="text-base font-semibold tracking-tight">
            Kasir Pintar
          </span>
        </Link>

        <nav className="flex items-center gap-5 text-sm sm:gap-6">
          <Link
            href="/feedback"
            className="text-ink-muted transition-colors hover:text-ink"
          >
            Feedback
          </Link>

          <Link
            href="/cart"
            className="relative text-ink-muted transition-colors hover:text-ink"
          >
            Keranjang
            {totalItems > 0 && (
              <span className="absolute -right-3.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brass px-1 font-mono text-[10px] font-semibold text-paper">
                {totalItems}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <Link
              href="/profile"
              className="max-w-28 truncate rounded-md border border-line-strong px-3 py-1.5 text-ink transition-colors hover:border-ink sm:max-w-none"
            >
              {user?.name ?? "Profil"}
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-till px-3.5 py-1.5 text-paper transition-colors hover:bg-till-dark"
            >
              Masuk
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
