import PostCard from "@/components/PostCard";

async function fetchPosts() {
  const res = await fetch(`${process.env.NEXTAUTH_URL || ''}/api/posts`, { cache: "no-store" });
  return res.json();
}

export default async function Blog() {
  const posts = await fetchPosts();
  return (
    <main>
      <h1 className="text-3xl font-bold mb-4">Community Updates</h1>
      <div className="space-y-4">
        {posts.length === 0 && <p className="text-gray-500">No posts yet.</p>}
        {posts.map((p: any) => <PostCard key={p.id} post={p} />)}
      </div>
    </main>
  );
}
