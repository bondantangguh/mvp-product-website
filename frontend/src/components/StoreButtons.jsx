import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/config";

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8.98-.2 1.92-.86 3.24-.77 1.58.13 2.77.75 3.55 1.9-3.27 1.96-2.5 6.27.53 7.5-.6 1.57-1.37 3.13-2.4 3.54M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25" />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
    <path d="M3.6 2.3c-.34.36-.53.86-.53 1.5v16.4c0 .64.2 1.14.54 1.5l.08.07 9.2-9.2v-.16L3.68 2.23l-.08.07m12.24 9.03-2.7-2.7 3.44-1.98c.78.45 2.33 1.34 2.8 1.6.8.46.8 1.2 0 1.66l-3.54 1.42m-.68.68-3.1 3.1-8.35 4.82 11.45-7.92m-11.45-9.9 8.35 4.8 3.1-3.1L3.71 2.1" />
  </svg>
);

export const StoreButtons = ({ variant = "dark", className = "" }) => {
  const base =
    variant === "dark"
      ? "bg-white text-navy hover:bg-court-cyan"
      : "bg-navy text-white hover:bg-navy-2";
  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`} data-testid="store-buttons">
      <a
        href={APP_STORE_URL}
        data-testid="app-store-btn"
        className={`inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 font-display font-bold text-sm tracking-wide transition-colors duration-300 ${base}`}
      >
        <AppleIcon />
        <span className="text-left leading-tight">
          <span className="block text-[10px] font-body font-medium opacity-70 uppercase tracking-wider">Download on the</span>
          App Store
        </span>
      </a>
      <a
        href={GOOGLE_PLAY_URL}
        data-testid="google-play-btn"
        className={`inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 font-display font-bold text-sm tracking-wide transition-colors duration-300 ${base}`}
      >
        <PlayIcon />
        <span className="text-left leading-tight">
          <span className="block text-[10px] font-body font-medium opacity-70 uppercase tracking-wider">Get it on</span>
          Google Play
        </span>
      </a>
    </div>
  );
};
