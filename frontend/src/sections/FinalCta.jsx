import { Reveal } from "@/components/Reveal";
import { StoreButtons } from "@/components/StoreButtons";

export const FinalCta = () => (
  <section id="get-mvp" className="relative bg-navy grain py-24 sm:py-36 overflow-hidden" data-testid="final-cta-section">
    <div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/38155778/pexels-photo-38155778.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-hidden="true"
    />
    <div className="absolute inset-0 bg-navy/80" aria-hidden="true" />
    <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center">
      <Reveal>
        <img
          src="/logo-full.webp"
          alt="MVP — Match Value Projection"
          className="mx-auto h-24 sm:h-28 w-auto mb-10"
          data-testid="final-cta-logo"
        />
      </Reveal>
      <Reveal>
        <h2 className="font-display font-black uppercase tracking-tighter leading-[0.9] text-5xl sm:text-7xl text-white" data-testid="final-cta-headline">
          Ready to track your <span className="brand-split">next match?</span>
        </h2>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="mt-6 text-base sm:text-lg text-white/65 max-w-xl mx-auto">
          Start with the free version of MVP and experience a faster way to record your Padel matches.
        </p>
      </Reveal>
      <Reveal delay={0.25}>
        <StoreButtons className="mt-10 justify-center" />
      </Reveal>
      <Reveal delay={0.35}>
        <a
          href="#beta"
          data-testid="final-cta-beta-link"
          className="mt-8 inline-block font-mono2 text-xs tracking-[0.25em] text-court-pink uppercase hover:text-court-cyan transition-colors duration-300"
        >
          Or become a Beta Tester →
        </a>
      </Reveal>
    </div>
  </section>
);
