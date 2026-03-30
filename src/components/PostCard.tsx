type PostAuthor = {
  id: number | null;
  name: string | null;
};

type PostCardProps = {
  post: {
    id: number;
    title: string;
    slug: string;
    content: string;
    createdAt: string | Date;
    author: PostAuthor | null;
  };
  featured?: boolean;
};

export default function PostCard({ post, featured = false }: PostCardProps) {
  const publishedAt = new Date(post.createdAt);
  const authorName = post.author?.name?.trim() || "Titan Observatory Team";
  const formattedDate = Number.isNaN(publishedAt.getTime())
    ? "Recently"
    : new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(publishedAt);

  return (
    <article className="flex h-full flex-col rounded-3xl border border-titan-border/60 bg-titan-bg-alt/80 p-6 shadow-[0_14px_34px_-24px_rgba(8,12,24,0.8)] backdrop-blur-sm transition hover:border-titan-purple/40 hover:bg-titan-bg-alt/95">
      <div className="flex items-center gap-3">
        <span className="rounded-full border border-titan-purple/40 bg-titan-purple/15 px-3 py-1 text-[11px] font-semibold text-titan-text-secondary">
          {formattedDate}
        </span>
        <span className="text-xs text-titan-text-muted">{authorName}</span>
      </div>
      <h2 className={`mt-3 font-semibold text-titan-text-secondary ${featured ? "text-2xl" : "text-xl"}`}>
        {post.title}
      </h2>
      <p className="mt-3 flex-1 whitespace-pre-wrap text-sm leading-relaxed text-titan-text-primary/90 line-clamp-3">
        {post.content}
      </p>
    </article>
  );
}
