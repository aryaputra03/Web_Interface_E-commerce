import { axiosInstance } from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";
import type {
  PosSession,
  CheckoutPayload,
  CheckoutResponseData,
} from "../types/posSession.types";

export const posSessionService = {
  getActive: () =>
    axiosInstance.get<ApiResponse<PosSession[]>>("/pos-sessions/active"),
  checkout: (id: string, payload: CheckoutPayload) =>
    axiosInstance.post<ApiResponse<CheckoutResponseData>>(
      `/pos-sessions/${id}/checkout`,
      payload,
    ),
  cancel: (id: string) =>
    axiosInstance.post<ApiResponse<null>>(`/pos-sessions/${id}/cancel`),
};
