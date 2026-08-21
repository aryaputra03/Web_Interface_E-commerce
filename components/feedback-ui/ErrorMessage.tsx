import { cn } from "@/lib/utils";

interface ErrorMessageProps {
  message?: string;
  className?: string;
}

export function ErrorMessage({
  message = "Tidak dapat terhubung ke server. Silakan coba lagi.",
  className,
}: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-lg border border-red-200 bg-red-50 px-4 py-3",
        "text-sm text-red-700",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold text-red-600"
          aria-hidden="true"
        >
          !
        </span>

        <div>
          <p className="font-medium">Terjadi kesalahan</p>
          <p className="mt-1 text-red-600">{message}</p>
        </div>
      </div>
    </div>
  );
}
