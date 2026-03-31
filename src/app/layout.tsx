import type { Metadata, Viewport } from "next";
import Script from "next/script";

import Navbar from "@/components/Navbar";
import ClientEnhancements from "@/components/ClientEnhancements";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import "./globals.css";
import "react-photo-view/dist/react-photo-view.css";

export const metadata: Metadata = {
  title: "Titan Observatory",
  description: "Community Radio Observatory",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen overflow-x-clip bg-titan-bg text-titan-text-primary">
        {GA_MEASUREMENT_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="lazyOnload"
            />
            <Script id="ga-bootstrap" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname
                });
              `}
            </Script>
          </>
        ) : null}
        <ClientEnhancements measurementId={GA_MEASUREMENT_ID} />
        <div className="relative z-10 flex min-h-screen flex-col" data-page-root>
          <SiteHeader />
          <Navbar />
          <main className="mx-auto w-full max-w-6xl flex-1 px-5 pt-6 pb-16 sm:px-6 sm:pt-8 sm:pb-12 lg:px-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
