"use client";

import { useEffect } from "react";

import { useToast } from "@/components/ui/Toast";
import { registerToastHandler } from "@/lib/toast-bridge";

export function ToastBridge() {
  const { toast } = useToast();

  useEffect(() => {
    registerToastHandler(toast);

    return () => registerToastHandler(null);
  }, [toast]);

  return null;
}
