import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { orderService } from "../services/order.service";
export function useOrders() { return useQuery({ queryKey: queryKeys.orders.all, queryFn: async () => (await orderService.getAll()).data ?? [] }); }
