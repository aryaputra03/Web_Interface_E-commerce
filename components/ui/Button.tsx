import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function Button({
  className,
  isLoading = false,
  disabled = false,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      aria-busy={isLoading}
      className={cn(
        // Base
        "inline-flex items-center justify-center gap-2",
        "h-10 rounded-lg px-4",
        "text-sm font-medium",
        "transition-colors duration-150",

        // Primary
        "bg-slate-900 text-white",
        "hover:bg-slate-800",

        // Focus
        "focus:outline-none focus:ring-2",
        "focus:ring-slate-400 focus:ring-offset-2",

        // Disabled
        "disabled:cursor-not-allowed",
        "disabled:bg-slate-300",
        "disabled:text-slate-500",
        "disabled:opacity-100",

        className,
      )}
    >
      {isLoading ? (
        <>
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
          <span>Memproses...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
