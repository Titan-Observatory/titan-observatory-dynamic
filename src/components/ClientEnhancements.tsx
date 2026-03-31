"use client";

import dynamic from "next/dynamic";

const DecorativeEffects = dynamic(() => import("@/components/DecorativeEffects"), {
  ssr: false,
});
const FloatingAccessibilityControls = dynamic(
  () => import("@/components/FloatingAccessibilityControls"),
  { ssr: false },
);
const GoogleAnalytics = dynamic(() => import("@/components/GoogleAnalytics"), {
  ssr: false,
});
const GivebutterConversionTracker = dynamic(
  () => import("@/components/GivebutterConversionTracker"),
  { ssr: false },
);

export default function ClientEnhancements({
  measurementId,
}: {
  measurementId?: string;
}) {
  return (
    <>
      <GivebutterConversionTracker />
      <DecorativeEffects />
      {measurementId ? <GoogleAnalytics measurementId={measurementId} /> : null}
      <FloatingAccessibilityControls />
    </>
  );
}
