type ToastVariant = "info" | "error" | "success";
type ToastHandler = (message: string, variant?: ToastVariant) => void;

let toastHandler: ToastHandler | null = null;

export function registerToastHandler(handler: ToastHandler | null) {
  toastHandler = handler;
}

export function showToast(message: string, variant: ToastVariant = "info") {
  if (toastHandler) {
    toastHandler(message, variant);
  } else if (typeof window !== "undefined") {
    console.warn("[toast-bridge] Toast belum ter-register:", message);
  }
}
