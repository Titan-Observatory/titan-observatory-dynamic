import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Telescope Specifications | Titan Observatory",
  description:
    "Detailed overview of the Titan Observatory telescope hardware and observing site.",
};

const telescopeSpecs = [
  { label: "Optical Design", value: "Ritchey-Chretien reflector" },
  { label: "Primary Mirror", value: "3.8 m diameter, low-expansion glass ceramic" },
  { label: "Secondary Mirror", value: "1.1 m diameter, adaptive optics equipped" },
  { label: "Effective Focal Length", value: "48.5 m (f/12.8)" },
  { label: "Spectral Coverage", value: "320 nm - 2.4 um with interchangeable instruments" },
  { label: "Tracking Accuracy", value: "< 0.15 arcsec RMS with closed-loop control" },
];

const siteSpecs = [
  { label: "Elevation", value: "4,150 m (13,615 ft) above sea level" },
  { label: "Coordinates", value: "21 deg 18' N, 156 deg 50' W" },
  { label: "Average Seeing", value: "0.55 arcsec (annual median)" },
  { label: "Sky Brightness", value: "21.8 mag arcsec^2 in V band" },
  { label: "Weather Downtime", value: "18% (primarily winter storms)" },
  { label: "Infrastructure", value: "Fiber backhaul, redundant power, on-site instrument lab" },
];

export default function SpecificationsPage() {
  return (
    <main className="space-y-10">
      <section className="space-y-4">
        <header>
          <h1 className="text-3xl font-bold">Telescope Specifications</h1>
          <p className="text-gray-600">
            Core hardware capabilities that enable Titan Observatory to capture deep-sky observations
            with precision and clarity.
          </p>
        </header>
        <dl className="grid gap-6 sm:grid-cols-2">
          {telescopeSpecs.map(spec => (
            <div key={spec.label} className="rounded-lg border border-gray-200 p-4 shadow-sm">
              <dt className="text-sm uppercase tracking-wide text-gray-500">{spec.label}</dt>
              <dd className="mt-1 text-base font-medium text-gray-900">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="space-y-4">
        <header>
          <h2 className="text-2xl font-semibold">Observing Site</h2>
          <p className="text-gray-600">
            Environmental conditions and infrastructure that keep the observatory running at peak
            performance throughout the year.
          </p>
        </header>
        <dl className="grid gap-6 sm:grid-cols-2">
          {siteSpecs.map(spec => (
            <div key={spec.label} className="rounded-lg border border-gray-200 p-4 shadow-sm">
              <dt className="text-sm uppercase tracking-wide text-gray-500">{spec.label}</dt>
              <dd className="mt-1 text-base font-medium text-gray-900">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
