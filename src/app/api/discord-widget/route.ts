import { NextResponse } from "next/server";

const guildId = process.env.DISCORD_GUILD_ID;
const botToken = process.env.DISCORD_BOT_TOKEN;
const REVALIDATE_SECONDS = 15;

export async function GET() {
  if (!guildId) {
    return NextResponse.json({ error: "Missing DISCORD_GUILD_ID" }, { status: 500 });
  }

  const widgetUrl = `https://discord.com/api/guilds/${guildId}/widget.json`;
  const countsUrl = `https://discord.com/api/v10/guilds/${guildId}?with_counts=true`;

  let presenceCount: number | null = null;
  let memberCount: number | null = null;
  let instantInvite: string | null = null;
  let name: string | null = null;
  let widgetSucceeded = false;
  let countsSucceeded = false;

  try {
    const res = await fetch(widgetUrl, {
      headers: { Accept: "application/json" },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (res.ok) {
      const data = await res.json();
      presenceCount = typeof data?.presence_count === "number" ? data.presence_count : null;
      memberCount = Array.isArray(data?.members) ? data.members.length : null;
      instantInvite = data?.instant_invite ?? null;
      name = data?.name ?? null;
      widgetSucceeded = true;
    }
  } catch {
    // Swallow widget errors; we'll fall back to counts if available.
  }

  if (botToken) {
    try {
      const countsRes = await fetch(countsUrl, {
        headers: {
          Accept: "application/json",
          Authorization: `Bot ${botToken}`,
        },
        next: { revalidate: REVALIDATE_SECONDS },
      });

      if (countsRes.ok) {
        const counts = await countsRes.json();
        if (typeof counts?.approximate_presence_count === "number" && presenceCount === null) {
          presenceCount = counts.approximate_presence_count;
        }
        if (typeof counts?.approximate_member_count === "number") {
          memberCount = counts.approximate_member_count;
        }
        if (!name && typeof counts?.name === "string") {
          name = counts.name;
        }
        countsSucceeded = true;
      }
    } catch {
      // Ignore bot-count failures to allow widget data to still return.
    }
  }

  if (!widgetSucceeded && !countsSucceeded) {
    return NextResponse.json({ error: "Discord data unavailable" }, { status: 502 });
  }

  return NextResponse.json({
    name,
    presenceCount,
    memberCount,
    instantInvite,
  });
}
