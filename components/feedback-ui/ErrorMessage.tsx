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
        "animate-print-in rounded-md border border-brick/30 bg-brick-tint px-4 py-3",
        "text-sm text-brick",
        className,
      )}
    >
      <p className="font-medium">Terjadi kesalahan</p>
      <p className="mt-0.5">{message}</p>
    </div>
  );
}
