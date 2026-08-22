export type DeviceScanMode = "restock" | "buy";
export type DeviceScanStatus = "matched" | "unmatched";

export interface DeviceScan {
  id: string;
  deviceId: string;
  mode: DeviceScanMode;
  barcode: string;
  status: DeviceScanStatus;
  productId?: string | null;
  receivedAt: string;
}
