import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { stockService } from "../services/stock.service";
import type { StockHistoryFilters } from "../types/stock.types";

export function useStockHistory(filters?: StockHistoryFilters) {
  return useQuery({
    queryKey: queryKeys.stock.history(filters as Record<string, unknown> | undefined),
    queryFn: () => stockService.getHistory(filters),
  });
}
