"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string|undefined>();
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(undefined);
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.error) setError("Invalid credentials");
    else router.push("/dashboard");
  }

  return (
    <main>
      <h1 className="text-2xl font-semibold mb-4">Log in</h1>
      <form onSubmit={submit} className="space-y-4 max-w-md">
        <input className="w-full border p-2 rounded" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="px-4 py-2 rounded bg-gray-900 text-white">Sign in</button>
      </form>
    </main>
  );
}
