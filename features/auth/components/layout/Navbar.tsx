"use client";

import Link from "next/link";
import { useAuthStore } from "@/features/auth/store/authStore";

export function Navbar() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold">
          Kasir Pintar
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          {/* Badge jumlah item keranjang diisi di Fase 11 (Cart) */}
          <Link href="/cart" className="text-gray-600 hover:text-gray-900">
            Keranjang
          </Link>

          {isAuthenticated ? (
            <Link href="/profile" className="text-gray-600 hover:text-gray-900">
              {user?.name ?? "Profil"}
            </Link>
          ) : (
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Masuk
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
