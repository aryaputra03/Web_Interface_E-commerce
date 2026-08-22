import { axiosInstance } from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";
import type { Device } from "../types/device.types";

export const deviceService = {
  async getAll() {
    const { data } = await axiosInstance.get<ApiResponse<Device[]>>("/devices");
    return data;
  },
};
