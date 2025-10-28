"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    fetch("/api/auth/session").then(r => r.json()).then(setSession).catch(()=>{});
  }, []);

  return (
    <nav className="border-b bg-white">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link className="font-semibold" href="/">Titan Observatory</Link>
        <div className="ml-auto flex items-center gap-3 text-sm">
          <Link href="/specifications" className="hover:underline">Specifications</Link>
          {session?.user && (
            <>
              <Link href="/dashboard" className="hover:underline">Dashboard</Link>
              <form action="/api/auth/signout" method="post">
                <button className="hover:underline" type="submit">Sign out</button>
              </form>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
