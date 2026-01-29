import DemoCard from "@/components/demos/DemoCard";
import KeplerOrbitDemo from "@/components/demos/KeplerOrbitDemo";
import RandomWalkCanvasDemo from "@/components/demos/RandomWalkCanvasDemo";
import SignalNoiseDemo from "@/components/demos/SignalNoiseDemo";

export const metadata = {
  title: "Demos | Titan Observatory",
  description: "Interactive educational visualizations and simulations.",
};

export default function DemosPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-titan-text-muted">Playground</p>
        <h1 className="text-3xl font-semibold text-titan-text-secondary">Demos</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-titan-text-primary/90">
          A sandbox page for building interactive, educational 2D visuals. Each demo lives in{" "}
          <code className="rounded bg-titan-bg-alt/80 px-1.5 py-0.5 text-[0.85em] text-titan-text-secondary">
            src/components/demos
          </code>
          , with math/helpers in{" "}
          <code className="rounded bg-titan-bg-alt/80 px-1.5 py-0.5 text-[0.85em] text-titan-text-secondary">
            src/lib/demos
          </code>
          .
        </p>
      </header>

      <section className="grid gap-8 lg:grid-cols-2">
        <DemoCard
          title="Signal + Noise (SVG)"
          description="A simple sampled sine wave with Gaussian noise. Useful pattern for plotting in SVG with sliders."
        >
          <SignalNoiseDemo />
        </DemoCard>

        <DemoCard
          title="Kepler Orbit (SVG)"
          description="An elliptical orbit drawn from the focus (central body). Adjust eccentricity and anomaly."
        >
          <KeplerOrbitDemo />
        </DemoCard>

        <DemoCard
          title="Random Walk (Canvas)"
          description="A lightweight 2D simulation loop on Canvas with trail fading and resize-safe rendering."
          className="lg:col-span-2"
        >
          <RandomWalkCanvasDemo />
        </DemoCard>
      </section>
    </div>
  );
}

