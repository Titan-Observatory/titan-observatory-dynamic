import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Site Overview | Titan Observatory",
  description:
    "Site readiness, zoning, and radio environment details for the proposed Titan observatory location.",
};

const candidateSections = [
  {
    title: "Approach & Access",
    copy: [
      "We've made multiple trips to the site to confirm its suitability and have updated our working plan to take advantage of the existing gate and cleared path to minimize tree removal and landscaping. The telescope itself will be located in a clearing, minimizing spillover from nearby trees.",
    ],
    image: { src: "/images/site-plan.webp", alt: "Roadside view of the proposed observatory entrance." },
  },
  {
    title: "Zoning",
    copy: [
      "Agricultural zoning keeps permitting simple. The county planner has confirmed that we will only need a C2 conditional use permit, requiring a basic site plan, and that \"there is little for Planning & Development staff to review given the proposal will not have significant land use conflicts, require public facilities, or ongoing staffing.\"",
    ],
    image: { src: "/images/zoning-grid.webp", alt: "Parcel grid map showing the proposed pier and access drive." },
  },
  {
    title: "Radio Environment",
    copy: [
      "The parcel is situated in an incredibly isolated area only a few miles from the vast Green Swamp of Florida, on the very edges of even rural development. This will ensure a radio-quiet zone for many years to come as we don't need to worry about sprawling suburbs bringing radio towers into the area.",
    ],
    stats: [
      { label: "Nearest transmitting radio tower", value: "3.61 mi" },
      { label: "Nearest airport with radar", value: "43 mi", detail: "Tampa International" },
    ],
    image: { src: "/images/zoning-circle.webp", alt: "Land-use buffer illustrating the radio-quiet surroundings." },
  },
];

export default function SiteOverviewPage() {
  return (
    <main className="relative z-10 space-y-20">
      {/* Header */}
      <header className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-titan-orange sm:text-xs sm:tracking-[0.25em]">
          The Site
        </p>
        <h1 className="text-3xl font-bold text-titan-text-secondary sm:text-4xl">Site Overview</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-titan-text-primary/90">
          The proposed site keeps Titan close to infrastructure while preserving a radio-quiet horizon. Each diagram
          and photo below shows how the approach, zoning, and surrounding land support the observatory plan.
        </p>
      </header>

      {/* Content Sections — alternating layout */}
      <section className="space-y-12">
        {candidateSections.map((section, index) => {
          const imageFirst = index % 2 === 1;
          return (
            <AnimatedSection
              key={section.title}
              delay={index * 0.1}
              className="grid gap-6 rounded-3xl border border-titan-border/60 bg-titan-bg-alt/90 p-6 text-sm leading-relaxed text-titan-text-primary/90 shadow-[0_14px_34px_-24px_rgba(8,12,24,0.8)] backdrop-blur-sm transition hover:border-titan-purple/40 hover:bg-titan-bg-alt/95 lg:grid-cols-[1.05fr_0.95fr]"
            >
              <div className={`space-y-4 ${imageFirst ? "lg:order-2" : ""}`}>
                <h2 className="text-lg font-semibold text-titan-text-secondary">{section.title}</h2>
                {section.copy.map(paragraph => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {"stats" in section && section.stats && (
                  <div className="grid gap-3 pt-2 sm:grid-cols-2">
                    {section.stats.map(stat => (
                      <div
                        key={stat.label}
                        className="rounded-2xl border border-titan-border/40 bg-titan-bg/50 p-4"
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-titan-text-muted">
                          {stat.label}
                        </p>
                        <p className="mt-1 text-2xl font-bold text-titan-yellow">{stat.value}</p>
                        {"detail" in stat && stat.detail && (
                          <p className="mt-0.5 text-xs text-titan-text-muted">{stat.detail}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <figure className={`relative aspect-[4/3] overflow-hidden rounded-3xl border border-titan-border/40 bg-titan-bg-alt/30 shadow-titan ${imageFirst ? "lg:order-1" : ""}`}>
                <Image
                  src={section.image.src}
                  alt={section.image.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 480px, (min-width: 768px) 45vw, 90vw"
                />
              </figure>
            </AnimatedSection>
          );
        })}
      </section>

      {/* Bottom CTA */}
      <AnimatedSection className="rounded-2xl border border-titan-border/50 bg-titan-bg-alt/60 p-8 text-center backdrop-blur-sm">
        <h2 className="text-2xl font-semibold text-titan-text-secondary">
          Help Prepare the Site
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-titan-text-primary/80">
          Site preparation — foundation, grading, solar, and lightning protection — is a critical part of Phase 1.
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
