export type StockReferenceType = "order" | "manual" | "device_scan";

export interface StockHistoryEntry {
  id: string;
  productId:
    | { id: string; name: string; sku: string; barcode: string }
    | string;
  quantity: number;
  referenceType: StockReferenceType;
  note?: string;
  createdAt: string;
}

export interface StockHistoryFilters {
  referenceType?: StockReferenceType;
  productId?: string;
  page?: number;
  limit?: number;
}

export interface LowStockItem {
  productId: string;
  productName: string;
  stock: number;
  threshold: number;
}
