"use client";

import { type ReactNode } from "react";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function AnimatedSection({
  children,
  className,
  delay: _delay = 0,
}: AnimatedSectionProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
