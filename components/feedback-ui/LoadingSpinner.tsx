import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

const sizes = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-4",
};

export function LoadingSpinner({
  size = "md",
  text,
  className,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn("flex items-center justify-center gap-3", className)}
      role="status"
      aria-live="polite"
    >
      <span
        className={cn(
          "animate-spin rounded-full border-[var(--mist)] border-t-[var(--twilight)]",
          sizes[size],
        )}
        aria-hidden="true"
      />

      {text && <span className="text-sm text-[var(--muted-ink)]">{text}</span>}

      <span className="sr-only">Loading...</span>
    </div>
  );
}
