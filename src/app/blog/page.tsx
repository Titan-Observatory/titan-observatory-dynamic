import PostCard from "@/components/PostCard";

async function fetchPosts() {
  const res = await fetch(`${process.env.NEXTAUTH_URL || ''}/api/posts`, { cache: "no-store" });
  return res.json();
}

export default async function Blog() {
  const posts = await fetchPosts();
  return (
    <main className="titan-section space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold">Community Updates</h1>
        <p className="mt-2 text-sm text-titan-text-muted">
          Field reports, engineering releases, and research highlights from the Titan team.
        </p>
      </div>
      <div className="space-y-4">
        {posts.length === 0 && <p className="text-sm text-titan-text-muted">No posts yet.</p>}
        {posts.map((p: any) => <PostCard key={p.id} post={p} />)}
      </div>
    </main>
  );
}
