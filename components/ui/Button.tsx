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
    primary: "bg-till text-paper hover:bg-till-dark",
    secondary:
      "bg-transparent text-ink border border-line-strong hover:border-ink hover:bg-till-tint",
    ghost: "bg-transparent text-ink-muted hover:text-ink hover:bg-till-tint",
    danger: "bg-brick text-paper hover:bg-brick/90",
  };
  const sizes = {
    sm: "h-9 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-5 text-base",
  };

  return (
    <button
      {...props}
      disabled={isDisabled}
      aria-busy={isLoading}
      className={cn(
        "inline-flex items-center justify-center gap-2",
        "rounded-md font-medium",
        "transition-colors duration-150 ease-out",
        sizes[size],
        variants[variant],
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-till focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
        "disabled:cursor-not-allowed disabled:opacity-45",
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
