import { axiosInstance } from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";
import type { Notification } from "../types/notification.types";

export const notificationService = {
  async getAll() {
    const { data } = await axiosInstance.get<ApiResponse<Notification[]>>("/notifications");
    return data;
  },

  async markAsRead(id: string) {
    const { data } = await axiosInstance.patch<ApiResponse<Notification>>(`/notifications/${id}/read`);
    return data;
  },

  async markAllAsRead() {
    const { data } = await axiosInstance.patch<ApiResponse<null>>("/notifications/read-all");
    return data;
  },
};
