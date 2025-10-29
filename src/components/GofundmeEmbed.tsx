"use client";

import { useEffect } from "react";

const SCRIPT_ID = "gofundme-embed-script";
const EMBED_SRC = "https://www.gofundme.com/static/js/embed.js";
const EMBED_URL =
  "https://www.gofundme.com/f/help-build-titan-observatory-for-student-science/widget/large?sharesheet=undefined&attribution_id=sl:e9f624ba-2f25-49c0-9786-cab56d206ade";

declare global {
  interface Window {
    GoFundMe?: { init?: () => void };
  }
}

export default function GofundmeEmbed() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const existingScript = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = EMBED_SRC;
      script.async = true;
      document.body.appendChild(script);
      script.dataset.initialized = "true";
      script.addEventListener("load", () => window.GoFundMe?.init?.());
      return;
    }

    if (existingScript.dataset.initialized !== "true") {
      existingScript.dataset.initialized = "true";
      existingScript.addEventListener("load", () => window.GoFundMe?.init?.(), { once: true });
    } else {
      window.GoFundMe?.init?.();
    }
  }, []);

  return <div className="gfm-embed" data-url={EMBED_URL} />;
}
