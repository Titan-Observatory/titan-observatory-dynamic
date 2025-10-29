export default function SiteHeader() {
  return (
    <header className="relative isolate overflow-hidden border-b border-titan-border">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/images/titan-banner.png')] bg-cover bg-center opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-titan-bg/90" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-3 px-8 py-8 text-center sm:py-10">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Titan Astronomical Observatory
        </h1>
        <p className="max-w-2xl text-sm text-white/80">
          Remote NASA-grade radio astronomy for students, teachers, and curious explorers.
        </p>
      </div>
    </header>
  );
}
