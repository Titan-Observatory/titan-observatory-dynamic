import type { Metadata } from "next";
import FaqList from "./FaqList";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "FAQ | Titan Observatory",
  description:
    "Frequently asked questions about the Titan Observatory project, timeline, and community involvement.",
};

const faqs = [
  {
    question: "Won't this cost a fortune to move?",
    answer:
      "After removing what are essentially four big bolts, the dish is able to be lifted off it's pedistal with a modest crane. The dish can then be disassembled into managable segments on the ground and loaded on standard trailers for transport.",
  },
  {
    question: "Where will the observatory be located?",
    answer:
      "The planned site is in rural Florida with low radio interference and plenty of room to grow.",
  },
  {
    question: "How is the project funded?",
    answer:
      "We rely on donations, grants, and community support. When fundraising campaigns are live, we link them on the homepage.",
  },
  {
    question: "Can I volunteer or contribute?",
    answer:
      "Yes. We share open roles on Idealist and coordinate with volunteers through the community forum.",
  },
  {
    question: "Will the data be publicly available?",
    answer:
      "That is the goal. We plan to publish updates, media, and public-facing data once instruments are commissioned.",
  },
  {
    question: "How can I stay updated?",
    answer:
      "You can sign up for our newsletter for major milestones and fundraising campaigns, our forums for more community related announcements, or discord for the most up-to-date information.",
  },
];

export default function FaqPage() {
  return (
    <main className="relative z-10">
      <div className="mx-auto w-full max-w-3xl space-y-10">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold text-titan-text-secondary">FAQ</h1>
          <p className="text-sm leading-relaxed text-titan-text-primary/90">
            Quick answers to the most common questions about Titan Observatory. If you need more detail, reach out through
            the community forum or email{" "}
            <a className="text-titan-text-secondary underline-offset-4 hover:underline" href="mailto:contact@titanobservatory.org">
              contact@titanobservatory.org
            </a>
            .
          </p>
        </header>

        <FaqList items={faqs} />
      </div>
    </main>
  );
}
