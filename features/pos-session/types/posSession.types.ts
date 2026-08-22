export interface PosSessionItem {
  productId: string;
  name: string;
  priceSnapshot: number;
  quantity: number;
}

export type PosSessionStatus = "open" | "checked_out" | "cancelled";

export interface PosSession {
  id: string;
  deviceId: string;
  status: PosSessionStatus;
  items: PosSessionItem[];
  openedAt: string;
  lastScanAt: string;
}

export interface CheckoutPayload {
  voucherCode?: string | null;
}

export interface CheckoutResponseData {
  orderId: string;
  orderCode: string;
  total: number;
  paymentStatus: string;
}
