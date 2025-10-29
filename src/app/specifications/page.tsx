import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Telescope & Site Specifications | Titan Observatory",
  description:
    "Hardware capabilities of the Titan radio telescope and a snapshot of the candidate site that will host it.",
};

const mechanicalHighlights = [
  "We're acquiring and modernizing a 10-meter Scientific-Atlanta Cassegrain radio telescope on a precision ANTLab positioner.",
  "It's ex-NASA hardware with a continuously-run dehumidifier inside the mount, so the internals remain clean and in excellent shape.",
];

const keyFacts = [
  {
    label: "Aperture",
    value: "10 m Cassegrain provides ample collecting area for faint lines like the 1420.4 MHz H I transition.",
  },
  {
    label: "Drives",
    value: "Dual precision gear trains with dual DC motors and electronic brakes; balanced enough to move by hand (brakes off).",
  },
  {
    label: "Speed & Range",
    value: "Variable slew 0–10°/s; elevation 0–95°; azimuth 360°+ with managed wire wrap.",
  },
  {
    label: "Control",
    value: "Currently manual with analog feedback; we’ll add encoders and computer control for repeatable remote pointing.",
  },
  {
    label: "Power",
    value: "Dual 48 VDC supplies with modest 120 V, ~20 A site draw.",
  },
  {
    label: "Footprint & Fixtures",
    value: "Compact ~8 ft circular pier footprint with bolt-pattern template, plus spare gearboxes and a rack-mount analog position indicator.",
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
      "A county-maintained road leads directly to the gate, and the planned service drive provides a straight shot to the pier. The approach stays flat, making it easy for delivery trucks, cranes, and school groups to reach the site.",
      "Standing along the frontage you can see the clear horizon that surrounds the parcel, with plenty of staging space for rigging crews during installation.",
    ],
    image: { src: "/images/zoning-from-road.png", alt: "Roadside view of the proposed observatory entrance." },
  },
  {
    title: "Parcel Layout & Zoning",
    copy: [
      "Agricultural zoning keeps permitting straightforward while granting us the flexibility to add a control shelter and student work areas. The parcel grid highlights the proposed pad location and the open fields kept clear for the 10 m dish.",
      "The bolt pattern template drops neatly into the planned foundation, leaving breathing room for conduit runs and future expansion.",
    ],
    image: { src: "/images/zoning-grid.png", alt: "Parcel grid map showing the proposed pier and access drive." },
  },
  {
    title: "Radio Environment",
    copy: [
      "A survey of the surrounding land use shows pasture and groves in every direction, keeping broadband interference low for L- and S-band observations.",
      "The broader circle remains free of heavy industry or transmission corridors, so we retain the quiet radio window that classrooms need for meaningful spectroscopy.",
    ],
    image: { src: "/images/zoning-circle.png", alt: "Land-use buffer illustrating the radio-quiet surroundings." },
  },
];

export default function SpecificationsPage() {
  return (
    <main className="space-y-16">
      <section className="grid gap-16 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-8">
          <header className="space-y-3">
            <h1 className="text-4xl font-bold text-titan-text-secondary">Titan Telescope Overview</h1>
            <p className="text-sm leading-relaxed text-titan-text-primary/90">
              The Titan dish is a Scientific-Atlanta 10-meter Cassegrain on a precision ANTLab positioner. It still
              tracks smoothly thanks to its NASA-era maintenance, giving us a strong foundation for the modern
              control system we’re adding.
            </p>
          </header>

          <ul className="space-y-3 text-sm leading-relaxed text-titan-text-primary/90">
            {mechanicalHighlights.map(item => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-titan-orange/70" />
                {item}
              </li>
            ))}
          </ul>

          <div className="grid gap-4 sm:grid-cols-2">
            {keyFacts.map(fact => (
              <article
                key={fact.label}
                className="rounded-3xl border border-titan-border/50 bg-titan-bg-alt/25 p-5 text-sm leading-relaxed text-titan-text-primary/90"
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
            The proposed site keeps Titan close to classrooms while preserving a radio-quiet horizon. Each diagram
            and photo below shows how the approach, zoning, and surrounding land support the observatory plan.
          </p>
        </header>

        <div className="space-y-8">
          {candidateSections.map(section => (
            <article
              key={section.title}
              className="grid gap-6 rounded-3xl border border-titan-border/50 bg-titan-bg-alt/20 p-6 text-sm leading-relaxed text-titan-text-primary/90 lg:grid-cols-[1.05fr_0.95fr]"
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
