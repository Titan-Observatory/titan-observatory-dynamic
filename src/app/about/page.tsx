import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PhaseTimeline from "@/components/PhaseTimeline";
import { IconUser } from "@tabler/icons-react";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "About | Titan Observatory",
  description:
    "Our mission, why radio astronomy matters, the project roadmap, and the team behind Titan Observatory.",
};

const phases = [
  {
    title: "Phase 1 — Acquire & Prep Site",
    status: "In progress",
    active: true,
    details: [
      "Purchase telescope: $70,000",
      "Survey + topo of destination site: $3,500",
      "Geotech (borings/report): $3,000",
      "Engineering (foundation design, wind/loading calcs): $5,000",
      "Concrete foundation + excavation: $15,000",
      "Site grading/drainage + pad prep: $3,000",
      "Service road / crane access: $6,000",
      "Solar system: $9,000",
      "UPS / power conditioning: $2,000",
      "Lightning protection + site grounding: $8,000",
      "Permits, plan review, inspections, local fees: $2,000",
      "Basic security (fencing + a couple cameras): $3,000",
      "Weather/environment monitoring: $1000",
    ],
  },
  {
    title: "Phase 2 — Transport & Modernize",
    status: "Preparing",
    details: [
      "Crane /w crew, disassembly, & transport: $6,000 (quoted)",
      "Motion controller: $1,500",
      "Synchro-to-digital converter (4 channels): $2,000",
      "Servo drives & power (2 axes): $800",
      "L- and S-band RF chain (feeds, LNAs, filters, bias, coax/waveguide, switching): $4,000",
      "Compute + networking for secure remote ops: $3,000",
    ],
  },
  {
    title: "Phase 3 — Commission & First Light",
    status: "Upcoming",
    details: [
      "Development of telescope control systems led by staff volunteers with community involvement",
      "Web platform for scheduling observations and accessing lessons created",
      "Curricula and public courses developed to teach the fundamentals of radio astronomy & related subjects",
    ],
  },
];

const teamPreview = [
  {
    name: "Thomas Oglesby",
    role: "Executive Director",
    image: "/images/headshots/Thomas-Oglesby.webp",
  },
  {
    name: "Tag Hunt",
    role: "Vice President, Board",
    image: "/images/headshots/Tag-Hunt.webp",
  },
  {
    name: "Jennise Santiago",
    role: "Secretary, Board",
    image: "/images/headshots/Jennise-Santiago.webp",
  },
  {
    name: "Jonathan Hart",
    role: "Board Member",
    image: "/images/headshots/Jonathan-Hart.webp",
  },
];

export default function AboutPage() {
  return (
    <main className="space-y-20">
      {/* ── Mission ── */}
      <section className="mx-auto max-w-3xl space-y-5">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-titan-orange">
          Our Mission
        </p>
        <h1 className="text-3xl font-bold text-titan-text-secondary sm:text-4xl">
          About Titan Observatory
        </h1>
        <p className="text-sm leading-relaxed text-titan-text-primary/90">
          We&apos;re a 501(c)(3) nonprofit based in Polk County, Florida
          building an online radio observatory. Our mission is to take advantage
          of the underutilized potential of the internet age and the open source
          community it has spawned to make radio astronomy more accessible than
          has ever been possible before.
        </p>
        <p className="text-sm leading-relaxed text-titan-text-primary/90">
          We believe it&apos;s important to give the public the opportunity to
          perform and understand their own observations of the universe, so that
          we can all share in the excitement of future discoveries and feel
          connected to the science behind them.
        </p>
      </section>

      {/* ── Why It Matters ── */}
      <section className="mx-auto max-w-3xl space-y-5">
        <h2 className="text-2xl font-semibold text-titan-text-secondary">
          Why It Matters
        </h2>
        <p className="text-sm leading-relaxed text-titan-text-primary/90">
          Much of our understanding of the universe beyond the solar system
          comes from the properties of electromagnetic waves received from
          space — but <em>how</em>? How can light tell us the composition of a
          planet&apos;s atmosphere from hundreds of light-years away? Or that
          some smudge in an image is a galaxy born near the dawn of the
          universe, billions of years ago?
        </p>
        <p className="text-sm leading-relaxed text-titan-text-primary/90">
          Radio astronomy covers the longest-wavelength end of that spectrum.
          Titan Observatory will initially observe at the 21&thinsp;cm hydrogen
          line (1420&thinsp;MHz), detecting the neutral hydrogen that permeates
          the Milky Way — including mapping its rotation curve, one of the
          first clues we had for the existence of dark matter.
        </p>
        <p className="text-sm leading-relaxed text-titan-text-primary/90">
          By creating a more accessible and engaging way to experience radio
          astronomy, we hope to inspire future astronomers and help curious
          citizen scientists better understand what the electromagnetic spectrum
          can tell us about the universe we live in.
        </p>
      </section>

      {/* ── What Your Support Enables (expanded) ── */}
      <section className="mx-auto max-w-3xl space-y-5">
        <h2 className="text-2xl font-semibold text-titan-text-secondary">
          What Your Support Enables
        </h2>
        <p className="text-sm leading-relaxed text-titan-text-primary/90">
          Donations fund telescope acquisition, site preparation, and
          modernization of the control system. The dish itself is a
          Scientific-Atlanta Cassegrain on an ANTLab precision positioner —
          maintained by its current owner for nearly 50 years after purchasing
          it directly from NASA, and still fully operational. Once observations
          are routine, the next step is to produce curricula which integrate
          real telescope time.
        </p>
        <ul className="space-y-2 text-sm leading-relaxed text-titan-text-primary/90">
          <li className="flex gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-titan-orange" />
            Extend observation range with additional frequency bands for a
            wider variety of science and education opportunities
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-titan-orange" />
            Scale observation capacity with additional dishes — the
            infrastructure and platform will be designed to support
            interferometry experiments
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-titan-orange" />
            Self-hosted infrastructure for maximum uptime and independence
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-titan-orange" />
            Documentation and curricula so anyone can learn on real equipment
          </li>
        </ul>
      </section>

      {/* ── Roadmap ── */}
      <section id="roadmap" className="scroll-mt-24 space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-titan-orange">
              Where we are
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-titan-text-secondary">
              Roadmap to First Light
            </h2>
            <p className="mt-1 text-sm text-titan-text-muted">
              Three phases from acquisition to open remote observations.
            </p>
          </div>
          <span className="rounded-2xl border border-titan-border/60 bg-titan-bg-alt/60 px-5 py-3 text-right text-xs uppercase tracking-[0.2em] text-titan-text-muted">
            <span className="block text-titan-text-secondary">
              Working total
            </span>
            <span className="mt-1 block text-2xl font-semibold normal-case tracking-normal text-titan-text-secondary">
              $147,800
            </span>
            <span className="mt-1 block text-sm normal-case tracking-normal text-titan-text-primary/80">
              + 10% contingency &asymp; $162,580
            </span>
          </span>
        </div>

        <PhaseTimeline phases={phases} />
      </section>

      {/* ── Team Preview ── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-titan-text-secondary">
          The Team
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {teamPreview.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center gap-3 rounded-2xl border border-titan-border/60 bg-titan-bg-alt/80 p-5 text-center backdrop-blur-sm"
            >
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-full border border-titan-border/60 object-cover"
                />
              ) : (
                <span className="flex h-20 w-20 items-center justify-center rounded-full border border-titan-border/60 bg-titan-bg/60">
                  <IconUser size={32} className="text-titan-text-muted" />
                </span>
              )}
              <div>
                <p className="text-sm font-semibold text-titan-text-secondary">
                  {member.name}
                </p>
                <p className="text-xs text-titan-text-muted">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/team"
            className="inline-flex items-center gap-1 text-sm font-semibold text-titan-text-secondary underline decoration-titan-border/60 underline-offset-2 transition hover:text-titan-yellow hover:decoration-titan-yellow"
          >
            Meet the full team &rarr;
          </Link>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="rounded-2xl border border-titan-border/50 bg-titan-bg-alt/60 p-8 text-center backdrop-blur-sm">
        <h2 className="text-2xl font-semibold text-titan-text-secondary">
          Help Build the Observatory
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-titan-text-primary/80">
          Every tax-deductible donation brings Titan closer to first light.
        </p>
        <Link
          href="/donate"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-titan-orange px-7 py-3 text-sm font-bold text-titan-bg transition hover:brightness-110"
        >
          Support the Observatory
        </Link>
      </section>
    </main>
  );
}
