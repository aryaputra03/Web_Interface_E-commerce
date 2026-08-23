import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { orderService } from "../services/order.service";
export function useCancelOrder() { const queryClient = useQueryClient(); return useMutation({ mutationFn: (id: string) => orderService.cancel(id), onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.orders.all }) }); }
