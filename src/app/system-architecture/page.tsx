import type { Metadata } from "next";
import Link from "next/link";
import DiagramViewer from "./DiagramViewer";
import AnimatedSection from "@/components/AnimatedSection";
import { Timeline } from "@/components/ui/timeline";

export const metadata: Metadata = {
  title: "System Architecture | Titan Observatory",
  description: "System architecture diagrams and documentation.",
};

const architectureSteps = [
  {
    title: "Overview",
    content: (
      <p>
        The control system for the Titan Observatory will be built to let remote users run observations and collect data
        without worrying about what is happening under the hood. At the center of everything is the Observation Control
        Service (OCS), the brain of the telescope. It takes observation requests from users, keeps track of what is
        scheduled, and makes sure every part of the telescope and data pipeline works together smoothly.
      </p>
    ),
  },
  {
    title: "How a Request Runs",
    content: (
      <p>
        When a user logs into the observatory website and submits an observation, the OCS checks the request and adds it
        to the queue. From there, the OCS orchestrates the commands that each subsystem needs to execute for that
        observation. For example, it might first tell the Telescope Control Service (TCS) to point at the galactic center
        and begin tracking. The TCS translates that high-level command into explicit instructions the motors understand,
        while continuously monitoring pointing accuracy.
      </p>
    ),
  },
  {
    title: "Data Handling",
    content: (
      <p>
        Data collected from the telescope moves through a processing pipeline that checks data quality and then writes
        results to the local storage array for rapid access. The system also keeps detailed records of observations and
        metadata, and maintains backups, so data is robust and well-documented.
      </p>
    ),
  },
  {
    title: "Monitoring & Safety",
    content: (
      <p>
        Environmental sensors feed real-time information on weather and site conditions, while specialized services watch
        equipment health and performance. All of these pieces report back to the Monitoring and Safety service, which
        continuously looks for abnormalities and can lock out systems to avoid dangerous situations, even without anyone
        on site.
      </p>
    ),
  },
  {
    title: "Outcome",
    content: (
      <p>
        This setup makes it possible for people anywhere to schedule and run their own radio astronomy observations while
        the hardware coordination and data management happen behind the scenes.
      </p>
    ),
  },
];

export default function SystemArchitecturePage() {
  return (
    <main className="relative z-10 space-y-20">
      {/* Header */}
      <header className="space-y-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-titan-purple sm:text-xs sm:tracking-[0.25em]">
          System Design
        </p>
        <h1 className="text-3xl font-bold text-titan-text-secondary sm:text-4xl">System Architecture</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-titan-text-primary/90">
          This is an early draft of our telescope control and data system architecture — it will evolve as we build and
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

      {/* Diagram */}
      <AnimatedSection>
        <div className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-titan-text-muted sm:text-xs sm:tracking-[0.25em]">
            Architecture Diagram
          </p>
          <DiagramViewer />
        </div>
      </AnimatedSection>

      {/* How It Works — Timeline */}
      <section className="space-y-8">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-titan-text-muted sm:text-xs sm:tracking-[0.25em]">
            How it works
          </p>
          <h2 className="text-2xl font-semibold text-titan-text-secondary">From Browser to Dish</h2>
        </div>
        <Timeline data={architectureSteps} />
      </section>

      {/* Bottom Callout */}
      <AnimatedSection className="rounded-3xl border border-titan-border/60 bg-titan-bg-alt/80 p-8 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-titan-text-secondary">This architecture is a living document</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-titan-text-primary/80">
          Follow development, ask questions, or contribute improvements on our community forum.
        </p>
        <a
          href="https://community.titanobservatory.org"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center justify-center rounded-full border border-titan-purple/60 bg-titan-purple/15 px-6 py-3 text-sm font-semibold text-titan-text-secondary transition hover:bg-titan-purple/25"
        >
          Visit the Forum
        </a>
      </AnimatedSection>
    </main>
  );
}
