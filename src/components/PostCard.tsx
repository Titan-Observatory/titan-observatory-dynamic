export default function PostCard({ post }: { post: any }) {
  return (
    <article className="titan-card p-5 space-y-3">
      <h2 className="text-xl font-semibold text-titan-text-secondary">{post.title}</h2>
      <p className="text-xs text-titan-text-muted">
        {new Date(post.createdAt).toLocaleString()} - {post.author?.name || post.author?.email}
      </p>
      <p className="text-sm text-titan-text-primary whitespace-pre-wrap leading-relaxed">
        {post.content}
      </p>
    </article>
  );
}
