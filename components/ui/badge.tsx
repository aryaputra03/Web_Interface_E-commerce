import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-till-tint text-ink-muted",
  success: "bg-till-tint text-till-dark",
  warning: "bg-brass-tint text-brass-dark",
  danger: "bg-brick-tint text-brick",
  info: "bg-till-tint text-till-dark",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5",
        "font-mono text-xs font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
