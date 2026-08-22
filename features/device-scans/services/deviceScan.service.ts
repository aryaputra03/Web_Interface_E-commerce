import { axiosInstance } from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";
import type { DeviceScan } from "../types/deviceScan.types";

export const deviceScanService = {
  async getAll() {
    const { data } =
      await axiosInstance.get<ApiResponse<DeviceScan[]>>("/device/scans");
    return data;
  },
};
