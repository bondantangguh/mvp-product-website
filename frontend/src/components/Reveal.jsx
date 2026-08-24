import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 36, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const ChapterLabel = ({ number, title, dark = false }) => (
  <Reveal className="flex items-center gap-4 mb-6">
    <span className={`font-mono2 text-xs font-semibold tracking-[0.25em] ${dark ? "text-court-cyan" : "text-court-pink"}`}>
      {number}
    </span>
    <span className={`h-px w-12 ${dark ? "bg-white/30" : "bg-navy/20"}`} />
    <span className={`font-mono2 text-xs font-semibold tracking-[0.25em] uppercase ${dark ? "text-white/70" : "text-navy/60"}`}>
      {title}
    </span>
  </Reveal>
);
