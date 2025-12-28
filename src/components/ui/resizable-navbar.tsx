"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  condensed?: boolean;
}

interface NavItemsProps {
  items: { name: string; link: string }[];
  activePath?: string;
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  condensed?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const DESKTOP_EXPANDED = {
  maxWidth: "1120px",
  borderRadius: "16px",
  borderColor: "rgba(60,65,92,0)",
  backgroundColor: "rgba(16,18,26,0)",
  backdropFilter: "blur(0px)",
  y: 0,
  boxShadow: "0 0 0 rgba(0,0,0,0)",
};

const DESKTOP_CONDENSED = {
  maxWidth: "860px",
  borderRadius: "999px",
  borderColor: "rgba(60,65,92,0.45)",
  backgroundColor: "rgba(23,26,40,0.9)",
  backdropFilter: "blur(18px)",
  y: 0,
  boxShadow: "0 28px 70px rgba(12,18,32,0.55)",
};

const CONDENSE_NAV_SCROLL_Y = 160;

export const Navbar = ({ children, className }: NavbarProps) => {
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setCondensed(window.scrollY > CONDENSE_NAV_SCROLL_Y);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const enhancedChildren = React.useMemo(
    () =>
      React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ condensed?: boolean }>, {
              condensed,
            })
          : child,
      ),
    [children, condensed],
  );

  return (
    <div className={cn("sticky top-6 z-40 flex w-full justify-center px-4", className)}>
      <div className="w-full max-w-6xl">{enhancedChildren}</div>
    </div>
  );
};

export const NavBody = ({ children, className, condensed }: NavBodyProps) => {
  return (
    <motion.div
      className={cn(
        "pointer-events-auto hidden items-center gap-6 rounded-2xl border border-transparent px-6 py-3 text-sm text-titan-text-primary transition lg:flex",
        condensed
          ? "shadow-[0_18px_42px_-24px_rgba(8,12,24,0.65)]"
          : "shadow-none",
        condensed ? "w-auto" : "w-full",
        "mx-auto",
        className,
      )}
      initial={false}
      animate={condensed ? DESKTOP_CONDENSED : DESKTOP_EXPANDED}
      transition={{ type: "spring", stiffness: 320, damping: 34 }}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, activePath, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative flex flex-1 items-center justify-center gap-2 text-sm font-medium text-titan-text-muted transition",
        className,
      )}
    >
      {items.map((item, idx) => {
        const isActive = activePath === item.link;
        return (
          <Link
            key={item.link}
            href={item.link}
            onMouseEnter={() => setHovered(idx)}
            onClick={onItemClick}
            className={cn(
              "relative rounded-full px-3 py-1.5 text-center leading-tight transition hover:text-titan-text-secondary",
              isActive ? "text-titan-text-secondary" : undefined,
            )}
          >
            {(hovered === idx || isActive) && (
              <motion.span
                layoutId="navbar-hover"
                className="absolute inset-0 rounded-full bg-[rgba(198,147,68,0.18)]"
                transition={{ type: "spring", stiffness: 360, damping: 32 }}
              />
            )}
            <span className="relative z-10">{item.name}</span>
          </Link>
        );
      })}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, condensed }: MobileNavProps) => {
  return (
    <motion.div
      className={cn(
        "pointer-events-auto relative mx-auto flex w-full flex-col items-center justify-between rounded-2xl border border-transparent bg-transparent px-4 py-3 text-sm text-titan-text-primary shadow-none lg:hidden",
        className,
      )}
      initial={false}
      animate={{
        borderColor: condensed ? "rgba(60,65,92,0.45)" : "rgba(60,65,92,0)",
        backgroundColor: condensed ? "rgba(23,26,40,0.95)" : "rgba(23,26,40,0)",
        boxShadow: condensed ? "0 18px 42px -24px rgba(8,12,24,0.65)" : "0 0 0 rgba(0,0,0,0)",
        backdropFilter: condensed ? "blur(16px)" : "blur(0px)",
        y: condensed ? 6 : 0,
      }}
      transition={{ type: "spring", stiffness: 240, damping: 34 }}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => (
  <div className={cn("flex w-full items-center justify-between", className)}>{children}</div>
);

export const MobileNavMenu = ({ children, className, isOpen, onClose }: MobileNavMenuProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={cn(
          "absolute left-0 right-0 top-full z-30 mt-3 flex max-h-[calc(100vh-8rem)] flex-col gap-3 overflow-y-auto rounded-2xl border border-[rgba(60,65,92,0.4)] bg-[rgba(23,26,40,0.96)] p-4 text-titan-text-primary shadow-[0_18px_42px_-24px_rgba(8,12,24,0.65)] backdrop-blur-xl",
          className,
        )}
        onClick={onClose}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#3c415c] bg-titan-bg text-titan-text-secondary"
    aria-expanded={isOpen}
    aria-label="Toggle navigation"
  >
    {isOpen ? <IconX size={18} /> : <IconMenu2 size={18} />}
  </button>
);

export const NavbarLogo = () => (
  <Link
    href="/"
    className="relative z-20 flex items-center rounded-full px-2 py-1 text-sm font-semibold text-titan-text-secondary"
  >
    Titan Observatory
  </Link>
);

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition";

  const variantStyles = {
    primary:
      "bg-titan-orange text-titan-bg hover:brightness-110",
    secondary: "border border-titan-orange/60 text-titan-yellow hover:bg-titan-orange/10",
    dark: "bg-neutral-900 text-neutral-100 hover:bg-neutral-800",
    gradient: "bg-gradient-to-r from-titan-purple to-[#565b7a] text-titan-text-secondary",
  } as const;

  const TagComponent = Tag as React.ElementType;
  const sharedProps = {
    className: cn(baseStyles, variantStyles[variant], className),
    ...props,
  } as Record<string, unknown>;

  if (href && Tag !== "button") {
    sharedProps.href = href;
  }

  return (
    <TagComponent {...sharedProps}>
      {children}
    </TagComponent>
  );
};
