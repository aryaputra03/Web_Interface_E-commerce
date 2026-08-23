import { create } from "zustand";
import type { Cart, CartItem } from "../types/cart.types";

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  setCart: (cart: Cart) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [], totalItems: 0, totalPrice: 0,
  setCart: (cart) => set({ items: cart.items, totalItems: cart.totalItems, totalPrice: cart.totalPrice }),
  clear: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
}));
