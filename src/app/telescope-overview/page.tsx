import type { Metadata } from "next";
import { readdir } from "node:fs/promises";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import TelescopeGallery from "@/components/TelescopeGallery";
import { BackgroundGradient } from "@/components/ui/background-gradient";

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
    value: "Analog feedback today; we're adding encoders and computer control for reliable remote pointing.",
  },
];

const telescopeImageDescriptions: Record<
  string,
  { alt: string; caption?: string }
> = {
  "titan-looking-up.webp": {
    alt: "Looking up from the base of the Titan dish.",
    caption: "Ground-up view of the dish and feed support.",
  },
  "titan-drone-shot-1.webp": {
    alt: "Drone shot of the Titan telescope and surroundings.",
    caption: "Aerial view of the telescope and site context.",
  },
  "titan-drone-shot-2.webp": {
    alt: "Top-down drone view of the Titan telescope assembly.",
    caption: "Overhead look at the full telescope structure.",
  },
};

function formatTelescopeLabel(fileName: string) {
  const stem = fileName.replace(/\.[^.]+$/, "");
  return stem.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
}

async function getTelescopeImages() {
  const telescopeDir = path.join(process.cwd(), "public", "images", "Telescope");
  const preferredOrder = [
    "titan-looking-up.webp",
    "titan-drone-shot-1.webp",
    "titan-drone-shot-2.webp",
  ];
  const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

  const files = await readdir(telescopeDir, { withFileTypes: true });
  const imageFiles = files
    .filter((file) => {
      if (!file.isFile()) return false;
      return imageExtensions.has(path.extname(file.name).toLowerCase());
    })
    .sort((a, b) => {
      const preferredA = preferredOrder.indexOf(a.name);
      const preferredB = preferredOrder.indexOf(b.name);

      if (preferredA !== -1 || preferredB !== -1) {
        if (preferredA === -1) return 1;
        if (preferredB === -1) return -1;
        return preferredA - preferredB;
      }

      return a.name.localeCompare(b.name);
    });

  return imageFiles.map((file, index) => {
    const description = telescopeImageDescriptions[file.name];
    const readableName = formatTelescopeLabel(file.name);

    return {
      src: `/images/Telescope/${file.name}`,
      alt: description?.alt ?? `Titan telescope photo ${index + 1}`,
      caption: description?.caption ?? readableName,
    };
  });
}

export default async function TelescopeOverviewPage() {
  const telescopeImages = await getTelescopeImages();
  const heroImage = telescopeImages[0];

  return (
    <main className="relative z-10 space-y-20">
      {/* Header + Hero Image */}
      <section className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-titan-orange sm:text-xs sm:tracking-[0.25em]">
              The Instrument
            </p>
            <h1 className="text-3xl font-bold text-titan-text-secondary sm:text-4xl">
              Telescope Overview
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-titan-text-primary/90">
              The Titan dish is a 10-meter Scientific-Atlanta Cassegrain on an ANTLab positioner that once lived in
              NASA&apos;s network. Decades of careful maintenance kept the mechanics tight, which means we can focus on
              modern controls and data systems instead of rebuilding the hardware from scratch.
            </p>
          </div>

          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-titan-text-muted sm:text-xs sm:tracking-[0.25em]">
            Specifications
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {keyFacts.map((fact, index) => (
              <AnimatedSection
                key={fact.label}
                delay={index * 0.08}
                className="rounded-3xl border border-titan-border/60 bg-titan-bg-alt/90 p-5 text-sm leading-relaxed text-titan-text-primary/90 shadow-[0_14px_34px_-24px_rgba(8,12,24,0.8)] backdrop-blur-sm transition hover:border-titan-purple/40 hover:bg-titan-bg-alt/95"
              >
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-titan-text-muted sm:text-xs">
                  {fact.label}
                </h3>
                <p className="mt-2">{fact.value}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <BackgroundGradient
          containerClassName="mx-auto w-full max-w-[28rem] rounded-[2rem]"
          className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] border border-titan-border/60 bg-titan-bg-alt/80 p-0 shadow-[0_28px_60px_-34px_rgba(12,16,40,0.95)]"
        >
          {heroImage ? (
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 420px, (min-width: 640px) 60vw, 100vw"
              priority
            />
          ) : null}
        </BackgroundGradient>
      </section>

      {/* Full Gallery */}
      <section className="space-y-5">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-titan-text-muted sm:text-xs sm:tracking-[0.25em]">
            Photo Gallery
          </p>
          <h2 className="text-2xl font-semibold text-titan-text-secondary">
            Telescope Photos
          </h2>
        </div>
        <TelescopeGallery images={telescopeImages} />
      </section>

      {/* Bottom CTA */}
      <AnimatedSection className="rounded-2xl border border-titan-border/50 bg-titan-bg-alt/60 p-8 text-center backdrop-blur-sm">
        <h2 className="text-2xl font-semibold text-titan-text-secondary">
          Help Acquire This Telescope
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-titan-text-primary/80">
          Every tax-deductible donation brings us closer to securing the dish and beginning modernization.
        </p>
        <Link
          href="/donate"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-titan-orange px-7 py-3 text-sm font-bold text-titan-bg transition hover:brightness-110"
        >
          Support the Observatory
        </Link>
      </AnimatedSection>
    </main>
  );
}
