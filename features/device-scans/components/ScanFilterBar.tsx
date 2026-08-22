"use client";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import type {
  DeviceScanFilters,
  ScanMode,
  ScanStatus,
} from "../types/deviceScan.types";

export interface ScanFilterBarProps {
  filters: DeviceScanFilters;
  onChange: (filters: DeviceScanFilters) => void;
}

const STATUS_OPTIONS = [
  { value: "", label: "Semua status" },
  { value: "matched", label: "Matched" },
  { value: "unmatched", label: "Unmatched" },
];
const MODE_OPTIONS = [
  { value: "", label: "Semua mode" },
  { value: "buy", label: "Buy" },
  { value: "restock", label: "Restock" },
];

export function ScanFilterBar({ filters, onChange }: ScanFilterBarProps) {
  const update = (patch: Partial<DeviceScanFilters>) =>
    onChange({ ...filters, ...patch, page: 1 });
  const handleReset = () => onChange({ page: 1, limit: filters.limit });

  return (
    <div className="flex flex-wrap items-end gap-3">
      <Input
        label="Device ID"
        placeholder="mis. KASIR-01"
        value={filters.deviceId ?? ""}
        onChange={(e) => update({ deviceId: e.target.value || undefined })}
      />
      <Select
        label="Status"
        options={STATUS_OPTIONS}
        value={filters.status ?? ""}
        onChange={(e) =>
          update({
            status: (e.target.value || undefined) as ScanStatus | undefined,
          })
        }
      />
      <Select
        label="Mode"
        options={MODE_OPTIONS}
        value={filters.mode ?? ""}
        onChange={(e) =>
          update({
            mode: (e.target.value || undefined) as ScanMode | undefined,
          })
        }
      />
      <Input
        label="Dari tanggal"
        type="date"
        value={filters.dateFrom ?? ""}
        onChange={(e) => update({ dateFrom: e.target.value || undefined })}
      />
      <Input
        label="Sampai tanggal"
        type="date"
        value={filters.dateTo ?? ""}
        onChange={(e) => update({ dateTo: e.target.value || undefined })}
      />
      <Button type="button" variant="secondary" size="sm" onClick={handleReset}>
        Reset Filter
      </Button>
    </div>
  );
}
