"use client";

import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export default function DecorativeEffects({
  showShootingStars = true,
}: {
  showShootingStars?: boolean;
}) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <StarsBackground className="pointer-events-none" />
      {showShootingStars ? <ShootingStars className="pointer-events-none" /> : null}
    </div>
  );
}
