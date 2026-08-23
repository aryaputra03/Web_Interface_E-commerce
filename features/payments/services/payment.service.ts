import { axiosInstance } from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";
interface SimulatePaymentResponseData { orderId: string; paymentStatus: "success" | "failed"; }
export const paymentService = { async simulate(orderId: string) { const { data } = await axiosInstance.post<ApiResponse<SimulatePaymentResponseData>>(`/payments/${orderId}/simulate`); return data; } };
