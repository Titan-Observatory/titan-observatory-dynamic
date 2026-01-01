"use client";

import { useState } from "react";
import { IconAccessible } from "@tabler/icons-react";

import AccessibilityPanel from "@/components/AccessibilityPanel";

export default function FloatingAccessibilityControls() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 flex items-end justify-between md:hidden">
      <div className="flex flex-col items-start gap-3">
        {open ? (
          <div
            id="accessibility-controls-panel"
            className="rounded-2xl border border-titan-border/60 bg-titan-bg/95 p-3 shadow-lg backdrop-blur"
          >
            <AccessibilityPanel compact />
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => setOpen(prev => !prev)}
          aria-expanded={open}
          aria-controls="accessibility-controls-panel"
          aria-label="Accessibility settings"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-titan-border/60 bg-titan-bg/90 text-titan-text-secondary shadow-lg transition hover:border-titan-yellow/70 hover:text-titan-yellow"
        >
          <IconAccessible className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div className="origin-bottom-right scale-110">
        <givebutter-widget id="LYKEBp"></givebutter-widget>
      </div>
    </div>
  );
}
