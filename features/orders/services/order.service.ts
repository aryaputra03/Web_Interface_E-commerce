import { axiosInstance } from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";
import type {
  CreateOrderPayload,
  CreateOrderResponseData,
  Order,
} from "../types/order.types";

interface OrderListData {
  orders: Order[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const orderService = {
  async create(payload: CreateOrderPayload) {
    const { data } = await axiosInstance.post<
      ApiResponse<CreateOrderResponseData>
    >("/orders", payload);
    return data;
  },
  async getAll() {
    const { data } =
      await axiosInstance.get<ApiResponse<OrderListData>>("/orders");
    return data;
  },
  async cancel(id: string) {
    const { data } = await axiosInstance.post<ApiResponse<Order>>(
      `/orders/${id}/cancel`,
    );
    return data;
  },
};
