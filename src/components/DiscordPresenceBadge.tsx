import { IconBrandDiscord } from "@tabler/icons-react";

import { getDiscordWidgetData } from "@/lib/discord-widget";
import { cn } from "@/lib/utils";

const numberFormatter = new Intl.NumberFormat("en-US");
const DISCORD_INVITE_URL = "https://discord.gg/T5F6AG26tE";

export default async function DiscordPresenceBadge({ className }: { className?: string }) {
  const data = await getDiscordWidgetData();

  const parts: string[] = [];
  if (typeof data?.presenceCount === "number") {
    parts.push(`${numberFormatter.format(data.presenceCount)} online`);
  }
  if (typeof data?.memberCount === "number") {
    parts.push(`${numberFormatter.format(data.memberCount)} members`);
  }

  const statusText = parts.length ? parts.join(" / ") : "Status unavailable";
  const label = data?.name ? `Discord - ${data.name}` : "Discord";

  const content = (
    <div className="flex items-center gap-3" aria-live="polite" aria-atomic="true">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(88,101,242,0.14)] text-[#9db0ff]">
        <IconBrandDiscord size={16} />
      </span>
      <div className="flex flex-col leading-tight">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-titan-text-muted">{label}</span>
        <span className="flex items-center gap-2 text-sm text-titan-text-secondary">
          <span className="inline-flex h-2 w-2 rounded-full bg-[#61e6b5]" aria-hidden />
          <span>{statusText}</span>
        </span>
      </div>
    </div>
  );

  const baseClass = cn(
    "group inline-flex items-center gap-3 rounded-full border border-titan-orange/50 bg-titan-orange/10 px-3 py-2 text-xs font-semibold text-titan-text-secondary shadow-[0_10px_24px_-16px_rgba(0,0,0,0.45)] transition hover:border-titan-yellow/70 hover:bg-titan-orange/20",
    className,
  );

  if (DISCORD_INVITE_URL) {
    return (
      <a
        href={DISCORD_INVITE_URL}
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
