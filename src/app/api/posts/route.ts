import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: selectAuthor },
  });

  return NextResponse.json(posts.map(sanitizePost));
}
