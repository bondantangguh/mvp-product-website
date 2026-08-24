import { StoreButtons } from "@/components/StoreButtons";
import { APP_STORE_URL, GOOGLE_PLAY_URL, DONATE_URL } from "@/config";
import { Coffee } from "lucide-react";

const NAV = [
  ["Home", "#top"],
  ["How It Works", "#how-it-works"],
  ["Features", "#features"],
  ["Beta", "#beta"],
  ["Roadmap", "#roadmap"],
  ["FAQ", "#faq"],
];

export const Footer = () => (
  <footer className="bg-[#070D1F] border-t border-white/10 py-16" data-testid="footer">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <img src="/logo-full.webp" alt="MVP — Match Value Projection" className="h-20 w-auto" data-testid="footer-logo" />
          <p className="mt-4 text-sm text-white/50 max-w-xs">
            Padel Match Tracking &amp; Statistics. Turn live Padel matches into useful data.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="font-mono2 text-[10px] tracking-[0.25em] text-white/40 uppercase mb-4">Navigate</p>
          <ul className="space-y-2.5">
            {NAV.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  data-testid={`footer-link-${label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm text-white/65 hover:text-court-cyan transition-colors duration-300"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="font-mono2 text-[10px] tracking-[0.25em] text-white/40 uppercase mb-4">Download</p>
          <ul className="space-y-2.5">
            <li>
              <a href={APP_STORE_URL} data-testid="footer-app-store" className="text-sm text-white/65 hover:text-court-cyan transition-colors duration-300">
                App Store
              </a>
            </li>
            <li>
              <a href={GOOGLE_PLAY_URL} data-testid="footer-google-play" className="text-sm text-white/65 hover:text-court-cyan transition-colors duration-300">
                Google Play
              </a>
            </li>
          </ul>
          <p className="font-mono2 text-[10px] tracking-[0.25em] text-white/40 uppercase mt-8 mb-4">Legal</p>
          <ul className="space-y-2.5">
            <li><a href="#top" data-testid="footer-privacy" className="text-sm text-white/45 hover:text-white/80 transition-colors duration-300">Privacy Policy</a></li>
            <li><a href="#top" data-testid="footer-terms" className="text-sm text-white/45 hover:text-white/80 transition-colors duration-300">Terms of Use</a></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="font-mono2 text-[10px] tracking-[0.25em] text-white/40 uppercase mb-4">Get the app</p>
          <StoreButtons className="!flex-col items-start gap-2" />
        </div>
      </div>
      <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-xs text-white/40">© 2026 MVP — Match Value Projection</p>
        <a
          href={DONATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="footer-donate-link"
          className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-court-pink transition-colors duration-300"
        >
          <Coffee className="w-3.5 h-3.5" />
          Support the Developer
        </a>
      </div>
    </div>
  </footer>
);
