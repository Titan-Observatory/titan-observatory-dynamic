"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { mulberry32, randomNormal } from "@/lib/demos/random";

type Point = { x: number; y: number };

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function formatNumber(value: number) {
  return Number.isFinite(value) ? value.toFixed(2) : "—";
}

function linePath(points: Point[], width: number, height: number, padding: number) {
  if (!points.length) return "";

  let yMin = Infinity;
  let yMax = -Infinity;
  for (const point of points) {
    yMin = Math.min(yMin, point.y);
    yMax = Math.max(yMax, point.y);
  }

  const yRange = yMax - yMin || 1;
  const yPad = yRange * 0.12;
  const y0 = yMin - yPad;
  const y1 = yMax + yPad;

  const innerWidth = Math.max(1, width - padding * 2);
  const innerHeight = Math.max(1, height - padding * 2);

  const toX = (x: number) => padding + x * innerWidth;
  const toY = (y: number) => padding + (1 - (y - y0) / (y1 - y0)) * innerHeight;

  const start = `M ${toX(points[0]!.x).toFixed(2)} ${toY(points[0]!.y).toFixed(2)}`;
  const segments = points
    .slice(1)
    .map(point => `L ${toX(point.x).toFixed(2)} ${toY(point.y).toFixed(2)}`)
    .join(" ");

  return `${start} ${segments}`;
}

export default function SignalNoiseDemo() {
  const [amplitude, setAmplitude] = useState(1);
  const [frequency, setFrequency] = useState(2);
  const [noiseSigma, setNoiseSigma] = useState(0.25);
  const [samples, setSamples] = useState(384);
  const [animate, setAnimate] = useState(false);
  const [seed, setSeed] = useState(1);

  const lastTickRef = useRef<number | null>(null);

  useEffect(() => {
    if (!animate) return;

    let raf = 0;
    const step = (t: number) => {
      const last = lastTickRef.current ?? t;
      const dt = t - last;
      lastTickRef.current = t;
      if (dt > 120) {
        setSeed(s => (s + 1) >>> 0);
      }
      raf = window.requestAnimationFrame(step);
    };

    raf = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(raf);
  }, [animate]);

  const { points, stats } = useMemo(() => {
    const rng = mulberry32(seed);
    const clampedSamples = clamp(samples, 64, 1024);
    const clampedFrequency = clamp(frequency, 0.25, 12);
    const clampedAmplitude = clamp(amplitude, 0, 2.5);
    const clampedNoise = clamp(noiseSigma, 0, 1.2);

    const pts: Point[] = [];
    let signalRmsAcc = 0;
    let noiseRmsAcc = 0;

    for (let i = 0; i < clampedSamples; i += 1) {
      const x = i / (clampedSamples - 1);
      const signal = clampedAmplitude * Math.sin(2 * Math.PI * clampedFrequency * x);
      const noise = clampedNoise * randomNormal(rng);
      const y = signal + noise;
      pts.push({ x, y });

      signalRmsAcc += signal * signal;
      noiseRmsAcc += noise * noise;
    }

    const signalRms = Math.sqrt(signalRmsAcc / clampedSamples);
    const noiseRms = Math.sqrt(noiseRmsAcc / clampedSamples);
    const snr = noiseRms > 0 ? signalRms / noiseRms : Infinity;

    return {
      points: pts,
      stats: { signalRms, noiseRms, snr },
    };
  }, [amplitude, frequency, noiseSigma, samples, seed]);

  const width = 720;
  const height = 260;
  const padding = 18;
  const path = useMemo(() => linePath(points, width, height, padding), [points]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="space-y-1">
          <div className="flex items-center justify-between text-xs text-titan-text-muted">
            <span>Amplitude</span>
            <span className="font-medium text-titan-text-secondary">{formatNumber(amplitude)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={2.5}
            step={0.01}
            value={amplitude}
            onChange={e => setAmplitude(Number(e.target.value))}
            className="w-full accent-titan-orange"
          />
        </label>

        <label className="space-y-1">
          <div className="flex items-center justify-between text-xs text-titan-text-muted">
            <span>Frequency</span>
            <span className="font-medium text-titan-text-secondary">{formatNumber(frequency)}</span>
          </div>
          <input
            type="range"
            min={0.25}
            max={12}
            step={0.05}
            value={frequency}
            onChange={e => setFrequency(Number(e.target.value))}
            className="w-full accent-titan-orange"
          />
        </label>

        <label className="space-y-1">
          <div className="flex items-center justify-between text-xs text-titan-text-muted">
            <span>Noise σ</span>
            <span className="font-medium text-titan-text-secondary">{formatNumber(noiseSigma)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={1.2}
            step={0.01}
            value={noiseSigma}
            onChange={e => setNoiseSigma(Number(e.target.value))}
            className="w-full accent-titan-orange"
          />
        </label>

        <label className="space-y-1">
          <div className="flex items-center justify-between text-xs text-titan-text-muted">
            <span>Samples</span>
            <span className="font-medium text-titan-text-secondary">{samples}</span>
          </div>
          <input
            type="range"
            min={64}
            max={1024}
            step={16}
            value={samples}
            onChange={e => setSamples(Number(e.target.value))}
            className="w-full accent-titan-orange"
          />
        </label>

        <div className="flex items-end gap-3">
          <button
            type="button"
            onClick={() => setSeed(s => (s + 1) >>> 0)}
            className="inline-flex items-center justify-center rounded-full border border-titan-border/70 bg-titan-bg/40 px-4 py-2 text-xs font-semibold text-titan-text-secondary transition hover:bg-titan-bg/60"
          >
            Regenerate
          </button>
          <button
            type="button"
            onClick={() => {
              setAnimate(a => !a);
              lastTickRef.current = null;
            }}
            className="inline-flex items-center justify-center rounded-full border border-titan-border/70 bg-titan-bg/40 px-4 py-2 text-xs font-semibold text-titan-text-secondary transition hover:bg-titan-bg/60"
            aria-pressed={animate}
          >
            {animate ? "Stop" : "Animate"}
          </button>
        </div>

        <div className="flex items-end">
          <dl className="grid w-full grid-cols-3 gap-3 rounded-2xl border border-titan-border/60 bg-titan-bg/35 px-4 py-3 text-xs">
            <div>
              <dt className="text-titan-text-muted">Signal RMS</dt>
              <dd className="mt-0.5 font-semibold text-titan-text-secondary">{formatNumber(stats.signalRms)}</dd>
            </div>
            <div>
              <dt className="text-titan-text-muted">Noise RMS</dt>
              <dd className="mt-0.5 font-semibold text-titan-text-secondary">{formatNumber(stats.noiseRms)}</dd>
            </div>
            <div>
              <dt className="text-titan-text-muted">SNR</dt>
              <dd className="mt-0.5 font-semibold text-titan-text-secondary">
                {Number.isFinite(stats.snr) ? stats.snr.toFixed(1) : "∞"}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-titan-border/60 bg-titan-bg/35">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="block h-auto w-full"
          role="img"
          aria-label="Sampled waveform plot"
        >
          <defs>
            <linearGradient id="wave-stroke" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#eacc84" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#c69344" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#eacc84" stopOpacity="0.9" />
            </linearGradient>
            <filter id="wave-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.8" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0  0 0.9 0 0 0  0 0 0.6 0 0  0 0 0 0.55 0"
                result="glow"
              />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="0" y="0" width={width} height={height} fill="transparent" />
          <g opacity="0.65" stroke="#565b7a" strokeWidth="1">
            {Array.from({ length: 9 }).map((_, i) => {
              const x = padding + ((width - padding * 2) * i) / 8;
              return <line key={`vx-${i}`} x1={x} x2={x} y1={padding} y2={height - padding} />;
            })}
            {Array.from({ length: 5 }).map((_, i) => {
              const y = padding + ((height - padding * 2) * i) / 4;
              return <line key={`hy-${i}`} x1={padding} x2={width - padding} y1={y} y2={y} />;
            })}
          </g>

          <path d={path} fill="none" stroke="url(#wave-stroke)" strokeWidth="2.25" filter="url(#wave-glow)" />
        </svg>
      </div>
    </div>
  );
}

