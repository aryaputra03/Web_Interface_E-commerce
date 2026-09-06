import { axiosInstance } from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";
import type { DeviceScan, MapProductPayload } from "../types/deviceScan.types";

interface DeviceScanListData {
  scans: DeviceScan[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const deviceScanService = {
  async getAll() {
    const { data } =
      await axiosInstance.get<ApiResponse<DeviceScanListData>>("/device/scans");
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
