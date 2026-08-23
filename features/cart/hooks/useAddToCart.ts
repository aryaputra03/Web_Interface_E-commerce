import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { cartService } from "../services/cart.service";

export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) => cartService.addItem(productId, quantity), onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.cart.current }) });
}
