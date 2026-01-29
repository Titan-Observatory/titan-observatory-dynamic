"use client";

import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { cn } from "@/lib/utils";

type TelescopeOverviewZoomImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export default function TelescopeOverviewZoomImage({
  src,
  alt,
  sizes,
  priority,
  className,
}: TelescopeOverviewZoomImageProps) {
  return (
    <PhotoProvider>
      <PhotoView src={src}>
        <div className={cn("absolute inset-0 cursor-zoom-in", className)}>
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes={sizes}
            priority={priority}
          />
        </div>
      </PhotoView>
    </PhotoProvider>
  );
}
