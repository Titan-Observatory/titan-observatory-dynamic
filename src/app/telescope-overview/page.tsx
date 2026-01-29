import type { Metadata } from "next";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";
import TelescopeOverviewZoomImage from "@/components/TelescopeOverviewZoomImage";
import {
  IconAperture,
  IconBolt,
  IconSettings,
  IconStack,
  IconTarget,
  IconTelescope,
} from "@tabler/icons-react";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Telescope Overview | Titan Observatory",
  description:
    "Specifications and imagery for Titan's 10-meter radio telescope.",
};

const telescopeImages = [
  {
    src: "/images/Titan-Up.jpg",
    alt: "Looking up from the base of the Titan dish.",
  },
  {
    src: "/images/titan-drone-shot-1.webp",
    alt: "Drone shot of the Titan telescope and surroundings.",
  },
  {
    src: "/images/titan-drone-shot-2.webp",
    alt: "Top-down drone view of the Titan telescope assembly.",
  },
];

const overviewStats = [
  {
    label: "Aperture",
    value: "10 m",
    detail: "Cassegrain surface",
  },
  {
    label: "Pointing",
    value: "0-95 deg",
    detail: "360+ az wrap",
  },
  {
    label: "Power",
    value: "48 VDC",
    detail: "120 V, ~20 A",
  },
];

const rangeStats = [
  { label: "Slew rate", value: "0-10 deg/s" },
  { label: "Elevation", value: "0-95 deg" },
  { label: "Azimuth", value: "360+ deg" },
  { label: "Targets", value: "Satellites ready" },
];

const iconBaseClasses =
  "flex h-9 w-9 items-center justify-center rounded-full border border-titan-border/60 bg-titan-bg/70 shadow-[0_10px_24px_-18px_rgba(8,12,24,0.85)]";
const titleClassName = "text-base font-semibold text-titan-text-secondary";
const descriptionClassName = "text-sm leading-relaxed text-titan-text-primary/80";

type ImagePanelProps = {
  image: { src: string; alt: string };
  badge?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

const ImagePanel = ({
  image,
  badge,
  priority = false,
  className,
  sizes = "(min-width: 1024px) 480px, (min-width: 768px) 60vw, 90vw",
}: ImagePanelProps) => (
  <div
    className={cn(
      "relative h-full w-full overflow-hidden rounded-2xl border border-titan-border/60 bg-titan-bg-alt/50 shadow-[0_18px_40px_-30px_rgba(8,12,24,0.9)]",
      className,
    )}
  >
    <TelescopeOverviewZoomImage
      src={image.src}
      alt={image.alt}
      sizes={sizes}
      priority={priority}
    />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-titan-bg/90 via-transparent to-transparent" />
    {badge ? (
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-full px-3 py-1 border border-titan-border/60 bg-titan-bg/80 text-[10px] uppercase tracking-[0.3em] text-titan-text-muted shadow-[0_12px_24px_-18px_rgba(8,12,24,0.9)]">
        {badge}
      </div>
    ) : null}
  </div>
);

type MetricTileProps = {
  label: string;
  value: string;
  detail: string;
};

const MetricTile = ({ label, value, detail }: MetricTileProps) => (
  <div className="flex flex-col gap-1 rounded-2xl p-3 border border-titan-border/60 bg-titan-bg-alt/70 text-xs text-titan-text-primary/90 shadow-[0_12px_24px_-18px_rgba(8,12,24,0.8)]">
    <span className="text-[10px] uppercase tracking-[0.3em] text-titan-text-muted">{label}</span>
    <span className="text-lg font-semibold text-titan-text-secondary">{value}</span>
    <span className="text-[11px] text-titan-text-primary/70">{detail}</span>
  </div>
);

const RangePanel = () => (
  <div className="grid h-full w-full gap-2 rounded-2xl p-4 border border-titan-border/60 bg-titan-bg/40">
    {rangeStats.map(stat => (
      <div
        key={stat.label}
        className="flex items-center justify-between rounded-xl px-3 py-2 border border-titan-border/50 bg-titan-bg-alt/70 text-xs text-titan-text-primary/90"
      >
        <span className="font-semibold text-titan-text-secondary">{stat.label}</span>
        <span className="text-[11px] text-titan-text-muted">{stat.value}</span>
      </div>
    ))}
  </div>
);

const bentoItems = [
  {
    id: "signal-collector",
    title: <span className={titleClassName}>Signal Collector</span>,
    description: (
      <span className={descriptionClassName}>
        A 10 m Cassegrain surface built for faint hydrogen work and higher-frequency experiments.
      </span>
    ),
    header: (
      <div className="flex-1">
        <ImagePanel
          image={telescopeImages[0]}
          badge="Heritage build"
          priority
          className="min-h-[14rem]"
        />
      </div>
    ),
    className: "md:col-span-2 md:row-span-2",
    icon: (
      <div className={cn(iconBaseClasses, "text-titan-yellow")}>
        <IconTelescope className="h-4 w-4" />
      </div>
    ),
  },
  {
    id: "tracking-envelope",
    title: <span className={titleClassName}>Tracking Envelope</span>,
    description: (
      <span className={descriptionClassName}>
        Variable slews from 0-10 deg/s, elevation 0-95 deg, azimuth 360+ with managed wrap.
      </span>
    ),
    header: (
      <div className="flex-1">
        <RangePanel />
      </div>
    ),
    className: "md:col-span-1",
    icon: (
      <div className={cn(iconBaseClasses, "text-titan-aqua")}>
        <IconTarget className="h-4 w-4" />
      </div>
    ),
  },
  {
    id: "drive-train",
    title: <span className={titleClassName}>Drive Train</span>,
    description: (
      <span className={descriptionClassName}>
        Dual gear trains, twin DC motors, and electronic brakes balanced enough to nudge by hand.
      </span>
    ),
    header: (
      <div className="flex-1">
        <ImagePanel image={telescopeImages[1]} badge="Motion gear" className="min-h-[9rem]" />
      </div>
    ),
    className: "md:col-span-1",
    icon: (
      <div className={cn(iconBaseClasses, "text-titan-orange")}>
        <IconSettings className="h-4 w-4" />
      </div>
    ),
  },
  {
    id: "control-stack",
    title: <span className={titleClassName}>Control Stack</span>,
    description: (
      <span className={descriptionClassName}>
        Analog feedback today, encoders and computer control next for reliable remote pointing.
      </span>
    ),
    className: "md:col-span-1",
    icon: (
      <div className={cn(iconBaseClasses, "text-titan-blue")}>
        <IconStack className="h-4 w-4" />
      </div>
    ),
  },
  {
    id: "power-utilities",
    title: <span className={titleClassName}>Power + Utilities</span>,
    description: (
      <span className={descriptionClassName}>
        Twin 48 VDC supplies plus a modest 120 V feed with about 20 A site draw.
      </span>
    ),
    className: "md:col-span-1",
    icon: (
      <div className={cn(iconBaseClasses, "text-titan-purple")}>
        <IconBolt className="h-4 w-4" />
      </div>
    ),
  },
  {
    id: "footprint-fixtures",
    title: <span className={titleClassName}>Footprint + Fixtures</span>,
    description: (
      <span className={descriptionClassName}>
        Compact 8 ft circular pier footprint with a bolt template, spare gearboxes, and rack-mount readout.
      </span>
    ),
    header: (
      <div className="flex-1">
        <ImagePanel image={telescopeImages[2]} badge="On-site kit" className="min-h-[9rem]" />
      </div>
    ),
    className: "md:col-span-1",
    icon: (
      <div className={cn(iconBaseClasses, "text-titan-green")}>
        <IconAperture className="h-4 w-4" />
      </div>
    ),
  },
];

export default function TelescopeOverviewPage() {
  return (
    <main className="relative z-10 space-y-12">
      <section className="relative overflow-hidden rounded-3xl p-8 border border-titan-border/60 bg-titan-bg-alt/80 shadow-[0_28px_60px_-40px_rgba(8,12,24,0.9)]">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(94,102,138,0.35),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(198,147,68,0.25),_transparent_60%)]"
        />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-titan-text-muted">
              Telescope overview
            </p>
            <h1 className="text-4xl font-bold text-titan-text-secondary">
              Heritage hardware, modern control cadence
            </h1>
            <p className="text-sm leading-relaxed text-titan-text-primary/90">
              The Titan dish is a 10-meter Scientific-Atlanta Cassegrain on an ANTLab positioner with NASA heritage.
              The mechanics are tight and balanced, which leaves room for modern controls, data capture, and remote
              operations instead of heavy structural rebuilds.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {overviewStats.map(stat => (
              <MetricTile key={stat.label} label={stat.label} value={stat.value} detail={stat.detail} />
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-titan-text-secondary">System snapshot</h2>
          <p className="text-sm text-titan-text-muted">
            Each tile highlights a subsystem and the upgrade path for the observatory build-out.
          </p>
        </div>
        <BentoGrid className="md:auto-rows-[minmax(20rem,_auto)]">
          {bentoItems.map(item => (
            <BentoGridItem
              key={item.id}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={cn("overflow-hidden", item.className)}
            />
          ))}
        </BentoGrid>
      </section>
    </main>
  );
}
