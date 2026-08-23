import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { cartService } from "../services/cart.service";

export function useRemoveCartItem() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: (itemId: string) => cartService.removeItem(itemId), onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.cart.current }) });
}
