import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { PhoneMockup } from "@/components/PhoneMockup";

const lineAnim = (i) => ({
  initial: { y: "110%" },
  animate: { y: "0%" },
  transition: { duration: 1, delay: 0.15 + i * 0.13, ease: [0.22, 1, 0.36, 1] },
});

export const Hero = () => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 60, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 60, damping: 18 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      className="relative min-h-screen bg-navy grain overflow-hidden flex items-center"
      data-testid="hero-section"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,244,238,0.08),transparent_55%)]" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-[radial-gradient(ellipse_at_bottom_left,rgba(254,44,85,0.10),transparent_60%)]" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 pt-28 pb-16 lg:pt-24 lg:pb-0 grid lg:grid-cols-12 gap-12 lg:gap-6 items-center">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="rounded-full border border-court-cyan/40 bg-court-cyan/10 px-3.5 py-1.5 font-mono2 text-[10px] tracking-[0.25em] text-court-cyan" data-testid="hero-beta-badge">
              BETA V1.2.4 · LIVE ON COURT
            </span>
          </motion.div>

          <h1 className="font-display font-black uppercase tracking-tighter leading-[0.85] text-white text-[17vw] sm:text-7xl lg:text-[6.5rem]" data-testid="hero-headline">
            {["Turn every", "point", "into data."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span className="block" {...lineAnim(i)}>
                  {i === 1 ? (
                    <span className="brand-split">{line}</span>
                  ) : i === 2 ? (
                    <span className="text-outline">{line}</span>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-xl text-base sm:text-lg text-white/70 leading-relaxed"
            data-testid="hero-subcopy"
          >
            MVP is a live Padel match tracker that helps coaches, players, and match observers
            record points, understand performance, and turn match action into useful statistics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#get-mvp"
              data-testid="hero-cta-get"
              className="group inline-flex items-center justify-center rounded-full bg-court-cyan px-8 py-4 font-display font-black text-sm tracking-widest text-navy transition-colors duration-300 hover:bg-white"
            >
              GET MVP
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#beta"
              data-testid="hero-cta-beta"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-4 font-display font-black text-sm tracking-widest text-white transition-colors duration-300 hover:border-court-pink hover:text-court-pink"
            >
              BECOME A BETA TESTER
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-8 font-mono2 text-[10px] tracking-[0.25em] text-white/40 uppercase"
          >
            Free to start · iOS &amp; Android · Stop counting. Start understanding the match.
          </motion.p>
        </div>

        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          <motion.div
            initial={{ opacity: 0, y: 80, rotate: 4 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 1000 }}
          >
            <PhoneMockup screen="live" />
          </motion.div>
          <motion.figure
            initial={{ opacity: 0, x: -40, rotate: -6 }}
            animate={{ opacity: 1, x: 0, rotate: -4 }}
            transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block absolute -left-16 bottom-0 w-44 overflow-hidden rounded-xl border border-white/15 shadow-2xl"
          >
            <img
              src="https://images.pexels.com/photos/35248332/pexels-photo-35248332.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Padel player mid-rally on court"
              className="w-full h-56 object-cover contrast-125 saturate-[0.85]"
              loading="eager"
            />
          </motion.figure>
        </div>
      </div>
    </section>
  );
};
