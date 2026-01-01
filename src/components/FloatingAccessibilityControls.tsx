"use client";

import { useState } from "react";

import AccessibilityControls from "@/components/AccessibilityControls";

export default function FloatingAccessibilityControls() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 md:hidden">
      {open ? (
        <div
          id="accessibility-controls-panel"
          className="rounded-2xl border border-titan-border/60 bg-titan-bg/95 p-3 shadow-lg backdrop-blur"
        >
          <AccessibilityControls className="justify-end" />
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        aria-expanded={open}
        aria-controls="accessibility-controls-panel"
        aria-label="Accessibility settings"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-titan-border/60 bg-titan-bg/90 text-sm font-semibold text-titan-text-secondary shadow-lg transition hover:border-titan-yellow/70 hover:text-titan-yellow"
      >
        Aa
      </button>
    </div>
  );
}
