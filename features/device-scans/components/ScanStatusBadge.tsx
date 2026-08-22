import { Badge } from "@/components/ui/Badge";
import type { ScanStatus } from "../types/deviceScan.types";

export interface ScanStatusBadgeProps {
  status: ScanStatus;
}

export function ScanStatusBadge({ status }: ScanStatusBadgeProps) {
  if (status === "matched") return <Badge color="green">Matched</Badge>;
  return <Badge color="yellow">Unmatched</Badge>;
}
