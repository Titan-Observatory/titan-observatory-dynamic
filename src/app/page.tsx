import Image from "next/image";
import GofundmeEmbed from "@/components/GofundmeEmbed";

export const revalidate = 3600;

const fundingHighlights = [
  "Secure the 10-meter NASA-built radio telescope and finalize relocation.",
  "Install a new foundation, electrical service, and lightning protection at the Florida site.",
  "Upgrade motion control, encoders, and feeds for modern remote operation.",
  "Bring the site online with hardened networking, scheduling, and data delivery tools.",
  "Cover permits, insurance, and RFI baselining so student data starts clean.",
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
    status: "Next",
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
            Titan Astronomical Observatory (TAO) is a Florida nonprofit on a mission to reopen a
            NASA-built 10-meter radio telescope for students, teachers, and lifelong explorers. The
            team has secured an option on the instrument, a site to host it, and the roadmap to
            modernize every subsystem so classrooms anywhere can run real observations.
          </p>
          <p className="text-sm leading-relaxed text-titan-text-muted">
            The option contract is active, the relocation crew is ready, and each contribution keeps
            the schedule tight so classrooms can start booking observing time sooner.
          </p>
          <div className="max-w-[420px]">
            <GofundmeEmbed />
          </div>
        </div>
        <figure className="relative w-full overflow-hidden rounded-[2rem] border border-titan-border/70 bg-titan-bg-alt/50 shadow-titan aspect-[3/4]">
          <Image
            src="/images/titan.png"
            alt="The Titan radio telescope awaiting modernization."
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 420px, 60vw"
            priority
          />
        </figure>
      </section>

      <section className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <h2 className="text-2xl font-semibold text-titan-text-secondary">Why It Matters</h2>
          <p className="text-sm leading-relaxed text-titan-text-primary/90">
            Hands-on science changes lives. Titan gives classrooms and independent researchers the
            ability to schedule time, capture calibrated data, and publish discoveries without owning
            an observatory. Students get NASA-grade hardware, open schedules, and mentorship without
            the barrier of a graduate lab.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {fundingHighlights.map(item => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border-l-2 border-titan-blue/70 bg-transparent pl-4 pr-2 text-sm leading-relaxed text-titan-text-primary/90"
              >
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-titan-blue/70" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <aside className="space-y-3 rounded-3xl border-l-4 border-titan-purple/60 bg-transparent p-6 text-sm leading-relaxed text-titan-text-primary/90">
          <h3 className="text-base font-semibold text-titan-text-secondary">What Support Enables</h3>
          <p>
            Gifts and volunteer talent push us from raw hardware to a modern, automated facility:
          </p>
          <ul className="space-y-2">
            <li>- Remote go-to controls, safety interlocks, and adaptive pointing models</li>
            <li>- New RF front ends and calibrated signal chains for L-band and S-band work</li>
            <li>- Hardened network, scheduling software, and a student-friendly data portal</li>
          </ul>
        </aside>
      </section>

      <section className="space-y-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-titan-text-secondary">Roadmap to First Light</h2>
            <p className="text-sm text-titan-text-muted">
              Four focused phases carry Titan from acquisition to student-ready operations.
            </p>
          </div>
          <span className="rounded-full border border-titan-border/60 px-4 py-1 text-xs uppercase tracking-widest text-titan-text-muted">
            Working total ~ $118,000
          </span>
        </div>
        <div className="grid gap-12 lg:grid-cols-2 xl:grid-cols-4">
          {phases.map(phase => (
            <article
              key={phase.title}
              className="relative flex flex-col gap-3 border-l-2 border-titan-border/60 pl-6"
            >
              <span className="absolute -left-2 top-1.5 h-3 w-3 rounded-full border border-titan-border/40 bg-titan-orange/70" />
              <header>
                <h3 className="text-lg font-semibold text-titan-text-secondary">{phase.title}</h3>
                <p className="text-xs uppercase tracking-wider text-titan-text-muted">
                  Status: {phase.status}
                </p>
              </header>
              <ul className="space-y-2 text-sm leading-relaxed text-titan-text-primary/90">
                {phase.details.map(detail => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border-l-4 border-titan-green/70 bg-transparent p-10 text-sm leading-relaxed text-titan-text-primary/90">
        <h2 className="text-2xl font-semibold text-titan-text-secondary">Get Involved</h2>
        <p className="mt-3 max-w-4xl">
          We are assembling donors, engineers, educators, and storytellers to bring Titan online.
          Join the Discord community, sponsor a line item, or lend expertise in controls, RF, site
          prep, or software. Together we can deliver real NASA-grade data packages to the next
          generation of scientists and makers.
        </p>
      </section>
    </main>
  );
}
