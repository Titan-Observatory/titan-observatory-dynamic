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
    <main className="titan-section max-w-md space-y-6 p-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Log in</h1>
        <p className="text-sm text-titan-text-muted">
          Access observatory tools with your credentials.
        </p>
      </div>
      <form onSubmit={submit} className="space-y-4">
        <input className="titan-input w-full" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="titan-input w-full" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <p className="text-sm text-titan-red">{error}</p>}
        <button className="titan-button w-full">Sign in</button>
      </form>
    </main>
  );
}
