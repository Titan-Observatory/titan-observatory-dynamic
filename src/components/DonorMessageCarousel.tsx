"use client";

import { useEffect, useState } from "react";
import { IconQuote } from "@tabler/icons-react";
import { ANIMATIONS_EVENT, getAnimationsDisabled } from "@/lib/animations";
import type { DonorMessage } from "@/app/api/givebutter-messages/route";

function Skeleton() {
  return (
    <div className="overflow-hidden py-4">
      <div className="flex gap-10">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex shrink-0 items-center gap-3">
            <div className="h-5 w-64 animate-pulse rounded bg-titan-border/30" />
            <div className="h-4 w-28 animate-pulse rounded bg-titan-border/20" />
          </div>
        ))}
      </div>
    </div>
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
              if (text.trim()) errorMessage = text.trim();
            } catch {
              // keep status-based fallback
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
      <p className="text-center text-sm text-titan-text-muted">
        Donor messages couldn&apos;t be loaded right now.
      </p>
    </section>
  );
  if (messages.length === 0) return null;

  // Duplicate so the loop is seamless — animating -50% always scrolls exactly one full set
  const doubled = [...messages, ...messages];
  const duration = Math.max(220, messages.length * 18);

  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-titan-text-muted">
        From our supporters
      </p>

      <section
        role="region"
        aria-label="Donor messages"
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 18%, black 82%, transparent)",
        }}
      >
      <div
        className="flex w-max items-start gap-10"
        style={{
          animation: animationsDisabled
            ? "none"
            : `donor-ticker ${duration}s linear infinite`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState = "running";
        }}
      >
        {doubled.map((msg, i) => (
          <div
            key={`${msg.id}-${i}`}
            className="shrink-0 max-w-[32rem] space-y-4"
          >
            <div className="flex gap-2.5">
              <IconQuote
                size={20}
                className="mt-1 shrink-0 text-titan-text-muted/40"
                aria-hidden="true"
              />
              <p className="text-lg leading-relaxed text-titan-text-primary/90 line-clamp-5 sm:text-xl">
                {msg.message}
              </p>
            </div>
            <div className="flex items-center gap-3 pl-7 text-sm sm:text-base">
              <span className="font-semibold text-titan-text-secondary">
                — {msg.name}
              </span>
              {msg.amount > 0 && (
                <span className="font-medium text-titan-yellow">
                  {formatCurrency(msg.amount)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes donor-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
      </section>
    </div>
  );
}
