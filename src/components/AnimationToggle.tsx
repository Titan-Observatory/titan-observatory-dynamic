"use client";

import { useEffect, useState } from "react";

import {
  ANIMATIONS_EVENT,
  applyAnimationsDisabled,
  getAnimationsDisabled,
} from "@/lib/animations";

export default function AnimationToggle() {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const initialDisabled = getAnimationsDisabled();
    setDisabled(initialDisabled);
    applyAnimationsDisabled(initialDisabled);

    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<{ disabled: boolean }>;
      if (typeof customEvent.detail?.disabled === "boolean") {
        setDisabled(customEvent.detail.disabled);
      }
    };

    window.addEventListener(ANIMATIONS_EVENT, handler);
    return () => window.removeEventListener(ANIMATIONS_EVENT, handler);
  }, []);

  const handleToggle = () => {
    const nextDisabled = !disabled;
    setDisabled(nextDisabled);
    applyAnimationsDisabled(nextDisabled);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="rounded-full border border-titan-border/60 px-3 py-1 text-xs font-semibold text-titan-text-muted transition hover:border-titan-yellow/70 hover:text-titan-yellow"
      aria-pressed={disabled}
    >
      Animations: {disabled ? "Off" : "On"}
    </button>
  );
}
