"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { cn } from "@/lib/utils";

interface MenuItem {
  label: string;
  href: string;
}

const MENU_ITEMS: MenuItem[] = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Produk", href: "/admin/products" },
  { label: "Kasir Offline", href: "/admin/pos" },
  { label: "Log Scan Device", href: "/admin/scans" },
  { label: "Manajemen Device", href: "/admin/devices" },
  { label: "Riwayat Stok", href: "/admin/history" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const logoutMutation = useLogout();

  return (
    <aside className="w-64 shrink-0 min-h-screen border-r border-gray-200 bg-white flex flex-col">
      <div className="px-4 py-5 border-b border-gray-200">
        <span className="text-lg font-semibold">Kasir Pintar</span>
        <p className="text-xs text-gray-400">Panel Admin</p>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {MENU_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 px-4 py-4">
        {user && (
          <div className="mb-3">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
        )}
        <button
          type="button"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
          className="w-full text-left text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
        >
          {logoutMutation.isPending ? "Keluar..." : "Keluar"}
        </button>
      </div>
    </aside>
  );
}
