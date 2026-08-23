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
      <h1 className="mb-2 text-2xl font-semibold">Terjadi kesalahan</h1>
      <p className="mb-6 max-w-sm text-sm text-gray-500">
        Tidak dapat terhubung ke server. Silakan coba lagi — kalau masih terjadi,
        hubungi admin.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Coba Lagi
      </button>
    </div>
  );
}
