import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { stockService } from "../services/stock.service";

export function useLowStock() {
  return useQuery({
    queryKey: queryKeys.stock.lowStock,
    queryFn: () => stockService.getLowStock(),
  });
}
