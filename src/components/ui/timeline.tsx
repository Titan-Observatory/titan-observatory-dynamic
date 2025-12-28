"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useScroll } from "framer-motion";
import { useEffect, useMemo, useRef, type ReactNode } from "react";

type TimelineEntry = {
  title: string;
  content: ReactNode;
};

type TimelineProps = {
  data: TimelineEntry[];
  className?: string;
};

export function Timeline({ data, className }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.1"],
  });

  const lineScale = useMotionValue(0);
  const pollIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => {
      if (document.hidden) return;
      lineScale.set(scrollYProgress.get());
    };

    update();
    pollIntervalRef.current = window.setInterval(update, 50);

    return () => {
      if (pollIntervalRef.current !== null) {
        window.clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    };
  }, [lineScale, scrollYProgress]);

  const items = useMemo(() => data ?? [], [data]);

  return (
    <div ref={containerRef} className={cn("relative mx-auto w-full max-w-5xl md:pl-16", className)}>
      <div
        className="pointer-events-none absolute inset-y-6 left-6 hidden w-px overflow-hidden rounded-full bg-titan-purple/20 md:block"
        aria-hidden="true"
      >
        <motion.span
          className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-titan-purple via-[#6a7295] to-transparent"
          style={{ scaleY: lineScale }}
        />
      </div>
      <div className="space-y-10">
        {items.map((item, index) => (
          <motion.article
            key={`${item.title}-${index}`}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative rounded-3xl border border-titan-border/60 bg-titan-bg-alt/90 p-6 shadow-[0_14px_34px_-24px_rgba(8,12,24,0.8)] backdrop-blur-sm transition hover:border-titan-purple/40 hover:bg-titan-bg-alt/95 md:pl-14"
          >
            <div className="mb-2 flex items-center gap-3 md:hidden">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-titan-orange" />
              <span className="text-xs font-semibold uppercase tracking-widest text-titan-yellow">
                {index + 1}
              </span>
            </div>
            <div className="absolute left-[-20px] top-6 hidden h-10 w-10 items-center justify-center rounded-full border border-titan-purple/40 bg-titan-bg md:flex">
              <span className="text-sm font-semibold text-titan-yellow">{index + 1}</span>
            </div>
            <div className="flex flex-col gap-3 md:pl-0">
              <h3 className="text-lg font-semibold text-titan-text-secondary">{item.title}</h3>
              <div className="text-sm leading-relaxed text-titan-text-primary/90">{item.content}</div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
