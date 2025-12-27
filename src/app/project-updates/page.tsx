export const metadata = {
  title: "Project Updates | Titan Observatory",
  description: "Latest project updates from the Titan Observatory community.",
};

import CommentsEmbed from "@/components/CommentsEmbed";

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

  return data.topic_list?.topics ?? [];
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

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.2em] text-titan-text-muted">Community</p>
        <h1 className="text-3xl font-semibold tracking-tight text-titan-text-primary sm:text-4xl">
          Project Updates
        </h1>
        <p className="max-w-2xl text-base text-titan-text-muted">
          Live updates from the Titan Observatory community forum. Click through to join the
          conversation.
        </p>
      </header>

      <div className="space-y-10">
        {topics.length === 0 ? (
          <p className="text-sm text-titan-text-muted">No updates available right now.</p>
        ) : (
          topics.map(topic => (
            <article
              key={topic.id}
              className="space-y-4 rounded-xl border border-titan-border bg-gradient-to-br from-titan-bg-alt to-titan-bg p-8 shadow-titan"
            >
              <div className="flex flex-wrap items-center gap-3 text-sm text-titan-text-muted">
                <span className="uppercase tracking-[0.18em] text-[11px] text-titan-orange">
                  Project Updates
                </span>
                <span className="text-titan-border">•</span>
                <span>{formatDate(topic.created_at)}</span>
                {topic.author ? (
                  <>
                    <span className="text-titan-border">•</span>
                    <span>by {topic.author}</span>
                  </>
                ) : null}
                <span className="text-titan-border">•</span>
                <a
                  href={`${DISCOURSE_BASE}/t/${topic.slug}/${topic.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-titan-orange underline-offset-2 hover:underline"
                >
                  View on forum
                </a>
              </div>

              <h2 className="text-2xl font-semibold text-titan-text-secondary">{topic.title}</h2>
              <div
                className="discourse-content"
                dangerouslySetInnerHTML={{ __html: topic.cooked ?? "<p>No content available.</p>" }}
              />

              <div className="space-y-3">
                <CommentsEmbed
                  src={`${DISCOURSE_BASE}/embed/comments?topic_id=${topic.id}&class_name=${EMBED_CLASSNAME}`}
                  title={`Comments for ${topic.title}`}
                  className="w-full rounded-2xl border border-titan-border bg-titan-bg-alt p-2"
                />
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
