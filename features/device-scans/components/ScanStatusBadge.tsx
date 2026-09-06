import { Badge } from "@/components/ui/badge";
import type { ScanStatus } from "../types/deviceScan.types";

export interface ScanStatusBadgeProps {
  status: ScanStatus;
}

export function ScanStatusBadge({ status }: ScanStatusBadgeProps) {
  if (status === "matched") return <Badge variant="success">Matched</Badge>;
  return <Badge variant="warning">Unmatched</Badge>;
}
