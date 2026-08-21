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
            className="block text-sm font-medium text-slate-700"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-10 w-full rounded-lg border bg-white px-3 text-sm",
            "text-slate-900 placeholder:text-slate-400",
            "outline-none transition",
            "focus:ring-2 focus:ring-offset-0",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-100"
              : "border-slate-300 focus:border-slate-500 focus:ring-slate-100",
            "disabled:cursor-not-allowed disabled:bg-slate-100",
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
