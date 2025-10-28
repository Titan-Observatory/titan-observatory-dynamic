"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string|undefined>();
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(undefined);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name })
    });
    if (!res.ok) {
      const j = await res.json().catch(()=>({error:"Failed"}));
      setError(j.error || "Registration failed");
      return;
    }
    router.push("/login");
  }

  return (
    <main>
      <h1 className="text-2xl font-semibold mb-4">Create account</h1>
      <form onSubmit={submit} className="space-y-4 max-w-md">
        <input className="w-full border p-2 rounded" placeholder="Name (optional)" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="px-4 py-2 rounded bg-gray-900 text-white">Register</button>
      </form>
    </main>
  );
}
