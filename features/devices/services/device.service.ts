import { axiosInstance } from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";
import type {
  Device,
  RegenerateKeyResponseData,
  RegisterDevicePayload,
  RegisterDeviceResponseData,
} from "../types/device.types";

export const deviceService = {
  async getAll() {
    const { data } = await axiosInstance.get<ApiResponse<Device[]>>("/devices");
    return data;
  },
  async register(payload: RegisterDevicePayload) {
    const { data } = await axiosInstance.post<ApiResponse<RegisterDeviceResponseData>>("/devices", payload);
    return data;
  },
  async toggleStatus(id: string, isActive: boolean) {
    const { data } = await axiosInstance.patch<ApiResponse<Device>>(`/devices/${id}/status`, { isActive });
    return data;
  },
  async regenerateKey(id: string) {
    const { data } = await axiosInstance.post<ApiResponse<RegenerateKeyResponseData>>(`/devices/${id}/regenerate-key`);
    return data;
  },
};
