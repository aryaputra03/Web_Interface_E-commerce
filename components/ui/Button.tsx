import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "ghost"
  | "outline";

type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-500",
  secondary:
    "bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-400",
  success:
    "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  warning: "bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-400",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-400",
  outline:
    "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-400",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium",
        "transition-colors duration-150",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}

      {children}
    </button>
  );
}
