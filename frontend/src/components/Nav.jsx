import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  ["How It Works", "#how-it-works"],
  ["Features", "#features"],
  ["Beta", "#beta"],
  ["Roadmap", "#roadmap"],
  ["FAQ", "#faq"],
];

export const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
        scrolled ? "bg-navy/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
      data-testid="main-nav"
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 h-16 sm:h-[72px]">
        <a href="#top" data-testid="nav-logo" className="flex items-center gap-3">
          <img src={`${process.env.PUBLIC_URL}/logo-mark.webp`} alt="MVP — Match Value Projection" className="h-9 w-auto" />
          <span className="hidden sm:inline font-body font-medium text-[10px] tracking-[0.2em] text-white/50">
            MATCH VALUE PROJECTION
          </span>
        </a>
        <div className="hidden lg:flex items-center gap-8">
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              data-testid={`nav-link-${label.toLowerCase().replace(/\s+/g, "-")}`}
              className="font-mono2 text-[11px] tracking-[0.2em] text-white/70 hover:text-court-cyan transition-colors duration-300 uppercase"
            >
              {label}
            </a>
          ))}
          <a
            href="#beta"
            data-testid="nav-cta-beta"
            className="rounded-full bg-court-pink px-5 py-2.5 font-display font-bold text-xs tracking-widest text-white hover:bg-court-cyan hover:text-navy transition-colors duration-300"
          >
            JOIN THE BETA
          </a>
        </div>
        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white p-2 -mr-2"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-navy/95 backdrop-blur-xl border-b border-white/10"
            data-testid="nav-mobile-menu"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {LINKS.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  data-testid={`nav-mobile-link-${label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="font-display font-bold text-2xl text-white/90 hover:text-court-cyan transition-colors"
                >
                  {label}
                </a>
              ))}
              <a
                href="#beta"
                onClick={() => setOpen(false)}
                data-testid="nav-mobile-cta-beta"
                className="mt-2 rounded-full bg-court-pink px-6 py-4 text-center font-display font-bold text-sm tracking-widest text-white"
              >
                JOIN THE BETA
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
