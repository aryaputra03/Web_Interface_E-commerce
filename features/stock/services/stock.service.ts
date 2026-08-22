import { axiosInstance } from "@/lib/axios";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { LowStockItem, StockHistoryEntry, StockHistoryFilters } from "../types/stock.types";

export const stockService = {
  async getHistory(filters?: StockHistoryFilters) {
    const { data } = await axiosInstance.get<PaginatedResponse<StockHistoryEntry>>("/stock/history", { params: filters });
    return data;
  },

  async getLowStock() {
    const { data } = await axiosInstance.get<ApiResponse<LowStockItem[]>>("/stock/low-stock");
    return data;
  },
};
