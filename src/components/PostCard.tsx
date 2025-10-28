export default function PostCard({ post }: { post: any }) {
  return (
    <article className="border rounded bg-white p-4">
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p className="text-xs text-gray-500 mb-2">
        {new Date(post.createdAt).toLocaleString()} • {post.author?.name || post.author?.email}
      </p>
      <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
    </article>
  );
}
