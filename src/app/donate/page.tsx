import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DonorMessageCarousel from "@/components/DonorMessageCarousel";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Donate | Titan Observatory",
  description:
    "Support Titan Observatory with a tax-deductible donation. Give online, through a donor-advised fund, or contribute appreciated assets.",
};

export default function DonatePage() {
  return (
    <main className="space-y-12 sm:space-y-20">
      {/* Hero */}
      <section className="space-y-6 text-center sm:space-y-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-titan-orange sm:tracking-[0.25em]">
          Support the mission
        </p>
        <h1 className="mx-auto max-w-[20ch] text-[2.85rem] font-bold leading-[0.98] text-titan-text-secondary sm:text-5xl">
          Help Build the Observatory
        </h1>
        <p className="mx-auto max-w-2xl text-[1.05rem] leading-8 text-titan-text-primary/90 sm:text-lg">
          Titan Observatory is a 501(c)(3) nonprofit. Every tax-deductible
          donation goes directly toward building a 10-meter radio telescope that
          will be open to students, educators, and the public.
        </p>
      </section>

      {/* Primary donation widget */}
      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
        <div className="flex min-w-0 justify-center lg:justify-start">
          <div className="w-full max-w-[420px] overflow-hidden">
            <givebutter-widget
              className="block w-full"
              id="LyX3Yj"
            ></givebutter-widget>
          </div>
        </div>
        <div className="space-y-6 sm:space-y-6">
          <h2 className="text-2xl font-semibold text-titan-text-secondary">
            What Your Support Enables
          </h2>
          <p className="text-sm leading-7 text-titan-text-primary/90">
            Every dollar goes directly toward expert consultations, site
            evaluation, and planning work. Once we have enough professional input
            to confirm the viability of the project, more detailed plans will be
            shared publicly before funds are used to acquire the telescope.
          </p>
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-titan-text-muted sm:tracking-[0.25em]">
              Looking ahead
            </p>
            <ul className="space-y-5 text-sm leading-7 text-titan-text-primary/90">
              <li className="flex gap-4">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-titan-orange" />
                <span>
                  <strong className="font-semibold text-titan-text-secondary">
                    Broader frequency coverage.
                  </strong>{" "}
                  Pending dish characterization, we hope to add L- and S-band RF
                  chains alongside the 21 cm hydrogen line feed, opening up a
                  wider range of science targets and educational experiments.
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

      {/* Donor messages */}
      <div className="-mb-2 sm:-mb-10">
        <DonorMessageCarousel />
      </div>

      {/* Mission Badge Gift */}
      <section className="rounded-3xl border border-titan-border/50 bg-titan-bg-alt/60 p-7 backdrop-blur-sm sm:p-8">
        <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-center">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-titan-text-muted sm:tracking-[0.25em]">
              Donor thank-you
            </p>
            <h3 className="text-xl font-semibold text-titan-text-secondary">
              Mission Badge Gift
            </h3>
            <p className="text-sm leading-7 text-titan-text-primary/90">
              Every donation keeps the observatory moving forward. As a
              thank-you, qualifying contributions receive a mission badge. Please
              include your shipping address at checkout.
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

      {/* Other ways to give */}
      <section className="space-y-8">
        <div className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-titan-text-muted sm:tracking-[0.25em]">
            More ways to give
          </p>
          <h2 className="text-2xl font-semibold text-titan-text-secondary">
            Other Donation Options
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-titan-text-primary/90">
            In addition to online donations, we accept contributions through
            donor-advised funds, stock transfers, cryptocurrency, and other
            asset types.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* DAF */}
          <div className="flex flex-col rounded-3xl border border-titan-border/60 bg-titan-bg-alt/80 p-6 backdrop-blur-sm sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-titan-orange sm:tracking-[0.25em]">
              Donor-Advised Fund
            </p>
            <h3 className="mt-4 text-xl font-semibold text-titan-text-secondary sm:text-lg">
              Give Through Your DAF
            </h3>
            <p className="mt-3 flex-1 text-sm leading-7 text-titan-text-primary/80">
              Recommend a grant to Titan Observatory directly from your
              donor-advised fund. Our Givebutter campaign supports DAF
              contributions through{" "}
              <strong className="font-semibold text-titan-text-secondary">
                Chariot
              </strong>
              , which connects to most major DAF providers including Fidelity
              Charitable, Schwab Charitable, and BNY Mellon.
            </p>
            <div className="mt-5 space-y-3 rounded-2xl border border-titan-border/40 bg-titan-bg/40 p-4 text-sm leading-7 text-titan-text-primary/80">
              <p className="font-semibold text-titan-text-secondary">
                How it works
              </p>
              <ol className="list-inside list-decimal space-y-1.5">
                <li>
                  Click &ldquo;Donate&rdquo; on the widget above and select{" "}
                  <strong className="font-semibold text-titan-text-secondary">
                    DAF
                  </strong>{" "}
                  as your payment method.
                </li>
                <li>Search for your fund provider and log in to authorize the grant.</li>
                <li>
                  The grant recommendation is sent to your provider, who will
                  process and distribute the funds.
                </li>
              </ol>
              <p className="text-xs text-titan-text-muted">
                Processing times vary by provider - typically 3-10 business days
                after approval.
              </p>
            </div>
          </div>

          {/* Stock & Securities */}
          <div className="flex flex-col rounded-3xl border border-titan-border/60 bg-titan-bg-alt/80 p-6 backdrop-blur-sm sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-titan-aqua sm:tracking-[0.25em]">
              Stock &amp; Securities
            </p>
            <h3 className="mt-4 text-xl font-semibold text-titan-text-secondary sm:text-lg">
              Appreciated Assets
            </h3>
            <p className="mt-3 flex-1 text-sm leading-7 text-titan-text-primary/80">
              Donating appreciated stock or other securities can provide a tax
              benefit beyond a standard cash gift. You may deduct the full fair
              market value while avoiding capital gains tax on the appreciation.
            </p>
            <div className="mt-5 space-y-3 rounded-2xl border border-titan-border/40 bg-titan-bg/40 p-4 text-sm leading-7 text-titan-text-primary/80">
              <p className="font-semibold text-titan-text-secondary">
                To contribute stock or other assets
              </p>
              <p>
                Email{" "}
                <a
                  href="mailto:donate@titanobservatory.org"
                  className="font-semibold text-titan-aqua underline decoration-titan-aqua/40 underline-offset-2 transition hover:decoration-titan-aqua"
                >
                  donate@titanobservatory.org
                </a>{" "}
                with the type and estimated value of the asset. We will provide
                transfer instructions and any documentation you need for your
                records.
              </p>
            </div>
          </div>

          {/* Cryptocurrency */}
          <div className="flex flex-col rounded-3xl border border-titan-border/60 bg-titan-bg-alt/80 p-6 backdrop-blur-sm sm:col-span-2 sm:p-7 lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-titan-yellow sm:tracking-[0.25em]">
              Cryptocurrency
            </p>
            <h3 className="mt-4 text-xl font-semibold text-titan-text-secondary sm:text-lg">
              Crypto Donations
            </h3>
            <p className="mt-3 flex-1 text-sm leading-7 text-titan-text-primary/80">
              We accept donations in major cryptocurrencies. Like stock
              donations, contributing crypto you&apos;ve held for over a year may
              allow you to deduct the full market value and avoid capital gains
              tax.
            </p>
            <div className="mt-5 space-y-3 rounded-2xl border border-titan-border/40 bg-titan-bg/40 p-4 text-sm leading-7 text-titan-text-primary/80">
              <p className="font-semibold text-titan-text-secondary">
                To contribute cryptocurrency
              </p>
              <p>
                Email{" "}
                <a
                  href="mailto:donate@titanobservatory.org"
                  className="font-semibold text-titan-yellow underline decoration-titan-yellow/40 underline-offset-2 transition hover:decoration-titan-yellow"
                >
                  donate@titanobservatory.org
                </a>{" "}
                with the currency and approximate amount. We will reply with a
                wallet address and confirmation details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tax info & contact */}
      <section className="rounded-3xl border border-titan-border/50 bg-titan-bg-alt/60 p-7 backdrop-blur-sm sm:p-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-titan-text-secondary">
              Tax Deductibility
            </h3>
            <p className="text-sm leading-7 text-titan-text-primary/90">
              Titan Observatory is a 501(c)(3) tax-exempt nonprofit
              organization. All donations are tax-deductible to the extent
              allowed by law. You will receive a receipt for your records after
              your contribution is processed.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-titan-text-secondary">
              Questions?
            </h3>
            <p className="text-sm leading-7 text-titan-text-primary/90">
              For questions about donating, planned giving, corporate matching,
              in-kind contributions, or any other way you&apos;d like to support
              the observatory, reach out to us at{" "}
              <a
                href="mailto:donate@titanobservatory.org"
                className="font-semibold text-titan-orange underline decoration-titan-orange/40 underline-offset-2 transition hover:decoration-titan-orange"
              >
                donate@titanobservatory.org
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Second widget + final CTA */}
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-8">
        <div className="space-y-6 rounded-3xl border border-titan-border/60 bg-titan-bg-alt/80 p-7 backdrop-blur-sm sm:p-8">
          <h2 className="text-2xl font-semibold text-titan-text-secondary">
            Every Contribution Matters
          </h2>
          <p className="text-sm leading-7 text-titan-text-primary/90">
            Whether it&apos;s $5 or $5,000, every gift moves us closer to first
            light. Share the campaign with friends and family who believe in
            making science accessible to everyone.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/about"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-titan-purple/70 bg-titan-purple px-6 py-3 text-sm font-semibold text-titan-text-secondary transition hover:bg-[#565b7a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-titan-purple sm:w-auto"
            >
              Learn About the Project
            </Link>
            <Link
              href="/faq"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-titan-blue/60 bg-titan-blue/20 px-6 py-3 text-sm font-semibold text-titan-text-secondary transition hover:bg-titan-blue/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-titan-blue sm:w-auto"
            >
              Read the FAQ
            </Link>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[420px] overflow-hidden lg:max-w-none">
          <givebutter-widget
            className="block w-full"
            id="pzez1n"
          ></givebutter-widget>
        </div>
      </section>
    </main>
  );
}
