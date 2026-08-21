import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = "No data found",
  description = "There is no data to display.",
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-48 flex-col items-center justify-center",
        "rounded-lg border border-dashed border-slate-300",
        "bg-slate-50 px-6 py-10 text-center",
        className,
      )}
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
        <span className="text-lg text-slate-400">∅</span>
      </div>

      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>

      <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
