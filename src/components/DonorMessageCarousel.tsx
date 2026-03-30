"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  IconChevronLeft,
  IconChevronRight,
  IconQuote,
} from "@tabler/icons-react";
import {
  ANIMATIONS_EVENT,
  getAnimationsDisabled,
} from "@/lib/animations";
import type { DonorMessage } from "@/app/api/givebutter-messages/route";

function Skeleton() {
  return (
    <section className="rounded-2xl border border-titan-border/50 bg-titan-bg-alt/60 px-6 py-5 backdrop-blur-sm">
      <div className="flex gap-4 overflow-hidden">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="min-w-[280px] max-w-[360px] flex-[0_0_auto] rounded-xl border border-titan-border/40 bg-titan-bg/40 px-5 py-4"
          >
            <div className="mb-3 h-4 w-3/4 animate-pulse rounded bg-titan-border/30" />
            <div className="mb-2 h-3 w-full animate-pulse rounded bg-titan-border/20" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-titan-border/20" />
          </div>
        ))}
      </div>
    </section>
  );
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function DonorMessageCarousel() {
  const [messages, setMessages] = useState<DonorMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animationsDisabled, setAnimationsDisabled] = useState(false);

  const autoplayPlugin = Autoplay({
    delay: 4000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
    stopOnFocusIn: true,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
      containScroll: false,
    },
    animationsDisabled ? [] : [autoplayPlugin],
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    setAnimationsDisabled(
      getAnimationsDisabled() ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );

    const handleToggle = (e: Event) => {
      const { disabled } = (e as CustomEvent).detail;
      setAnimationsDisabled(disabled);
    };

    window.addEventListener(ANIMATIONS_EVENT, handleToggle);
    return () => window.removeEventListener(ANIMATIONS_EVENT, handleToggle);
  }, []);

  useEffect(() => {
    fetch("/api/givebutter-messages")
      .then(async (res) => {
        if (!res.ok) {
          let errorMessage = `Request failed with status ${res.status} ${res.statusText}`.trim();
          const clonedResponse = res.clone();

          try {
            const payload = await res.json();
            if (payload && typeof payload.error === "string") {
              errorMessage = payload.error;
            }
          } catch {
            try {
              const text = await clonedResponse.text();
              if (text.trim()) {
                errorMessage = text.trim();
              }
            } catch {
              // Keep the status-based fallback when the response body can't be read.
            }
          }

          throw new Error(errorMessage);
        }
        return res.json();
      })
      .then((data: DonorMessage[]) => {
        setMessages(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : "Unknown error loading donor messages";
        setError(message);
        setLoading(false);
      });
  }, []);

  if (loading) return <Skeleton />;
  if (error) return (
    <section className="rounded-2xl border border-titan-border/50 bg-titan-bg-alt/60 px-6 py-5 backdrop-blur-sm">
      <div className="space-y-2">
        <p className="text-center text-sm font-medium text-titan-text-secondary">
          Donor messages couldn&apos;t be loaded.
        </p>
        <pre className="overflow-x-auto rounded-xl border border-titan-border/40 bg-titan-bg/40 px-4 py-3 text-xs leading-relaxed text-titan-text-primary/90">
          {error}
        </pre>
      </div>
    </section>
  );
  if (messages.length === 0) return null;

  return (
    <section
      role="region"
      aria-label="Donor messages"
      className="relative rounded-2xl border border-titan-border/50 bg-titan-bg-alt/60 px-6 py-5 backdrop-blur-sm"
    >
      <div
        ref={emblaRef}
        className="overflow-hidden"
        aria-roledescription="carousel"
        aria-live="off"
      >
        <div className="flex gap-4">
          {messages.map((msg, i) => (
            <div
              key={msg.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${messages.length}`}
              className="min-w-[280px] max-w-[360px] flex-[0_0_auto] rounded-xl border border-titan-border/40 bg-titan-bg/40 px-5 py-4"
            >
              <IconQuote
                size={16}
                className="mb-2 text-titan-text-muted/50"
                aria-hidden="true"
              />
              <p className="mb-3 line-clamp-3 text-sm leading-relaxed text-titan-text-primary/90">
                {msg.message}
              </p>
              <div className="flex items-center justify-between text-xs text-titan-text-muted">
                <span className="font-medium text-titan-text-secondary">
                  {msg.name}
                </span>
                {msg.amount > 0 && (
                  <span className="text-titan-yellow">
                    {formatCurrency(msg.amount)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={scrollPrev}
        aria-label="Previous message"
        className="absolute left-1.5 top-1/2 -translate-y-1/2 rounded-full border border-titan-border/40 bg-titan-bg/80 p-1 text-titan-text-muted transition hover:text-titan-text-secondary"
      >
        <IconChevronLeft size={16} />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Next message"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full border border-titan-border/40 bg-titan-bg/80 p-1 text-titan-text-muted transition hover:text-titan-text-secondary"
      >
        <IconChevronRight size={16} />
      </button>
    </section>
  );
}
