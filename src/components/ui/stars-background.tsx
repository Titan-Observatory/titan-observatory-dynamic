"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { ANIMATIONS_EVENT, getAnimationsDisabled } from "@/lib/animations";

interface StarProps {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number | null;
}

interface StarBackgroundProps {
  starDensity?: number;
  allStarsTwinkle?: boolean;
  twinkleProbability?: number;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
  className?: string;
}

export const StarsBackground: React.FC<StarBackgroundProps> = ({
  starDensity = 0.00015,
  allStarsTwinkle = true,
  twinkleProbability = 0.7,
  minTwinkleSpeed = 0.5,
  maxTwinkleSpeed = 1,
  className,
}) => {
  const [stars, setStars] = useState<StarProps[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const lastSizeRef = useRef({ width: 0, height: 0 });

  const generateStarsForArea = useCallback(
    (width: number, startY: number, endY: number): StarProps[] => {
      const height = Math.max(0, endY - startY);
      const area = width * height;
      const numStars = Math.floor(area * starDensity);
      return Array.from({ length: numStars }, () => {
        const shouldTwinkle =
          allStarsTwinkle || Math.random() < twinkleProbability;
        return {
          x: Math.random() * width,
          y: startY + Math.random() * height,
          radius: Math.random() * 0.05 + 0.5,
          opacity: Math.random() * 0.5 + 0.5,
          twinkleSpeed: shouldTwinkle
            ? minTwinkleSpeed +
              Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
            : null,
        };
      });
    },
    [
      starDensity,
      allStarsTwinkle,
      twinkleProbability,
      minTwinkleSpeed,
      maxTwinkleSpeed,
    ]
  );

  const generateStars = useCallback(
    (width: number, height: number): StarProps[] =>
      generateStarsForArea(width, 0, height),
    [generateStarsForArea]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => setAnimationsEnabled(!getAnimationsDisabled());
    update();
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<{ disabled: boolean }>;
      if (typeof customEvent.detail?.disabled === "boolean") {
        setAnimationsEnabled(!customEvent.detail.disabled);
      }
    };
    window.addEventListener(ANIMATIONS_EVENT, handler);
    return () => window.removeEventListener(ANIMATIONS_EVENT, handler);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (!animationsEnabled) {
      return;
    }

    const getContentHeight = () => {
      const root = document.querySelector("[data-page-root]") as HTMLElement | null;
      const measuredHeight = root?.scrollHeight ?? document.documentElement.scrollHeight;
      return Math.max(window.innerHeight, measuredHeight);
    };

    const updateStars = (force = false) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const width = window.innerWidth;
      const height = getContentHeight();
      const widthChanged = canvas.width !== width;
      const heightDelta = Math.abs(height - canvas.height);
      const shouldResizeHeight = force || heightDelta > 200;
      const previousHeight = lastSizeRef.current.height;
      const shouldRegenerate = force || widthChanged;

      if (widthChanged || force) {
        canvas.width = width;
      }

      if (shouldResizeHeight) {
        canvas.height = height;
      }

      const effectiveHeight = shouldResizeHeight ? height : canvas.height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${effectiveHeight}px`;
      lastSizeRef.current = { width, height: effectiveHeight };

      if (shouldRegenerate) {
        setStars(generateStars(width, effectiveHeight));
      } else if (shouldResizeHeight && height > previousHeight) {
        setStars(prevStars =>
          prevStars.concat(generateStarsForArea(width, previousHeight, height))
        );
      }
    };

    updateStars(true);

    const observedRoot =
      (document.querySelector("[data-page-root]") as HTMLElement | null) ??
      document.documentElement;

    let rafId: number | null = null;
    const scheduleUpdate = (force = false) => {
      if (rafId !== null) {
        return;
      }
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        updateStars(force);
      });
    };

    const handleResize = () => scheduleUpdate();
    window.addEventListener("resize", handleResize);

    const resizeObserver = new ResizeObserver(() => scheduleUpdate());
    resizeObserver.observe(observedRoot);

    const mutationObserver = new MutationObserver(() => scheduleUpdate());
    mutationObserver.observe(observedRoot, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [
    starDensity,
    allStarsTwinkle,
    twinkleProbability,
    minTwinkleSpeed,
    maxTwinkleSpeed,
    generateStars,
    animationsEnabled,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let lastFrameTime = 0;
    const targetFrameMs = 1000 / 20;

    const render = () => {
      if (!animationsEnabled) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const now = performance.now();
      if (now - lastFrameTime < targetFrameMs) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastFrameTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        if (star.twinkleSpeed !== null) {
          star.opacity =
            0.5 +
            Math.abs(Math.sin((Date.now() * 0.001) / star.twinkleSpeed) * 0.5);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [stars, animationsEnabled]);

  if (!animationsEnabled) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={cn("h-full w-full absolute inset-0", className)}
    />
  );
};
