import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

const TITLE_MAX_LENGTH = 160;
const SLUG_MAX_LENGTH = 64;
const CONTENT_MAX_LENGTH = 8000;
const SLUG_PATTERN = /^[a-z0-9-]+$/;

type PostPayload = {
  title: string;
  slug: string;
  content: string;
};

const selectAuthor = { select: { id: true, name: true } } as const;

function sanitizePost(post: {
  id: number;
  title: string;
  slug: string;
  content: string;
  createdAt: Date;
  author: { id: number; name: string | null } | null;
}) {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    content: post.content,
    createdAt: post.createdAt,
    author: {
      id: post.author?.id ?? null,
      name: post.author?.name ?? null,
    },
  };
}

function parsePayload(payload: unknown): PostPayload | { error: string } {
  if (!payload || typeof payload !== "object") {
    return { error: "Invalid payload" };
  }

  const body = payload as Record<string, unknown>;

  const unsafeTitle = typeof body.title === "string" ? body.title.trim() : "";
  const unsafeSlug = typeof body.slug === "string" ? body.slug.trim().toLowerCase() : "";
  const unsafeContent = typeof body.content === "string" ? body.content.trim() : "";

  if (!unsafeTitle || !unsafeSlug || !unsafeContent) {
    return { error: "Missing required fields" };
  }

  if (unsafeTitle.length > TITLE_MAX_LENGTH) {
    return { error: "Title too long" };
  }

  if (unsafeSlug.length > SLUG_MAX_LENGTH || !SLUG_PATTERN.test(unsafeSlug)) {
    return { error: "Slug must be lowercase letters, numbers, or hyphens" };
  }

  if (unsafeContent.length > CONTENT_MAX_LENGTH) {
    return { error: "Content exceeds max length" };
  }

  return {
    title: unsafeTitle,
    slug: unsafeSlug,
    content: unsafeContent,
  };
}

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: selectAuthor },
  });

  return NextResponse.json(posts.map(sanitizePost));
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = parsePayload(body);

  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const author = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!author) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const created = await prisma.post.create({
    data: { ...parsed, authorId: author.id },
    include: { author: selectAuthor },
  });

  return NextResponse.json(sanitizePost(created));
}
