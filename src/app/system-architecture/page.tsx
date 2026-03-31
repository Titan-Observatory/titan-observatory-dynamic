import type { Metadata } from "next";
import Link from "next/link";
import DiagramViewer from "./DiagramViewer";
import AnimatedSection from "@/components/AnimatedSection";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "System Architecture | Titan Observatory",
  description: "System architecture diagrams and documentation.",
};

const architectureSteps = [
  {
    step: "01",
    color: "text-titan-aqua",
    borderColor: "border-titan-aqua/30",
    bgColor: "bg-titan-aqua/10",
    title: "You Submit a Request",
    content: (
      <p>
        You log into the observatory website, pick a target, and submit. The request hits the{" "}
        <strong className="font-semibold text-titan-aqua">Observation API</strong>, which
        authenticates you and validates the request. Approved observations are handed off to the Observation Control
        Service and added to the scheduling queue.
      </p>
    ),
  },
  {
    step: "02",
    color: "text-titan-purple",
    borderColor: "border-titan-purple/30",
    bgColor: "bg-titan-purple/10",
    title: "The OCS Coordinates Everything",
    content: (
      <p>
        The <strong className="font-semibold text-titan-purple">Observation Control Service (OCS)</strong> is the
        brain of the system. It manages the observation queue, enforces scheduling constraints, and issues high-level
        commands to every subsystem (the telescope, the instruments, and the data pipeline) in the right order. None of
        the subsystems talk to each other directly; everything flows through the OCS.
      </p>
    ),
  },
  {
    step: "03",
    color: "text-titan-orange",
    borderColor: "border-titan-orange/30",
    bgColor: "bg-titan-orange/10",
    title: "The Dish Points and Tracks",
    content: (
      <p>
        The OCS tells the{" "}
        <strong className="font-semibold text-titan-orange">Telescope Control Service (TCS)</strong> where to
        point. The TCS calculates precise motor trajectories and drives the PLC/motor drivers to move the dish. It
        continuously reads back pointing accuracy and mount state, enforcing limits and tracking the target as the Earth
        rotates. The Monitoring &amp; Safety Service can interrupt the TCS if a safety threshold is crossed.
      </p>
    ),
  },
  {
    step: "04",
    color: "text-titan-yellow",
    borderColor: "border-titan-yellow/30",
    bgColor: "bg-titan-yellow/10",
    title: "The Signal Is Captured",
    content: (
      <p>
        While the dish is tracking, the{" "}
        <strong className="font-semibold text-titan-yellow">Instrument Control Service (ICS)</strong> configures
        the RF front-end by selecting inputs, cooling low-noise amplifiers (LNAs), and controlling the noise diode
        for calibration. The{" "}
        <strong className="font-semibold text-titan-yellow">Data Handling Service (DHS)</strong> controls the
        digitizer backend, receives the raw data stream, checks data quality, and writes both raw and processed data
        products to the on-site ZFS archive.
      </p>
    ),
  },
  {
    step: "05",
    color: "text-titan-red",
    borderColor: "border-titan-red/30",
    bgColor: "bg-titan-red/10",
    title: "Safety Runs in the Background",
    content: (
      <p>
        The{" "}
        <strong className="font-semibold text-titan-red">Monitoring &amp; Safety Service</strong> (built on Python
        and Prometheus) monitors various systems, including motor currents, limit switch states, RF chain temperatures, and
        readings from external environmental sensors on site. If anything looks wrong, it evaluates safety rules, can
        trigger fail-safes, and alerts the team.
      </p>
    ),
  },
  {
    step: "06",
    color: "text-titan-green",
    borderColor: "border-titan-green/30",
    bgColor: "bg-titan-green/10",
    title: "Your Data Is Ready",
    content: (
      <p>
        Processed data products live in the on-site ZFS archive for fast access. Observation metadata, scheduling
        records, and data-product references are stored in{" "}
        <strong className="font-semibold text-titan-green">PostgreSQL</strong>. Both are backed up to S3
        Glacier. The Observation API reads from the database so you can download your results directly from the website, with no manual file transfers required.
      </p>
    ),
  },
];

export default function SystemArchitecturePage() {
  return (
    <main className="relative z-10 space-y-20">
      <header className="space-y-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-titan-purple sm:text-xs sm:tracking-[0.25em]">
          System Design
        </p>
        <h1 className="text-3xl font-bold text-titan-text-secondary sm:text-4xl">System Architecture</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-titan-text-primary/90">
          This is an early draft of our telescope control and data system architecture. It will evolve as we build and
          gather feedback. We&apos;ll publish the services on GitHub under an open-source license so you can browse the
          code and contribute improvements.
        </p>
        <Link
          href="/concept-dashboard"
          className="inline-flex items-center gap-1 text-sm font-semibold text-titan-text-secondary underline decoration-titan-border/60 underline-offset-2 transition hover:text-titan-yellow hover:decoration-titan-yellow"
        >
          See the concept dashboard &rarr;
        </Link>
      </header>

      <AnimatedSection>
        <div className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-titan-text-muted sm:text-xs sm:tracking-[0.25em]">
            Architecture Diagram
          </p>
          <DiagramViewer />
        </div>
      </AnimatedSection>

      <section className="space-y-8">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-titan-text-muted sm:text-xs sm:tracking-[0.25em]">
            How it works
          </p>
          <h2 className="text-2xl font-semibold text-titan-text-secondary">From Browser to Dish</h2>
        </div>
        <div className="mx-auto max-w-3xl space-y-0 text-sm leading-relaxed text-titan-text-primary/90">
          {architectureSteps.map((step) => (
            <article key={step.title} className="flex gap-5 border-b border-titan-border/40 py-7 last:border-b-0 last:pb-0 first:pt-0">
              <span className={cn("shrink-0 flex h-7 w-7 items-center justify-center rounded-lg border text-[10px] font-bold font-mono mt-0.5", step.color, step.borderColor, step.bgColor)}>
                {step.step}
              </span>
              <div className="space-y-2">
                <h3 className={cn("text-base font-semibold", step.color)}>{step.title}</h3>
                <div>{step.content}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <AnimatedSection className="rounded-3xl border border-titan-border/60 bg-titan-bg-alt/80 p-8 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-titan-text-secondary">Share feedback on the architecture</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-titan-text-primary/80">
          This draft will evolve as the project develops. If you have questions, suggestions, or ideas for improvement,
          we&apos;d be glad to hear them.
        </p>
        <a
          href="https://community.titanobservatory.org"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center justify-center rounded-full border border-titan-purple/60 bg-titan-purple/15 px-6 py-3 text-sm font-semibold text-titan-text-secondary transition hover:bg-titan-purple/25"
        >
          Share Feedback
        </a>
      </AnimatedSection>
    </main>
  );
}
