import { axiosInstance } from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";
import type {
  Address,
  CreateAddressPayload,
  UpdateAddressPayload,
  UpdateProfilePayload,
  UserProfile,
} from "../types/user.types";

export const userService = {
  async getMe() {
    const { data } =
      await axiosInstance.get<ApiResponse<UserProfile>>("/users/me");
    return data;
  },

  async updateMe(payload: UpdateProfilePayload) {
    const { data } = await axiosInstance.patch<ApiResponse<UserProfile>>(
      "/users/me",
      payload,
    );
    return data;
  },

  async createAddress(payload: CreateAddressPayload) {
    const { data } = await axiosInstance.post<
      ApiResponse<{ addresses: Address[] }>
    >("/users/me/addresses", payload);
    return data;
  },

  async updateAddress(id: string, payload: UpdateAddressPayload) {
    const { data } = await axiosInstance.patch<
      ApiResponse<{ addresses: Address[] }>
    >(`/users/me/addresses/${id}`, payload);
    return data;
  },

  async deleteAddress(id: string) {
    const { data } = await axiosInstance.delete<
      ApiResponse<{ addresses: Address[] }>
    >(`/users/me/addresses/${id}`);
    return data;
  },
};
