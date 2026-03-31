"use client";

import { useState, type ReactNode } from "react";
import { IconChevronDown } from "@tabler/icons-react";

type FaqItem = {
  question: string;
  answer: ReactNode;
};

export default function FaqList({ items }: { items: FaqItem[] }) {
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set());

  const toggleItem = (index: number) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section className="grid gap-6">
      {items.map((item, index) => {
        const isOpen = openItems.has(index);
        return (
          <article
            key={item.question}
            className="overflow-hidden rounded-3xl border border-titan-border/60 bg-titan-bg/80 shadow-[0_14px_34px_-24px_rgba(8,12,24,0.8)] backdrop-blur-sm transition hover:border-titan-purple/40 hover:bg-titan-bg/95"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-3xl bg-titan-bg-alt/90 px-6 py-5 text-left text-lg font-semibold text-titan-text-secondary"
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
            >
              <span className="min-w-0 flex-1 pr-4">{item.question}</span>
              <IconChevronDown
                size={18}
                aria-hidden="true"
                className={`shrink-0 text-titan-text-primary/70 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* CSS grid-template-rows trick: no JS measurement, no layout shift */}
            <div
              className="grid transition-[grid-template-rows] duration-200 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="px-6 pb-6 pt-4 text-sm leading-relaxed text-titan-text-primary/90">
                  {item.answer}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
