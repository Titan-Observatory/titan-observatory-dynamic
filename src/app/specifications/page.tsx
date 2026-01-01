import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Specifications | Titan Observatory",
  description:
    "Explore the telescope and site specifications for Titan Observatory.",
};

export default function SpecificationsPage() {
  return (
    <main className="relative z-10 space-y-8">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold text-titan-text-secondary">Specifications</h1>
        <p className="text-sm leading-relaxed text-titan-text-primary/90">
          Explore the detailed specs for both the telescope hardware and the candidate site.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <Link
          href="/telescope-overview"
          className="group rounded-3xl border border-titan-border/60 bg-titan-bg-alt/90 p-6 text-sm leading-relaxed text-titan-text-primary/90 shadow-[0_14px_34px_-24px_rgba(8,12,24,0.8)] backdrop-blur-sm transition hover:border-titan-purple/40 hover:bg-titan-bg-alt/95"
        >
          <h2 className="text-xl font-semibold text-titan-text-secondary">Telescope Overview</h2>
          <p className="mt-2 text-sm text-titan-text-primary/90">
            Mechanical details, performance capabilities, and recent imagery of the 10-meter dish.
          </p>
          <span className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-[0.3em] text-titan-text-primary/70 transition group-hover:text-titan-text-secondary">
            View telescope specs
          </span>
        </Link>

        <Link
          href="/site-overview"
          className="group rounded-3xl border border-titan-border/60 bg-titan-bg-alt/90 p-6 text-sm leading-relaxed text-titan-text-primary/90 shadow-[0_14px_34px_-24px_rgba(8,12,24,0.8)] backdrop-blur-sm transition hover:border-titan-purple/40 hover:bg-titan-bg-alt/95"
        >
          <h2 className="text-xl font-semibold text-titan-text-secondary">Site Overview</h2>
          <p className="mt-2 text-sm text-titan-text-primary/90">
            Zoning, access, and radio-quiet environment considerations for the proposed location.
          </p>
          <span className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-[0.3em] text-titan-text-primary/70 transition group-hover:text-titan-text-secondary">
            View site specs
          </span>
        </Link>
      </section>
    </main>
  );
}
