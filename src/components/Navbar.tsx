"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  NavItems,
  Navbar as ResizableNav,
  NavbarButton,
  NavbarLogo,
} from "@/components/ui/resizable-navbar";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileResearchOpen, setMobileResearchOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    setMobileResearchOpen(false);
  }, [pathname]);

  const navItems = useMemo(
    () => [
      { name: "About", link: "/" },
      { name: "Updates", link: "/project-updates" },
      { name: "The Team", link: "/team" },
      {
        name: "Learn More",
        children: [
          { name: "System Architecture", link: "/system-architecture" },
          { name: "Concept Dashboard", link: "/concept-dashboard" },
          { name: "Telescope Overview", link: "/telescope-overview" },
          { name: "Site Overview", link: "/site-overview" },
        ],
      },
    ],
    [],
  );

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileResearchOpen(false);
  };

  const renderCallToAction = (context: "desktop" | "mobile") => {
    const buttonClass = context === "mobile" ? "w-full" : undefined;
    const handleClick = context === "mobile" ? closeMobile : undefined;

    const communityButton = (
      <NavbarButton
        key="forum"
        href="https://community.titanobservatory.org"
        variant={context === "desktop" ? "primary" : "gradient"}
        className={buttonClass}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit the Forum
      </NavbarButton>
    );

    if (context === "mobile") {
      return <div className="flex w-full flex-col gap-3">{communityButton}</div>;
    }

    return communityButton;
  };

  return (
    <ResizableNav className="mt-6 mb-0">
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} className="justify-center" activePath={pathname} />
        <div className="ml-auto flex items-center gap-3">{renderCallToAction("desktop")}</div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle isOpen={mobileOpen} onClick={() => setMobileOpen(open => !open)} />
        </MobileNavHeader>
        <MobileNavMenu isOpen={mobileOpen} onClose={closeMobile}>
          <div className="flex w-full flex-col gap-3">
            {navItems.map(item => {
              if (item.children?.length) {
                return (
                  <div key={item.name} className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setMobileResearchOpen(open => !open)}
                      aria-expanded={mobileResearchOpen}
                      className="flex w-full items-center justify-between rounded-full px-3 py-2 text-sm font-semibold text-titan-text-secondary transition hover:bg-titan-bg-alt/70"
                    >
                      {item.name}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        className={`h-4 w-4 transition ${mobileResearchOpen ? "rotate-180" : ""}`}
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileResearchOpen ? (
                        <motion.div
                          className="flex flex-col gap-1 overflow-hidden"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                        {item.children.map(child => (
                          <Link
                            key={child.link}
                            href={child.link}
                            onClick={closeMobile}
                            className={`rounded-full border-l border-transparent px-3 py-2 pl-5 text-sm font-medium ${pathname === child.link ? "bg-titan-orange/15 text-titan-text-secondary" : "text-titan-text-muted hover:border-titan-border/70 hover:bg-titan-bg-alt/70"}`}
                          >
                            {child.name}
                          </Link>
                        ))}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              }

              if (!item.link) {
                return null;
              }

              return (
                <Link
                  key={item.link}
                  href={item.link}
                  onClick={closeMobile}
                  className={`rounded-full px-3 py-2 text-sm font-medium ${pathname === item.link ? "bg-titan-orange/15 text-titan-text-secondary" : "text-titan-text-muted hover:bg-titan-bg-alt/70"}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          {renderCallToAction("mobile")}
        </MobileNavMenu>
      </MobileNav>
    </ResizableNav>
  );
}
