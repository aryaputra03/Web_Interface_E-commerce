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
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-5">
        <div><span className="text-lg font-semibold">Kasir Pintar</span><p className="text-xs text-slate-400">Panel Admin</p></div>
        <NotificationBell />
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          return <Link key={item.href} href={item.href} className={cn("block rounded-md px-3 py-2 text-sm font-medium transition-colors", isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900")}>{item.label}</Link>;
        })}
      </nav>
      <div className="border-t border-slate-200 px-4 py-4">
        {user && <div className="mb-3"><p className="truncate text-sm font-medium">{user.name}</p><p className="truncate text-xs text-slate-400">{user.email}</p></div>}
        <button type="button" onClick={() => logoutMutation.mutate()} disabled={logoutMutation.isPending} className="w-full text-left text-sm text-red-600 hover:text-red-700 disabled:opacity-50">{logoutMutation.isPending ? "Keluar..." : "Keluar"}</button>
      </div>
    </aside>
  );
}
