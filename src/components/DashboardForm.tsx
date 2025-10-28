"use client";

import { useState } from "react";

export default function DashboardForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState<string|undefined>();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(undefined);
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, slug, content })
    });
    if (!res.ok) {
      const j = await res.json().catch(()=>({ error: "Failed" }));
      setMessage(j.error || "Failed to create post");
      return;
    }
    setTitle(""); setSlug(""); setContent("");
    setMessage("Post created!");
  }

  return (
    <form onSubmit={submit} className="space-y-3 max-w-xl">
      <input className="w-full border p-2 rounded" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <input className="w-full border p-2 rounded" placeholder="Slug (unique)" value={slug} onChange={e=>setSlug(e.target.value)} />
      <textarea className="w-full border p-2 rounded min-h-[160px]" placeholder="Content" value={content} onChange={e=>setContent(e.target.value)} />
      {message && <p className="text-sm text-gray-700">{message}</p>}
      <button className="px-4 py-2 rounded bg-gray-900 text-white">Publish</button>
    </form>
  );
}
