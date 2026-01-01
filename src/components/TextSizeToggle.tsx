"use client";

import { useEffect, useState } from "react";

import {
  TEXT_SIZE_EVENT,
  applyTextSizePreference,
  getTextSizePreference,
  type TextSizePreference,
} from "@/lib/text-size";
import AccessibilityToggle from "@/components/AccessibilityToggle";

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

  const handleToggle = (checked: boolean) => {
    const nextPreference = checked ? "large" : "normal";
    setPreference(nextPreference);
    applyTextSizePreference(nextPreference);
  };

  return (
    <AccessibilityToggle
      id="toggle-text-size"
      label="Text size"
      description={preference === "large" ? "Increase base font size." : "Use the default font size."}
      checked={preference === "large"}
      onCheckedChange={handleToggle}
    />
  );
}
