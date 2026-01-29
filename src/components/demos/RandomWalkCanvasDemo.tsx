"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { clamp } from "@/lib/demos/math";
import { mulberry32 } from "@/lib/demos/random";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: number;
};

function setCanvasSize(canvas: HTMLCanvasElement, cssWidth: number, cssHeight: number) {
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  canvas.width = Math.floor(cssWidth * dpr);
  canvas.height = Math.floor(cssHeight * dpr);
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;
  const ctx = canvas.getContext("2d");
  if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { width: cssWidth, height: cssHeight };
}

export default function RandomWalkCanvasDemo() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rngRef = useRef<() => number>(mulberry32(123456789));

  const [count, setCount] = useState(220);
  const [stepSize, setStepSize] = useState(2.1);
  const [wander, setWander] = useState(0.75);
  const [pull, setPull] = useState(0.06);
  const [trail, setTrail] = useState(0.16);
  const [running, setRunning] = useState(true);

  const config = useMemo(
    () => ({
      count: clamp(count, 10, 600),
      stepSize: clamp(stepSize, 0.2, 7),
      wander: clamp(wander, 0, 1.5),
      pull: clamp(pull, 0, 0.2),
      trail: clamp(trail, 0.02, 0.5),
    }),
    [count, stepSize, wander, pull, trail],
  );

  const reset = () => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    const width = Math.max(240, Math.floor(rect.width));
    const height = Math.max(200, Math.floor(rect.height));
    setCanvasSize(canvas, width, height);

    rngRef.current = mulberry32((Date.now() & 0xffffffff) >>> 0);
    const rng = rngRef.current;

    const centerX = width / 2;
    const centerY = height / 2;
    const particles: Particle[] = [];

    for (let i = 0; i < config.count; i += 1) {
      const angle = rng() * Math.PI * 2;
      const radius = Math.pow(rng(), 0.5) * Math.min(width, height) * 0.22;
      particles.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        vx: (rng() - 0.5) * 0.7,
        vy: (rng() - 0.5) * 0.7,
        hue: 34 + rng() * 56,
      });
    }

    particlesRef.current = particles;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(17, 19, 31, 1)";
      ctx.fillRect(0, 0, width, height);
    }
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.count]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const resizeObserver = new ResizeObserver(() => reset());
    resizeObserver.observe(wrapper);
    return () => resizeObserver.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let active = true;

    const frame = () => {
      if (!active) return;

      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      const centerX = w / 2;
      const centerY = h / 2;

      ctx.fillStyle = `rgba(17, 19, 31, ${config.trail})`;
      ctx.fillRect(0, 0, w, h);

      const particles = particlesRef.current;
      for (const p of particles) {
        const ax = (centerX - p.x) * config.pull;
        const ay = (centerY - p.y) * config.pull;
        p.vx = (p.vx + ax) * 0.995;
        p.vy = (p.vy + ay) * 0.995;

        const jitterAngle = (Math.random() - 0.5) * Math.PI * config.wander;
        const cos = Math.cos(jitterAngle);
        const sin = Math.sin(jitterAngle);
        const nvx = p.vx * cos - p.vy * sin;
        const nvy = p.vx * sin + p.vy * cos;
        p.vx = nvx;
        p.vy = nvy;

        p.x += p.vx * config.stepSize;
        p.y += p.vy * config.stepSize;

        if (p.x < -24) p.x = w + 24;
        if (p.x > w + 24) p.x = -24;
        if (p.y < -24) p.y = h + 24;
        if (p.y > h + 24) p.y = -24;

        ctx.fillStyle = `hsla(${p.hue}, 84%, 70%, 0.9)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.25, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = window.requestAnimationFrame(frame);
    };

    if (running) {
      raf = window.requestAnimationFrame(frame);
    }

    return () => {
      active = false;
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [running, config.stepSize, config.wander, config.pull, config.trail]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <label className="space-y-1">
          <div className="flex items-center justify-between text-xs text-titan-text-muted">
            <span>Particles</span>
            <span className="font-medium text-titan-text-secondary">{config.count}</span>
          </div>
          <input
            type="range"
            min={10}
            max={600}
            step={10}
            value={count}
            onChange={e => setCount(Number(e.target.value))}
            className="w-full accent-titan-orange"
          />
        </label>

        <label className="space-y-1">
          <div className="flex items-center justify-between text-xs text-titan-text-muted">
            <span>Step</span>
            <span className="font-medium text-titan-text-secondary">{config.stepSize.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min={0.2}
            max={7}
            step={0.1}
            value={stepSize}
            onChange={e => setStepSize(Number(e.target.value))}
            className="w-full accent-titan-orange"
          />
        </label>

        <label className="space-y-1">
          <div className="flex items-center justify-between text-xs text-titan-text-muted">
            <span>Wander</span>
            <span className="font-medium text-titan-text-secondary">{config.wander.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={1.5}
            step={0.01}
            value={wander}
            onChange={e => setWander(Number(e.target.value))}
            className="w-full accent-titan-orange"
          />
        </label>

        <label className="space-y-1">
          <div className="flex items-center justify-between text-xs text-titan-text-muted">
            <span>Pull to center</span>
            <span className="font-medium text-titan-text-secondary">{config.pull.toFixed(3)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={0.2}
            step={0.001}
            value={pull}
            onChange={e => setPull(Number(e.target.value))}
            className="w-full accent-titan-orange"
          />
        </label>

        <div className="flex items-end gap-3">
          <button
            type="button"
            onClick={() => setRunning(r => !r)}
            className="inline-flex items-center justify-center rounded-full border border-titan-border/70 bg-titan-bg/40 px-4 py-2 text-xs font-semibold text-titan-text-secondary transition hover:bg-titan-bg/60"
            aria-pressed={running}
          >
            {running ? "Pause" : "Run"}
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full border border-titan-border/70 bg-titan-bg/40 px-4 py-2 text-xs font-semibold text-titan-text-secondary transition hover:bg-titan-bg/60"
          >
            Reset
          </button>
        </div>
      </div>

      <label className="block space-y-1">
        <div className="flex items-center justify-between text-xs text-titan-text-muted">
          <span>Trail fade</span>
          <span className="font-medium text-titan-text-secondary">{config.trail.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min={0.02}
          max={0.5}
          step={0.01}
          value={trail}
          onChange={e => setTrail(Number(e.target.value))}
          className="w-full accent-titan-orange"
        />
      </label>

      <div
        ref={wrapperRef}
        className="relative h-[320px] overflow-hidden rounded-2xl border border-titan-border/60 bg-titan-bg/35 shadow-[inset_0_0_0_1px_rgba(60,65,92,0.15)] sm:h-[380px]"
      >
        <canvas ref={canvasRef} className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-titan-bg/50 to-transparent" />
      </div>
    </div>
  );
}

