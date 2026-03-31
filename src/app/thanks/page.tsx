import Link from "next/link";
import { IconTelescope } from "@tabler/icons-react";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata = {
  title: "Thanks for joining | Titan Astronomical Observatory",
  description: "Thanks for being part of the Titan Astronomical Observatory newsletter.",
};

export default function NewsletterThanksPage() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-16">
      <AnimatedSection className="w-full max-w-xl space-y-6 rounded-3xl border border-titan-border/60 bg-titan-bg-alt/80 p-10 text-center shadow-[0_22px_48px_-36px_rgba(10,15,35,0.9)] backdrop-blur-md">
        <IconTelescope className="mx-auto h-10 w-10 text-titan-yellow" aria-hidden="true" />
        <p className="text-xs uppercase tracking-[0.35em] text-titan-text-muted">Newsletter</p>
        <h1 className="text-3xl font-semibold text-titan-text-secondary">Thanks for joining our newsletter!</h1>
        <p className="text-sm leading-relaxed text-titan-text-primary/90">
          You&apos;re officially on the list! Expect occasional notes on fundraising milestones, construction progress, and ways
          you can help bring the observatory online.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-titan-purple/60 bg-titan-purple px-6 py-2.5 text-sm font-semibold text-titan-text-secondary transition hover:bg-[#565b7a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-titan-purple"
          >
            Back to homepage
          </Link>
          <a
            href="https://community.titanobservatory.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-titan-blue/60 bg-titan-blue/20 px-6 py-2.5 text-sm font-semibold text-titan-text-secondary transition hover:bg-titan-blue/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-titan-blue"
          >
            Visit the forum
          </a>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="mt-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-titan-text-muted">
          While you&apos;re here
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/about"
            className="text-sm font-semibold text-titan-text-secondary underline decoration-titan-border/60 underline-offset-2 transition hover:text-titan-yellow hover:decoration-titan-yellow"
          >
            Learn about the project &rarr;
          </Link>
          <Link
            href="/telescope-overview"
            className="text-sm font-semibold text-titan-text-secondary underline decoration-titan-border/60 underline-offset-2 transition hover:text-titan-yellow hover:decoration-titan-yellow"
          >
            See the telescope &rarr;
          </Link>
        </div>
      </AnimatedSection>
    </main>
  );
}
