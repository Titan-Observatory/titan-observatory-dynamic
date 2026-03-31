import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import GivebutterWidget from "@/components/GivebutterWidget";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "FAQ", href: "/faq" },
];

const projectLinks = [
  { label: "Telescope Overview", href: "/telescope-overview" },
  { label: "Site Overview", href: "/site-overview" },
  { label: "System Architecture", href: "/system-architecture" },
  { label: "Updates", href: "/project-updates" },
];

const communityLinks = [
  {
    label: "Forum",
    href: "https://community.titanobservatory.org",
  },
  {
    label: "Updates",
    href: "https://community.titanobservatory.org/c/news-announcements",
  },
  {
    label: "Learning Resources",
    href: "https://community.titanobservatory.org/c/radio-astronomy",
  },
];

const shareLinks = [
  {
    label: "Share on X",
    href: "https://twitter.com/intent/tweet?text=Check%20out%20the%20Titan%20Observatory%20project!%20https%3A%2F%2Ftitanobservatory.org",
    color: "#1DA1F2",
    icon: "/social%20media/twitter.webp",
  },
  {
    label: "Share on Facebook",
    href: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftitanobservatory.org",
    color: "#3b5998",
    icon: "/social%20media/facebook.webp",
  },
  {
    label: "Share on LinkedIn",
    href: "https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Ftitanobservatory.org",
    color: "#0A66C2",
    icon: "/social%20media/linkedin.webp",
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-titan-border/60 text-sm text-titan-text-muted">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-titan-bg/95 via-titan-bg to-titan-bg/95" />
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-14 sm:px-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.7fr)] lg:gap-10 lg:px-8">
        <div className="max-w-[38rem]">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-start sm:gap-6">
            <a
              aria-label="Titan Astronomical Observatory Inc"
              href="https://app.candid.org/profile/16551508/titan-astronomical-observatory-inc-39-4885264/?pkId=86b218a1-77e9-4f25-9a89-729b4d9adabc"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-lg border border-titan-border/60 bg-titan-bg-alt/60 p-1.5 transition hover:border-titan-orange/60"
            >
              <img
                alt=""
                src="https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/16551508/svg"
                className="h-auto w-24"
              />
            </a>

            <div className="min-w-0 flex-1 space-y-5 sm:min-w-[18rem]">
              <p className="inline-flex items-center gap-3 text-[1.8rem] font-semibold text-titan-text-secondary sm:text-2xl sm:whitespace-nowrap">
                <Image
                  src="/images/Logos/favicon.webp"
                  alt=""
                  width={26}
                  height={26}
                  className="h-6 w-6 rounded-sm object-contain"
                />
                Titan Observatory
              </p>

              <p className="max-w-sm text-[15px] leading-7 text-titan-text-primary/80 sm:text-sm">
                Enabling anyone to run real radio astronomy experiments using professional instrumentation.
              </p>

              <div className="space-y-2 text-sm text-titan-text-secondary">
                <p>
                  Contact:&nbsp;
                  <a className="text-titan-text-primary hover:text-titan-yellow" href="mailto:contact@titanobservatory.org">
                    contact@titanobservatory.org
                  </a>
                </p>
                <p>Community HQ - Lakeland, FL</p>
                <p>EIN: 39-4885264</p>
              </div>

              <div className="hidden pt-1 md:block">
                <GivebutterWidget
                  id="gM1lng"
                  placeholderClassName="min-h-[3.5rem]"
                  placeholderVariant="pill"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-5 lg:gap-x-6">
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-titan-text-secondary">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link className="hover:text-titan-yellow" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-titan-text-secondary">
              The Project
            </h3>
            <ul className="space-y-3">
              {projectLinks.map((link) => (
                <li key={link.href}>
                  <Link className="hover:text-titan-yellow" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-titan-text-secondary">
              Community
            </h3>
            <ul className="space-y-3">
              {communityLinks.map((link) => (
                <li key={link.href}>
                  <a className="hover:text-titan-yellow" href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-titan-text-secondary">
              Follow Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  className="hover:text-titan-yellow"
                  rel="me"
                  href="https://mastodon.social/@TitanObservatory"
                >
                  Mastodon
                </a>
              </li>
              <li>
                <a
                  className="hover:text-titan-yellow"
                  href="https://x.com/TitanObservatry"
                  target="_blank"
                  rel="noreferrer"
                >
                  X (Twitter)
                </a>
              </li>
              <li>
                <a
                  className="hover:text-titan-yellow"
                  href="https://www.reddit.com/r/TitanObservatory/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Reddit
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4 text-center sm:col-span-2 sm:text-left lg:col-span-1">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-titan-text-secondary">
              Share Titan Observatory
            </h3>
            <div className="flex w-full flex-col items-center gap-3.5 sm:items-start">
              {shareLinks.map((link) => (
                <a
                  key={link.href}
                  className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl border bg-transparent px-4 py-3 text-center text-sm font-semibold transition-colors duration-200 sm:w-auto sm:rounded-full [border-color:var(--share-border)] [color:var(--share-color)] hover:[border-color:var(--share-color)] hover:[color:#ffffff] hover:bg-[color:var(--share-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--share-color)]"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  style={
                    {
                      "--share-color": link.color,
                      "--share-border": `${link.color}99`,
                      "--share-bg": `${link.color}26`,
                    } as CSSProperties
                  }
                >
                  <span
                    aria-hidden="true"
                    className="h-5 w-5 transition-colors duration-200 [background-color:var(--share-color)] group-hover:[background-color:#ffffff]"
                    style={{
                      maskImage: `url(${link.icon})`,
                      WebkitMaskImage: `url(${link.icon})`,
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                      maskPosition: "center",
                      WebkitMaskPosition: "center",
                      maskSize: "contain",
                      WebkitMaskSize: "contain",
                    }}
                  />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-titan-border/60 bg-titan-bg/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-6 text-xs text-titan-text-muted sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>&copy; {new Date().getFullYear()} Titan Observatory. All rights reserved.</p>
          <p className="flex flex-wrap justify-center gap-4 md:justify-end">
            <Link className="hover:text-titan-yellow" href="/terms">
              Terms
            </Link>
            <Link className="hover:text-titan-yellow" href="/privacy">
              Privacy
            </Link>
            <a
              className="hover:text-titan-yellow"
              href="https://community.titanobservatory.org/c/announcements"
              target="_blank"
              rel="noreferrer"
            >
              Newsletter
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
