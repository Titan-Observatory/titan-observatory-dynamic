import Image from "next/image";
import PhaseTimeline from "@/components/PhaseTimeline";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import NewsletterForm from "@/components/NewsletterForm";
import DiscordPresenceBadge from "@/components/DiscordPresenceBadge";

export const revalidate = 3600;

const phases = [
  {
    title: "Phase 1 - Acquire & Prep Site",
    status: "In progress",
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
    title: "Phase 2 - Transport & Modernize",
    status: "Preparing",
    estimate: { },
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
    title: "Phase 3 - First Light & Operations",
    status: "Upcoming",
    estimate: {},
    details: [
      "Development of telescope control systems led by staff volunteers with community involvement",
      "Web platform for scheduling observations and accessing lessons created",
      "Curricula and public courses developed to teach the fundamentals of radio astronomy & related subjects",
    ],
  },
];

export default function Home() {
  return (
    <main className="space-y-16">
      <section className="grid items-start gap-14 lg:grid-cols-[1.25fr_0.95fr] xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-titan-text-secondary">
            Rebuild the Titan 10m Radio Telescope
          </h1>
          <p className="text-lg leading-relaxed text-titan-text-primary/90">
            Titan Astronomical Observatory is a Florida 501(c)(3) rebuilding a 10-meter radio telescope for secure
            remote operations. We are modernizing the control system, building a scheduling portal, and publishing
            coursework so students and citizen scientists can run real observations and analyze real data.
          </p>
          <p className="text-sm leading-relaxed text-titan-text-muted">
            The dish itself is a 10-meter Scientific-Atlanta Cassegrain on an ANTLab precision positioner that the
            current owner purchased directly from NASA nearly 50 years ago. It&apos;s been carefully maintained and fully
            operational, with a dehumidifier running 24/7, zero backlash, and balanced well enough to move by hand.
          </p>
        </div>
        <BackgroundGradient
          containerClassName="rounded-[2rem]"
          className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] border border-titan-border/60 bg-titan-bg-alt/80 p-0 shadow-[0_28px_60px_-34px_rgba(12,16,40,0.95)]"
        >
          <Image
            src="/images/titan.webp"
            alt="The Titan radio telescope awaiting modernization."
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 420px, 60vw"
            priority
          />
        </BackgroundGradient>
      </section>

      <section className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="flex justify-center lg:justify-start">
          <div className="w-full max-w-[420px] overflow-hidden rounded-3xl border border-titan-border/60 bg-titan-text-secondary/95 shadow-[0_18px_40px_-30px_rgba(10,15,35,0.9)]">
            <givebutter-widget className="block w-full" id="LyX3Yj"></givebutter-widget>
          </div>
        </div>
        <div className="space-y-10">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold text-titan-text-secondary">How the Observatory Will Be Used</h2>
            <p className="text-sm leading-relaxed text-titan-text-primary/90">
              Most learners never get instrument time in radio astronomy. We are removing that barrier with remote
              access to a production telescope.
            </p>
            <p className="text-sm leading-relaxed text-titan-text-primary/90">
              The platform combines queue scheduling, telemetry, and downloadable datasets so classes and independent
              researchers can move from theory to measured sky signals.
            </p>
          </div>
          <aside className="space-y-3 rounded-3xl border-l-4 border-titan-purple/60 bg-transparent p-6 text-sm leading-relaxed text-titan-text-primary/90">
            <h3 className="text-base font-semibold text-titan-text-secondary">Support the Build</h3>
            <p>Donations and volunteer hours fund the systems required to deliver reliable public observing access:</p>
            <ul className="space-y-2">
              <li>- Remote operation including a web portal, flexible controls, and data visualizations</li>
              <li>- High-quality RF chains and calibrated feeds for bands of interest</li>
              <li>- Local hosting for all services (except backups) to maximize availability</li>
              <li>- Documentation and guides to allow anyone to learn on real equipment</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="grid gap-8 rounded-3xl border border-titan-border/60 bg-titan-bg-alt/80 p-8 shadow-[0_22px_48px_-36px_rgba(10,15,35,0.9)] backdrop-blur-md md:grid-cols-[1.15fr_0.85fr] md:items-center">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-titan-text-muted">Mission badge gift</p>
          <h2 className="text-2xl font-semibold text-titan-text-secondary">Mission Badge for Donors</h2>
          <p className="text-sm leading-relaxed text-titan-text-primary/90">
            Qualified donations receive a mission badge package. Include your shipping address at checkout so we can
            ship rewards without delay.
          </p>
          <div className="space-y-2 text-base text-titan-text-primary/90 sm:text-lg">
            <p>
              <span className="font-semibold text-titan-text-secondary">$25+:</span> Mission badge sticker of the design.
            </p>
            <p>
              <span className="font-semibold text-titan-text-secondary">$50+:</span> Embroidered iron-on patch & sticker
            </p>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="w-full max-w-[280px]">
            <Image
              src="/images/DonorBadge.webp"
              alt="Titan Observatory mission badge design."
              width={480}
              height={480}
              className="h-auto w-full rounded-2xl border border-titan-border/60 bg-titan-bg/60 p-4 shadow-[0_18px_40px_-30px_rgba(10,15,35,0.9)]"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-12 rounded-3xl border border-titan-border/60 bg-titan-bg-alt/80 p-8 shadow-[0_22px_48px_-36px_rgba(10,15,35,0.9)] backdrop-blur-md md:grid-cols-[2fr_1fr] md:items-start">
        <div className="space-y-5">
          <h2 className="text-2xl font-semibold text-titan-text-secondary">Ways to Contribute</h2>
          <p className="text-sm leading-relaxed text-titan-text-primary/90">
            Building a remotely operated observatory takes engineering, software, operations, and education work.
            Apply to volunteer if you want to help ship specific parts of the build.
          </p>
          <p className="text-sm leading-relaxed text-titan-text-primary/90">
            If you are here to learn first, join the forum or Discord to follow progress and prepare for observing
            programs.
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
          <h3 className="text-base font-semibold text-titan-text-secondary">Skills We Need</h3>
          <p className="text-sm leading-relaxed text-titan-text-primary/90">
            Some roles open later in the roadmap. Join the forum to track when each workstream starts.
          </p>
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
          <h2 className="text-2xl font-semibold text-titan-text-secondary">Project Updates</h2>
          <p className="text-sm leading-relaxed text-titan-text-primary/90">
            Get periodic updates on modernization milestones, commissioning runs, and upcoming observing access.
          </p>
        </div>
        <div className="mt-6">
          <NewsletterForm />
        </div>
      </section>

      <section className="space-y-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-titan-text-secondary">Project Progress</h2>
            <p className="text-sm text-titan-text-muted">
              Hardware, control software, and operations milestones leading to first light.
            </p>
            {/* <p className="text-sm text-titan-text-muted">
              The full operating budget is being updated with feedback. For an up-to-date budget, please contact{" "}
              <a href="mailto:contact@titanobservatory.com">contact@titanobservatory.com</a> for more information.
            </p> */}
          </div>
          {
          <span className="rounded-3xl border border-titan-border/60 px-6 py-4 text-right text-xs uppercase tracking-[0.3em] text-titan-text-muted">
            <span className="block text-titan-text-secondary">Working total</span>
            <span className="mt-2 block text-2xl font-semibold normal-case tracking-normal text-titan-text-secondary">
              $147,800
            </span>
            <span className="mt-2 block text-sm normal-case tracking-normal text-titan-text-primary/80">
              + 10% contingency approx. $162,580
            </span>
          </span>
          }
        </div>

        {
        <PhaseTimeline phases={phases} />
        }
      </section>

    </main>
  );
}
