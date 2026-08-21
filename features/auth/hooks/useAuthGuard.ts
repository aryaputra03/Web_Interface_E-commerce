"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";
import { useRefreshToken } from "./useRefreshToken";

interface UseAuthGuardOptions {
  requiredRole?: "admin" | "customer";
  redirectTo?: string;
}

export function useAuthGuard(options: UseAuthGuardOptions = {}) {
  const { requiredRole, redirectTo = "/login" } = options;
  const router = useRouter();
  const { silentRefresh } = useRefreshToken();

  const accessToken = useAuthStore((s) => s.accessToken);
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const clearSession = useAuthStore((s) => s.clearSession);
  const setHydrating = useAuthStore((s) => s.setHydrating);

  const [isChecking, setIsChecking] = useState(true);

  // Cek sekali di mount: kalau accessToken kosong (mis. reload halaman), coba silent refresh
  useEffect(() => {
    let isMounted = true;

    async function verify() {
      if (accessToken) {
        setHydrating(false);
        if (isMounted) setIsChecking(false);
        return;
      }

      const success = await silentRefresh();
      if (!isMounted) return;

      if (!success) {
        clearSession();
        router.replace(redirectTo);
        return;
      }
      setIsChecking(false);
    }

    verify();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redirect kalau ternyata belum login / role tidak cocok
  useEffect(() => {
    if (isChecking) return;

    if (!isAuthenticated) {
      router.replace(redirectTo);
      return;
    }
    if (requiredRole && user?.role !== requiredRole) {
      router.replace("/");
    }
  }, [isChecking, isAuthenticated, user, requiredRole, redirectTo, router]);

  return {
    isReady: !isChecking && isAuthenticated,
    isChecking,
    user,
  };
}
