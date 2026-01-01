"use client";

import AccessibilityControls from "@/components/AccessibilityControls";
import { cn } from "@/lib/utils";

type AccessibilityPanelProps = {
  className?: string;
  compact?: boolean;
  label?: string;
};

export default function AccessibilityPanel({
  className,
  compact = false,
  label = "Accessibility",
}: AccessibilityPanelProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {!compact ? (
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-titan-text-muted">
          {label}
        </span>
      ) : null}
      <AccessibilityControls className={compact ? "justify-end" : "justify-start"} />
    </div>
  );
}
