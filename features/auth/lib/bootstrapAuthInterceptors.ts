import { registerAuthHandlers } from "@/lib/axios-interceptors";
import { authService } from "../services/auth.service";
import { getStoredRefreshToken, useAuthStore } from "../store/authStore";

export function bootstrapAuthInterceptors() {
  registerAuthHandlers({
    getAccessToken: () => useAuthStore.getState().accessToken,

    refreshAccessToken: async () => {
      const refreshToken =
        useAuthStore.getState().refreshToken ?? getStoredRefreshToken();
      if (!refreshToken) return null;

      try {
        const response = await authService.refresh(refreshToken);
        const newAccessToken = response.data?.accessToken;
        if (!newAccessToken) return null;

        useAuthStore.getState().updateAccessToken(newAccessToken);
        return newAccessToken;
      } catch {
        return null;
      }
    },

    onRefreshFailed: () => {
      useAuthStore.getState().clearSession();
      if (typeof window !== "undefined") {
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination
        window.location.href = "/login";
      }
    },
  });
}
