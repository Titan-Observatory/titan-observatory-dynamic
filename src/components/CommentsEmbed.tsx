"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  title: string;
  className?: string;
};

export default function CommentsEmbed({ src, title, className }: Props) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [height, setHeight] = useState(240);
  const [maxHeight, setMaxHeight] = useState(720);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMaxHeight(Math.max(480, Math.round((window.innerHeight || 1000) * 0.75)));
    }
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== "object") return;
      const { type, height: newHeight } = event.data as { type?: string; height?: number };
      if (type === "discourse-resize" && typeof newHeight === "number" && iframeRef.current) {
          const nextHeight = Math.max(200, Math.min(newHeight + 24, maxHeight));
          setHeight(nextHeight);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      title={title}
      className={className}
      style={{ height, maxHeight }}
      scrolling="auto"
      loading="lazy"
    />
  );
}
