import Image from "next/image";
import Link from "next/link";
import DiscordPresenceBadge from "@/components/DiscordPresenceBadge";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import DonorMessageCarousel from "@/components/DonorMessageCarousel";

export const revalidate = 3600;

export default function Home() {
  return (
    <main className="space-y-20 sm:space-y-20">
      <section className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-10">
        <div className="space-y-6 sm:space-y-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-titan-orange sm:text-xs sm:tracking-[0.25em]">
            Phase 1 In Progress
          </p>
          <h1 className="max-w-[13ch] text-[2.85rem] font-bold leading-[0.98] text-titan-text-secondary sm:max-w-none sm:text-5xl">
            A 10-meter radio telescope,
            <br className="hidden sm:block" />
            <span className="text-titan-yellow"> open to everyone.</span>
          </h1>
          <p className="max-w-2xl text-[1.05rem] leading-8 text-titan-text-primary/90 sm:text-lg">
            Our mission is to make radio astronomy more accessible than ever by
            acquiring and modernizing real scientific instrumentation, building
            an intuitive remote observing platform, and creating educational
            experiences that let the public, students, and aspiring researchers
            explore the universe through hands-on observation and data.
          </p>
          <div className="flex flex-col gap-4 pt-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              href="/donate"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-titan-orange px-7 py-3.5 text-sm font-bold text-titan-bg transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-titan-orange sm:w-auto"
            >
              Support the Observatory
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-titan-border/70 px-6 py-3.5 text-sm font-semibold text-titan-text-secondary transition hover:border-titan-orange/50 hover:bg-titan-orange/5 sm:w-auto"
            >
              Learn More
            </Link>
          </div>
        </div>

        <BackgroundGradient
          containerClassName="mx-auto w-full max-w-[28rem] rounded-[2rem]"
          className="relative h-[70svh] min-h-[28rem] w-full overflow-hidden rounded-[2rem] border border-titan-border/60 bg-titan-bg-alt/80 p-0 shadow-[0_28px_60px_-34px_rgba(12,16,40,0.95)] sm:h-auto sm:min-h-0 sm:aspect-[4/5] lg:aspect-[3/4]"
        >
          <Image
            src="/images/titan.webp"
            alt="The 10-meter Titan radio telescope dish."
            fill
            className="object-cover object-[54%_42%] sm:object-center"
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 60vw, 100vw"
            priority
          />
        </BackgroundGradient>
      </section>

      <div className="-mb-2 sm:-mb-10">
        <DonorMessageCarousel />
      </div>

      <section className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        <div className="flex flex-col rounded-3xl border border-titan-border/60 bg-titan-bg-alt/80 p-6 backdrop-blur-sm sm:p-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-titan-orange sm:text-xs sm:tracking-[0.25em]">
            Fund the mission
          </p>
          <h3 className="mt-4 text-xl font-semibold text-titan-text-secondary sm:text-lg">
            Support the Observatory
          </h3>
          <p className="mt-3 flex-1 text-sm leading-7 text-titan-text-primary/80">
            Every tax-deductible donation brings Titan closer to reality. Help
            us make radio astronomy and hands-on science more accessible than
            ever.
          </p>
          <Link
            href="/donate"
            className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-titan-orange px-5 py-3 text-sm font-semibold text-titan-bg transition hover:brightness-110 sm:w-auto"
          >
            Donate
          </Link>
        </div>

        <div className="flex flex-col rounded-3xl border border-titan-border/60 bg-titan-bg-alt/80 p-6 backdrop-blur-sm sm:p-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-titan-aqua sm:text-xs sm:tracking-[0.25em]">
            Join the team
          </p>
          <h3 className="mt-4 text-xl font-semibold text-titan-text-secondary sm:text-lg">
            Volunteer or Contribute
          </h3>
          <p className="mt-3 flex-1 text-sm leading-7 text-titan-text-primary/80">
            RF engineering, signal processing, software, education writing,
            administration - there&apos;s a role for many skill sets.
          </p>
          <a
            href="https://forms.gle/MwwsctzD1G5woQAo6"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-titan-aqua/60 bg-titan-aqua/15 px-5 py-3 text-sm font-semibold text-titan-text-secondary transition hover:bg-titan-aqua/25 sm:w-auto"
          >
            Apply to Volunteer
          </a>
        </div>

        <div className="flex flex-col rounded-3xl border border-titan-border/60 bg-titan-bg-alt/80 p-6 backdrop-blur-sm sm:col-span-2 sm:p-7 lg:col-span-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-titan-yellow sm:text-xs sm:tracking-[0.25em]">
            Explore the project
          </p>
          <h3 className="mt-4 text-xl font-semibold text-titan-text-secondary sm:text-lg">
            Learn How It Works
          </h3>
          <p className="mt-3 flex-1 text-sm leading-7 text-titan-text-primary/80">
            Our mission, the roadmap, telescope specifications, site plans,
            and system architecture.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-titan-purple/60 bg-titan-purple/15 px-5 py-3 text-sm font-semibold text-titan-text-secondary transition hover:bg-titan-purple/25 sm:w-auto"
          >
            About the Project
          </Link>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
        <div className="min-w-0 flex justify-center lg:justify-start">
          <div className="w-full max-w-[420px] overflow-hidden">
            <givebutter-widget className="block w-full" id="LyX3Yj"></givebutter-widget>
          </div>
        </div>
        <div className="space-y-6 sm:space-y-6">
          <h2 className="text-2xl font-semibold text-titan-text-secondary">
            What Your Support Enables
          </h2>
          <p className="text-sm leading-7 text-titan-text-primary/90">
            Every dollar goes directly toward expert consultations, site evaluation, and planning work. Once we have enough professional input to confirm the viability of the project, more detailed plans will be shared publicly before funds are used to acquire the telescope.
          </p>
          <div className="space-y-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-titan-text-muted sm:text-xs sm:tracking-[0.25em]">
              Looking ahead
            </p>
            <ul className="space-y-5 text-sm leading-7 text-titan-text-primary/90">
              <li className="flex gap-4">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-titan-orange" />
                <span>
                  <strong className="font-semibold text-titan-text-secondary">
                    Broader frequency coverage.
                  </strong>{" "}
                  Pending dish characterization, we hope to add L- and S-band
                  RF chains alongside the 21 cm hydrogen line feed, opening up
                  a wider range of science targets and educational experiments.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-titan-orange" />
                <span>
                  <strong className="font-semibold text-titan-text-secondary">
                    A network of dishes.
                  </strong>{" "}
                  The infrastructure will be designed from the start to be
                  scalable. Our team will work to integrate donated dishes over
                  time, increasing observation capacity and creating
                  opportunities for amateur interferometry.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-titan-orange" />
                <span>
                  <strong className="font-semibold text-titan-text-secondary">
                    Integrated science education.
                  </strong>{" "}
                  Once routine observations are underway, we plan to develop
                  curricula that put real telescope time in students&apos; hands,
                  covering the electromagnetic spectrum, cosmic radio sources,
                  and how a radio telescope works from first principles.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-titan-border/50 bg-titan-bg-alt/60 p-7 backdrop-blur-sm sm:p-8">
        <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-center">
          <div className="space-y-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-titan-text-muted sm:text-xs sm:tracking-[0.25em]">
              Donor thank-you
            </p>
            <h3 className="text-xl font-semibold text-titan-text-secondary">
              Mission Badge Gift
            </h3>
            <p className="text-sm leading-7 text-titan-text-primary/90">
              Every donation keeps the observatory moving forward. As a
              thank-you, qualifying contributions receive a mission badge.
              Please include your shipping address at checkout.
            </p>
            <div className="space-y-1.5 text-sm text-titan-text-primary/90">
              <p>
                <span className="font-semibold text-titan-text-secondary">
                  $25+
                </span>{" "}
                - Mission badge sticker
              </p>
              <p>
                <span className="font-semibold text-titan-text-secondary">
                  $50+
                </span>{" "}
                - Embroidered iron-on patch and sticker
              </p>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-[220px] sm:max-w-[240px]">
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

      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-8">
        <div className="space-y-6 rounded-3xl border border-titan-border/60 bg-titan-bg-alt/80 p-7 backdrop-blur-sm sm:p-8">
          <h2 className="text-2xl font-semibold text-titan-text-secondary">
            Get Involved
          </h2>
          <p className="text-sm leading-7 text-titan-text-primary/90">
            Building a remote radio observatory requires a wide range of skill
            sets - you don&apos;t have to be a radio astronomer or a master
            programmer to contribute. If you&apos;re just looking to learn,
            head to the community forum or join our Discord.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="https://forms.gle/MwwsctzD1G5woQAo6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-titan-purple/70 bg-titan-purple px-6 py-3 text-sm font-semibold text-titan-text-secondary transition hover:bg-[#565b7a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-titan-purple sm:w-auto"
            >
              Apply to Volunteer
            </a>
            <a
              href="https://community.titanobservatory.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-titan-blue/60 bg-titan-blue/20 px-6 py-3 text-sm font-semibold text-titan-text-secondary transition hover:bg-titan-blue/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-titan-blue sm:w-auto"
            >
              Visit the Forum
            </a>
          </div>
          <DiscordPresenceBadge className="w-full sm:w-auto" />
        </div>

        <div className="mx-auto w-full max-w-[420px] overflow-hidden lg:max-w-none">
          <givebutter-widget className="block w-full" id="pzez1n"></givebutter-widget>
        </div>
      </section>
    </main>
  );
}
