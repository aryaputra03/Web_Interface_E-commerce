import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { cartService } from "../services/cart.service";

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) => cartService.updateItem(itemId, quantity), onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.cart.current }) });
}
