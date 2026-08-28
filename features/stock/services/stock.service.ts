import { axiosInstance } from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";
import type { LowStockItem, StockHistoryEntry, StockHistoryFilters } from "../types/stock.types";

type CollectionData<T> = T[] | {
  items?: T[];
  entries?: T[];
  history?: T[];
  stockHistory?: T[];
  products?: T[];
  lowStock?: T[];
  lowStockProducts?: T[];
};

function getCollection<T>(data: CollectionData<T> | undefined, keys: string[]): T[] {
  if (Array.isArray(data)) return data;
  if (!data) return [];

  for (const key of keys) {
    const value = data[key as keyof typeof data];
    if (Array.isArray(value)) return value;
  }

  return [];
}

export const stockService = {
  async getHistory(filters?: StockHistoryFilters) {
    const { data } = await axiosInstance.get<ApiResponse<CollectionData<StockHistoryEntry>>>("/stock/history", { params: filters });
    return getCollection(data.data, ["entries", "history", "stockHistory", "items"]);
  },

  async getLowStock() {
    const { data } = await axiosInstance.get<ApiResponse<CollectionData<LowStockItem>>>("/stock/low-stock");
    return getCollection(data.data, ["lowStock", "lowStockProducts", "products", "items"]);
  },
};
