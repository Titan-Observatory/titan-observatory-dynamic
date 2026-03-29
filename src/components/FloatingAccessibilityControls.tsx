"use client";

import { useEffect, useRef, useState } from "react";
import { IconAccessible } from "@tabler/icons-react";

import AccessibilityPanel from "@/components/AccessibilityPanel";

export default function FloatingAccessibilityControls() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) {
        return;
      }

      if (panelRef.current?.contains(target) || toggleRef.current?.contains(target)) {
        return;
      }

      setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  return (
    <div
      className="fixed left-4 right-4 z-40 flex items-end justify-between md:hidden"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
      data-floating-controls
      data-panel-open={open ? "true" : "false"}
    >
      <div className="flex flex-col items-start gap-3">
        {open ? (
          <div
            id="accessibility-controls-panel"
            ref={panelRef}
            className="max-w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-titan-border/60 bg-titan-bg/95 p-3 shadow-lg backdrop-blur -translate-y-5"
          >
            <AccessibilityPanel compact />
          </div>
        ) : null}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen(prev => !prev)}
          aria-expanded={open}
          aria-controls="accessibility-controls-panel"
          aria-label="Accessibility settings"
          className="inline-flex h-12 w-12 -translate-y-5 items-center justify-center rounded-full border border-titan-border/60 bg-titan-bg/90 text-titan-text-secondary shadow-lg transition hover:border-titan-yellow/70 hover:text-titan-yellow"
        >
          <IconAccessible className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div
        aria-hidden={open}
        className={`origin-bottom-right transition-all duration-200 ${
          open ? "pointer-events-none w-0 scale-95 opacity-0" : "w-auto scale-100 opacity-100"
        }`}
      >
        <givebutter-widget className="floating-donate-widget" id="LYKEBp"></givebutter-widget>
      </div>
    </div>
  );
}
