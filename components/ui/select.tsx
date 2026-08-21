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
          className="block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <select
        id={selectId}
        className={cn(
          "h-10 w-full rounded-lg border bg-white px-3 text-sm",
          "text-slate-900 outline-none",
          "focus:ring-2 focus:ring-slate-100",
          error
            ? "border-red-500 focus:border-red-500"
            : "border-slate-300 focus:border-slate-500",
          "disabled:cursor-not-allowed disabled:bg-slate-100",
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

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
