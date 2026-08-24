import { Reveal, ChapterLabel } from "@/components/Reveal";
import { Eye, Pointer, Database, TrendingUp } from "lucide-react";

const FLOW = [
  [Eye, "Watch", "Keep your eyes on the rally."],
  [Pointer, "Tap", "One tap records the outcome."],
  [Database, "Record", "Score, serve, and attribution saved."],
  [TrendingUp, "Analyze", "Stats ready the moment it ends."],
];

const HIGHLIGHTS = [
  "Fast point entry", "Automatic scoring", "Automatic statistics", "Player attribution",
  "Undo / Redo", "Replay Point", "Match Summary", "Match History",
];

export const Solution = () => (
  <section className="relative bg-navy grain py-24 sm:py-32 overflow-hidden" data-testid="solution-section">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(254,44,85,0.08),transparent_55%)]" aria-hidden="true" />
    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
      <ChapterLabel number="02" title="The Solution" dark />
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-6">
          <Reveal>
            <h2 className="font-display font-black uppercase tracking-tight leading-[0.9] text-5xl sm:text-6xl text-white" data-testid="solution-headline">
              Meet <span className="brand-split">MVP.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-base sm:text-lg text-white/65 leading-relaxed max-w-lg">
              A faster way to record what actually happens on court. Built for real match
              situations — where you need to watch the game while recording what happens.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-wrap gap-2.5" data-testid="solution-highlights">
              {HIGHLIGHTS.map((h) => (
                <span
                  key={h}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono2 text-[11px] tracking-wider text-white/80"
                >
                  {h}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-6">
          <div className="grid grid-cols-2 gap-4">
            {FLOW.map(([Icon, title, copy], i) => (
              <Reveal key={title} delay={i * 0.1} className={i % 2 === 1 ? "sm:mt-10" : ""}>
                <div
                  className="rounded-2xl border border-white/10 bg-navy-2 p-6 sm:p-7 transition-[border-color,transform] duration-300 hover:border-court-cyan/60 hover:-translate-y-1"
                  data-testid={`solution-step-${title.toLowerCase()}`}
                >
                  <div className="flex items-center justify-between">
                    <Icon className="w-6 h-6 text-court-cyan" strokeWidth={2.2} />
                    <span className="chapter-number text-4xl text-white/10">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-5 font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-white/55">{copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-6 flex items-center justify-center gap-2 font-mono2 text-[10px] tracking-[0.3em] text-white/40 uppercase" data-testid="solution-flow-line">
              Watch <span className="text-court-pink">↓</span> Tap <span className="text-court-pink">↓</span> Record <span className="text-court-pink">↓</span> Analyze
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);
