"use client";

import { useMemo } from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";

export type Phase = {
  title: string;
  status: string;
  details: string[];
};

type PhaseTimelineProps = {
  phases: Phase[];
};

export default function PhaseTimeline({ phases }: PhaseTimelineProps) {
  const items = useMemo(
    () =>
      phases.map((phase, index) => ({
        badge: `Phase ${index + 1} · ${phase.status}`,
        title: phase.title,
        details: phase.details,
      })),
    [phases],
  );

  return (
    <TracingBeam className="px-0 md:px-8">
      <div className="relative mx-auto max-w-4xl space-y-12 pt-4">
        {items.map(item => (
          <article
            key={item.badge}
            className="rounded-3xl border border-titan-border/60 bg-titan-bg-alt/90 p-6 text-sm leading-relaxed text-titan-text-primary/90 shadow-[0_14px_34px_-24px_rgba(8,12,24,0.8)] backdrop-blur-sm transition hover:border-[#7f8cff]/45 hover:bg-titan-bg-alt/95"
          >
            <span className="inline-flex items-center rounded-full border border-[#7f8cff]/50 bg-[#7f8cff]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#ccd1ff]">
              {item.badge}
            </span>
            <h3 className="mt-4 text-xl font-semibold text-titan-text-secondary">{item.title}</h3>
            <ul className="mt-4 space-y-2">
              {item.details.map(detail => (
                <li key={detail} className="flex gap-3">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[#7f8cff]" />
                  {detail}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </TracingBeam>
  );
}
