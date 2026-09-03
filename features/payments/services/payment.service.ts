import { axiosInstance } from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";

export interface PaymentData {
  id: string;
  orderId: string;
  status: "pending" | "success" | "failed";
  method?: string;
  amount: number;
}

interface SimulatePaymentResponseData {
  payment: PaymentData;
  order: { id: string; status: string };
}

export const paymentService = {
  async simulate(paymentId: string, result: "success" | "failed" = "success") {
    const { data } = await axiosInstance.post<
      ApiResponse<SimulatePaymentResponseData>
    >(`/payments/${paymentId}/simulate`, { result });
    return data;
  },
};
