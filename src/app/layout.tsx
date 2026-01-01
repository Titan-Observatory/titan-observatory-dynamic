import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";

import Navbar from "@/components/Navbar";
import SiteHeader from "@/components/SiteHeader";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import Footer from "@/components/Footer";
import "./globals.css";
import "react-photo-view/dist/react-photo-view.css";

export const metadata: Metadata = {
  title: "Titan Observatory",
  description: "Community & updates",
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen bg-titan-bg text-titan-text-primary">
        <Script
          async
          src="https://widgets.givebutter.com/latest.umd.cjs?acct=g00zGRQMS7cnoPdU&p=other"
          strategy="afterInteractive"
        />
        {GA_MEASUREMENT_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-bootstrap" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                  'debug_mode':true
                });
              `}
            </Script>
            <Suspense fallback={null}>
              <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
            </Suspense>
          </>
        ) : null}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <StarsBackground className="pointer-events-none" />
          <ShootingStars className="pointer-events-none" />
        </div>
        <div className="relative z-10 flex min-h-screen flex-col" data-page-root>
          <SiteHeader />
          <Navbar />
          <main className="mx-auto max-w-6xl flex-1 px-8 pt-8 pb-12">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
