"use client";

import { ErrorMessage } from "@/components/feedback-ui/ErrorMessage";
import { formatDate } from "@/lib/utils";
import type { Device } from "../types/device.types";
import { DeviceStatusToggle } from "./DeviceStatusToggle";

interface DeviceTableProps { devices: Device[]; isLoading: boolean; isError: boolean; onRegenerateKey: (device: Device) => void; }

export function DeviceTable({ devices, isLoading, isError, onRegenerateKey }: DeviceTableProps) {
  if (isError) return <ErrorMessage message="Tidak dapat terhubung ke server." />;
  if (isLoading) return <div className="animate-pulse space-y-2">{Array.from({ length: 4 }, (_, index) => <div key={index} className="h-10 rounded bg-slate-100" />)}</div>;
  if (devices.length === 0) return <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-400">Belum ada device terdaftar.</div>;
  return <div className="overflow-x-auto rounded-lg border border-slate-200"><table className="min-w-full divide-y divide-slate-200 text-sm"><thead className="bg-slate-50"><tr><th className="px-4 py-2 text-left font-medium text-slate-500">Nama</th><th className="px-4 py-2 text-left font-medium text-slate-500">Device ID</th><th className="px-4 py-2 text-left font-medium text-slate-500">Status</th><th className="px-4 py-2 text-left font-medium text-slate-500">Terakhir Terlihat</th><th className="px-4 py-2 text-right font-medium text-slate-500">Aksi</th></tr></thead><tbody className="divide-y divide-slate-100 bg-white">{devices.map((device) => <tr key={device.id}><td className="px-4 py-2">{device.name}</td><td className="px-4 py-2 font-mono text-xs">{device.deviceId}</td><td className="px-4 py-2"><div className="flex items-center gap-2"><DeviceStatusToggle device={device} /><span className="text-xs text-slate-500">{device.isActive ? "Aktif" : "Nonaktif"}</span></div></td><td className="px-4 py-2 text-slate-500">{device.lastSeenAt ? formatDate(device.lastSeenAt) : "-"}</td><td className="px-4 py-2 text-right"><button type="button" onClick={() => onRegenerateKey(device)} className="text-sm text-blue-600 hover:underline">Regenerate Key</button></td></tr>)}</tbody></table></div>;
}
