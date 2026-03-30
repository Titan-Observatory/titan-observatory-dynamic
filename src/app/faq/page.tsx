import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import FaqList from "./FaqList";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "FAQ | Titan Observatory",
  description:
    "Frequently asked questions about the Titan Observatory project, timeline, and community involvement.",
};

const aboutFaqs = [
  {
    question: "What is Titan Observatory?",
    answer:
      "Titan Observatory is a 501(c)(3) nonprofit building a free, publicly accessible online radio observatory in Polk County, Florida. We're acquiring a 10-meter Scientific-Atlanta Cassegrain dish — maintained by its current owner for nearly 50 years after being purchased directly from NASA — and modernizing it with a custom control system and remote observing platform so anyone can run real radio astronomy experiments from a web browser.",
  },
  {
    question: "How is the project funded?",
    answer:
      "Entirely through public donations and grants. There are no institutional backers or corporate sponsors — the project is built and run by volunteers. All donations are tax-deductible. Our EIN is 39-4885264 and our financials and organizational profile are available on Candid (GuideStar).",
  },
  {
    question: "What's the timeline?",
    answer:
      "We're currently in Phase 1: raising funds to acquire the telescope and prepare the site. Phase 2 covers disassembly, transport, and electronics modernization. Phase 3 is commissioning and first light, where we begin opening the platform to public observations. The full roadmap with phase details is on our About page.",
  },
  {
    question: "Is this a real telescope or a rendering?",
    answer:
      "It's a real instrument. The dish is a 10-meter Scientific-Atlanta Cassegrain on an ANTLab precision positioner, currently located at a private facility. The drone and ground photos on the site are of the actual telescope. We are in active fundraising to acquire and relocate it.",
  },
];

const telescopeFaqs = [
  {
    question: "Won't moving a 10-meter dish be incredibly expensive?",
    answer:
      "It would be if it had to move in one piece, but the design makes disassembly straightforward. After removing four main bolts, the dish lifts off its pedestal with a modest crane. It can then be broken down into manageable panels on the ground and loaded onto standard flatbed trailers. We have a quoted crane and crew cost of $6,000 for this step.",
  },
  {
    question: "Where will the observatory be located?",
    answer:
      "The planned site is in rural Polk County, Florida — selected for its low radio frequency interference, agricultural zoning, and room to expand. More detail on the site selection, zoning, and radio environment is available on the Site Overview page.",
  },
  {
    question: "What will the telescope actually be able to observe?",
    answer:
      "At first light, we plan to observe at the 21-centimeter hydrogen line (1420 MHz) — the emission frequency of neutral hydrogen gas that permeates the Milky Way. This makes it possible to map the galaxy's rotation curve, study hydrogen cloud distribution, and detect other radio sources across a wide patch of sky. Pending characterization of the dish, we intend to add L- and S-band RF chains for a broader range of science and educational targets.",
  },
  {
    question: "Will I be able to use the telescope myself?",
    answer:
      "Yes — that's the whole point. Once commissioned, the platform will let registered users schedule observation time, point the dish at a target, collect data, and work through guided analysis. We're designing it from the start to be accessible to curious beginners, not just researchers.",
  },
];

const involvementFaqs = [
  {
    question: "Can I volunteer?",
    answer:
      "Absolutely. We need help across RF engineering, signal processing, software development, web platform design, education curriculum writing, and general administration. You don't need to be a radio astronomer — many valuable contributions come from people with adjacent skills. Apply through our volunteer form and we'll match you with open work.",
  },
  {
    question: "Will observation data be publicly available?",
    answer:
      "That's the goal. We plan to publish raw observation data, processed results, and educational datasets once instruments are commissioned and data pipelines are validated. The community forum will be the primary place for updates and discussion around published data.",
  },
  {
    question: "How can I stay updated?",
    answer:
      "Three ways, roughly in order of frequency: join the Discord for day-to-day discussion and announcements, follow the community forum for structured project updates and technical posts, or sign up for the newsletter if you only want to hear about major milestones and fundraising campaigns.",
  },
];

const sections = [
  { label: "About the Project", accent: "bg-titan-orange", faqs: aboutFaqs },
  { label: "The Telescope", accent: "bg-titan-yellow", faqs: telescopeFaqs },
  { label: "Getting Involved", accent: "bg-titan-aqua", faqs: involvementFaqs },
];

export default function FaqPage() {
  return (
    <main className="relative z-10">
      <div className="mx-auto w-full max-w-3xl space-y-20">
        {/* Header */}
        <header className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-titan-orange sm:text-xs sm:tracking-[0.25em]">
            Questions & Answers
          </p>
          <h1 className="text-4xl font-bold text-titan-text-secondary sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="text-sm leading-relaxed text-titan-text-primary/90">
            If something isn&apos;t covered here, ask in the{" "}
            <a
              className="text-titan-text-secondary underline-offset-4 hover:underline"
              href="https://community.titanobservatory.org"
              target="_blank"
              rel="noreferrer"
            >
              community forum
            </a>{" "}
            or email{" "}
            <a
              className="text-titan-text-secondary underline-offset-4 hover:underline"
              href="mailto:contact@titanobservatory.org"
            >
              contact@titanobservatory.org
            </a>
            .
          </p>
        </header>

        {/* FAQ Sections */}
        {sections.map((section, index) => (
          <AnimatedSection
            key={section.label}
            delay={index * 0.1}
            className={index > 0 ? "border-t border-titan-border/40 pt-14" : ""}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className={`inline-block h-2.5 w-2.5 rounded-full ${section.accent}`} />
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-titan-text-secondary sm:text-xs sm:tracking-[0.25em]">
                {section.label}
              </h2>
            </div>
            <FaqList items={section.faqs} />
          </AnimatedSection>
        ))}

        {/* Still have questions? */}
        <AnimatedSection className="rounded-3xl border border-titan-border/60 bg-titan-bg-alt/80 p-8 text-center backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-titan-text-secondary">Still have questions?</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-titan-text-primary/80">
            Reach out on the community forum or drop us an email — we&apos;re happy to help.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://community.titanobservatory.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-titan-blue/60 bg-titan-blue/20 px-6 py-3 text-sm font-semibold text-titan-text-secondary transition hover:bg-titan-blue/30"
            >
              Visit the Forum
            </a>
            <a
              href="mailto:contact@titanobservatory.org"
              className="inline-flex items-center justify-center rounded-full border border-titan-border/70 px-6 py-3 text-sm font-semibold text-titan-text-secondary transition hover:border-titan-blue/50 hover:bg-titan-blue/5"
            >
              Email Us
            </a>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
