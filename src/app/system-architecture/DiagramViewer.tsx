"use client";

import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";

export default function DiagramViewer() {
  return (
    <PhotoProvider
      toolbarRender={({ scale, onScale }) => {
        const step = 0.2;
        const clampScale = (next: number) => Math.min(Math.max(next, 0.5), 5);

        return (
          <div className="flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 text-white shadow-md backdrop-blur">
            <button
              type="button"
              aria-label="Zoom out"
              onClick={() => onScale(clampScale(scale - step))}
              className="rounded-full p-1 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M5 12h14" />
              </svg>
            </button>
            <span className="text-xs font-medium tabular-nums">{Math.round(scale * 100)}%</span>
            <button
              type="button"
              aria-label="Zoom in"
              onClick={() => onScale(clampScale(scale + step))}
              className="rounded-full p-1 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
            </button>
          </div>
        );
      }}
    >
      <div className="overflow-auto rounded-3xl border border-titan-border/60 bg-titan-bg-alt/60 p-5">
        <PhotoView src="/images/ArchitecturePlan.webp">
          <div className="relative">
            <Image
              src="/images/ArchitecturePlan.webp"
              alt="System architecture diagram"
              width={5552}
              height={1908}
              priority
              className="h-auto w-full cursor-zoom-in"
            />
            <div className="absolute right-3 top-3 inline-flex items-center rounded-full border border-white/20 bg-black/60 p-2 text-white shadow-md backdrop-blur transition hover:bg-black/70">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 5H5v4" />
                <path d="M15 5h4v4" />
                <path d="M9 19H5v-4" />
                <path d="M15 19h4v-4" />
                <path d="M5 5l4 4" />
                <path d="M19 5l-4 4" />
                <path d="M5 19l4-4" />
                <path d="M19 19l-4-4" />
              </svg>
            </div>
          </div>
        </PhotoView>
      </div>
    </PhotoProvider>
  );
}
