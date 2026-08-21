"use client";

import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { getQueryClient } from "@/lib/query-client";
import { ToastProvider } from "@/components/ui/Toast";

import "@/lib/axios-interceptors";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>{children}</ToastProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
