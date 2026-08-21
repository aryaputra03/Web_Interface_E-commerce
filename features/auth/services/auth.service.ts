interface RefreshResponseData {
  accessToken: string;
  refreshToken?: string;
}

import { axiosInstance } from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";
import type {
  AuthResponseData,
  GoogleLoginPayload,
  LoginPayload,
  RegisterPayload,
  User,
} from "../types/auth.types";

export const authService = {
  async login(payload: LoginPayload) {
    const { data } = await axiosInstance.post<ApiResponse<AuthResponseData>>(
      "/auth/login",
      payload,
    );
    return data;
  },

  async register(payload: RegisterPayload) {
    const { data } = await axiosInstance.post<ApiResponse<AuthResponseData>>(
      "/auth/register",
      payload,
    );
    return data;
  },

  async loginWithGoogle(payload: GoogleLoginPayload) {
    const { data } = await axiosInstance.post<ApiResponse<AuthResponseData>>(
      "/auth/google",
      payload,
    );
    return data;
  },

  // Catatan (Dok. Kebutuhan Bab 4.3 poin 2): kontrak /auth/refresh belum menegaskan
  // sumber refresh token (cookie vs body) — FE berasumsi dikirim di body request.
  async refresh(refreshToken: string) {
    const { data } = await axiosInstance.post<ApiResponse<RefreshResponseData>>(
      "/auth/refresh",
      { refreshToken },
    );
    return data;
  },
  async logout() {
    const { data } =
      await axiosInstance.post<ApiResponse<null>>("/auth/logout");
    return data;
  },

  async me() {
    const { data } = await axiosInstance.get<ApiResponse<User>>("/auth/me");
    return data;
  },
};
