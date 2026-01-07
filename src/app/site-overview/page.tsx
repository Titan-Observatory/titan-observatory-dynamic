import type { Metadata } from "next";
import Image from "next/image";

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
      "The parcel is situated in an incredibly isolated area only a few miles from the vast Green Swamp of Florida, on the very edges of even rural development. This will ensure a radio-quiet zone for many years to come as we don't need to worry about sprawling suburbs bringing radio towers into the area.",
      "Nearest transmitting radio tower: 3.61 Miles",
      "Nearest Airport with Radar: 43 Miles (Tampa International)",
    ],
    image: { src: "/images/zoning-circle.png", alt: "Land-use buffer illustrating the radio-quiet surroundings." },
  },
];

export default function SiteOverviewPage() {
  const offscreenStyle = {
    contentVisibility: "auto",
    containIntrinsicSize: "1px 600px",
  } as const;

  return (
    <main className="relative z-10 space-y-10">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold text-titan-text-secondary">Site Overview</h1>
        <p className="text-sm leading-relaxed text-titan-text-primary/90">
          The proposed site keeps Titan close to infrastructure while preserving a radio-quiet horizon. Each diagram
          and photo below shows how the approach, zoning, and surrounding land support the observatory plan.
        </p>
      </header>

      <section className="space-y-8">
        {candidateSections.map(section => (
          <article
            key={section.title}
            className="grid gap-6 rounded-3xl border border-titan-border/60 bg-titan-bg-alt/90 p-6 text-sm leading-relaxed text-titan-text-primary/90 shadow-[0_14px_34px_-24px_rgba(8,12,24,0.8)] backdrop-blur-sm transition hover:border-titan-purple/40 hover:bg-titan-bg-alt/95 lg:grid-cols-[1.05fr_0.95fr]"
            style={offscreenStyle}
          >
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-titan-text-secondary">{section.title}</h2>
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
      </section>
    </main>
  );
}
