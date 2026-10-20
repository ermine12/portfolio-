export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#070707] flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="marker-text text-5xl md:text-7xl text-white">
          Ermias Simegne
        </h1>
        <p className="font-sans text-lg text-neutral-400">
          Software Engineer — Backend, AI &amp; Full-Stack
        </p>
        <div className="flex gap-3 justify-center">
          <span className="mono-text bg-neutral-800 text-emerald-400 px-3 py-1 rounded-full border border-neutral-700">
            A2SV Trainee
          </span>
          <span className="mono-text bg-neutral-800 text-amber-400 px-3 py-1 rounded-full border border-neutral-700">
            10 Academy Distinction
          </span>
          <span className="mono-text bg-neutral-800 text-sky-400 px-3 py-1 rounded-full border border-neutral-700">
            GPA 3.5/4.0
          </span>
        </div>
        <p className="text-sm text-neutral-500 font-mono">
          Task 1 Complete — Fonts, Globals &amp; Styling Loaded ✓
        </p>
      </div>
    </main>
  );
}
