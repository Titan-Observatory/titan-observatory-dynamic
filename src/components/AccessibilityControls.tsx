"use client";

import AnimationToggle from "@/components/AnimationToggle";
import TextSizeToggle from "@/components/TextSizeToggle";
import { cn } from "@/lib/utils";

type AccessibilityControlsProps = {
  className?: string;
};

export default function AccessibilityControls({ className }: AccessibilityControlsProps) {
  return (
    <div
      className={cn("grid gap-3 md:w-[320px]", className)}
      role="group"
      aria-label="Accessibility settings"
    >
      <TextSizeToggle />
      <AnimationToggle />
    </div>
  );
}
