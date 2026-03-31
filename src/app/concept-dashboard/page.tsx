import type { Metadata } from "next";
import Link from "next/link";
import { IconListSearch, IconInfoCircle, IconAdjustments } from "@tabler/icons-react";
import { ConceptGlowPanel } from "@/components/ui/concept-glow-panel";
import ConceptDashboardZoomImage from "@/components/ConceptDashboardZoomImage";
import AnimatedSection from "@/components/AnimatedSection";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Concept Dashboard | Titan Observatory",
  description:
    "Concepts for the Titan Observatory dashboard, designed to balance accessibility with advanced controls.",
};

const features = [
  {
    icon: IconListSearch,
    label: "Observation Catalog",
    color: "text-titan-yellow",
    description:
      "Initially, guided hydrogen-line observations will provide a beginner-friendly experience from start to finish. As Titan Observatory expands into additional radio bands, future sessions could be planned using public astronomical catalogs and survey archives covering bright radio galaxies, pulsars, supernova remnants, hydrogen clouds, star-forming regions, masers, and molecular gas across the sky.",
  },
  {
    icon: IconInfoCircle,
    label: "Option Tooltips",
    color: "text-titan-aqua",
    description:
      "Many settings, like bin width, integration time, and gain, can feel intimidating at first. We'll pair them with tooltips, visualizations, and extended lessons that explain what each option does in clear language. The goal is to make even advanced features understandable at a conceptual level, so future astronomers can explore with confidence.",
  },
  {
    icon: IconAdjustments,
    label: "Advanced Controls",
    color: "text-titan-purple",
    description:
      "Beginner-friendly does not mean locked down. Once our core education service is in place, we plan to make telescope control as open as reasonably possible through the web interface and an API. Publishing the code as open source will let anyone inspect it, improve it, and contribute.",
  },
];

const mockups = [
  {
    image: {
      src: "/images/Dashboard-Mockup-1.webp",
      alt: "Dashboard concept showing the main observation workflow.",
    },
  },
  {
    image: {
      src: "/images/Dashboard-Mockup-2.webp",
      alt: "Dashboard concept showing advanced telescope controls.",
    },
  },
];

export default function ConceptDashboardPage() {
  return (
    <main className="relative z-10 space-y-20">
      {/* Header */}
      <header className="space-y-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-titan-yellow sm:text-xs sm:tracking-[0.25em]">
          The Platform
        </p>
        <h1 className="text-3xl font-bold text-titan-text-secondary sm:text-4xl">Concept Dashboard</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-titan-text-primary/90">
          These mockups show the direction we want to take with the observing dashboard and the level of accessibility we
          want to achieve. The final product will evolve as the software and telescope systems take shape, so the finished
          interface may look quite different.
        </p>
      </header>

      {/* Feature Highlights */}
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <AnimatedSection
            key={feature.label}
            delay={index * 0.08}
            className="flex flex-col rounded-3xl border border-titan-border/60 bg-titan-bg-alt/80 p-6 backdrop-blur-sm"
          >
            <feature.icon className={`h-7 w-7 ${feature.color}`} aria-hidden="true" />
            <h3 className="mt-4 text-lg font-semibold text-titan-text-secondary">{feature.label}</h3>
            <p className="mt-2 flex-1 text-sm leading-7 text-titan-text-primary/80">{feature.description}</p>
          </AnimatedSection>
        ))}
      </section>

      {/* Mockups */}
      <section className="grid gap-6 lg:grid-cols-2 lg:items-start">
        {mockups.map((item, index) => (
          <AnimatedSection key={item.image.src} delay={index * 0.1}>
            <figure className="w-full">
              <ConceptGlowPanel className="relative w-full border border-titan-border/60 bg-titan-bg-alt/80 shadow-[0_28px_60px_-34px_rgba(12,16,40,0.95)]">
                <ConceptDashboardZoomImage
                  src={item.image.src}
                  alt={item.image.alt}
                  width={item.image.src.includes("Mockup-1") ? 1848 : 1508}
                  height={item.image.src.includes("Mockup-1") ? 1303 : 1123}
                  sizes="(min-width: 1280px) 900px, (min-width: 768px) 85vw, 95vw"
                  priority={item.image.src.includes("Mockup-1")}
                />
              </ConceptGlowPanel>
            </figure>
          </AnimatedSection>
        ))}
      </section>

      {/* Audience Callout */}
      <AnimatedSection className="grid gap-5 sm:grid-cols-3">
        {[
          { accent: "bg-titan-orange", heading: "For educators", text: "Schedule class observation sessions and guide students through real data collection." },
          { accent: "bg-titan-purple", heading: "For researchers", text: "Access pointing coordinates, integration settings, and raw data export when deeper control is needed." },
          { accent: "bg-titan-aqua", heading: "For beginners", text: "Explore guided tours of the radio sky with tooltips that explain each step along the way." },
        ].map(card => (
          <div
            key={card.heading}
            className="rounded-3xl border border-titan-border/60 bg-titan-bg-alt/80 p-6 backdrop-blur-sm"
          >
            <span className={`inline-block h-2 w-2 rounded-full ${card.accent}`} />
            <h3 className="mt-3 text-sm font-semibold text-titan-text-secondary">{card.heading}</h3>
            <p className="mt-2 text-sm leading-relaxed text-titan-text-primary/80">{card.text}</p>
          </div>
        ))}
      </AnimatedSection>

      {/* Bottom CTA */}
      <AnimatedSection className="rounded-2xl border border-titan-border/50 bg-titan-bg-alt/60 p-8 text-center backdrop-blur-sm">
        <h2 className="text-2xl font-semibold text-titan-text-secondary">
          Help Us Build This
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-titan-text-primary/80">
          Building the observing platform will take software engineers, UX designers, and educators. No astronomy
          background is required.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://forms.gle/MwwsctzD1G5woQAo6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-titan-aqua/60 bg-titan-aqua/15 px-6 py-3 text-sm font-semibold text-titan-text-secondary transition hover:bg-titan-aqua/25"
          >
            Apply to Volunteer
          </a>
          <Link
            href="/system-architecture"
            className="inline-flex items-center justify-center rounded-full border border-titan-border/70 px-6 py-3 text-sm font-semibold text-titan-text-secondary transition hover:border-titan-purple/50 hover:bg-titan-purple/5"
          >
            View System Architecture
          </Link>
        </div>
      </AnimatedSection>
    </main>
  );
}
