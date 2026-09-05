"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useAuthStore } from "@/features/auth/store/authStore";
import { NotificationBell } from "@/features/notifications/components/NotificationBell";
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
  const user = useAuthStore((state) => state.user);
  const logoutMutation = useLogout();

  return (
    <aside className="flex min-h-screen w-60 shrink-0 flex-col border-r border-line-strong bg-paper-raised">
      <div className="flex items-center justify-between border-b border-line px-4 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-till font-mono text-xs font-semibold text-paper">
            K
          </span>
          <div>
            <p className="text-sm font-semibold leading-tight text-ink">
              Kasir Pintar
            </p>
            <p className="text-xs leading-tight text-ink-muted">Panel Admin</p>
          </div>
        </div>
        <NotificationBell />
      </div>

      <nav className="flex-1 space-y-0.5 px-2 py-3">
        {MENU_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-md border-l-2 px-3 py-2 text-sm transition-colors",
                isActive
                  ? "border-till bg-till-tint font-medium text-till-dark"
                  : "border-transparent text-ink-muted hover:border-line-strong hover:bg-paper hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-line px-4 py-4">
        {user && (
          <div className="mb-3">
            <p className="truncate text-sm font-medium text-ink">{user.name}</p>
            <p className="truncate text-xs text-ink-muted">{user.email}</p>
          </div>
        )}
        <button
          type="button"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
          className="w-full rounded-md px-2 py-1.5 text-left text-sm text-ink-muted transition-colors hover:bg-brick-tint hover:text-brick disabled:opacity-50"
        >
          {logoutMutation.isPending ? "Keluar..." : "Keluar"}
        </button>
      </div>
    </aside>
  );
}
