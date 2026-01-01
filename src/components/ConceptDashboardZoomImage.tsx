"use client";

import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";

type ConceptDashboardZoomImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
};

export default function ConceptDashboardZoomImage({
  src,
  alt,
  width,
  height,
  sizes,
  priority,
}: ConceptDashboardZoomImageProps) {
  return (
    <PhotoProvider>
      <PhotoView src={src}>
        <div>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="h-auto w-full cursor-zoom-in object-contain"
            sizes={sizes}
            priority={priority}
          />
        </div>
      </PhotoView>
    </PhotoProvider>
  );
}
