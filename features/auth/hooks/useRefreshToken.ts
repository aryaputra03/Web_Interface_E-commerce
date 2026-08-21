import { useCallback } from "react";
import { authService } from "../services/auth.service";
import { getStoredRefreshToken, useAuthStore } from "../store/authStore";

export function useRefreshToken() {
  const setSession = useAuthStore((s) => s.setSession);

  const silentRefresh = useCallback(async () => {
    const refreshToken = getStoredRefreshToken();
    if (!refreshToken) return false;

    try {
      const response = await authService.refresh(refreshToken);
      const newAccessToken = response.data?.accessToken;
      if (!newAccessToken) return false;

      // Response refresh belum tentu bawa data user → ambil ulang lewat /auth/me
      const meResponse = await authService.me();
      if (!meResponse.data) return false;

      setSession({
        user: meResponse.data,
        accessToken: newAccessToken,
        refreshToken: response.data?.refreshToken ?? refreshToken,
      });
      return true;
    } catch {
      return false;
    }
  }, [setSession]);

  return { silentRefresh };
}
