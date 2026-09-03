export type DeviceScanMode = "restock" | "buy";
export type DeviceScanStatus = "matched" | "unmatched";

// Alias — dipakai oleh beberapa komponen lama dengan penamaan berbeda
// untuk konsep yang sama persis.
export type ScanMode = DeviceScanMode;
export type ScanStatus = DeviceScanStatus;

export interface DeviceScan {
  id: string;
  deviceId: string;
  mode: DeviceScanMode;
  barcode: string;
  status: DeviceScanStatus;
  productId?: string | null;
  receivedAt: string;
}

export interface DeviceScanFilters {
  deviceId?: string;
  status?: DeviceScanStatus;
  mode?: DeviceScanMode;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

export interface MapProductPayload {
  productId: string;
}
