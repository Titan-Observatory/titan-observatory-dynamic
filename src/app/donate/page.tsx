import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DeferredDonorMessageCarousel from "@/components/DeferredDonorMessageCarousel";
import GivebutterWidget from "@/components/GivebutterWidget";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Donate | Titan Observatory",
  description:
    "Support Titan Observatory with a tax-deductible donation. Give online, through a donor-advised fund, or contribute appreciated assets.",
};

const enabledFeatures = [
  {
    emoji: "📡",
    iconClass: "bg-titan-orange/15 text-titan-orange",
    title: "Broader Frequency Coverage",
    body: "Pending dish characterization, we hope to add L- and S-band RF chains alongside the 21 cm hydrogen line feed, opening up a wider range of science targets and educational experiments.",
  },
  {
    emoji: "🔭",
    iconClass: "bg-titan-aqua/15 text-titan-aqua",
    title: "A Network of Dishes",
    body: "The infrastructure will be designed from the start to be scalable. Our team will work to integrate donated dishes over time, increasing observation capacity and creating opportunities for amateur interferometry.",
  },
  {
    emoji: "🎓",
    iconClass: "bg-titan-yellow/15 text-titan-yellow",
    title: "Integrated Science Education",
    body: "Once routine observations are underway, we plan to develop curricula that put real telescope time in students' hands, covering the electromagnetic spectrum, cosmic radio sources, and how a radio telescope works from first principles.",
  },
] as const;

export default function DonatePage() {
  return (
    <main className="space-y-12 sm:space-y-20">
      <section className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
        <div className="flex min-w-0 justify-center lg:sticky lg:top-28 lg:justify-start">
          <div className="w-full max-w-[420px] overflow-hidden">
            <GivebutterWidget
              id="LyX3Yj"
              eager
              widgetClassName="block w-full"
            />
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-titan-orange sm:tracking-[0.25em]">
              Support the mission
            </p>
            <h1 className="max-w-[20ch] text-[2.85rem] font-bold leading-[0.98] text-titan-text-secondary sm:text-5xl">
              Help Build the Observatory
            </h1>
            <p className="max-w-xl text-[1.05rem] leading-8 text-titan-text-primary/90 sm:text-lg">
              Titan Observatory is a 501(c)(3) nonprofit. Every tax-deductible
              donation goes directly toward building a 10-meter radio telescope
              that will be open to students, educators, and the public.
            </p>
          </div>

          <div className="grid items-center gap-4 sm:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-titan-text-secondary">
                Donor thank-you gifts
              </p>
              <p className="max-w-lg text-sm leading-7 text-titan-text-muted">
                Qualifying donors receive a small thank-you package with a Titan
                Observatory badge, a sticker, and a postcard featuring a
                randomly selected image from NASA&apos;s archives.
              </p>
              <div className="space-y-1 text-sm text-titan-text-muted">
                <p>
                  <span className="font-semibold text-titan-text-secondary">$25+</span>{" "}
                  sticker and postcard
                </p>
                <p>
                  <span className="font-semibold text-titan-text-secondary">$50+</span>{" "}
                  embroidered badge, sticker, and postcard
                </p>
              </div>
            </div>
            <div className="justify-self-end max-w-[320px]">
              <Image
                src="/images/DonorGift.jpg"
                alt="Titan Observatory donor gift items."
                width={1200}
                height={1200}
                className="h-auto w-full rounded-xl"
              />
            </div>
          </div>

          <p className="text-sm leading-7 text-titan-text-primary/70">
            All donations are tax-deductible to the extent allowed by law. You
            will receive a receipt for your records after your contribution is
            processed.
          </p>
        </div>
      </section>

      <div className="-mb-2 sm:-mb-10">
        <DeferredDonorMessageCarousel />
      </div>

      <section className="space-y-8">
        <div className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-titan-text-muted sm:tracking-[0.25em]">
            More ways to give
          </p>
          <h2 className="text-2xl font-semibold text-titan-text-secondary sm:text-3xl">
            Other Donation Options
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-titan-text-primary/90">
            In addition to online donations, we accept contributions through
            donor-advised funds, stock transfers, cryptocurrency, and other asset
            types.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
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
              , which connects to most major DAF providers.
            </p>
            <div className="mt-5 space-y-3 rounded-2xl border border-titan-border/40 bg-titan-bg/40 p-4 text-sm leading-7 text-titan-text-primary/80">
              <p className="font-semibold text-titan-text-secondary">
                To give through your DAF
              </p>
              <ol className="list-inside list-decimal space-y-1.5">
                <li>
                  Enter your donation amount in the widget above, and select{" "}
                  <strong className="font-semibold text-titan-text-secondary">
                    DAF
                  </strong>{" "}
                  as your payment method.
                </li>
                <li>
                  Search for your fund provider and log in to authorize the
                  grant.
                </li>
              </ol>
              <p className="text-xs text-titan-text-muted">
                Processing times vary by provider, typically 3-10 business days
                after approval.
              </p>
            </div>
          </div>

          <div className="flex flex-col rounded-3xl border border-titan-border/60 bg-titan-bg-alt/80 p-6 backdrop-blur-sm sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-titan-aqua sm:tracking-[0.25em]">
              Stock &amp; Securities
            </p>
            <h3 className="mt-4 text-xl font-semibold text-titan-text-secondary sm:text-lg">
              Appreciated Assets
            </h3>
            <p className="mt-3 flex-1 text-sm leading-7 text-titan-text-primary/80">
              If you are interested in donating stock, securities, or other
              appreciated assets, contact us directly and we will help you
              coordinate the next steps.
            </p>
            <div className="mt-5 space-y-3 rounded-2xl border border-titan-border/40 bg-titan-bg/40 p-4 text-sm leading-7 text-titan-text-primary/80">
              <p className="font-semibold text-titan-text-secondary">
                To inquire about appreciated assets
              </p>
              <p>
                Email{" "}
                <a
                  href="mailto:donate@titanobservatory.org"
                  className="font-semibold text-titan-aqua underline decoration-titan-aqua/40 underline-offset-2 transition hover:decoration-titan-aqua"
                >
                  donate@titanobservatory.org
                </a>{" "}
                and let us know that you would like to discuss a non-cash
                contribution. We will reply with the appropriate instructions.
              </p>
            </div>
          </div>

          <div className="flex flex-col rounded-3xl border border-titan-border/60 bg-titan-bg-alt/80 p-6 backdrop-blur-sm sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-titan-yellow sm:tracking-[0.25em]">
              Cryptocurrency
            </p>
            <h3 className="mt-4 text-xl font-semibold text-titan-text-secondary sm:text-lg">
              Crypto Donations
            </h3>
            <p className="mt-3 flex-1 text-sm leading-7 text-titan-text-primary/80">
              If you would like to make a cryptocurrency donation, contact us
              by email and we will coordinate the process directly with you.
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
                and let us know that you would like to make a crypto donation.
                We will reply with the appropriate instructions.
              </p>
            </div>
          </div>

          <div className="flex flex-col rounded-3xl border border-titan-border/60 bg-titan-bg-alt/80 p-6 backdrop-blur-sm sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-titan-green sm:tracking-[0.25em]">
              In-Kind Donations
            </p>
            <h3 className="mt-4 text-xl font-semibold text-titan-text-secondary sm:text-lg">
              Equipment &amp; Materials
            </h3>
            <p className="mt-3 flex-1 text-sm leading-7 text-titan-text-primary/80">
              Building a radio telescope takes more than funding. We welcome
              donations of equipment and materials that support the project.
            </p>
            <div className="mt-5 space-y-3 rounded-2xl border border-titan-border/40 bg-titan-bg/40 p-4 text-sm leading-7 text-titan-text-primary/80">
              <p className="font-semibold text-titan-text-secondary">
                Items we can put to use
              </p>
              <ul className="list-inside list-disc space-y-1.5">
                <li>
                  <strong className="font-semibold text-titan-text-secondary">
                    RF equipment:
                  </strong>{" "}
                  feeds, LNAs, filters, SDRs, coaxial cable, connectors
                </li>
                <li>
                  <strong className="font-semibold text-titan-text-secondary">
                    Compute &amp; networking:
                  </strong>{" "}
                  servers, single-board computers, switches, access points,
                  Ethernet cable
                </li>
                <li>
                  <strong className="font-semibold text-titan-text-secondary">
                    Fabrication &amp; shop tools:
                  </strong>{" "}
                  welders, grinders, drill presses, hand tools, safety
                  equipment
                </li>
              </ul>
              <p className="pt-1">
                Email{" "}
                <a
                  href="mailto:donate@titanobservatory.org"
                  className="font-semibold text-titan-green underline decoration-titan-green/40 underline-offset-2 transition hover:decoration-titan-green"
                >
                  donate@titanobservatory.org
                </a>{" "}
                with a description of what you would like to donate and we will
                coordinate pickup or shipping.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-titan-text-muted sm:tracking-[0.25em]">
            Where your money goes
          </p>
          <h2 className="text-2xl font-semibold text-titan-text-secondary sm:text-3xl">
            What Your Support Enables
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-titan-text-primary/90">
            Every dollar goes directly toward expert consultations, site
            evaluation, and planning work. Once we have enough professional input
            to confirm the viability of the project, more detailed plans will be
            shared publicly before funds are used to acquire the telescope.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {enabledFeatures.map((f) => (
            <div
              key={f.title}
              className="rounded-3xl border border-titan-border/60 bg-titan-bg-alt/80 p-6 backdrop-blur-sm sm:p-7"
            >
              <span
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-lg ${f.iconClass}`}
              >
                {f.emoji}
              </span>
              <h3 className="text-base font-semibold text-titan-text-secondary">
                {f.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-titan-text-primary/80">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-8">
        <div className="space-y-6 rounded-3xl border border-titan-border/60 bg-titan-bg-alt/80 p-7 backdrop-blur-sm sm:p-8">
          <h2 className="text-2xl font-semibold text-titan-text-secondary">
            Every Contribution Matters
          </h2>
          <p className="text-sm leading-7 text-titan-text-primary/90">
            Whether it's $5 or $5,000, every gift moves us closer to first
            light. Share the campaign with friends and family who believe in
            making science accessible to everyone.
          </p>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-titan-text-secondary">
              Questions about donating?
            </h3>
            <p className="text-sm leading-7 text-titan-text-primary/80">
              For planned giving, corporate matching, in-kind contributions, or
              any other way you'd like to support the observatory, reach out at{" "}
              <a
                href="mailto:donate@titanobservatory.org"
                className="font-semibold text-titan-orange underline decoration-titan-orange/40 underline-offset-2 transition hover:decoration-titan-orange"
              >
                donate@titanobservatory.org
              </a>
            </p>
          </div>
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
          <GivebutterWidget
            id="pzez1n"
            placeholderClassName="min-h-[34rem]"
            widgetClassName="block w-full"
          />
        </div>
      </section>
    </main>
  );
}
