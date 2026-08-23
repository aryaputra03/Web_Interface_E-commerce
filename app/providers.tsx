"use client";

import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { getQueryClient } from "@/lib/query-client";
import { ToastProvider } from "@/components/ui/Toast";
import { OfflineBanner } from "@/components/feedback-ui/OfflineBanner";
import { ToastBridge } from "@/components/feedback-ui/ToastBridge";

import { bootstrapAuthInterceptors } from "@/features/auth/lib/bootstrapAuthInterceptors";
import "@/lib/axios-interceptors";

bootstrapAuthInterceptors();

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <ToastBridge />
        <OfflineBanner />
        {children}
      </ToastProvider>

      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
