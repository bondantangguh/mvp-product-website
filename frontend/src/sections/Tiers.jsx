import { Reveal, ChapterLabel } from "@/components/Reveal";
import { Check, Lock } from "lucide-react";

const FREE = [
  "1 Set only", "Total of 4 games", "Total of 5 games", "Race to 4 games", "Race to 5 games",
  "Golden Point", "Up to 5 match history entries", "Core live tracking", "Basic statistics", "Match Summary",
];

const PRO = [
  "Best of 3 sets", "Race to 6 games", "Star Point", "Deuce & Advantage", "Export PDF report", "Unlimited match history",
];

export const Tiers = () => (
  <section className="relative bg-white pb-24 sm:pb-32" data-testid="tiers-section">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <ChapterLabel number="06" title="Free & Pro" />
      <Reveal>
        <h2 className="font-display font-black uppercase tracking-tight leading-[0.95] text-4xl sm:text-5xl text-navy max-w-3xl" data-testid="tiers-headline">
          MVP is free to start. <span className="text-court-pink">Pro is coming.</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid lg:grid-cols-2 gap-6">
        <Reveal>
          <div className="h-full rounded-3xl border-2 border-navy bg-white p-8 sm:p-10" data-testid="tier-free">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-court-win/10 border border-court-win/30 px-4 py-1.5 font-mono2 text-[10px] tracking-[0.25em] text-court-win font-bold uppercase">
                Free · Available now
              </span>
              <span className="font-display font-black text-3xl text-navy">$0</span>
            </div>
            <h3 className="mt-6 font-display font-black text-2xl uppercase tracking-tight text-navy">
              Everything you need to start tracking
            </h3>
            <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {FREE.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-navy/70">
                  <Check className="w-4 h-4 mt-0.5 text-court-win shrink-0" strokeWidth={3} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative h-full rounded-3xl bg-navy grain p-8 sm:p-10 overflow-hidden" data-testid="tier-pro">
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-court-pink/15 border border-court-pink/40 px-4 py-1.5 font-mono2 text-[10px] tracking-[0.25em] text-court-pink font-bold uppercase">
                  Pro · In Beta
                </span>
                <Lock className="w-5 h-5 text-white/40" />
              </div>
              <h3 className="mt-6 font-display font-black text-2xl uppercase tracking-tight text-white">
                More power. More insight.
              </h3>
              <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {PRO.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/60">
                    <Lock className="w-4 h-4 mt-0.5 text-court-pink/70 shrink-0" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-8 font-mono2 text-[10px] tracking-[0.25em] text-white/40 uppercase">
                Available in Pro version · Free for Beta Testers for one month
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
