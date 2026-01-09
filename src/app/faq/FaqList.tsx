"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
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
            className="rounded-3xl border border-titan-border/60 bg-titan-bg/80 text-sm leading-relaxed text-titan-text-primary/90 shadow-[0_14px_34px_-24px_rgba(8,12,24,0.8)] backdrop-blur-sm transition hover:border-titan-purple/40 hover:bg-titan-bg/95"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-3xl bg-titan-bg-alt/90 px-6 py-5 text-left text-lg font-semibold text-titan-text-secondary"
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <span className={`text-titan-text-primary/70 transition ${isOpen ? "rotate-180" : ""}`}>▾</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.1, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 pt-4 text-sm text-titan-text-primary/90">{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </article>
        );
      })}
    </section>
  );
}
