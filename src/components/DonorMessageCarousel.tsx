"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { IconQuote } from "@tabler/icons-react";
import { ANIMATIONS_EVENT, getAnimationsDisabled } from "@/lib/animations";
import type { DonorMessage } from "@/app/api/givebutter-messages/route";

function Skeleton() {
  return (
    <div className="min-w-0 overflow-hidden py-3 sm:py-4">
      <div className="flex gap-4 sm:gap-10">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex w-[min(19rem,100%)] shrink-0 flex-col gap-3 rounded-3xl border border-titan-border/40 bg-titan-bg-alt/50 p-5 sm:w-auto sm:flex-row sm:items-center sm:gap-3 sm:border-0 sm:bg-transparent sm:p-0"
          >
            <div className="h-5 w-full animate-pulse rounded bg-titan-border/30 sm:w-64" />
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

function MessageCard({
  message,
  mobile = false,
  ariaHidden = false,
}: {
  message: DonorMessage;
  mobile?: boolean;
  ariaHidden?: boolean;
}) {
  return (
    <article
      aria-hidden={ariaHidden || undefined}
      className={
        mobile
          ? "w-[min(20rem,100%)] shrink-0 snap-start rounded-3xl border border-titan-border/50 bg-titan-bg-alt/70 p-5 shadow-[0_18px_40px_-30px_rgba(10,15,35,0.9)] backdrop-blur-sm"
          : "shrink-0 max-w-[28rem] space-y-4"
      }
    >
      <div className="flex gap-2.5">
        <IconQuote
          size={mobile ? 18 : 20}
          className="mt-1 shrink-0 text-titan-text-muted/40"
          aria-hidden="true"
        />
        <p
          className={
            mobile
              ? "text-base leading-relaxed text-titan-text-primary/90"
              : "text-lg leading-relaxed text-titan-text-primary/90 line-clamp-5 sm:text-xl"
          }
        >
          {message.message}
        </p>
      </div>
      <div
        className={
          mobile
            ? "flex flex-wrap items-center gap-x-3 gap-y-1 pl-7 text-sm"
            : "flex items-center gap-3 pl-7 text-sm sm:text-base"
        }
      >
        <span className="font-semibold text-titan-text-secondary">- {message.name}</span>
        {message.amount > 0 && (
          <span className="font-medium text-titan-yellow">
            {formatCurrency(message.amount)}
          </span>
        )}
      </div>
    </article>
  );
}

export default function DonorMessageCarousel() {
  const [messages, setMessages] = useState<DonorMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animationsDisabled, setAnimationsDisabled] = useState(false);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const track = mobileTrackRef.current;
    if (!track || messages.length === 0 || animationsDisabled) {
      return;
    }

    let frameId = 0;
    let lastFrame = 0;
    let pausedUntil = 0;
    const pixelsPerSecond = 24;

    const pause = () => {
      pausedUntil = Date.now() + 2500;
    };

    const tick = (timestamp: number) => {
      if (!track.isConnected) {
        return;
      }

      const isDesktop = window.innerWidth >= 768;
      const loopWidth = track.scrollWidth / 2;

      if (
        isDesktop ||
        document.hidden ||
        loopWidth <= track.clientWidth ||
        Date.now() < pausedUntil
      ) {
        lastFrame = timestamp;
        frameId = window.requestAnimationFrame(tick);
        return;
      }

      if (!lastFrame) {
        lastFrame = timestamp;
      }

      const deltaSeconds = (timestamp - lastFrame) / 1000;
      lastFrame = timestamp;

      const nextScrollLeft = track.scrollLeft + pixelsPerSecond * deltaSeconds;
      track.scrollLeft =
        nextScrollLeft >= loopWidth ? nextScrollLeft - loopWidth : nextScrollLeft;

      frameId = window.requestAnimationFrame(tick);
    };

    track.addEventListener("touchstart", pause, { passive: true });
    track.addEventListener("pointerdown", pause);
    track.addEventListener("wheel", pause, { passive: true });

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
      track.removeEventListener("touchstart", pause);
      track.removeEventListener("pointerdown", pause);
      track.removeEventListener("wheel", pause);
    };
  }, [animationsDisabled, messages.length]);

  const orderedMessages = useMemo(
    () =>
      [...messages].sort(
        (a, b) => b.message.trim().length - a.message.trim().length,
      ),
    [messages],
  );

  if (loading) return <Skeleton />;
  if (error) {
    return (
      <section className="rounded-2xl border border-titan-border/50 bg-titan-bg-alt/60 px-5 py-5 backdrop-blur-sm sm:px-6">
        <p className="text-center text-sm text-titan-text-muted">
          Donor messages could not be loaded right now.
        </p>
      </section>
    );
  }
  if (messages.length === 0) return null;

  // Duplicate the list so translating -50% always equals one full message set.
  const doubled = [...orderedMessages, ...orderedMessages];
  const duration = Math.max(220, orderedMessages.length * 18);

  return (
    <div className="min-w-0 space-y-3 sm:space-y-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-titan-text-muted sm:text-xs sm:tracking-[0.25em]">
        From our supporters
      </p>

      <div
        ref={mobileTrackRef}
        className="flex w-full min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pr-1 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {doubled.map((message, i) => (
          <MessageCard
            key={`${message.id}-mobile-${i}`}
            message={message}
            mobile
            ariaHidden={i >= orderedMessages.length}
          />
        ))}
      </div>

      <section
        role="region"
        aria-label="Donor messages"
        className="hidden overflow-hidden md:block"
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
          {doubled.map((message, i) => (
            <MessageCard
              key={`${message.id}-${i}`}
              message={message}
              ariaHidden={i >= orderedMessages.length}
            />
          ))}
        </div>

        <style>{`
          @keyframes donor-ticker {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </section>
    </div>
  );
}
