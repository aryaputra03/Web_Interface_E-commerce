import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "../services/auth.service";
import type { RegisterPayload } from "../types/auth.types";

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: () => {
      // Registrasi tidak otomatis login — arahkan ke /login sesuai kontrak
      router.push("/login?registered=1");
    },
  });
}
