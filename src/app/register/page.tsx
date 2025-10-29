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
    <main className="titan-section max-w-md space-y-6 p-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Create account</h1>
        <p className="text-sm text-titan-text-muted">
          Build a profile to share research notes and engineering updates.
        </p>
      </div>
      <form onSubmit={submit} className="space-y-4">
        <input className="titan-input w-full" placeholder="Name (optional)" value={name} onChange={e=>setName(e.target.value)} />
        <input className="titan-input w-full" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="titan-input w-full" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <p className="text-sm text-titan-red">{error}</p>}
        <button className="titan-button w-full">Register</button>
      </form>
    </main>
  );
}
