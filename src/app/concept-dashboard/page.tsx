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
    "The Titan Observatory dashboard concept, with both broad accessibility and advanced controls.",
};

const features = [
  {
    icon: IconListSearch,
    label: "Object Catalog",
    color: "text-titan-yellow",
    description:
      "A curated list of radio sources and celestial targets, organized by difficulty and scientific interest so you always have something to observe.",
  },
  {
    icon: IconInfoCircle,
    label: "Guided Tooltips",
    color: "text-titan-aqua",
    description:
      "Hover over any setting or readout for a plain-language explanation — designed so first-time users can understand what they're seeing.",
  },
  {
    icon: IconAdjustments,
    label: "Advanced Controls",
    color: "text-titan-purple",
    description:
      "Experienced users get direct access to pointing coordinates, integration parameters, and data export — nothing hidden behind simplified views.",
  },
];

const mockups = [
  {
    title: "first-box-1",
    description: [
      "box text.",
    ],
    image: {
      src: "/images/Dashboard-Mockup-1.webp",
      alt: "Dashboard-Mockup-1",
    },
  },
  {
    title: "Advanced Controls",
    description: [
      "Advanced controls will still be made available to allow more experienced users to do more with the telescope. This is just a sample of possible controls and does not reflect everything that will be available.",
    ],
    image: {
      src: "/images/Dashboard-Mockup-2.webp",
      alt: "Dashboard-Mockup-2",
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
          Below are concepts for what a potential control dashboard might look like. The purpose of these mockups is to show
          the direction we want to take and the level of accessibility we want to achieve, with informational tooltips that
          explain different settings and a customized catalog of objects to observe. The final product may end up looking very
          different once development begins.
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
      <section className="space-y-12">
        {mockups.map((item, index) => (
          <AnimatedSection key={item.title} delay={index * 0.1} className="space-y-5 text-sm leading-relaxed text-titan-text-primary/90">
            {index !== 0 && (
              <div className="space-y-3 rounded-3xl border border-titan-border/60 bg-titan-bg-alt/90 p-6 shadow-[0_14px_34px_-24px_rgba(8,12,24,0.8)] backdrop-blur-sm">
                <h2 className="text-lg font-semibold text-titan-text-secondary">{item.title}</h2>
                {item.description.map(text => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            )}
            <figure className="mx-auto w-full max-w-5xl">
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
          { accent: "bg-titan-orange", heading: "For educators", text: "Schedule class observation sessions and walk students through real data collection." },
          { accent: "bg-titan-purple", heading: "For researchers", text: "Full control over pointing coordinates, integration parameters, and raw data export." },
          { accent: "bg-titan-aqua", heading: "For beginners", text: "Guided tours of the radio sky with tooltips explaining every step along the way." },
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
          The observing platform needs software engineers, UX designers, and educators. No astronomy background required.
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
