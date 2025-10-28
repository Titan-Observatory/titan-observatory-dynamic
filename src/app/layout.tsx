import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Titan Observatory",
  description: "Community & updates",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-6">{children}</div>
      </body>
    </html>
  );
}
