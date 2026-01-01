"use client";

import { useEffect, useState } from "react";

import {
  TEXT_SIZE_EVENT,
  applyTextSizePreference,
  getTextSizePreference,
  type TextSizePreference,
} from "@/lib/text-size";

export default function TextSizeToggle() {
  const [preference, setPreference] = useState<TextSizePreference>("normal");

  useEffect(() => {
    const initialPreference = getTextSizePreference();
    setPreference(initialPreference);
    applyTextSizePreference(initialPreference);

    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<{ preference: TextSizePreference }>;
      if (customEvent.detail?.preference) {
        setPreference(customEvent.detail.preference);
      }
    };

    window.addEventListener(TEXT_SIZE_EVENT, handler);
    return () => window.removeEventListener(TEXT_SIZE_EVENT, handler);
  }, []);

  const handleToggle = () => {
    const nextPreference = preference === "large" ? "normal" : "large";
    setPreference(nextPreference);
    applyTextSizePreference(nextPreference);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="rounded-full border border-titan-border/60 px-3 py-1 text-xs font-semibold text-titan-text-muted transition hover:border-titan-yellow/70 hover:text-titan-yellow"
      aria-pressed={preference === "large"}
    >
      Text size: {preference === "large" ? "Large" : "Normal"}
    </button>
  );
}
