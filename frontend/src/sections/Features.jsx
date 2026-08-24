import { Reveal, ChapterLabel } from "@/components/Reveal";
import { Zap, Calculator, UserCheck, Activity, Undo2, FileText, History, Target } from "lucide-react";

const FEATURES = [
  { icon: Zap, title: "Live Match Tracking", copy: "Record point outcomes in real time, at the speed of the rally.", span: "md:col-span-7" },
  { icon: Calculator, title: "Smart Scoring", copy: "MVP understands your match format and manages point, game, and set scoring automatically.", span: "md:col-span-5" },
  { icon: UserCheck, title: "Player Attribution", copy: "Know which player produced the winner or committed the error.", span: "md:col-span-4" },
  { icon: Activity, title: "Serve & Return Data", copy: "First serve, second serve, aces, double faults, and return outcomes.", span: "md:col-span-4" },
  { icon: Target, title: "Shot Breakdown", copy: "Ground stroke, volley, smash, lob, dropshot — or Not Sure.", span: "md:col-span-4" },
  { icon: Undo2, title: "Easy Correction", copy: "Undo, Redo, and Replay Point fix mistakes during live tracking.", span: "md:col-span-5" },
  { icon: FileText, title: "Match Summary", copy: "Review the most important performance data after the match.", span: "md:col-span-4" },
  { icon: History, title: "Match History", copy: "Keep your matches organized and accessible.", span: "md:col-span-3" },
];

export const Features = () => (
  <section id="features" className="relative bg-white py-24 sm:py-32" data-testid="features-section">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <ChapterLabel number="05" title="Core Features" />
      <div className="grid lg:grid-cols-12 gap-8 items-end">
        <Reveal className="lg:col-span-8">
          <h2 className="font-display font-black uppercase tracking-tight leading-[0.95] text-4xl sm:text-5xl text-navy" data-testid="features-headline">
            Everything the match gives you. <span className="text-outline-navy">Nothing it doesn't.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-4">
          <p className="text-navy/55 text-base">
            No clutter, no setup friction — just the data that matters, captured live.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid md:grid-cols-12 gap-4" data-testid="features-grid">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={(i % 3) * 0.08} className={f.span}>
            <div
              className="group h-full rounded-2xl border border-navy/10 bg-white p-7 transition-[border-color,box-shadow,transform] duration-300 hover:border-court-pink hover:shadow-[0_0_0_1px_#FE2C55,0_20px_40px_-20px_rgba(11,18,38,0.25)] hover:-translate-y-1"
              data-testid={`feature-card-${f.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="flex items-center justify-between">
                <f.icon className="w-6 h-6 text-navy group-hover:text-court-pink transition-colors duration-300" strokeWidth={2.2} />
                <span className="font-mono2 text-[10px] tracking-widest text-navy/30">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-5 font-display font-black text-xl uppercase tracking-tight text-navy">{f.title}</h3>
              <p className="mt-2 text-sm text-navy/55 leading-relaxed">{f.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
