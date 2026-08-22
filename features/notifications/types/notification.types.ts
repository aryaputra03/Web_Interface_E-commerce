export type NotificationType = "unknown_barcode" | "stock_restored" | string;

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  meta?: {
    deviceScanId?: string;
    productId?: string;
    [key: string]: unknown;
  };
}
