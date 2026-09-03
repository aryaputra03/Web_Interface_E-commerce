import { axiosInstance } from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";
import type { DeviceScan, MapProductPayload } from "../types/deviceScan.types";

export const deviceScanService = {
  async getAll() {
    const { data } =
      await axiosInstance.get<ApiResponse<DeviceScan[]>>("/device/scans");
    return data;
  },
  async mapProduct(id: string, payload: MapProductPayload) {
    const { data } = await axiosInstance.patch<ApiResponse<DeviceScan>>(
      `/device/scans/${id}/map-product`,
      payload,
    );
    return data;
  },
};
