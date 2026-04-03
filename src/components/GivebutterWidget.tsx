"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const GIVEBUTTER_ACCOUNT_ID = "g00zGRQMS7cnoPdU";
const GIVEBUTTER_WIDGET_SRC = `https://widgets.givebutter.com/latest.umd.cjs?acct=${GIVEBUTTER_ACCOUNT_ID}&p=other`;
const GIVEBUTTER_LOADER_SCRIPT = `window.Givebutter=window.Givebutter||function(){(Givebutter.q=Givebutter.q||[]).push(arguments)};Givebutter.l=+new Date;window.Givebutter('setOptions',{accountId:'${GIVEBUTTER_ACCOUNT_ID}'});`;

type GivebutterWidgetProps = {
  id: string;
  className?: string;
  widgetClassName?: string;
  placeholderClassName?: string;
  placeholderVariant?: "panel" | "pill";
  rootMargin?: string;
  eager?: boolean;
};

function WidgetPlaceholder({
  className,
  variant = "panel",
}: {
  className?: string;
  variant?: "panel" | "pill";
}) {
  if (variant === "pill") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "flex min-h-[3.5rem] w-full items-center rounded-full border border-titan-border/50 bg-titan-bg-alt/70 px-5 shadow-[0_18px_40px_-30px_rgba(10,15,35,0.9)] backdrop-blur-sm",
          className,
        )}
      >
        <div className="h-3 w-28 rounded-full bg-titan-border/35" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex w-full flex-col gap-4 rounded-[2rem] border border-titan-border/50 bg-titan-bg-alt/70 p-6 shadow-[0_18px_40px_-30px_rgba(10,15,35,0.9)] backdrop-blur-sm",
        className,
      )}
    >
      <div className="h-3 w-24 rounded-full bg-titan-border/35" />
      <div className="h-12 rounded-2xl bg-titan-bg/40" />
      <div className="h-12 rounded-2xl bg-titan-bg/30" />
      <div className="h-12 rounded-2xl bg-titan-bg/30" />
      <div className="h-12 rounded-2xl bg-titan-bg/20" />
      <div className="mt-auto h-12 rounded-full bg-titan-orange/20" />
    </div>
  );
}

export default function GivebutterWidget({
  id,
  className,
  widgetClassName,
  placeholderClassName,
  placeholderVariant = "panel",
  rootMargin = "320px 0px",
  eager = false,
}: GivebutterWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(eager);

  useEffect(() => {
    if (eager || shouldRender) {
      return;
    }

    const element = containerRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        if (!entries.some(entry => entry.isIntersecting)) {
          return;
        }

        setShouldRender(true);
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [eager, rootMargin, shouldRender]);

  return (
    <>
      {shouldRender ? (
        <>
          <Script
            id="givebutter-elements-loader"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{ __html: GIVEBUTTER_LOADER_SCRIPT }}
          />
          <Script
            id="givebutter-widget-loader"
            src={GIVEBUTTER_WIDGET_SRC}
            strategy="afterInteractive"
          />
        </>
      ) : null}
      <div ref={containerRef} className={cn("w-full", className)}>
        {shouldRender ? (
          <givebutter-widget
            className={cn("block w-full", widgetClassName)}
            id={id}
          ></givebutter-widget>
        ) : (
          <WidgetPlaceholder
            className={placeholderClassName}
            variant={placeholderVariant}
          />
        )}
      </div>
    </>
  );
}
