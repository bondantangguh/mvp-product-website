const Bar = ({ w, color = "bg-court-cyan" }) => (
  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
    <div className={`h-full rounded-full ${color}`} style={{ width: w }} />
  </div>
);

const LiveScreen = () => (
  <div className="flex flex-col h-full p-4 pt-8 text-white">
    <div className="flex items-center justify-between">
      <span className="font-mono2 text-[9px] tracking-[0.2em] text-white/50">SET 1 · GAME 6</span>
      <span className="flex items-center gap-1.5 font-mono2 text-[9px] tracking-[0.2em] text-court-pink">
        <span className="w-1.5 h-1.5 rounded-full bg-court-pink pulse-dot" /> LIVE
      </span>
    </div>
    <div className="mt-4 flex items-center justify-between">
      <div className="text-center">
        <p className="font-mono2 text-[9px] tracking-widest text-white/50">MARTÍN / LÓPEZ</p>
        <p className="font-display font-black text-5xl mt-1">3</p>
      </div>
      <div className="text-center">
        <p className="font-mono2 text-[10px] text-court-cyan tracking-widest">30 — 15</p>
        <p className="font-mono2 text-[8px] text-white/40 mt-1">GOLDEN POINT OFF</p>
      </div>
      <div className="text-center">
        <p className="font-mono2 text-[9px] tracking-widest text-white/50">RIOS / VEGA</p>
        <p className="font-display font-black text-5xl mt-1">2</p>
      </div>
    </div>
    <div className="mt-4 grid grid-cols-2 gap-2">
      <div className="rounded-lg bg-court-win/20 border border-court-win/40 py-2.5 text-center">
        <span className="font-display font-bold text-xs tracking-widest text-court-win">WINNER</span>
      </div>
      <div className="rounded-lg bg-court-warn/15 border border-court-warn/40 py-2.5 text-center">
        <span className="font-display font-bold text-xs tracking-widest text-court-warn">ERROR</span>
      </div>
    </div>
    <div className="mt-2 flex flex-wrap gap-1.5">
      {["Volley", "Smash", "Lob", "Dropshot"].map((s, i) => (
        <span key={s} className={`rounded-full px-2.5 py-1 font-mono2 text-[8px] tracking-wider ${i === 1 ? "bg-court-cyan text-navy font-bold" : "bg-white/10 text-white/70"}`}>
          {s}
        </span>
      ))}
    </div>
    <div className="mt-auto space-y-2">
      <div>
        <div className="flex justify-between font-mono2 text-[8px] text-white/50 mb-1"><span>1ST SERVE %</span><span>72%</span></div>
        <Bar w="72%" />
      </div>
      <div className="flex justify-between pt-1">
        <span className="font-mono2 text-[9px] tracking-widest text-white/40">↺ UNDO</span>
        <span className="font-mono2 text-[9px] tracking-widest text-white/40">REPLAY POINT</span>
        <span className="font-mono2 text-[9px] tracking-widest text-white/40">REDO ↻</span>
      </div>
    </div>
  </div>
);

const SetupScreen = () => (
  <div className="flex flex-col h-full p-4 pt-8 text-white">
    <p className="font-display font-black text-lg tracking-tight">MATCH SETUP</p>
    <div className="mt-3 space-y-2">
      <div className="rounded-lg bg-white/5 border border-white/10 px-3 py-2">
        <p className="font-mono2 text-[8px] tracking-widest text-white/40">TEAM A</p>
        <p className="font-body text-xs font-bold">Martín / López</p>
      </div>
      <div className="rounded-lg bg-white/5 border border-white/10 px-3 py-2">
        <p className="font-mono2 text-[8px] tracking-widest text-white/40">TEAM B</p>
        <p className="font-body text-xs font-bold">Rios / Vega</p>
      </div>
    </div>
    <p className="mt-3 font-mono2 text-[8px] tracking-widest text-white/40">FORMAT</p>
    <div className="mt-1.5 flex flex-wrap gap-1.5">
      {["1 Set", "Race to 4", "Race to 5", "Golden Point"].map((f, i) => (
        <span key={f} className={`rounded-full px-2.5 py-1 font-mono2 text-[8px] tracking-wider ${i === 0 ? "bg-court-pink text-white font-bold" : "bg-white/10 text-white/70"}`}>
          {f}
        </span>
      ))}
    </div>
    <p className="mt-3 font-mono2 text-[8px] tracking-widest text-white/40">FIRST SERVER</p>
    <div className="mt-1.5 rounded-lg bg-white/5 border border-white/10 px-3 py-2 flex justify-between items-center">
      <span className="font-body text-xs font-bold">Martín</span>
      <span className="w-2 h-2 rounded-full bg-court-cyan" />
    </div>
    <div className="mt-auto rounded-full bg-court-cyan py-2.5 text-center">
      <span className="font-display font-black text-xs tracking-widest text-navy">START MATCH</span>
    </div>
  </div>
);

const StatsScreen = () => (
  <div className="flex flex-col h-full p-4 pt-8 text-white">
    <p className="font-display font-black text-lg tracking-tight">STATISTICS</p>
    <p className="font-mono2 text-[8px] tracking-widest text-white/40 mt-0.5">SET 1 · LIVE</p>
    <div className="mt-4 space-y-3.5">
      {[
        ["1st Serve %", "72%", "58%", "bg-court-cyan"],
        ["Winners", "9", "6", "bg-court-win"],
        ["Errors", "5", "11", "bg-court-warn"],
        ["Return Points", "44%", "31%", "bg-court-pink"],
      ].map(([label, a, b, color]) => (
        <div key={label}>
          <div className="flex justify-between font-mono2 text-[8px] text-white/60 mb-1">
            <span>{a}</span><span className="tracking-widest text-white/40">{label.toUpperCase()}</span><span>{b}</span>
          </div>
          <div className="flex gap-1">
            <div className="flex-1"><Bar w={a.includes("%") ? a : `${parseInt(a) * 8}%`} color={color} /></div>
            <div className="flex-1 rotate-180"><Bar w={b.includes("%") ? b : `${parseInt(b) * 8}%`} color="bg-white/30" /></div>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-auto grid grid-cols-2 gap-2">
      <div className="rounded-lg bg-white/5 border border-white/10 p-2.5 text-center">
        <p className="font-display font-black text-xl text-court-cyan">14</p>
        <p className="font-mono2 text-[7px] tracking-widest text-white/40">TOTAL POINTS WON</p>
      </div>
      <div className="rounded-lg bg-white/5 border border-white/10 p-2.5 text-center">
        <p className="font-display font-black text-xl text-court-pink">3</p>
        <p className="font-mono2 text-[7px] tracking-widest text-white/40">ACES</p>
      </div>
    </div>
  </div>
);

const SummaryScreen = () => (
  <div className="flex flex-col h-full p-4 pt-8 text-white">
    <p className="font-display font-black text-lg tracking-tight">MATCH SUMMARY</p>
    <div className="mt-3 rounded-xl bg-white/5 border border-white/10 p-3 text-center">
      <p className="font-mono2 text-[8px] tracking-widest text-court-win">FINAL · TEAM A WINS</p>
      <p className="font-display font-black text-3xl mt-1">6 — 4</p>
      <p className="font-mono2 text-[8px] text-white/40 mt-1">MARTÍN/LÓPEZ vs RIOS/VEGA</p>
    </div>
    <div className="mt-3 space-y-2">
      {[
        ["Winners", "14 — 9", "text-court-win"],
        ["Unforced Errors", "8 — 15", "text-court-warn"],
        ["1st Serve %", "74% — 61%", "text-court-cyan"],
        ["Break Points", "2/3 — 0/1", "text-court-focus"],
      ].map(([k, v, c]) => (
        <div key={k} className="flex justify-between items-center rounded-lg bg-white/5 px-3 py-2">
          <span className="font-body text-[11px] text-white/70">{k}</span>
          <span className={`font-mono2 text-[10px] font-bold ${c}`}>{v}</span>
        </div>
      ))}
    </div>
    <div className="mt-auto rounded-full border border-white/20 py-2.5 text-center">
      <span className="font-display font-bold text-xs tracking-widest text-white/80">FULL REPORT</span>
    </div>
  </div>
);

const HistoryScreen = () => (
  <div className="flex flex-col h-full p-4 pt-8 text-white">
    <p className="font-display font-black text-lg tracking-tight">MATCH HISTORY</p>
    <div className="mt-3 space-y-2">
      {[
        ["6–4 · W", "vs Rios/Vega", "Today", "text-court-win"],
        ["3–5 · L", "vs Sola/Paz", "Tue", "text-court-warn"],
        ["5–2 · W", "vs Kim/Ortiz", "Sun", "text-court-win"],
        ["4–4 · D", "vs Ruiz/Mora", "Jun 28", "text-court-focus"],
        ["5–1 · W", "vs Sola/Paz", "Jun 21", "text-court-win"],
      ].map(([score, opp, date, c]) => (
        <div key={opp + date} className="flex items-center justify-between rounded-lg bg-white/5 border border-white/10 px-3 py-2.5">
          <div>
            <p className={`font-display font-black text-sm ${c}`}>{score}</p>
            <p className="font-body text-[10px] text-white/50">{opp}</p>
          </div>
          <span className="font-mono2 text-[8px] tracking-widest text-white/40">{date.toUpperCase()}</span>
        </div>
      ))}
    </div>
    <p className="mt-auto text-center font-mono2 text-[8px] tracking-widest text-white/30">FREE · 5/5 ENTRIES</p>
  </div>
);

const SCREENS = { live: LiveScreen, setup: SetupScreen, stats: StatsScreen, summary: SummaryScreen, history: HistoryScreen };

export const PhoneMockup = ({ screen = "live", className = "", glow = true }) => {
  const Screen = SCREENS[screen] || LiveScreen;
  return (
    <div className={`relative ${className}`} data-testid={`phone-mockup-${screen}`}>
      {glow && (
        <div className="absolute -inset-6 rounded-[4rem] bg-court-cyan/10 blur-2xl" aria-hidden="true" />
      )}
      <div className="relative w-[240px] sm:w-[270px] aspect-[9/19] rounded-[2.6rem] border-[6px] border-[#1c2440] bg-navy shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden">
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#1c2440] rounded-full z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-2 to-navy" />
        <div className="relative h-full">
          <Screen />
        </div>
      </div>
    </div>
  );
};
