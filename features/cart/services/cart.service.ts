import { axiosInstance } from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";
import type { Cart } from "../types/cart.types";

export const cartService = {
  async getCart() { const { data } = await axiosInstance.get<ApiResponse<Cart>>("/cart"); return data; },
  async addItem(productId: string, quantity: number) { const { data } = await axiosInstance.post<ApiResponse<Cart>>("/cart", { productId, quantity }); return data; },
  async updateItem(itemId: string, quantity: number) { const { data } = await axiosInstance.patch<ApiResponse<Cart>>(`/cart/${itemId}`, { quantity }); return data; },
  async removeItem(itemId: string) { const { data } = await axiosInstance.delete<ApiResponse<Cart>>(`/cart/${itemId}`); return data; },
};
