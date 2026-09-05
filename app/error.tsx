"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-2 text-2xl font-semibold text-ink">
        Terjadi kesalahan
      </h1>
      <p className="mb-6 max-w-sm text-sm text-ink-muted">
        Tidak dapat terhubung ke server. Silakan coba lagi — kalau masih
        terjadi, hubungi admin.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-md bg-till px-4 py-2 text-sm font-medium text-paper hover:bg-till-dark"
      >
        Coba Lagi
      </button>
    </div>
  );
}
