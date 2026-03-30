import { NextResponse } from "next/server";

const apiKey = process.env.GIVEBUTTER_API_KEY;
const REVALIDATE_SECONDS = 300;
const MAX_PAGES = 3;
const MAX_MESSAGES = 20;

type GivingSpace = {
  id: number;
  name: string;
  amount: number;
  message: string;
  created_at: string;
};

type Transaction = {
  id: number;
  status: string;
  giving_space: GivingSpace | null;
};

type PaginatedResponse = {
  data: Transaction[];
  links: { next: string | null };
};

export type DonorMessage = {
  id: number;
  name: string;
  message: string;
  amount: number;
  date: string;
};

export async function GET() {
  if (!apiKey) {
    return NextResponse.json({ error: "Missing GIVEBUTTER_API_KEY" }, { status: 500 });
  }

  const messages: DonorMessage[] = [];
  let url: string | null = "https://api.givebutter.com/v1/transactions";

  try {
    for (let page = 0; page < MAX_PAGES && url && messages.length < MAX_MESSAGES; page++) {
      const res = await fetch(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        next: { revalidate: REVALIDATE_SECONDS },
      });

      if (!res.ok) {
        return NextResponse.json({ error: "Givebutter API error" }, { status: 502 });
      }

      const json: PaginatedResponse = await res.json();

      for (const tx of json.data) {
        if (messages.length >= MAX_MESSAGES) break;

        if (
          tx.status === "succeeded" &&
          tx.giving_space &&
          tx.giving_space.message &&
          tx.giving_space.message.trim().length > 0
        ) {
          messages.push({
            id: tx.giving_space.id,
            name: tx.giving_space.name || "Anonymous",
            message: tx.giving_space.message.trim(),
            amount: tx.giving_space.amount,
            date: tx.giving_space.created_at,
          });
        }
      }

      url = json.links.next;
    }
  } catch {
    return NextResponse.json({ error: "Failed to fetch donor messages" }, { status: 502 });
  }

  return NextResponse.json(messages);
}
