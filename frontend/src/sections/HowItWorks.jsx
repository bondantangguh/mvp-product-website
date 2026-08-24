import { Reveal, ChapterLabel } from "@/components/Reveal";
import { PhoneMockup } from "@/components/PhoneMockup";

const STEPS = [
  {
    n: "01", title: "Set Up", screen: "setup",
    copy: "Configure teams, players, match format, first server, and receiving order.",
    tags: ["Teams", "Players", "Format", "First server"],
  },
  {
    n: "02", title: "Track", screen: "live",
    copy: "Record the point using simple taps — without taking your eyes off the rally.",
    tags: ["One-tap entry", "Winner / Error"],
  },
  {
    n: "03", title: "Capture", screen: "stats",
    copy: "MVP automatically calculates score, serve and return statistics, winners, errors, and player attribution.",
    tags: ["Score", "Serve stats", "Return stats", "Attribution"],
  },
  {
    n: "04", title: "Review", screen: "summary",
    copy: "After the match: full statistics, match summary, report, and organized match history.",
    tags: ["Statistics", "Summary", "Report", "History"],
  },
];

export const HowItWorks = () => (
  <section id="how-it-works" className="relative bg-white py-24 sm:py-32" data-testid="how-it-works-section">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <ChapterLabel number="03" title="How It Works" />
      <Reveal>
        <h2 className="font-display font-black uppercase tracking-tight leading-[0.95] text-4xl sm:text-5xl text-navy max-w-3xl" data-testid="how-it-works-headline">
          From first serve to full report in <span className="text-court-pink">four steps.</span>
        </h2>
      </Reveal>

      <div className="mt-16 space-y-20 sm:space-y-28">
        {STEPS.map((step, i) => (
          <div
            key={step.n}
            className={`grid lg:grid-cols-12 gap-10 items-center ${i % 2 === 1 ? "" : ""}`}
            data-testid={`how-step-${step.n}`}
          >
            <div className={`lg:col-span-7 relative ${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <span className="chapter-number absolute -top-10 sm:-top-16 -left-2 text-[7rem] sm:text-[11rem] text-navy/[0.06] select-none" aria-hidden="true">
                {step.n}
              </span>
              <Reveal className="relative">
                <h3 className="font-display font-black uppercase tracking-tight text-3xl sm:text-4xl text-navy">
                  <span className="text-court-pink mr-3">{step.n}</span>{step.title}
                </h3>
                <p className="mt-4 text-base sm:text-lg text-navy/60 leading-relaxed max-w-lg">{step.copy}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {step.tags.map((t) => (
                    <span key={t} className="rounded-full bg-navy/5 border border-navy/10 px-3.5 py-1.5 font-mono2 text-[10px] tracking-wider text-navy/70 uppercase">
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
            <div className={`lg:col-span-5 flex justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <Reveal delay={0.15}>
                <div className={i % 2 === 1 ? "rotate-[-3deg]" : "rotate-[3deg]"}>
                  <PhoneMockup screen={step.screen} glow={false} />
                </div>
              </Reveal>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
