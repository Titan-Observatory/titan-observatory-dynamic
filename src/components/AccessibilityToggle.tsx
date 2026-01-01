"use client";

import * as Switch from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

type AccessibilityToggleProps = {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export default function AccessibilityToggle({
  id,
  label,
  checked,
  onCheckedChange,
}: AccessibilityToggleProps) {
  return (
    <div className="flex w-full items-center justify-between gap-4 rounded-2xl border border-titan-border/60 bg-titan-bg-alt/70 px-4 py-3">
      <div className="space-y-1">
        <label htmlFor={id} className="text-sm font-semibold text-titan-text-secondary">
          {label}
        </label>
      </div>
      <Switch.Root
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full border border-titan-border/70 bg-titan-bg-alt transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-titan-yellow",
          checked ? "bg-titan-yellow/40" : "bg-titan-bg-alt",
        )}
      >
        <Switch.Thumb
          className={cn(
            "block h-5 w-5 translate-x-0.5 rounded-full bg-titan-text-secondary shadow-sm transition-transform",
            checked ? "translate-x-[22px] bg-titan-yellow" : "bg-titan-text-muted",
          )}
        />
      </Switch.Root>
    </div>
  );
}
