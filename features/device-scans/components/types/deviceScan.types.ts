export type ScanMode = "buy" | "restock";
export type ScanStatus = "matched" | "unmatched";

export interface DeviceScan {
  id: string;
  deviceId: string;
  mode: ScanMode;
  barcode: string;
  status: ScanStatus;
  productId?: string | null;
  receivedAt: string;
}

export interface DeviceScanFilters {
  deviceId?: string;
  status?: ScanStatus;
  mode?: ScanMode;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

export interface MapProductPayload {
  productId: string;
}
