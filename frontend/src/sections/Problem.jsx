import { Reveal, ChapterLabel } from "@/components/Reveal";
import { PenLine, Shuffle, Eraser, EyeOff, Trash2, Scale } from "lucide-react";

const PROBLEMS = [
  [PenLine, "Pen & paper is slow", "Tally marks become difficult when the match moves quickly."],
  [Shuffle, "Easy to miscount", "Manual tracking increases the risk of mistakes."],
  [Eraser, "Hard to correct", "Correcting previous entries on paper is inconvenient."],
  [EyeOff, "No real-time insight", "Statistics are not available while the match is happening."],
  [Trash2, "Data gets lost", "Paper records are difficult to organize and revisit later."],
  [Scale, "Difficult to compare", "Comparing players and teams requires manual calculation."],
];

export const Problem = () => (
  <section className="relative bg-white py-24 sm:py-32" data-testid="problem-section">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <ChapterLabel number="01" title="The Problem" />
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="font-display font-black uppercase tracking-tight leading-[0.95] text-4xl sm:text-5xl text-navy" data-testid="problem-headline">
              Watching the match shouldn't mean{" "}
              <span className="text-court-pink">losing track</span> of the data.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-base sm:text-lg text-navy/60 leading-relaxed max-w-md">
              Padel moves fast. Pen-and-paper statistics force you to choose between watching the
              rally and recording it. You shouldn't have to choose.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-10 hidden lg:block">
            <figure className="relative w-72 overflow-hidden rounded-2xl rotate-2 border-4 border-navy shadow-xl">
              <img
                src="https://images.pexels.com/photos/38254515/pexels-photo-38254515.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Padel player striking the ball in dramatic light"
                className="w-full h-80 object-cover contrast-125 saturate-[0.8]"
                loading="lazy"
              />
            </figure>
          </Reveal>
        </div>
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          {PROBLEMS.map(([Icon, title, copy], i) => (
            <Reveal key={title} delay={i * 0.07}>
              <div
                className="group h-full rounded-2xl border border-navy/10 bg-white p-6 transition-[border-color,box-shadow,transform] duration-300 hover:border-court-cyan hover:shadow-[0_0_0_1px_#25F4EE,0_20px_40px_-20px_rgba(11,18,38,0.25)] hover:-translate-y-1"
                data-testid={`problem-card-${i + 1}`}
              >
                <Icon className="w-6 h-6 text-court-pink" strokeWidth={2.2} />
                <h3 className="mt-4 font-display font-bold text-lg text-navy tracking-tight">{title}</h3>
                <p className="mt-2 text-sm text-navy/55 leading-relaxed">{copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.1} className="mt-16">
        <div className="grid md:grid-cols-2 rounded-3xl overflow-hidden border border-navy/10" data-testid="problem-contrast">
          <div className="bg-navy/5 p-8 sm:p-10">
            <p className="font-mono2 text-[10px] tracking-[0.25em] text-navy/50 uppercase">Traditional tracking</p>
            <p className="mt-4 font-display font-bold text-2xl text-navy/40 line-through decoration-court-warn/60">
              Paper, tally marks, guesswork
            </p>
            <p className="mt-3 text-sm text-navy/50">Slow, error-prone, and impossible to revisit.</p>
          </div>
          <div className="bg-navy p-8 sm:p-10">
            <p className="font-mono2 text-[10px] tracking-[0.25em] text-court-cyan uppercase">MVP digital tracking</p>
            <p className="mt-4 font-display font-bold text-2xl text-white">
              One tap per point. <span className="text-court-cyan">All the data.</span>
            </p>
            <p className="mt-3 text-sm text-white/60">Score, stats, and player attribution — live, while you watch.</p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
