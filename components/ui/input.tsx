import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-[var(--depths)]"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-11 w-full rounded-xl border bg-white/85 px-3.5 text-sm shadow-sm",
            "text-[var(--ink)] placeholder:text-[var(--muted-ink)]",
            "outline-none transition-all duration-200",
            "focus:ring-2 focus:ring-offset-0",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-100"
              : "border-[var(--mist)] focus:border-[var(--horizon)] focus:ring-[var(--breeze)]",
            "disabled:cursor-not-allowed disabled:bg-[var(--breeze)]",
            className,
          )}
          aria-invalid={!!error}
          {...props}
        />

        {error ? (
          <p className="text-xs text-red-600">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
