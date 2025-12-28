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
    <section className="project-updates-page space-y-4 px-4 sm:space-y-6 sm:px-0 -mx-8 sm:mx-0">
      <header className="space-y-2 sm:space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-titan-text-muted">Community</p>
        <h1 className="text-3xl font-semibold tracking-tight text-titan-text-primary sm:text-4xl">
          Project Updates
        </h1>
        <p className="max-w-2xl text-base text-titan-text-muted">
          Latest updates from the Titan Observatory community forum.
        </p>
      </header>

      <div className="space-y-6 pt-4 sm:space-y-10 sm:pt-8">
        {topics.length === 0 ? (
          <p className="text-sm text-titan-text-muted">No updates available right now.</p>
        ) : (
          topics.map((topic, index) => (
            <article
              key={topic.id}
              className="space-y-4 rounded-xl border border-titan-border bg-gradient-to-br from-titan-bg-alt to-titan-bg p-4 shadow-titan sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-titan-text-muted">
                <span>{formatDate(topic.created_at)}</span>
                {index === 0 ? (
                  <span className="font-semibold text-titan-text-primary">Latest Update</span>
                ) : null}
                <a
                  href={`${DISCOURSE_BASE}/t/${topic.slug}/${topic.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-titan-orange underline-offset-2 hover:underline"
                >
                  View on forum
                </a>
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-titan-text-primary">
                {topic.title}
              </h2>
              <div
                className="discourse-content"
                dangerouslySetInnerHTML={{
                  __html: openImageLinksInNewTab(topic.cooked ?? "<p>No content available.</p>"),
                }}
              />

              <div className="space-y-3 pt-2">
                <p className="text-sm uppercase tracking-[0.2em] text-titan-text-muted">
                  Comments
                </p>
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
