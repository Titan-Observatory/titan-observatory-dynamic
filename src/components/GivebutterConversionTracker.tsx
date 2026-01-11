"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    gtagSendEvent?: (url?: string) => boolean;
  }
}

export default function GivebutterConversionTracker() {
  const sentRef = useRef(false);
  const allowedWidgetIds = ["LYKEBp", "gM1lng"];

  useEffect(() => {
    const gtagSendEvent = (url?: string) => {
      const callback = () => {
        if (typeof url === "string") {
          window.location.href = url;
        }
      };

      if (window.gtag) {
        window.gtag("event", "conversion_event_purchase", {
          event_callback: callback,
          event_timeout: 2000,
        });
      } else {
        callback();
      }

      return false;
    };

    window.gtagSendEvent = gtagSendEvent;

    const shouldTrack = (element: Element | null) => {
      if (!element) {
        return false;
      }
      const widget = element.closest("givebutter-widget");
      if (!widget) {
        return false;
      }
      const widgetId = widget.getAttribute("id");
      return widgetId ? allowedWidgetIds.includes(widgetId) : false;
    };

    const trigger = () => {
      if (sentRef.current) {
        return;
      }
      sentRef.current = true;
      gtagSendEvent();
    };

    const handleClick = (event: MouseEvent) => {
      if (sentRef.current) {
        return;
      }
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      if (shouldTrack(target)) {
        trigger();
      }
    };

    const handleFocus = (event: FocusEvent) => {
      if (sentRef.current) {
        return;
      }
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      if (target.tagName === "IFRAME" && shouldTrack(target)) {
        trigger();
      }
    };

    const attachIframeListeners = () => {
      const iframes = document.querySelectorAll(
        "givebutter-widget iframe"
      ) as NodeListOf<HTMLIFrameElement>;
      iframes.forEach(iframe => {
        if (iframe.dataset.givebutterTracked === "true") {
          return;
        }
        iframe.tabIndex = 0;
        iframe.addEventListener("focus", () => {
          if (shouldTrack(iframe)) {
            trigger();
          }
        });
        iframe.dataset.givebutterTracked = "true";
      });
    };

    document.addEventListener("click", handleClick, true);
    document.addEventListener("focusin", handleFocus, true);

    const observer = new MutationObserver(() => attachIframeListeners());
    observer.observe(document.body, { childList: true, subtree: true });
    attachIframeListeners();
    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("focusin", handleFocus, true);
      observer.disconnect();
    };
  }, []);

  return null;
}
