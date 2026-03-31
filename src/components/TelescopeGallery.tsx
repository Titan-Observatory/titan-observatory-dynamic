"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export default function TelescopeGallery({
  images,
}: {
  images: GalleryImage[];
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null ? (i - 1 + images.length) % images.length : null
      ),
    [images.length]
  );
  const next = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null ? (i + 1) % images.length : null
      ),
    [images.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.dataset.telescopeLightboxOpen = "true";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      delete document.body.dataset.telescopeLightboxOpen;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, close, prev, next]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 sm:gap-4">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setLightboxIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-titan-border/60 bg-titan-bg-alt/60 shadow-[0_10px_30px_-20px_rgba(8,12,24,0.7)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-titan-purple hover:border-titan-purple/50 hover:shadow-[0_14px_40px_-18px_rgba(8,12,24,0.9)]"
            aria-label={`View full size: ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition duration-300 group-hover:scale-105"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            />
            {/* Hover overlay */}
            <span className="absolute inset-0 flex items-center justify-center bg-titan-bg/0 transition duration-300 group-hover:bg-titan-bg/40">
              <svg
                className="h-8 w-8 text-white opacity-0 drop-shadow-lg transition duration-300 group-hover:opacity-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                />
              </svg>
            </span>
            {img.caption && (
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-titan-bg/80 to-transparent px-3 pb-2.5 pt-6 text-left text-xs leading-snug text-titan-text-primary/90 opacity-0 transition duration-300 group-hover:opacity-100">
                {img.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-titan-bg/90 backdrop-blur-md"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-titan-bg-alt/80 text-titan-text-secondary transition hover:bg-titan-bg-alt sm:right-6 sm:top-6"
            aria-label="Close lightbox"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-titan-bg-alt/80 text-titan-text-secondary transition hover:bg-titan-bg-alt sm:left-6 sm:h-12 sm:w-12"
            aria-label="Previous image"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-titan-bg-alt/80 text-titan-text-secondary transition hover:bg-titan-bg-alt sm:right-6 sm:h-12 sm:w-12"
            aria-label="Next image"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative mx-16 max-h-[85vh] max-w-[90vw] sm:mx-20"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              width={1600}
              height={1200}
              className="max-h-[85vh] w-auto rounded-2xl object-contain"
              sizes="90vw"
              priority
            />
            {/* Caption + counter */}
            <div className="mt-3 flex items-center justify-between gap-4 px-1">
              <p className="text-sm text-titan-text-primary/80">
                {images[lightboxIndex].caption || images[lightboxIndex].alt}
              </p>
              <span className="shrink-0 text-xs text-titan-text-muted">
                {lightboxIndex + 1} / {images.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
