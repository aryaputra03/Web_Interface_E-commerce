import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { cartService } from "../services/cart.service";
import { useCartStore } from "../store/cartStore";

const EMPTY_CART = { items: [], totalItems: 0, totalPrice: 0 };

export function useCart() {
  const setCart = useCartStore((state) => state.setCart);
  const query = useQuery({ queryKey: queryKeys.cart.current, queryFn: async () => (await cartService.getCart()).data ?? EMPTY_CART });
  useEffect(() => { if (query.data) setCart(query.data); }, [query.data, setCart]);
  return query;
}
