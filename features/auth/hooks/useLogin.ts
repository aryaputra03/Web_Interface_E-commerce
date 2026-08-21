import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "../services/auth.service";
import { useAuthStore } from "../store/authStore";
import type { LoginPayload } from "../types/auth.types";

export function useLogin() {
  const router = useRouter();
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (response) => {
      if (!response.data) return;
      const { user, accessToken, refreshToken } = response.data;
      setSession({ user, accessToken, refreshToken });
      router.push("/admin/dashboard");
    },
  });
}
