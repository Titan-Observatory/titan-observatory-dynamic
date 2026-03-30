import Image from "next/image";
import Link from "next/link";
import PhaseTimeline from "@/components/PhaseTimeline";
import DiscordPresenceBadge from "@/components/DiscordPresenceBadge";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import DonorMessageCarousel from "@/components/DonorMessageCarousel";

export const revalidate = 3600;

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

export default function Home() {
  return (
    <main className="space-y-20">
      {/* ── Hero ── */}
      <section className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-titan-orange">
            501(c)(3) Nonprofit &middot; Phase 1 In Progress
          </p>
          <h1 className="text-4xl font-bold leading-tight text-titan-text-secondary sm:text-5xl">
            A 10-meter radio telescope,
            <br className="hidden sm:block" />
            <span className="text-titan-yellow"> open to everyone.</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-titan-text-primary/90">
            Our mission is to make radio astronomy more accessible than ever by acquiring and modernizing real scientific instrumentation, building an intuitive remote observing platform, and creating educational experiences that let the public, students, and aspiring researchers explore the universe through hands-on observation and data.</p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center rounded-full bg-titan-orange px-7 py-3 text-sm font-bold text-titan-bg transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-titan-orange"
            >
              Support the Observatory
            </Link>
            <Link
              href="#roadmap"
              className="inline-flex items-center justify-center rounded-full border border-titan-border/70 px-6 py-3 text-sm font-semibold text-titan-text-secondary transition hover:border-titan-orange/50 hover:bg-titan-orange/5"
            >
              See the Roadmap
            </Link>
          </div>
        </div>

        <BackgroundGradient
          containerClassName="rounded-[2rem]"
          className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] border border-titan-border/60 bg-titan-bg-alt/80 p-0 shadow-[0_28px_60px_-34px_rgba(12,16,40,0.95)]"
        >
          <Image
            src="/images/titan.webp"
            alt="The 10-meter Titan radio telescope dish."
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 420px, 60vw"
            priority
          />
        </BackgroundGradient>
      </section>

      {/* ── Donor Messages Carousel (falls back to trust band) ── */}
      <DonorMessageCarousel />

      {/* ── What Support Enables ── */}
      <section className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="flex justify-center lg:justify-start">
          <div className="w-full max-w-[420px]">
            <givebutter-widget className="block w-full" id="LyX3Yj"></givebutter-widget>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-titan-text-secondary">
            What Your Support Enables
          </h2>
          <p className="text-sm leading-relaxed text-titan-text-primary/90">
            Donations will be used to fund fund telescope acquisition, site
            preparation, and modernization of the control system. Once observations are routine, the next step is to produce curricula which integrate real telescope time. Topics covered would include the electromagnetic spectrum, cosmic radio sources, and how a radio telescope works.
          </p>
          <ul className="space-y-2 text-sm leading-relaxed text-titan-text-primary/90">
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-titan-orange" />
              Extend observation range. Pending dish characterization, we hope to add additional feeds to allow for a wider range of observations and educational opportunities.
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-titan-orange" />
              Scale observation capacity with additional dishes. The infrastructure and platform will be designed to be scalable, allowing us to repurpose old  interferometry experiments.
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
        </div>
      </section>

      {/* ── Audience Paths ── */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col rounded-2xl border border-titan-border/60 bg-titan-bg-alt/80 p-7 backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-titan-orange">
            Fund the mission
          </p>
          <h3 className="mt-3 text-lg font-semibold text-titan-text-secondary">
            Support the Observatory
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-titan-text-primary/80">
            Every tax-deductible donation brings Titan closer to reality. Help
            us make radio astronomy and hands-on science more accessible than
            ever.
          </p>
          <Link
            href="/donate"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-titan-orange px-5 py-2.5 text-sm font-semibold text-titan-bg transition hover:brightness-110"
          >
            Donate
          </Link>
        </div>

        <div className="flex flex-col rounded-2xl border border-titan-border/60 bg-titan-bg-alt/80 p-7 backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-titan-aqua">
            Join the team
          </p>
          <h3 className="mt-3 text-lg font-semibold text-titan-text-secondary">
            Volunteer or Contribute
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-titan-text-primary/80">
            RF engineering, signal processing, software, education writing,
            administration — there&apos;s a role for many skill sets.
          </p>
          <a
            href="https://forms.gle/MwwsctzD1G5woQAo6"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center rounded-full border border-titan-aqua/60 bg-titan-aqua/15 px-5 py-2.5 text-sm font-semibold text-titan-text-secondary transition hover:bg-titan-aqua/25"
          >
            Apply to Volunteer
          </a>
        </div>

        <div className="flex flex-col rounded-2xl border border-titan-border/60 bg-titan-bg-alt/80 p-7 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-titan-yellow">
            Explore the project
          </p>
          <h3 className="mt-3 text-lg font-semibold text-titan-text-secondary">
            Learn How It Works
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-titan-text-primary/80">
            Dive into system architecture, telescope specifications, site
            plans, and the concept dashboard.
          </p>
          <Link
            href="/system-architecture"
            className="mt-5 inline-flex items-center justify-center rounded-full border border-titan-purple/60 bg-titan-purple/15 px-5 py-2.5 text-sm font-semibold text-titan-text-secondary transition hover:bg-titan-purple/25"
          >
            Technical Details
          </Link>
        </div>
      </section>

      {/* ── Why It Matters ── */}
      <section className="mx-auto max-w-3xl space-y-5 text-center">
        <h2 className="text-2xl font-semibold text-titan-text-secondary">Why It Matters</h2>
        <p className="text-sm leading-relaxed text-titan-text-primary/90">
          Much of our understanding of the universe beyond the solar system
          comes from the properties of electromagnetic waves received from
          space, but <em>how</em>? How can light tell us the composition of a
          planet&apos;s atmosphere from hundreds of light-years away? Or that
          some smudge in an image is a galaxy born near the dawn of the universe, billions of years ago?
        </p>
        <p className="text-sm leading-relaxed text-titan-text-primary/90">
          We believe it's important to give the public the opportunity to perform 
          and understand their own observations of the universe, so that we can all share in the excitement 
          of future discoveries and feel connected to the science behind them.
        </p>
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
            <span className="block text-titan-text-secondary">Working total</span>
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

      {/* ── Mission Badge (secondary) ── */}
      <section className="rounded-2xl border border-titan-border/50 bg-titan-bg-alt/60 p-8 backdrop-blur-sm">
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-titan-text-muted">
              Donor thank-you
            </p>
            <h3 className="text-xl font-semibold text-titan-text-secondary">
              Mission Badge Gift
            </h3>
            <p className="text-sm leading-relaxed text-titan-text-primary/90">
              Every donation keeps the observatory moving forward. As a
              thank-you, qualifying contributions receive a mission badge.
              Please include your shipping address at checkout.
            </p>
            <div className="space-y-1.5 text-sm text-titan-text-primary/90">
              <p>
                <span className="font-semibold text-titan-text-secondary">$25+</span>{" "}
                — Mission badge sticker
              </p>
              <p>
                <span className="font-semibold text-titan-text-secondary">$50+</span>{" "}
                — Embroidered iron-on patch & sticker
              </p>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-[240px]">
              <Image
                src="/images/DonorBadge.webp"
                alt="Titan Observatory mission badge design."
                width={480}
                height={480}
                className="h-auto w-full rounded-2xl border border-titan-border/60 bg-titan-bg/60 p-4 shadow-[0_18px_40px_-30px_rgba(10,15,35,0.9)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Get Involved + Newsletter ── */}
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div className="space-y-5 rounded-2xl border border-titan-border/60 bg-titan-bg-alt/80 p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-titan-text-secondary">Get Involved</h2>
          <p className="text-sm leading-relaxed text-titan-text-primary/90">
            Building a remote radio observatory requires a wide range of skill
            sets — you don&apos;t have to be a radio astronomer or a master
            programmer to contribute. If you&apos;re just looking to learn,
            head to the community forum or join our Discord.
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
          <DiscordPresenceBadge className="w-full sm:w-auto" />
        </div>

        <div>
          <givebutter-widget className="block w-full" id="pzez1n"></givebutter-widget>
        </div>
      </section>
    </main>
  );
}
