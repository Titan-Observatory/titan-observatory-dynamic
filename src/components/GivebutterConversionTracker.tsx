"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    Givebutter?: ((...args: unknown[]) => void) & {
      q?: unknown[][];
      l?: number;
      EVENT?: {
        DONATION?: {
          COMPLETE?: string;
        };
      };
    };
  }
}

function fireConversionEvent() {
  if (window.gtag) {
    window.gtag("event", "conversion_event_purchase_1", {
      event_callback: () => {},
      event_timeout: 2000,
    });
    console.log("[GivebutterConversionTracker] conversion_event_purchase_1 fired");
  } else {
    console.warn("[GivebutterConversionTracker] gtag not available");
  }
}

export default function GivebutterConversionTracker() {
  useEffect(() => {
    // Hidden test trigger: type "testdonation" anywhere on the page
    const buffer: string[] = [];
    const code = "testdonation";
    const handleKeyDown = (e: KeyboardEvent) => {
      buffer.push(e.key.toLowerCase());
      if (buffer.length > code.length) {
        buffer.shift();
      }
      if (buffer.join("") === code) {
        buffer.length = 0;
        fireConversionEvent();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    if (window.Givebutter) {
      window.Givebutter("addEventListener", "donation.complete", () => {
        fireConversionEvent();
      });
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
