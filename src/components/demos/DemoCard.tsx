import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export default function DemoCard({
  title,
  description,
  className,
  children,
}: {
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-3xl border border-titan-border/60 bg-titan-bg-alt/80 p-6 shadow-[0_22px_48px_-36px_rgba(10,15,35,0.9)] backdrop-blur-md",
        className,
      )}
    >
      <header className="space-y-1.5">
        <h2 className="text-lg font-semibold text-titan-text-secondary">{title}</h2>
        {description ? <p className="text-sm text-titan-text-muted">{description}</p> : null}
      </header>
      <div className="mt-5">{children}</div>
    </section>
  );
}

