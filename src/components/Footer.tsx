import type { CSSProperties } from "react";
import Link from "next/link";

const quickLinks = [
  { label: "About", href: "/" },
  { label: "Specifications", href: "/specifications" },
  { label: "The Team", href: "/team" },
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
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-12 sm:px-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-md space-y-3 text-center lg:text-left">
          <p className="inline-flex items-center justify-center gap-2 text-base font-semibold text-titan-text-secondary lg:justify-start">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-titan-purple to-[#565b7a]" />
            Titan Observatory
          </p>
          <p className="leading-relaxed text-titan-text-primary/80">
            Enabling anyone to run real radio astronomy experiments
            using professional instrumentation.
          </p>
          <div className="space-y-1 text-sm text-titan-text-secondary">
            <p>
              Contact:&nbsp;
              <a className="text-titan-text-primary hover:text-titan-yellow" href="mailto:contact@titanobservatory.org">
                contact@titanobservatory.org
              </a>
            </p>
            <p>Community HQ · Lakeland, FL</p>
          </div>
          <div className="hidden pt-3 md:block">
            <givebutter-widget id="gM1lng"></givebutter-widget>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-titan-text-secondary">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link className="hover:text-titan-yellow" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-titan-text-secondary">
              Community
            </h3>
            <ul className="space-y-2">
              {communityLinks.map(link => (
                <li key={link.href}>
                  <a className="hover:text-titan-yellow" href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-titan-text-secondary">
              Follow Us
            </h3>
            <ul className="space-y-2">
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

          <div className="space-y-3 text-center sm:col-span-2 sm:text-left lg:col-span-1">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-titan-text-secondary">
              Share Titan Observatory
            </h3>
            <p className="leading-relaxed">
              Help other explorers discover the observatory by sharing a favorite link or update.
            </p>
            <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-start">
              {shareLinks.map(link => (
                <a
                  key={link.href}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full border bg-transparent px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-200 sm:w-auto [border-color:var(--share-border)] [color:var(--share-color)] hover:[border-color:var(--share-color)] hover:[color:#ffffff] hover:bg-[color:var(--share-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--share-color)]"
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
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-6 text-xs text-titan-text-muted sm:px-8 md:flex-row md:items-center md:justify-between">
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
