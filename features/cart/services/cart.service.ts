import { axiosInstance } from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";
import type { CartApiData } from "../types/cart.types";

export const cartService = {
  async getCart() {
    const { data } = await axiosInstance.get<ApiResponse<CartApiData>>("/cart");
    return data;
  },
  async addItem(productId: string, quantity: number) {
    const { data } = await axiosInstance.post<ApiResponse<CartApiData>>(
      `/cart/items/${productId}`,
      { quantity },
    );
    return data;
  },
  async updateItem(productId: string, quantity: number) {
    const { data } = await axiosInstance.patch<ApiResponse<CartApiData>>(
      `/cart/items/${productId}`,
      { quantity },
    );
    return data;
  },
  async removeItem(productId: string) {
    const { data } = await axiosInstance.delete<ApiResponse<CartApiData>>(
      `/cart/items/${productId}`,
    );
    return data;
  },
};
