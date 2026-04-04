"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type GivebutterMessage = {
  givebutter?: boolean;
  event?: string;
  total?: number;
  currency?: string;
  sessionId?: string;
  [key: string]: unknown;
};

function fireConversionEvent(donation?: GivebutterMessage) {
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

function isGivebutterOrigin(origin: string): boolean {
  try {
    const hostname = new URL(origin).hostname;
    return hostname === "givebutter.com" || hostname.endsWith(".givebutter.com");
  } catch {
    return false;
  }
}

export default function GivebutterConversionTracker() {
  useEffect(() => {
    // Listen for postMessage events from the Givebutter widget iframe
    const handleMessage = (event: MessageEvent) => {
      if (!isGivebutterOrigin(event.origin)) {
        return;
      }

      const data = event.data as GivebutterMessage | undefined;
      if (!data || typeof data !== "object") {
        return;
      }

      // Debug: log all Givebutter postMessages to help discover event names
      console.log("[GivebutterConversionTracker] Givebutter message:", data);

      // Fire conversion on donation completion
      if (
        data.event === "donation.complete" ||
        data.event === "donation:complete" ||
        data.event === "checkout_completed" ||
        data.event === "purchase"
      ) {
        fireConversionEvent(data);
      }
    };
    window.addEventListener("message", handleMessage);

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

    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
