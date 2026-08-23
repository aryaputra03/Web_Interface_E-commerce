import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { orderService } from "../services/order.service";
import type { CreateOrderPayload } from "../types/order.types";
export function useCreateOrder() { const queryClient = useQueryClient(); return useMutation({ mutationFn: (payload: CreateOrderPayload) => orderService.create(payload), onSuccess: () => { queryClient.invalidateQueries({ queryKey: queryKeys.orders.all }); queryClient.invalidateQueries({ queryKey: queryKeys.cart.current }); } }); }
