import type { Metadata } from "next";
import Image from "next/image";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Telescope Overview | Titan Observatory",
  description:
    "Specifications and imagery for Titan's 10-meter NASA-built radio telescope.",
};

const keyFacts = [
  {
    label: "Aperture",
    value: "10 m Cassegrain surface gathers plenty of signal for faint hydrogen work. The exceptional surface quality brings the possibility of higher frequencies.",
  },
  {
    label: "Drives",
    value: "Dual gear trains, dual DC motors, and electronic brakes—balanced enough to nudge by hand.",
  },
  {
    label: "Speed & Range",
    value: "Variable slews from 0–10°/s, elevation 0–95°, azimuth 360°+ with managed wrap. Quick enough to track satellites.",
  },
  {
    label: "Control",
    value: "Analog feedback today; we’re adding encoders and computer control for reliable remote pointing.",
  },
  {
    label: "Power",
    value: "Twin 48 VDC supplies plus a modest 120 V, ~20 A site draw.",
  },
  {
    label: "Footprint & Fixtures",
    value: "Compact ~8 ft circular pier footprint, bolt template, spare gearboxes, and a rack-mount analog readout.",
  },
];

const telescopeImages = [
  {
    src: "/images/titan-looking-up.png",
    alt: "Looking up from the base of the Titan dish.",
  },
  {
    src: "/images/titan-drone-shot-1.png",
    alt: "Drone shot of the Titan telescope and surroundings.",
  },
  {
    src: "/images/titan-drone-shot-2.png",
    alt: "Top-down drone view of the Titan telescope assembly.",
  },
];

export default function TelescopeOverviewPage() {
  return (
    <main className="relative z-10 space-y-16">
      <section className="grid gap-16 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-8">
          <header className="space-y-3">
            <h1 className="text-4xl font-bold text-titan-text-secondary">Telescope Overview</h1>
            <p className="text-sm leading-relaxed text-titan-text-primary/90">
              The Titan dish is a 10-meter Scientific-Atlanta Cassegrain on an ANTLab positioner that once lived in
              NASA’s network. Decades of careful maintenance kept the mechanics tight, which means we can focus on
              modern controls and data systems instead of rebuilding the hardware from scratch.
            </p>
          </header>

          <div className="grid gap-4 sm:grid-cols-2">
            {keyFacts.map(fact => (
              <article
                key={fact.label}
                className="rounded-3xl border border-titan-border/60 bg-titan-bg-alt/90 p-5 text-sm leading-relaxed text-titan-text-primary/90 shadow-[0_14px_34px_-24px_rgba(8,12,24,0.8)] backdrop-blur-sm transition hover:border-titan-purple/40 hover:bg-titan-bg-alt/95"
              >
                <h3 className="text-base font-semibold text-titan-text-secondary">{fact.label}</h3>
                <p className="mt-1">{fact.value}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <figure className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-titan-border/60 bg-titan-bg-alt/40 shadow-titan lg:col-span-2">
            <Image
              src={telescopeImages[0].src}
              alt={telescopeImages[0].alt}
              fill
              className="object-cover"
              sizes="(min-width: 1280px) 560px, (min-width: 768px) 70vw, 90vw"
              priority
            />
          </figure>
          <figure className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-titan-border/60 bg-titan-bg-alt/40 shadow-titan">
            <Image
              src={telescopeImages[1].src}
              alt={telescopeImages[1].alt}
              fill
              className="object-cover"
              sizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 90vw"
            />
          </figure>
          <figure className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-titan-border/60 bg-titan-bg-alt/40 shadow-titan">
            <Image
              src={telescopeImages[2].src}
              alt={telescopeImages[2].alt}
              fill
              className="object-cover"
              sizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 90vw"
            />
          </figure>
        </div>
      </section>
    </main>
  );
}
