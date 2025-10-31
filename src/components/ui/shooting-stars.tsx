"use client";
import { cn } from "@/lib/utils";
import { useEffect, useId, useRef, useState } from "react";

type ShootingStar = {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
};

type ShootingStarsProps = {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
};

const MIN_VIEWPORT_SIZE = 1;

export function ShootingStars({
  minSpeed = 10,
  maxSpeed = 30,
  minDelay = 1200,
  maxDelay = 4200,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 10,
  starHeight = 1,
  className,
}: ShootingStarsProps) {
  const [star, setStar] = useState<ShootingStar | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);
  const gradientId = useId();

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    function scheduleNextStar() {
      const delay = Math.random() * (maxDelay - minDelay) + minDelay;
      timeoutRef.current = window.setTimeout(createStar, delay);
    }

    function createStar() {
      const viewportWidth = Math.max(window.innerWidth, MIN_VIEWPORT_SIZE);
      const viewportHeight = Math.max(window.innerHeight, MIN_VIEWPORT_SIZE);
      const side = Math.floor(Math.random() * 4);
      const offset = Math.random() * (side % 2 === 0 ? viewportWidth : viewportHeight);

      const startPoint =
        side === 0
          ? { x: offset, y: 0, angle: 45 }
          : side === 1
            ? { x: viewportWidth, y: offset, angle: 135 }
            : side === 2
              ? { x: offset, y: viewportHeight, angle: 225 }
              : { x: 0, y: offset, angle: 315 };

      setStar({
        id: Date.now(),
        ...startPoint,
        scale: 1,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        distance: 0,
      });

      scheduleNextStar();
    }

    createStar();

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [maxDelay, maxSpeed, minDelay, minSpeed]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const step = () => {
      setStar(prevStar => {
        if (!prevStar) return prevStar;

        const radians = (prevStar.angle * Math.PI) / 180;
        const x = prevStar.x + prevStar.speed * Math.cos(radians);
        const y = prevStar.y + prevStar.speed * Math.sin(radians);
        const distance = prevStar.distance + prevStar.speed;
        const scale = 1 + distance / 100;

        if (
          x < -20 ||
          x > window.innerWidth + 20 ||
          y < -20 ||
          y > window.innerHeight + 20
        ) {
          return null;
        }

        return { ...prevStar, x, y, distance, scale };
      });

      animationRef.current = window.requestAnimationFrame(step);
    };

    animationRef.current = window.requestAnimationFrame(step);

    return () => {
      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, []);

  return (
    <svg className={cn("absolute inset-0 h-full w-full", className)}>
      {star && (
        <rect
          key={star.id}
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight}
          fill={`url(#${gradientId})`}
          transform={`rotate(${star.angle}, ${star.x + (starWidth * star.scale) / 2}, ${
            star.y + starHeight / 2
          })`}
        />
      )}
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop offset="100%" style={{ stopColor: starColor, stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </svg>
  );
}
