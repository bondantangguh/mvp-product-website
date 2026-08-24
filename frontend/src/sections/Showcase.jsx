import { Reveal, ChapterLabel } from "@/components/Reveal";
import { PhoneFrame } from "@/components/PhoneFrame";

const CARDS = [
  { img: "/screenshots/IMG_6437.webp", label: "Match Format", alt: "MVP match format selection screen" },
  { img: "/screenshots/IMG_6438.webp", label: "Team Setup", alt: "MVP team and player setup screen" },
  { img: "/screenshots/IMG_6439.webp", label: "Service Order", alt: "MVP first server and receiver selection" },
  { img: "/screenshots/IMG_6440.webp", label: "Live Match Tracker", alt: "MVP live match tracker screen" },
  { img: "/screenshots/IMG_6441.webp", label: "Point Control", alt: "MVP point attribution flow screen" },
];

export const Showcase = () => (
  <section className="relative bg-navy grain py-24 sm:py-32 overflow-hidden" data-testid="showcase-section">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,244,238,0.06),transparent_60%)]" aria-hidden="true" />
    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
      <ChapterLabel number="04" title="The Product" dark />
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <Reveal>
          <h2 className="font-display font-black uppercase tracking-tight leading-[0.95] text-4xl sm:text-5xl text-white max-w-2xl" data-testid="showcase-headline">
            Built for the <span className="text-court-cyan">side of the court.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-white/55 text-base max-w-sm">
            Real screens from the current Beta V1.2.4 — designed to be used one-handed, mid-match.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory lg:grid lg:grid-cols-5 lg:overflow-visible" data-testid="showcase-gallery">
        {CARDS.map((card, i) => (
          <Reveal key={card.img} delay={i * 0.08} className="snap-center shrink-0">
            <div className={`transition-transform duration-500 hover:-translate-y-3 ${i % 2 === 1 ? "lg:mt-12" : ""}`}>
              <PhoneFrame src={card.img} alt={card.alt} />
              <p className="mt-5 text-center font-mono2 text-[10px] tracking-[0.25em] text-white/50 uppercase">
                {card.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
