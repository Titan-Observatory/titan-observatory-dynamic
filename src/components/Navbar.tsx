"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    fetch("/api/auth/session").then(r => r.json()).then(setSession).catch(()=>{});
  }, []);

  return (
    <nav className="sticky top-0 z-20 border-b border-titan-border bg-titan-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-5 px-8 py-3 text-base text-titan-text-muted">
        <Link className="font-medium hover:text-titan-yellow" href="/">About us</Link>
        <Link href="/specifications" className="font-medium hover:text-titan-yellow">Specifications</Link>
        {session?.user && (
          <>
            <Link href="/dashboard" className="font-medium hover:text-titan-yellow">Dashboard</Link>
            <form action="/api/auth/signout" method="post">
              <button className="font-medium hover:text-titan-orange" type="submit">Sign out</button>
            </form>
          </>
        )}
      </div>
    </nav>
  );
}
