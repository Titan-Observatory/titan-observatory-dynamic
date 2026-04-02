"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  return (
    <>
      <GivebutterConversionTracker />
      <DecorativeEffects showShootingStars={pathname === "/"} />
      {measurementId ? <GoogleAnalytics measurementId={measurementId} /> : null}
      <FloatingAccessibilityControls />
    </>
  );
}
