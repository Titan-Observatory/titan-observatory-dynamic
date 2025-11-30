import Image from "next/image";
import GofundmeEmbed from "@/components/GofundmeEmbed";
import PhaseTimeline from "@/components/PhaseTimeline";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import NewsletterForm from "@/components/NewsletterForm";
import DiscordPresenceBadge from "@/components/DiscordPresenceBadge";

export const revalidate = 3600;

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
            purchasing this 10m radio telescope, modernizing it's control system, and building a user-friendly web portal to schedule observing time.
            Our long-term vision is to bridge the gap between curious learner and PhD candidate by providing both the materials to learn the basics of radio astronomy,
            and NASA-quality instrumentation to use them on.

            We’re an officially incorporated 
            nonprofit (501(c)(3) pending) with a four-member board, a site secured, and a 
            core team planning for the future.
          </p>
          <p className="text-sm leading-relaxed text-titan-text-muted">
            The dish itself is a 10-meter Scientific-Atlanta Cassegrain on a Antlab precision positioner the current owner purchased directly from
            NASA nearly 50 years ago. It's been carefully maintained and fully operational, with a dehumidifier running 24/7, zero backlash, and balanced well enough to move by hand.
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
            Hands-on science is one of the greatest ways to learn, and unfortunately the nature of radio astronomy (and RF in general) limits anyone curious to words on a page or daunting math, unless they want to commit to attain a PhD or build their own radio telescope.
          </p>
          <p className="text-sm leading-relaxed text-titan-text-primary/90">
            We'd like to help by putting real scientific instruments in the hands of more people, and offer guides, basic lessons, and eventually curriculums so that citizen scientists of all skill levels can learn how to use this telescope and interpret its data.
          </p>
        </div>
        <aside className="space-y-3 rounded-3xl border-l-4 border-titan-purple/60 bg-transparent p-6 text-sm leading-relaxed text-titan-text-primary/90">
          <h3 className="text-base font-semibold text-titan-text-secondary">What Support Enables</h3>
          <p>Donations and volunteer time help us save this precision scientific instrument and make it accessible by anyone:</p>
          <ul className="space-y-2">
            <li>- Remote operation including a web portal, flexible controls, and data visualizations</li>
            <li>- High quality RF chains and calibrated feeds for bands of interest</li>
            <li>- Local hosting for all services (except backups) to maximize availability</li>
            <li>- Documentation and guides to allow anyone to learn on real equipment</li>
          </ul>
        </aside>
      </section>

      <section className="grid gap-12 rounded-3xl border border-titan-border/60 bg-titan-bg-alt/80 p-8 shadow-[0_22px_48px_-36px_rgba(10,15,35,0.9)] backdrop-blur-md md:grid-cols-[2fr_1fr] md:items-start">
        <div className="space-y-5">
          <h2 className="text-2xl font-semibold text-titan-text-secondary">Get involved!</h2>
          <p className="text-sm leading-relaxed text-titan-text-primary/90">
            If this is something you'd like to become a part of, apply to volunteer! Building a remote radio observatory is no small task, and requires a wide range of skillsets, so you dont have to be a radio astronomer or a master programmer to contribute. 
          </p>
          <p className="text-sm leading-relaxed text-titan-text-primary/90">
            If you're just looking to learn more about radio astronomy, head over to our community forum or join our discord! We have 400+ community members with places to ask questions and hang out with the community.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://forms.gle/MwwsctzD1G5woQAo6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-titan-purple/70 bg-titan-purple px-6 py-2.5 text-sm font-semibold text-titan-text-secondary transition hover:bg-[#565b7a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-titan-purple"
            >
              Apply to Volunteer
            </a>
            <a
              href="https://community.titanobservatory.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-titan-blue/60 bg-titan-blue/20 px-6 py-2.5 text-sm font-semibold text-titan-text-secondary transition hover:bg-titan-blue/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-titan-blue"
            >
              Visit the Forum
            </a>
          </div>
          <div className="pt-1">
            <DiscordPresenceBadge className="w-full sm:w-auto" />
          </div>
        </div>
        <aside className="space-y-4 text-sm leading-relaxed text-titan-text-primary/90">
          <h3 className="text-base font-semibold text-titan-text-secondary">Helpful skills</h3>
          <p className="text-sm leading-relaxed text-titan-text-primary/90">Be aware we may not need some of these until later stages of the project, so while you wait, check out the forum!</p>
          <ul className="space-y-2">
            <li>- RF/HAM</li>
            <li>- Signal Chain (LNAs, SDR, Feeds, etc.)</li>
            <li>- Signal Processing/Calibration</li>
            <li>- Administration (Finance, Community Management, etc.)</li>
            <li>- Educational Writer</li>
          </ul>
        </aside>
      </section>

      <section className="rounded-3xl border border-titan-border/60 bg-titan-bg-alt/80 p-8 shadow-[0_22px_48px_-36px_rgba(10,15,35,0.9)] backdrop-blur-md">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-titan-text-muted">Newsletter</p>
          <h2 className="text-2xl font-semibold text-titan-text-secondary">Stay in the loop</h2>
          <p className="text-sm leading-relaxed text-titan-text-primary/90">
            Drop your email below to get occasional updates on construction progress, community events, and upcoming observing opportunities.
          </p>
        </div>
        <div className="mt-6">
          <NewsletterForm />
        </div>
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

    </main>
  );
}
