import type { Metadata } from "next";
import Image from "next/image";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Meet the Team | Titan Observatory",
  description:
    "The people building Titan Observatory, with placeholders for team bios and roles.",
};

const executiveDirector = {
  name: "Thomas Oglesby",
  role: "Executive Director",
  bio: [
   "As someone with a passion for understanding the world around me, growing up as one of the first generations with the entirety of human knowledge at my fingertips has given me a unique appreciation for how the Internet revolutionized learning. Unfortunately, once companies realized there was money to be made, the floodgates of capitalism opened, and the Internet quickly became synonymous with retention-based algorithms, ads, and the never-ending pursuit of harvesting your data. But I’m not convinced it has to be this way. I think limitless capital and armies of corporate dev teams have given people the false impression that the Internet has reached maturity—when in reality, if you explore beyond the handful of companies most people consider “the Internet,” you’ll still find the same old forums and basic HTML pages where a bunch of nerds share their passion and knowledge with the world.",
   "Nobody would deny the Internet has already changed the world, but as crazy as it sounds, I think “having access to all human knowledge” is only the first step in true dissemination. Now we need to make that knowledge as accessible as possible to people who are less privileged, less technically inclined, or simply don’t know where to begin. I hope the Titan Observatory can be another step toward that future by demystifying radio astronomy and electromagnetic waves, so more people can share in the excitement of future discoveries and feel connected to the science behind them."  ],
};

const teamMembers = [
  {
    name: "Tag Hunt",
    role: "Vice President, Board",
    image: {
      src: "/images/headshots/Tag-Hunt.jpg",
      alt: "Tag Hunt headshot",
    },
  },
  { name: "Jennise Santiago", role: "Secretary, Board" },
  { name: "Sanskar Bhattacharya", role: "Project Manager" },
  { name: "Jonathan Hart", role: "Board Member" },
  { name: "Chris Picquet", role: "Board Member" },
];

export default function MeetTheTeamPage() {
  return (
    <main className="relative z-10 space-y-12">
      <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="order-2 space-y-4 lg:order-1">
          <p className="text-xs uppercase tracking-[0.35em] text-titan-text-primary/70">Founder & Executive Director</p>
          <h2 className="text-3xl font-semibold text-titan-text-secondary">{executiveDirector.name}</h2>
          <div className="space-y-3 text-base leading-relaxed text-titan-text-primary/90">
            {executiveDirector.bio.map(paragraph => (
              <p key={paragraph} style={{ textIndent: "2rem" }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <figure className="relative order-1 aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-titan-border/60 bg-titan-bg-alt/70 shadow-[0_22px_48px_-36px_rgba(10,15,35,0.9)] lg:order-2">
          <Image
            src="/images/headshots/Thomas.jpg"
            alt="Executive director portrait"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 520px, 90vw"
            priority
          />
        </figure>
      </section>

      <section>
        <div className="inline-flex items-center gap-3 whitespace-nowrap rounded-full border border-titan-border/60 bg-titan-bg-alt/90 px-4 py-4 text-xs uppercase tracking-[0.18em] text-titan-text-secondary">
          <span>Interested in joining the team?</span>
          <a
            href="https://ideali.st/USGqBK"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-titan-text-secondary transition hover:text-titan-purple"
          >
            View openings on Idealist
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4 10a.75.75 0 0 1 .75-.75h8.69L10.22 6.03a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H4.75A.75.75 0 0 1 4 10Z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </section>

      <section className="space-y-10">
        <div className="space-y-6 pt-6">
          <div className="flex items-center gap-5">
            <span className="h-px w-12 bg-titan-border/70" />
            <h2 className="text-2xl font-semibold uppercase tracking-[0.4em] text-titan-text-secondary">
              The Team
            </h2>
            <span className="h-px flex-1 bg-titan-border/40" />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {teamMembers.map(member => (
            <article
              key={member.name}
              className="flex h-full flex-col gap-3 rounded-3xl border border-titan-border/60 bg-titan-bg-alt/90 p-6 text-sm leading-relaxed text-titan-text-primary/90 shadow-[0_14px_34px_-24px_rgba(8,12,24,0.8)] backdrop-blur-sm transition hover:border-titan-purple/40 hover:bg-titan-bg-alt/95"
            >
              {member.image ? (
                <figure className="aspect-square w-full overflow-hidden rounded-2xl border border-titan-border/60 bg-titan-bg-alt/70">
                  <Image
                    src={member.image.src}
                    alt={member.image.alt}
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover"
                    sizes="(min-width: 1280px) 240px, (min-width: 768px) 45vw, 90vw"
                  />
                </figure>
              ) : (
                <div className="aspect-square w-full rounded-2xl border border-titan-border/60 bg-titan-bg-alt/70" />
              )}
              <div>
                <h3 className="text-lg font-semibold text-titan-text-secondary">{member.name}</h3>
                <p className="text-xs uppercase tracking-[0.25em] text-titan-text-primary/70">{member.role}</p>
              </div>
              {member.bio ? (
                <p className="text-sm text-titan-text-primary/90">{member.bio}</p>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
