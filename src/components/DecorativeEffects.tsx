"use client";

import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export default function DecorativeEffects() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <StarsBackground className="pointer-events-none" />
      <ShootingStars className="pointer-events-none" />
    </div>
  );
}
