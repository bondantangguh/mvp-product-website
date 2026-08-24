import { Reveal, ChapterLabel } from "@/components/Reveal";

const PHASES = [
  {
    tag: "Today", color: "text-court-cyan", border: "border-court-cyan/40",
    title: "Live Match Tracking",
    copy: "Fast and simple match statistics, recorded courtside.",
    active: true,
  },
  {
    tag: "Next", color: "text-court-pink", border: "border-court-pink/40",
    title: "Advanced Match Analytics",
    copy: "Understand how points are won and lost.",
  },
  {
    tag: "Future", color: "text-court-focus", border: "border-court-focus/40",
    title: "Player Performance Intelligence",
    copy: "Shot effectiveness, error patterns, serve and return performance, pressure-point performance, player contribution, and match-to-match development.",
  },
  {
    tag: "Long-term vision", color: "text-white", border: "border-white/30",
    title: "PIMP — Proper Intelligent Match Platform",
    copy: "MVP will evolve beyond tracking into an intelligent platform that helps coaches and players understand and improve their game.",
  },
];

export const Roadmap = () => (
  <section id="roadmap" className="relative bg-navy-2 grain py-24 sm:py-32 overflow-hidden" data-testid="roadmap-section">
    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
      <ChapterLabel number="08" title="Roadmap & Vision" dark />
      <Reveal>
        <h2 className="font-display font-black uppercase tracking-tight leading-[0.95] text-4xl sm:text-5xl text-white max-w-3xl" data-testid="roadmap-headline">
          Where MVP is <span className="text-court-cyan">headed.</span>
        </h2>
      </Reveal>

      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="roadmap-timeline">
        {PHASES.map((p, i) => (
          <Reveal key={p.tag} delay={i * 0.1}>
            <div
              className={`relative h-full rounded-2xl border ${p.border} bg-navy p-7 pt-9 transition-transform duration-300 hover:-translate-y-1.5`}
              data-testid={`roadmap-phase-${p.tag.toLowerCase().replace(/[^a-z]+/g, "-")}`}
            >
              <span className="chapter-number absolute top-4 right-5 text-5xl text-white/[0.07]" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={`font-mono2 text-[10px] tracking-[0.3em] uppercase font-bold ${p.color}`}>
                {p.tag}
              </span>
              {p.active && (
                <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-court-cyan pulse-dot align-middle" aria-label="current" />
              )}
              <h3 className="mt-4 font-display font-black text-xl uppercase tracking-tight text-white leading-tight">
                {p.title}
              </h3>
              <p className="mt-3 text-sm text-white/55 leading-relaxed">{p.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-20">
        <div className="rounded-3xl border border-white/10 bg-navy p-10 sm:p-14 text-center grain relative overflow-hidden" data-testid="roadmap-beta-cta">
          <div className="relative z-10">
            <h3 className="font-display font-black uppercase tracking-tight text-3xl sm:text-4xl text-white">
              Want to help build it?
            </h3>
            <p className="mt-4 text-white/60 max-w-md mx-auto">
              Join the MVP Beta and get early access to Pro features for one month.
            </p>
            <a
              href="#beta"
              data-testid="roadmap-join-beta-btn"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-court-cyan px-8 py-4 font-display font-black text-sm tracking-widest text-navy transition-colors duration-300 hover:bg-white"
            >
              JOIN THE BETA
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
