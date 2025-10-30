"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type GoogleAnalyticsProps = {
  measurementId: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const path = pathname ?? "/";
    const query = searchParams?.toString();
    const url = query ? `${path}?${query}` : path;

    window.gtag?.("config", measurementId, {
      page_path: url,
    });
  }, [measurementId, pathname, searchParams]);

  return null;
}
