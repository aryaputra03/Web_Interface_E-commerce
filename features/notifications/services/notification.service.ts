import { axiosInstance } from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";
import type { Notification } from "../types/notification.types";

interface NotificationListData {
  notifications: Notification[];
  unreadCount: number;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const notificationService = {
  async getAll() {
    const { data } =
      await axiosInstance.get<ApiResponse<NotificationListData>>(
        "/notifications",
      );
    return data;
  },

  async markAsRead(id: string) {
    const { data } = await axiosInstance.patch<ApiResponse<Notification>>(
      `/notifications/${id}/read`,
    );
    return data;
  },

  async markAllAsRead() {
    const { data } = await axiosInstance.patch<ApiResponse<null>>(
      "/notifications/read-all",
    );
    return data;
  },
};
