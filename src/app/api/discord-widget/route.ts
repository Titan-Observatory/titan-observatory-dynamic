import { NextResponse } from "next/server";
import { getDiscordWidgetData } from "@/lib/discord-widget";

export async function GET() {
  const data = await getDiscordWidgetData();

  if (!data) {
    return NextResponse.json({ error: "Discord data unavailable" }, { status: 502 });
  }

  return NextResponse.json(data);
}
