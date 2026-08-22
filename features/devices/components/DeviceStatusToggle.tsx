"use client";

import { cn } from "@/lib/utils";
import { useToggleDeviceStatus } from "../hooks/useToggleDeviceStatus";
import type { Device } from "../types/device.types";

interface DeviceStatusToggleProps {
  device: Device;
}

export function DeviceStatusToggle({ device }: DeviceStatusToggleProps) {
  const toggleMutation = useToggleDeviceStatus();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={device.isActive}
      aria-label={`Status ${device.name}`}
      disabled={toggleMutation.isPending}
      onClick={() => toggleMutation.mutate({ id: device.id, isActive: !device.isActive })}
      className={cn("relative inline-flex h-5 w-9 items-center rounded-full transition-colors disabled:opacity-50", device.isActive ? "bg-green-500" : "bg-slate-300")}
    >
      <span className={cn("inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform", device.isActive ? "translate-x-5" : "translate-x-1")} />
    </button>
  );
}
