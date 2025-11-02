import Image from "next/image";
import GofundmeEmbed from "@/components/GofundmeEmbed";
import PhaseTimeline from "@/components/PhaseTimeline";
import { BackgroundGradient } from "@/components/ui/background-gradient";

export const revalidate = 3600;

const fundingHighlights = [
  "Lock in the purchase and move the 10-meter NASA-built radio telescope to its new home.",
  "Pour the pier, run power, and ground the site so the dish can pivot safely in Florida weather.",
  "Swap the vintage motion control and feeds for modern encoders, drives, and front ends.",
  "Stand up the network, scheduling tools, and data pipeline classrooms will use every day.",
  "Handle permits, insurance, and radio-quiet validation so the first datasets arrive clean.",
];

const phases = [
  {
    title: "Phase 1 - Acquire & Move",
    status: "In progress",
    details: [
      "Purchase telescope ($70k) and exercise the option contract",
      "Crane and rigging ($3k) for safe disassembly and lifts",
      "Short-haul transport (~40 miles) with insured carrier ($500)",
    ],
  },
  {
    title: "Phase 2 - Install",
    status: "Preparing",
    details: [
      "Engineered concrete foundation and pier bolts ($10k)",
      "Dedicated electrical service, UPS, and grounding ($3k)",
      "Lightning protection and site grounding ($2k)",
      "Site grading, service road, and pad leveling ($10k)",
      "Permits, inspections, and local fees ($1k)",
    ],
  },
  {
    title: "Phase 3 - Refurbish & Modernize",
    status: "Upcoming",
    details: [
      "Motion control system: encoders, controllers, safety interlocks ($5k)",
      "L- and S-band RF chain: feeds, LNAs, filters, SDR backend ($1k)",
      "Compute and networking stack for secure remote access ($1k)",
    ],
  },
  {
    title: "Phase 4 - First Light & Operations",
    status: "Upcoming",
    details: [
      "Volunteer-developed scheduler, control interface, and calibration pipeline",
      "Education-focused data packaging and documentation for classrooms",
    ],
  },
];

export default function Home() {
  return (
    <main className="space-y-16">
      <section className="grid items-start gap-14 lg:grid-cols-[1.25fr_0.95fr] xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-titan-text-secondary">
            About Titan Astronomical Observatory
          </h1>
          <p className="text-lg leading-relaxed text-titan-text-primary/90">
            We&apos;re Titan Astronomical Observatory, a small Florida nonprofit with the goal of 
            providing remote access to real NASA quality instruments and real data 
            for students, teachers, and enthusiasts. We’re an officially incorporated 
            nonprofit (501(c)(3) pending) with a four-member board, a potential site secured, 
            an option contract granting us the exclusive right to buy the telescope, and a 
            core team planning for the future.

          </p>
          <p className="text-sm leading-relaxed text-titan-text-muted">
            The dish itself is a 10-meter Scientific-Atlanta Cassegrain on a Antlab precision positioner the current owner purchased from
            NASA nearly 50 years ago. It's been maticulusly maintained, with zero backlash, perfect balance, and a 
            dehumidifier running inside 24/7.
          </p>
          <div className="max-w-[420px]">
            <GofundmeEmbed />
          </div>
        </div>
        <BackgroundGradient
          containerClassName="rounded-[2rem]"
          className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] border border-titan-border/60 bg-titan-bg-alt/80 p-0 shadow-[0_28px_60px_-34px_rgba(12,16,40,0.95)]"
        >
          <Image
            src="/images/titan.png"
            alt="The Titan radio telescope awaiting modernization."
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 420px, 60vw"
            priority
          />
        </BackgroundGradient>
      </section>

      <section className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <h2 className="text-2xl font-semibold text-titan-text-secondary">Why It Matters</h2>
          <p className="text-sm leading-relaxed text-titan-text-primary/90">
            Hands-on science changes lives. Titan lets classrooms, home learners, and clubs reserve
            observing time, collect calibrated data, and build projects they can publish or share with
            their communities.
          </p>
        </div>
        <aside className="space-y-3 rounded-3xl border-l-4 border-titan-purple/60 bg-transparent p-6 text-sm leading-relaxed text-titan-text-primary/90">
          <h3 className="text-base font-semibold text-titan-text-secondary">What Support Enables</h3>
          <p>Gifts and volunteer time help us turn a historic instrument into a shared classroom:</p>
          <ul className="space-y-2">
            <li>- Remote go-to controls, safety interlocks, and smarter pointing models</li>
            <li>- Fresh RF chains and calibrated feeds for the bands students want to explore</li>
            <li>- Hardened networking, scheduling tools, and a data portal built for teaching</li>
          </ul>
        </aside>
      </section>

      <section className="space-y-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-titan-text-secondary">Roadmap to First Light</h2>
            <p className="text-sm text-titan-text-muted">
              Four focused phases carry Titan from a Facebook Marketplace listing to student-ready operations.
            </p>
          </div>
          <span className="rounded-full border border-titan-border/60 px-4 py-1 text-xs uppercase tracking-widest text-titan-text-muted">
            Working total ~ $118,000
          </span>
        </div>

        <PhaseTimeline phases={phases} />
      </section>

      <section className="rounded-3xl border-l-4 border-titan-green/70 bg-transparent p-10 text-sm leading-relaxed text-titan-text-primary/90">
        <h2 className="text-2xl font-semibold text-titan-text-secondary">Get Involved</h2>
        <p className="mt-3 max-w-4xl">
          We&apos;re looking for donors, engineers, educators, storytellers, and radio nerds who want to
          help. Hop into the Discord, claim a line item, or lend expertise with controls, RF chains,
          site work, or software. Together we can hand the next wave of explorers real NASA-quality data.
        </p>
        <a
          href="https://discord.gg/T5F6AG26tE"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-fit items-center justify-center rounded-full border border-titan-purple/60 bg-titan-purple/20 px-6 py-2.5 text-sm font-semibold text-titan-purple transition hover:bg-titan-purple/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-titan-purple"
        >
          Join the Discord
        </a>
      </section>
    </main>
  );
}
