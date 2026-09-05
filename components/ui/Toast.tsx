"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "warning" | "info";

interface ToastData {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number;
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = "info", duration = 3000) => {
      const id = `${Date.now()}-${Math.random()}`;

      setToasts((current) => [
        ...current,
        {
          id,
          message,
          variant,
          duration,
        },
      ]);
    },
    [],
  );

  const value = useMemo(
    () => ({
      toast: showToast,
    }),
    [showToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="fixed right-4 top-4 z-[100] flex w-full max-w-sm flex-col gap-3">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({
  toast,
  onClose,
}: {
  toast: ToastData;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, toast.duration);

    return () => clearTimeout(timer);
  }, [toast.duration, onClose]);

  const variants: Record<ToastVariant, string> = {
    success: "border-till/30 bg-till-tint text-till-dark",
    error: "border-brick/30 bg-brick-tint text-brick",
    warning: "border-brass/30 bg-brass-tint text-brass-dark",
    info: "border-line-strong bg-paper-raised text-ink",
  };

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start justify-between gap-4",
        "animate-print-in rounded-md border px-4 py-3",
        "text-sm font-medium",
        variants[toast.variant],
      )}
    >
      <span>{toast.message}</span>

      <button
        type="button"
        onClick={onClose}
        className="shrink-0 opacity-60 hover:opacity-100"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}
