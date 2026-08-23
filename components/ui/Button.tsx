import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  isLoading = false,
  disabled = false,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;
  const variants = {
    primary: "bg-[var(--depths)] text-white shadow-[0_8px_18px_rgba(64,83,128,0.22)] hover:bg-[var(--twilight)]",
    secondary: "bg-[var(--breeze)] text-[var(--depths)] hover:bg-[var(--drift)]",
    ghost: "bg-transparent text-[var(--depths)] hover:bg-[var(--breeze)]",
    danger: "bg-rose-600 text-white shadow-[0_8px_18px_rgba(225,29,72,0.18)] hover:bg-rose-700",
  };
  const sizes = { sm: "h-9 px-3 text-xs", md: "h-10 px-4 text-sm", lg: "h-12 px-5 text-base" };

  return (
    <button
      {...props}
      disabled={isDisabled}
      aria-busy={isLoading}
      className={cn(
        // Base
        "inline-flex items-center justify-center gap-2",
        "rounded-xl font-semibold",
        "transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0",
        sizes[size],
        variants[variant],

        // Focus
        "focus:outline-none focus:ring-2",
        "focus:ring-[var(--horizon)] focus:ring-offset-2",

        // Disabled
        "disabled:cursor-not-allowed",
        "disabled:bg-[var(--mist)]",
        "disabled:text-[var(--muted-ink)]",
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
