"use client";

import { useAuthGuard } from "@/features/auth/hooks/useAuthGuard";

export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isReady, isChecking } = useAuthGuard();

  if (isChecking) {
    return (
      <p className="mx-auto max-w-2xl px-4 py-8 text-sm text-slate-400">
        Memuat...
      </p>
    );
  }

  if (!isReady) return null;

  return <>{children}</>;
}
