import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { cartService } from "../services/cart.service";
import { useCartStore } from "../store/cartStore";

const EMPTY_CART = { items: [], totalItems: 0, totalPrice: 0 };

export function useCart() {
  const setCart = useCartStore((state) => state.setCart);
  const query = useQuery({
    queryKey: queryKeys.cart.current,
    queryFn: async () => {
      const raw = (await cartService.getCart()).data;
      if (!raw) return EMPTY_CART;

      const items = raw.items.map((item) => ({
        id: item.productId,
        productId: item.productId,
        productName: item.name,
        productSlug: "",
        price: item.priceSnapshot,
        quantity: item.quantity,
        image: item.image ?? undefined,
      }));

      return {
        items,
        totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
        totalPrice: raw.subtotal,
      };
    },
  });
  useEffect(() => {
    if (query.data) setCart(query.data);
  }, [query.data, setCart]);
  return query;
}
