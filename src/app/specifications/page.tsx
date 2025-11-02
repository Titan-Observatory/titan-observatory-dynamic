import type { Metadata } from "next";
import Image from "next/image";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Telescope & Site Specifications | Titan Observatory",
  description:
    "A closer look at Titan's 10-meter NASA-built radio telescope and the Florida site that will host it.",
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

const candidateSections = [
  {
    title: "Approach & Access",
    copy: [
      "We've made multiple trips to the site to confirm its suitability and have updated our working plan to take advantage of the existing gate and cleared path to minimize tree removal and landscaping. The telescope itself will be located in a clearing, minimizing spillover from nearby trees.",
    ],
    image: { src: "/images/site-plan.png", alt: "Roadside view of the proposed observatory entrance." },
  },
  {
    title: "Zoning",
    copy: [
      "Agricultural zoning keeps permitting simple. The county planner has confirmed that we will only need a C2 conditional use permit, requiring a basic site plan, and that \"there is little for Planning & Development staff to review given the proposal will not have significant land use conflicts, require public facilities, or ongoing staffing.\"",
    ],
    image: { src: "/images/zoning-grid.png", alt: "Parcel grid map showing the proposed pier and access drive." },
  },
  {
    title: "Radio Environment",
    copy: [
      "The parcel is situated in an incredibly isolated area only a few miles from the vast Green Swamp of Florida, on the very edges of even rural development. This will ensure a radio quiet zone for many years to come as we dont need to worry about sprawling suburbs bringing radio towers into the area.",
      "Nearest transmitting radio tower: 3.61 Miles",
      "Nearest Airport with Radar: 43 Miles (Tampa International)",
    ],
    image: { src: "/images/zoning-circle.png", alt: "Land-use buffer illustrating the radio-quiet surroundings." },
  },
];

export default function SpecificationsPage() {
  return (
    <main className="relative z-10 space-y-16">
      <section className="grid gap-16 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-8">
          <header className="space-y-3">
            <h1 className="text-4xl font-bold text-titan-text-secondary">Titan Telescope Overview</h1>
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
                className="rounded-3xl border border-titan-border/60 bg-titan-bg-alt/90 p-5 text-sm leading-relaxed text-titan-text-primary/90 shadow-[0_14px_34px_-24px_rgba(8,12,24,0.8)] backdrop-blur-sm transition hover:border-[#7f8cff]/45 hover:bg-titan-bg-alt/95"
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

      <section className="space-y-10">
        <header className="space-y-3">
          <h2 className="text-3xl font-semibold text-titan-text-secondary">Candidate Site Overview</h2>
          <p className="text-sm leading-relaxed text-titan-text-primary/90">
            The proposed site keeps Titan close to infrastructure while preserving a radio-quiet horizon. Each diagram
            and photo below shows how the approach, zoning, and surrounding land support the observatory plan.
          </p>
        </header>

        <div className="space-y-8">
          {candidateSections.map(section => (
            <article
              key={section.title}
              className="grid gap-6 rounded-3xl border border-titan-border/60 bg-titan-bg-alt/90 p-6 text-sm leading-relaxed text-titan-text-primary/90 shadow-[0_14px_34px_-24px_rgba(8,12,24,0.8)] backdrop-blur-sm transition hover:border-[#7f8cff]/45 hover:bg-titan-bg-alt/95 lg:grid-cols-[1.05fr_0.95fr]"
            >
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-titan-text-secondary">{section.title}</h3>
                {section.copy.map(paragraph => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <figure className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-titan-border/40 bg-titan-bg-alt/30 shadow-titan">
                <Image
                  src={section.image.src}
                  alt={section.image.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 480px, (min-width: 768px) 45vw, 90vw"
                />
              </figure>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
