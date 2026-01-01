"use client";

import { useEffect, useState } from "react";

import {
  ANIMATIONS_EVENT,
  applyAnimationsDisabled,
  getAnimationsDisabled,
} from "@/lib/animations";
import AccessibilityToggle from "@/components/AccessibilityToggle";

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

  const handleToggle = (checked: boolean) => {
    const nextDisabled = !checked;
    setDisabled(nextDisabled);
    applyAnimationsDisabled(nextDisabled);
  };

  return (
    <AccessibilityToggle
      id="toggle-animations"
      label="Animations"
      description={disabled ? "Reduce motion and pause decorative effects." : "Enable decorative motion effects."}
      checked={!disabled}
      onCheckedChange={handleToggle}
    />
  );
}
