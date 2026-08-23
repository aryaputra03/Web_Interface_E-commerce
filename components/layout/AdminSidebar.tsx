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
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-[linear-gradient(155deg,var(--depths),var(--twilight))] text-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-5">
        <div><span className="text-lg font-bold tracking-tight">Kasir Pintar</span><p className="text-xs text-[var(--breeze)]">Panel Admin</p></div>
        <NotificationBell />
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          return <Link key={item.href} href={item.href} className={cn("block rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200", isActive ? "bg-white text-[var(--twilight)] shadow-md" : "text-[var(--breeze)] hover:translate-x-1 hover:bg-white/10 hover:text-white")}>{item.label}</Link>;
        })}
      </nav>
      <div className="border-t border-white/10 px-4 py-4">
        {user && <div className="mb-3"><p className="truncate text-sm font-semibold">{user.name}</p><p className="truncate text-xs text-[var(--mist)]">{user.email}</p></div>}
        <button type="button" onClick={() => logoutMutation.mutate()} disabled={logoutMutation.isPending} className="w-full rounded-lg px-2 py-2 text-left text-sm text-[var(--breeze)] transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50">{logoutMutation.isPending ? "Keluar..." : "Keluar"}</button>
      </div>
    </aside>
  );
}
