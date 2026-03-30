import { NextResponse } from "next/server";

export const revalidate = 300;

const apiKey = process.env.GIVEBUTTER_API_KEY;
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

const BASE_URL = "https://api.givebutter.com/v1/transactions";

function cleanPageUrl(page: number): string {
  return `${BASE_URL}?page=${page}`;
}

export async function GET() {
  if (!apiKey) {
    return NextResponse.json({ error: "Missing GIVEBUTTER_API_KEY" }, { status: 422 });
  }

  const messages: DonorMessage[] = [];
  let currentPage = 1;
  let hasMore = true;

  try {
    while (hasMore && currentPage <= MAX_PAGES && messages.length < MAX_MESSAGES) {
      const res = await fetch(cleanPageUrl(currentPage), {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        let responseBody = "";
        try {
          responseBody = await res.text();
        } catch {
          responseBody = "";
        }

        const detail = responseBody.trim()
          ? ` - ${responseBody.trim().slice(0, 500)}`
          : "";

        return NextResponse.json(
          {
            error: `Givebutter API error: ${res.status} ${res.statusText}${detail}`,
          },
          { status: 422 },
        );
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

      // Givebutter pollutes links.next with internal model properties as query
      // params (apiKey[incrementing], apiKey[exists], etc.) which their own API
      // then rejects. Build clean page URLs ourselves instead of using their links.
      hasMore = json.links.next !== null;
      currentPage++;
    }
  } catch (error: unknown) {
    const detail = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to fetch donor messages: ${detail}` },
      { status: 422 },
    );
  }

  return NextResponse.json(messages);
}
