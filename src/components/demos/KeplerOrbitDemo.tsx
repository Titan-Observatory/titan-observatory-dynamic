"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { clamp } from "@/lib/demos/math";

type Vec2 = { x: number; y: number };

function formatNumber(value: number, digits = 2) {
  return Number.isFinite(value) ? value.toFixed(digits) : "—";
}

function orbitPoints(a: number, e: number, count: number) {
  const points: Vec2[] = [];
  const p = a * (1 - e * e);
  const samples = Math.max(64, count);

  for (let i = 0; i <= samples; i += 1) {
    const nu = (i / samples) * 2 * Math.PI;
    const r = p / (1 + e * Math.cos(nu));
    points.push({ x: r * Math.cos(nu), y: r * Math.sin(nu) });
  }

  return points;
}

function svgPath(points: Vec2[], scale: number, cx: number, cy: number) {
  if (!points.length) return "";
  const toX = (x: number) => cx + x * scale;
  const toY = (y: number) => cy - y * scale;

  const start = `M ${toX(points[0]!.x).toFixed(2)} ${toY(points[0]!.y).toFixed(2)}`;
  const segments = points
    .slice(1)
    .map(p => `L ${toX(p.x).toFixed(2)} ${toY(p.y).toFixed(2)}`)
    .join(" ");

  return `${start} ${segments}`;
}

export default function KeplerOrbitDemo() {
  const [a, setA] = useState(160);
  const [e, setE] = useState(0.35);
  const [nuDeg, setNuDeg] = useState(30);
  const [animate, setAnimate] = useState(false);

  const lastRef = useRef<number | null>(null);

  useEffect(() => {
    if (!animate) return;

    let raf = 0;
    const step = (t: number) => {
      const last = lastRef.current ?? t;
      const dt = t - last;
      lastRef.current = t;
      const dNu = (dt / 1000) * 42;
      setNuDeg(v => (v + dNu) % 360);
      raf = window.requestAnimationFrame(step);
    };
    raf = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(raf);
  }, [animate]);

  const model = useMemo(() => {
    const aClamped = clamp(a, 80, 260);
    const eClamped = clamp(e, 0, 0.85);
    const nu = (clamp(nuDeg, 0, 360) / 180) * Math.PI;

    const p = aClamped * (1 - eClamped * eClamped);
    const r = p / (1 + eClamped * Math.cos(nu));
    const pos = { x: r * Math.cos(nu), y: r * Math.sin(nu) };

    const rp = aClamped * (1 - eClamped);
    const ra = aClamped * (1 + eClamped);

    const mu = 1;
    const v = Math.sqrt(Math.max(0, mu * (2 / Math.max(1e-6, r) - 1 / aClamped)));

    const pts = orbitPoints(aClamped, eClamped, 256);

    return {
      a: aClamped,
      e: eClamped,
      r,
      rp,
      ra,
      v,
      points: pts,
      maxR: ra,
      pos,
    };
  }, [a, e, nuDeg]);

  const width = 720;
  const height = 360;
  const padding = 26;
  const cx = width / 2;
  const cy = height / 2;
  const scale = (Math.min(width, height) / 2 - padding) / (model.maxR + 16);

  const orbitPath = useMemo(() => svgPath(model.points, scale, cx, cy), [model.points, scale, cx, cy]);
  const satelliteX = cx + model.pos.x * scale;
  const satelliteY = cy - model.pos.y * scale;

  const periX = cx + model.rp * scale;
  const periY = cy;
  const apoX = cx - model.ra * scale;
  const apoY = cy;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="space-y-1">
          <div className="flex items-center justify-between text-xs text-titan-text-muted">
            <span>Semi-major axis (a)</span>
            <span className="font-medium text-titan-text-secondary">{a}</span>
          </div>
          <input
            type="range"
            min={80}
            max={260}
            step={1}
            value={a}
            onChange={e => setA(Number(e.target.value))}
            className="w-full accent-titan-orange"
          />
        </label>

        <label className="space-y-1">
          <div className="flex items-center justify-between text-xs text-titan-text-muted">
            <span>Eccentricity (e)</span>
            <span className="font-medium text-titan-text-secondary">{formatNumber(e, 2)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={0.85}
            step={0.01}
            value={e}
            onChange={ev => setE(Number(ev.target.value))}
            className="w-full accent-titan-orange"
          />
        </label>

        <label className="space-y-1">
          <div className="flex items-center justify-between text-xs text-titan-text-muted">
            <span>True anomaly (ν)</span>
            <span className="font-medium text-titan-text-secondary">{Math.round(nuDeg)}°</span>
          </div>
          <input
            type="range"
            min={0}
            max={360}
            step={1}
            value={nuDeg}
            onChange={ev => setNuDeg(Number(ev.target.value))}
            className="w-full accent-titan-orange"
          />
        </label>

        <div className="flex items-end justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              setAnimate(a => !a);
              lastRef.current = null;
            }}
            className="inline-flex items-center justify-center rounded-full border border-titan-border/70 bg-titan-bg/40 px-4 py-2 text-xs font-semibold text-titan-text-secondary transition hover:bg-titan-bg/60"
            aria-pressed={animate}
          >
            {animate ? "Stop" : "Animate"}
          </button>

          <dl className="grid flex-1 grid-cols-3 gap-3 rounded-2xl border border-titan-border/60 bg-titan-bg/35 px-4 py-3 text-xs">
            <div>
              <dt className="text-titan-text-muted">r</dt>
              <dd className="mt-0.5 font-semibold text-titan-text-secondary">{formatNumber(model.r, 1)}</dd>
            </div>
            <div>
              <dt className="text-titan-text-muted">rp</dt>
              <dd className="mt-0.5 font-semibold text-titan-text-secondary">{formatNumber(model.rp, 1)}</dd>
            </div>
            <div>
              <dt className="text-titan-text-muted">v (rel.)</dt>
              <dd className="mt-0.5 font-semibold text-titan-text-secondary">{formatNumber(model.v, 3)}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-titan-border/60 bg-titan-bg/35">
        <svg viewBox={`0 0 ${width} ${height}`} className="block h-auto w-full" role="img" aria-label="Orbit plot">
          <defs>
            <radialGradient id="orbit-bg" cx="50%" cy="45%" r="70%">
              <stop offset="0%" stopColor="#11131f" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#11131f" stopOpacity="0.55" />
            </radialGradient>
            <filter id="orbit-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0  0 0.9 0 0 0  0 0 0.6 0 0  0 0 0 0.6 0"
                result="glow"
              />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="0" y="0" width={width} height={height} fill="url(#orbit-bg)" />

          <g opacity="0.6" stroke="#565b7a" strokeWidth="1">
            <line x1={padding} x2={width - padding} y1={cy} y2={cy} />
            <line x1={cx} x2={cx} y1={padding} y2={height - padding} />
          </g>

          <path d={orbitPath} fill="none" stroke="#3c415c" strokeWidth="6" opacity="0.35" filter="url(#orbit-glow)" />
          <path d={orbitPath} fill="none" stroke="#eacc84" strokeWidth="2.5" opacity="0.95" />

          <circle cx={cx} cy={cy} r={8} fill="#c69344" opacity="0.95" />
          <circle cx={cx} cy={cy} r={14} fill="#c69344" opacity="0.15" />

          <circle cx={periX} cy={periY} r={4.5} fill="#565b7a" opacity="0.7" />
          <circle cx={apoX} cy={apoY} r={4.5} fill="#565b7a" opacity="0.7" />

          <line x1={cx} y1={cy} x2={satelliteX} y2={satelliteY} stroke="#565b7a" strokeWidth="1.5" opacity="0.8" />
          <circle cx={satelliteX} cy={satelliteY} r={6} fill="#eacc84" opacity="0.95" />
          <circle cx={satelliteX} cy={satelliteY} r={12} fill="#eacc84" opacity="0.16" />
        </svg>
      </div>
    </div>
  );
}

