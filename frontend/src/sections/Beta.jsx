import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Reveal, ChapterLabel } from "@/components/Reveal";
import { API } from "@/config";
import { Zap, Users, CalendarHeart, Hammer, CheckCircle2 } from "lucide-react";

const BENEFITS = [
  [Zap, "Early access", "Get access to Pro features before public release."],
  [Users, "Direct influence", "Help shape future features and improvements."],
  [CalendarHeart, "One month Pro access", "Beta Tester access remains active for one month."],
  [Hammer, "Build with us", "Your real match feedback helps improve MVP."],
];

const ROLES = [
  ["player", "Player"],
  ["coach", "Coach"],
  ["captain", "Team Captain"],
  ["observer", "Match Observer"],
  ["other", "Other"],
];

const BetaForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await axios.post(`${API}/beta/signup`, { email, name: name || undefined, role: role || undefined });
      setDone(true);
    } catch (err) {
      const detail = err.response?.data?.detail;
      const msg = typeof detail === "string" ? detail : "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white p-7 sm:p-10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)]" data-testid="beta-signup-card">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center py-10"
            data-testid="beta-confirmation"
          >
            <CheckCircle2 className="w-14 h-14 text-court-win mx-auto" strokeWidth={1.8} />
            <h3 className="mt-6 font-display font-black text-3xl uppercase tracking-tight text-navy">
              You're on the list.
            </h3>
            <p className="mt-3 text-navy/60 text-base max-w-xs mx-auto">
              We'll contact you with instructions for accessing MVP Beta features.
            </p>
          </motion.div>
        ) : (
          <motion.form key="form" exit={{ opacity: 0, y: -12 }} onSubmit={submit} className="space-y-5" data-testid="beta-signup-form">
            <div>
              <label htmlFor="beta-email" className="block font-mono2 text-[10px] tracking-[0.25em] text-navy/50 uppercase mb-2">
                Email address *
              </label>
              <input
                id="beta-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@club.com"
                data-testid="beta-email-input"
                className="w-full rounded-xl border-2 border-navy/15 bg-white px-4 py-3.5 text-navy placeholder:text-navy/30 focus:border-court-cyan focus:outline-none transition-colors duration-300"
              />
            </div>
            <div>
              <label htmlFor="beta-name" className="block font-mono2 text-[10px] tracking-[0.25em] text-navy/50 uppercase mb-2">
                Name <span className="text-navy/30">(optional)</span>
              </label>
              <input
                id="beta-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                data-testid="beta-name-input"
                className="w-full rounded-xl border-2 border-navy/15 bg-white px-4 py-3.5 text-navy placeholder:text-navy/30 focus:border-court-cyan focus:outline-none transition-colors duration-300"
              />
            </div>
            <div>
              <span className="block font-mono2 text-[10px] tracking-[0.25em] text-navy/50 uppercase mb-2">
                I am a… <span className="text-navy/30">(optional)</span>
              </span>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Your role">
                {ROLES.map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={role === value}
                    onClick={() => setRole(role === value ? "" : value)}
                    data-testid={`beta-role-${value}`}
                    className={`rounded-full px-4 py-2.5 font-display font-bold text-xs tracking-wide border-2 transition-colors duration-300 ${
                      role === value
                        ? "border-navy bg-navy text-court-cyan"
                        : "border-navy/15 text-navy/60 hover:border-navy/40"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              data-testid="beta-signup-submit"
              className="w-full rounded-full bg-court-pink py-4 font-display font-black text-sm tracking-widest text-white transition-colors duration-300 hover:bg-navy disabled:opacity-60"
            >
              {loading ? "JOINING…" : "JOIN THE BETA"}
            </button>
            <p className="text-center text-xs text-navy/40">
              Free for one month. No payment required.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Beta = () => (
  <section id="beta" className="relative bg-navy grain py-24 sm:py-32 overflow-hidden" data-testid="beta-section">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(254,44,85,0.12),transparent_55%)]" aria-hidden="true" />
    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
      <ChapterLabel number="07" title="Beta Tester Program" dark />
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="font-display font-black uppercase tracking-tight leading-[0.9] text-4xl sm:text-6xl text-white" data-testid="beta-headline">
              Help shape the <span className="brand-split">future</span> of MVP.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-base sm:text-lg text-white/65 leading-relaxed max-w-xl">
              MVP is opening a limited Beta Tester program for Padel players, coaches, and match
              observers who want early access to Pro features and want to help shape the product.
            </p>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {BENEFITS.map(([Icon, title, copy], i) => (
              <Reveal key={title} delay={0.1 + i * 0.08}>
                <div className="h-full rounded-2xl border border-white/10 bg-navy-2 p-6" data-testid={`beta-benefit-${title.toLowerCase().replace(/\s+/g, "-")}`}>
                  <Icon className="w-6 h-6 text-court-pink" strokeWidth={2.2} />
                  <h3 className="mt-4 font-display font-black text-lg uppercase tracking-tight text-white">{title}</h3>
                  <p className="mt-2 text-sm text-white/55">{copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5">
          <Reveal delay={0.2}>
            <BetaForm />
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);
