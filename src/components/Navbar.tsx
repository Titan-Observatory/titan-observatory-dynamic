"use client";

import type { Session } from "next-auth";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

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

type SessionPayload = Session | null;

export default function Navbar() {
  const pathname = usePathname();
  const [session, setSession] = useState<SessionPayload>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchSession() {
      try {
        const response = await fetch("/api/auth/session", { credentials: "same-origin" });
        if (!response.ok) return;
        const data = (await response.json()) as SessionPayload;
        if (isMounted) {
          setSession(data);
        }
      } catch {
        // Ignore session fetch failures; navigation will behave as unauthenticated.
      }
    }

    fetchSession();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navItems = useMemo(
    () => [
      { name: "About", link: "/" },
      { name: "Specifications", link: "/specifications" },
      { name: "System Architecture", link: "/system-architecture" },
      { name: "Concept Dashboard", link: "/concept-dashboard" },
    ],
    [],
  );

  const closeMobile = () => setMobileOpen(false);

  const renderAuthButtons = (context: "desktop" | "mobile") => {
    const buttonClass = context === "mobile" ? "w-full" : undefined;
    const handleClick = context === "mobile" ? closeMobile : undefined;

    if (session?.user) {
      const signOutButton = (
        <form
          key="signout"
          action="/api/auth/signout"
          method="post"
          className={context === "mobile" ? "w-full" : undefined}
        >
          <NavbarButton
            as="button"
            type="submit"
            variant={context === "desktop" ? "dark" : "secondary"}
            className={buttonClass}
            onClick={handleClick}
          >
            Sign out
          </NavbarButton>
        </form>
      );

      return context === "mobile" ? (
        <div className="flex w-full flex-col gap-3">{signOutButton}</div>
      ) : (
        signOutButton
      );
    }

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
    <ResizableNav className="mt-6">
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} className="justify-center" activePath={pathname} />
        <div className="ml-auto flex items-center gap-3">{renderAuthButtons("desktop")}</div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle isOpen={mobileOpen} onClick={() => setMobileOpen(open => !open)} />
        </MobileNavHeader>
        <MobileNavMenu isOpen={mobileOpen} onClose={closeMobile}>
          <div className="flex w-full flex-col gap-3">
            {navItems.map(item => (
              <Link
                key={item.link}
                href={item.link}
                onClick={closeMobile}
                className={`rounded-full px-3 py-2 text-sm font-medium ${pathname === item.link ? "bg-titan-orange/15 text-titan-text-secondary" : "text-titan-text-muted hover:bg-titan-bg-alt/70"}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          {renderAuthButtons("mobile")}
        </MobileNavMenu>
      </MobileNav>
    </ResizableNav>
  );
}
