import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Titan Observatory",
  description: "Community & updates",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-titan-bg text-titan-text-primary">
        <SiteHeader />
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-8">{children}</div>
      </body>
    </html>
  );
}
