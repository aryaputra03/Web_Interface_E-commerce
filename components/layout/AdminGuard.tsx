"use client";

import { useAuthGuard } from "@/features/auth/hooks/useAuthGuard";
import { LoadingSpinner } from "@/components/feedback-ui/LoadingSpinner";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isReady, isChecking } = useAuthGuard({ requiredRole: "admin" });

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isReady) return null; // sedang redirect ke /login

  return <>{children}</>;
}
