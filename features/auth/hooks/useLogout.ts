import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "../services/auth.service";
import { useAuthStore } from "../store/authStore";

export function useLogout() {
  const router = useRouter();
  const clearSession = useAuthStore((s) => s.clearSession);

  return useMutation({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      // Bersihkan state lokal walau request logout gagal (token expired dsb)
      clearSession();
      router.push("/login");
    },
  });
}
