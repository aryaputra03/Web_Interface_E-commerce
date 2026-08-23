import { axiosInstance } from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";
import type { CreateOrderPayload, Order } from "../types/order.types";
export const orderService = {
  async create(payload: CreateOrderPayload) { const { data } = await axiosInstance.post<ApiResponse<Order>>("/orders", payload); return data; },
  async getAll() { const { data } = await axiosInstance.get<ApiResponse<Order[]>>("/orders"); return data; },
  async cancel(id: string) { const { data } = await axiosInstance.post<ApiResponse<Order>>(`/orders/${id}/cancel`); return data; },
};
