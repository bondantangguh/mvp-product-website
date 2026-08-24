export const PhoneFrame = ({ src, alt, className = "", glow = true, eager = false }) => (
  <div className={`relative ${className}`} data-testid={`phone-frame-${alt ? alt.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "shot"}`}>
    {glow && (
      <div className="absolute -inset-6 rounded-[4rem] bg-court-cyan/10 blur-2xl" aria-hidden="true" />
    )}
    {/* Titanium body */}
    <div className="relative w-[240px] sm:w-[270px] aspect-[923/2000] rounded-[3rem] bg-gradient-to-b from-[#4a4f5c] via-[#1e2129] to-[#3d424e] p-[6px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.25)]">
      {/* Side buttons */}
      <div className="absolute -left-[2.5px] top-[104px] w-[3px] h-[26px] rounded-l-md bg-[#2a2e38]" aria-hidden="true" />
      <div className="absolute -left-[2.5px] top-[150px] w-[3px] h-[44px] rounded-l-md bg-[#2a2e38]" aria-hidden="true" />
      <div className="absolute -left-[2.5px] top-[204px] w-[3px] h-[44px] rounded-l-md bg-[#2a2e38]" aria-hidden="true" />
      <div className="absolute -right-[2.5px] top-[168px] w-[3px] h-[64px] rounded-r-md bg-[#2a2e38]" aria-hidden="true" />
      {/* Screen */}
      <div className="relative h-full w-full rounded-[2.55rem] overflow-hidden bg-black ring-1 ring-black">
        <div className="h-full w-full bg-white p-[10px]">
          <img
            src={src}
            alt={alt}
            loading={eager ? "eager" : "lazy"}
            className="h-full w-full object-cover rounded-[1.55rem]"
          />
        </div>
        {/* Dynamic Island */}
        <div className="absolute top-[17px] left-1/2 -translate-x-1/2 w-[70px] h-[19px] bg-black rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.9)]" aria-hidden="true" />
        {/* Subtle glass sheen */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent pointer-events-none" aria-hidden="true" />
      </div>
    </div>
  </div>
);
