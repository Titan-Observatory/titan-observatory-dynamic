import { IconNotebook } from "@tabler/icons-react";
import PostCard from "@/components/PostCard";
import AnimatedSection from "@/components/AnimatedSection";

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  author: { id: number | null; name: string | null } | null;
};

const API_BASE_URL = process.env.NEXTAUTH_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "";

async function fetchPosts(): Promise<BlogPost[]> {
  const url = API_BASE_URL ? new URL("/api/posts", API_BASE_URL).toString() : "/api/posts";

  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      console.error("Failed to load posts", response.statusText);
      return [];
    }
    const data = await response.json();
    return Array.isArray(data) ? (data as BlogPost[]) : [];
  } catch (error) {
    console.error("Failed to load posts", error);
    return [];
  }
}

export default async function Blog() {
  const posts = await fetchPosts();
  const [featured, ...rest] = posts;

  return (
    <main className="relative z-10 space-y-20">
      {/* Header */}
      <header className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-titan-orange sm:text-xs sm:tracking-[0.25em]">
          From the Team
        </p>
        <h1 className="text-3xl font-bold text-titan-text-secondary sm:text-4xl">Community Updates</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-titan-text-primary/90">
          Shop notes, road-trip stories, and engineering updates from the Titan crew.
        </p>
      </header>

      {/* Posts */}
      {posts.length === 0 ? (
        <AnimatedSection className="flex flex-col items-center rounded-3xl border border-titan-border/60 bg-titan-bg-alt/80 px-8 py-16 text-center backdrop-blur-sm">
          <IconNotebook className="h-10 w-10 text-titan-text-muted" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-semibold text-titan-text-secondary">No posts yet</h2>
          <p className="mt-2 max-w-sm text-sm text-titan-text-muted">
            Check back soon. We&apos;ll be sharing updates as the project progresses.
          </p>
        </AnimatedSection>
      ) : (
        <div className="space-y-10">
          {/* Featured Post */}
          {featured && (
            <AnimatedSection>
              <PostCard post={featured} featured />
            </AnimatedSection>
          )}

          {/* Remaining Posts */}
          {rest.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2">
              {rest.map((post, index) => (
                <AnimatedSection key={post.id} delay={index * 0.08}>
                  <PostCard post={post} />
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bottom CTA */}
      <AnimatedSection className="rounded-2xl border border-titan-border/50 bg-titan-bg-alt/60 p-8 text-center backdrop-blur-sm">
        <h2 className="text-2xl font-semibold text-titan-text-secondary">
          Join the Conversation
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-titan-text-primary/80">
          Discuss updates, ask questions, and follow development on the forum and Discord.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://community.titanobservatory.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-titan-blue/60 bg-titan-blue/20 px-6 py-3 text-sm font-semibold text-titan-text-secondary transition hover:bg-titan-blue/30"
          >
            Visit the Forum
          </a>
        </div>
      </AnimatedSection>
    </main>
  );
}
