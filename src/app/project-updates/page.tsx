import type { Metadata } from "next";
import Link from "next/link";
import CommentsEmbed from "@/components/CommentsEmbed";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Project Updates | Titan Observatory",
  description: "Latest project updates from the Titan Observatory community.",
};

const DISCOURSE_BASE = "https://community.titanobservatory.org";
const CATEGORY_SLUG = "project-updates";
const CATEGORY_ID = 47;

type TopicSummary = {
  id: number;
  title: string;
  slug: string;
  created_at: string;
};

type TopicWithContent = TopicSummary & {
  cooked?: string;
  author?: string;
};

const EMBED_CLASSNAME = "embed-dark";

async function fetchCategoryTopics(): Promise<TopicSummary[]> {
  const res = await fetch(`${DISCOURSE_BASE}/c/${CATEGORY_SLUG}/${CATEGORY_ID}.json`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    console.error("Failed to fetch category topics", res.status, res.statusText);
    return [];
  }

  const data = (await res.json()) as {
    topic_list?: { topics?: Array<{ id: number; title: string; slug: string; created_at: string }> };
  };

  const topics = data.topic_list?.topics ?? [];
  return topics.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
}

async function fetchTopicContent(topic: TopicSummary): Promise<TopicWithContent> {
  const res = await fetch(`${DISCOURSE_BASE}/t/${topic.id}.json`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    console.error("Failed to fetch topic content", topic.id, res.status, res.statusText);
    return topic;
  }

  const data = (await res.json()) as {
    post_stream?: { posts?: Array<{ cooked: string; username?: string }> };
  };

  return {
    ...topic,
    cooked: data.post_stream?.posts?.[0]?.cooked,
    author: data.post_stream?.posts?.[0]?.username,
  };
}

async function getTopicsWithContent(): Promise<TopicWithContent[]> {
  const topics = await fetchCategoryTopics();
  const withContent = await Promise.all(topics.map(fetchTopicContent));
  return withContent;
}

export default async function ProjectUpdatesPage() {
  const topics = await getTopicsWithContent();

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(
      new Date(date),
    );
  const openImageLinksInNewTab = (html: string) =>
    html.replace(
      /<a\b(?![^>]*\btarget=)([^>]*\bhref=(?:"[^"]+\.(?:png|jpe?g|gif|webp|svg)(?:\?[^"]*)?(?:#[^"]*)?"|'[^']+\.(?:png|jpe?g|gif|webp|svg)(?:\?[^']*)?(?:#[^']*)?')[^>]*)>/gi,
      '<a target="_blank" rel="noopener noreferrer"$1>',
    );

  return (
    <main className="relative z-10 space-y-20">
      {/* Header */}
      <header className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-titan-text-muted sm:text-xs sm:tracking-[0.25em]">
          Community
        </p>
        <h1 className="text-3xl font-bold text-titan-text-secondary sm:text-4xl">
          Project Updates
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-titan-text-primary/90">
          Latest updates from the Titan Observatory community forum.
        </p>
      </header>

      {/* Updates */}
      <section className="space-y-10">
        {topics.length === 0 ? (
          <p className="text-sm text-titan-text-muted">No updates available right now.</p>
        ) : (
          topics.map((topic, index) => (
            <AnimatedSection
              key={topic.id}
              delay={index * 0.08}
              className="space-y-5 rounded-3xl border border-titan-border/60 bg-titan-bg-alt/90 p-6 shadow-[0_14px_34px_-24px_rgba(8,12,24,0.8)] backdrop-blur-sm transition hover:border-titan-purple/40 hover:bg-titan-bg-alt/95 sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-3 text-sm text-titan-text-muted">
                <span>{formatDate(topic.created_at)}</span>
                {index === 0 && (
                  <span className="rounded-full border border-titan-orange/50 bg-titan-orange/15 px-3 py-1 text-xs font-semibold text-titan-orange">
                    Latest Update
                  </span>
                )}
                <a
                  href={`${DISCOURSE_BASE}/t/${topic.slug}/${topic.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-titan-border/60 px-3 py-1 text-xs font-semibold text-titan-text-secondary transition hover:border-titan-orange/50 hover:bg-titan-orange/5"
                >
                  View on forum
                </a>
              </div>

              <h2 className="text-2xl font-semibold tracking-tight text-titan-text-secondary">
                {topic.title}
              </h2>
              <div
                className="discourse-content"
                dangerouslySetInnerHTML={{
                  __html: openImageLinksInNewTab(topic.cooked ?? "<p>No content available.</p>"),
                }}
              />

              <div className="space-y-3 border-t border-titan-border/40 pt-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-titan-text-muted sm:text-xs">
                  Comments
                </p>
                <CommentsEmbed
                  src={`${DISCOURSE_BASE}/embed/comments?topic_id=${topic.id}&class_name=${EMBED_CLASSNAME}`}
                  title={`Comments for ${topic.title}`}
                  className="w-full rounded-2xl border border-titan-border/60 bg-titan-bg-alt/50 p-2"
                />
              </div>
            </AnimatedSection>
          ))
        )}
      </section>

      {/* Bottom CTA */}
      <AnimatedSection className="rounded-2xl border border-titan-border/50 bg-titan-bg-alt/60 p-8 text-center backdrop-blur-sm">
        <h2 className="text-2xl font-semibold text-titan-text-secondary">
          Support Continued Progress
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-titan-text-primary/80">
          Every donation helps us hit the next milestone. Follow along and see exactly where your support goes.
        </p>
        <Link
          href="/donate"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-titan-orange px-7 py-3 text-sm font-bold text-titan-bg transition hover:brightness-110"
        >
          Support the Observatory
        </Link>
      </AnimatedSection>
    </main>
  );
}
