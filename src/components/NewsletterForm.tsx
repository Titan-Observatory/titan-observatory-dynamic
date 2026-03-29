// components/NewsletterForm.tsx
"use client";
import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/brevo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: "Unable to subscribe right now." }));
        setStatus("error");
        setMessage(error || "Unable to subscribe right now.");
        return;
      }

      setStatus("success");
      setMessage("Check your inbox to confirm your subscription.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage("Unable to subscribe right now. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" aria-live="polite">
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="mb-1 block text-sm text-titan-text-muted">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.org"
            className="flex-1 rounded-2xl border border-titan-border/70 bg-titan-bg/80 px-4 py-3 text-sm text-titan-text-primary placeholder:text-titan-text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-titan-border"
            disabled={status === "loading"}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-2xl border border-titan-purple/60 bg-titan-purple px-6 py-3 text-sm font-semibold text-titan-text-secondary transition hover:bg-[#565b7a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-titan-purple disabled:cursor-not-allowed disabled:opacity-70"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Submitting..." : "Join the list"}
        </button>
      </div>

      {/* Honeypot */}
      <input type="text" name="company" className="hidden" tabIndex={-1} aria-hidden="true" autoComplete="off" />

      {message && (
        <p className={`text-sm ${status === "error" ? "text-red-300" : "text-titan-text-muted"}`} role="status">
          {message}
        </p>
      )}
    </form>
  );
}
