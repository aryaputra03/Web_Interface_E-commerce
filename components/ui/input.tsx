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
            className="block text-sm font-medium text-ink"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-11 w-full rounded-md border bg-paper-raised px-3.5 text-sm",
            "text-ink placeholder:text-ink-muted/70",
            "outline-none transition-colors duration-150",
            "focus:ring-2 focus:ring-offset-0",
            error
              ? "border-brick focus:border-brick focus:ring-brick-tint"
              : "border-line-strong focus:border-till focus:ring-till-tint",
            "disabled:cursor-not-allowed disabled:bg-till-tint disabled:text-ink-muted",
            className,
          )}
          aria-invalid={!!error}
          {...props}
        />

        {error ? (
          <p className="text-xs text-brick">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-ink-muted">{helperText}</p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
