"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn, formatRelativeTime } from "@/lib/utils";
import { useMarkAllAsRead } from "../hooks/useMarkAllAsRead";
import { useMarkAsRead } from "../hooks/useMarkAsRead";
import type { Notification } from "../types/notification.types";

interface NotificationDropdownProps {
  notifications: Notification[];
  isLoading: boolean;
  onClose: () => void;
}

export function NotificationDropdown({ notifications, isLoading, onClose }: NotificationDropdownProps) {
  const router = useRouter();
  const markAsReadMutation = useMarkAsRead();
  const markAllAsReadMutation = useMarkAllAsRead();
  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  function handleClickNotification(notification: Notification) {
    if (!notification.isRead) markAsReadMutation.mutate(notification.id);
    if (notification.type === "unknown_barcode") {
      router.push("/admin/scans?status=unmatched");
      onClose();
    }
  }

  return (
    <div className="absolute right-0 z-20 mt-2 w-80 rounded-lg border border-slate-200 bg-white shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <span className="text-sm font-medium">Notifikasi</span>
        {unreadCount > 0 && <button type="button" onClick={() => markAllAsReadMutation.mutate()} disabled={markAllAsReadMutation.isPending} className="text-xs text-blue-600 hover:underline disabled:opacity-50">Tandai semua dibaca</button>}
      </div>
      <div className="max-h-80 overflow-y-auto">
        {isLoading ? <div className="space-y-2 p-4">{Array.from({ length: 3 }, (_, index) => <div key={index} className="h-10 animate-pulse rounded bg-slate-100" />)}</div> : notifications.length === 0 ? <p className="p-6 text-center text-sm text-slate-400">Belum ada notifikasi.</p> : notifications.map((notification) => <button key={notification.id} type="button" onClick={() => handleClickNotification(notification)} className={cn("block w-full border-b border-slate-50 px-4 py-3 text-left transition-colors hover:bg-slate-50", !notification.isRead && "bg-blue-50/50")}>
          <div className="flex items-start gap-2">
            {!notification.isRead && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />}
            <div className="min-w-0"><p className="truncate text-sm font-medium">{notification.title}</p><p className="line-clamp-2 text-xs text-slate-500">{notification.message}</p><p className="mt-1 text-[11px] text-slate-400">{formatRelativeTime(notification.createdAt)}</p></div>
          </div>
        </button>)}
      </div>
      <div className="border-t border-slate-100 px-4 py-2 text-center"><Link href="/admin/scans" onClick={onClose} className="text-xs text-blue-600 hover:underline">Lihat Log Scan</Link></div>
    </div>
  );
}
