"use client";

import { useEffect, useMemo, useState } from "react";
import { IconBrandDiscord } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

type WidgetResponse = {
  name: string | null;
  presenceCount: number | null;
  memberCount: number | null;
  instantInvite: string | null;
};

const POLL_INTERVAL_MS = 15000;
const numberFormatter = new Intl.NumberFormat("en-US");

export default function DiscordPresenceBadge({ className }: { className?: string }) {
  const [data, setData] = useState<WidgetResponse | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchPresence = async () => {
      try {
        const res = await fetch("/api/discord-widget");
        if (!res.ok) throw new Error("Request failed");
        const json = (await res.json()) as WidgetResponse;
        if (!cancelled) {
          setData(json);
          setError(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(true);
        }
      }
    };

    fetchPresence();
    const interval = setInterval(fetchPresence, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const statusText = useMemo(() => {
    const parts: string[] = [];
    if (typeof data?.presenceCount === "number") {
      parts.push(`${numberFormatter.format(data.presenceCount)} online`);
    }
    if (typeof data?.memberCount === "number") {
      parts.push(`${numberFormatter.format(data.memberCount)} members`);
    }
    if (parts.length) return parts.join(" / ");
    if (error) return "Status unavailable";
    return "Loading...";
  }, [data?.presenceCount, data?.memberCount, error]);

  const label = data?.name ? `Discord - ${data.name}` : "Discord";

  const content = (
    <div className="flex items-center gap-3" aria-live="polite" aria-atomic="true">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(88,101,242,0.14)] text-[#9db0ff]">
        <IconBrandDiscord size={16} />
      </span>
      <div className="flex flex-col leading-tight">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-titan-text-muted">{label}</span>
        <span className="flex items-center gap-2 text-sm text-titan-text-secondary">
          <span className="inline-flex h-2 w-2 rounded-full bg-[#61e6b5] animate-pulse" aria-hidden />
          <span>{statusText}</span>
        </span>
      </div>
    </div>
  );

  const baseClass = cn(
    "group inline-flex items-center gap-3 rounded-full border border-titan-orange/50 bg-titan-orange/10 px-3 py-2 text-xs font-semibold text-titan-text-secondary shadow-[0_10px_24px_-16px_rgba(0,0,0,0.45)] transition hover:border-titan-yellow/70 hover:bg-titan-orange/20",
    className,
  );

  if (data?.instantInvite) {
    return (
      <a
        href={data.instantInvite}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
        title="Join us on Discord"
      >
        {content}
      </a>
    );
  }

  return (
    <div className={baseClass} title="Discord live status">
      {content}
    </div>
  );
}
