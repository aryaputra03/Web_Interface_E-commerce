import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export function Select({
  label,
  error,
  options,
  className,
  id,
  ...props
}: SelectProps) {
  const generatedId = React.useId();
  const selectId = id ?? generatedId;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-ink"
        >
          {label}
        </label>
      )}

      <select
        id={selectId}
        className={cn(
          "h-10 w-full rounded-md border bg-paper-raised px-3 text-sm",
          "text-ink outline-none transition-colors duration-150",
          "focus:ring-2 focus:ring-offset-0",
          error
            ? "border-brick focus:border-brick focus:ring-brick-tint"
            : "border-line-strong focus:border-till focus:ring-till-tint",
          "disabled:cursor-not-allowed disabled:bg-till-tint disabled:text-ink-muted",
          className,
        )}
        aria-invalid={!!error}
        {...props}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="text-xs text-brick">{error}</p>}
    </div>
  );
}
