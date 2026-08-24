import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/config";

export const StoreButtons = ({ className = "" }) => (
  <div className={`flex flex-col sm:flex-row gap-3 ${className}`} data-testid="store-buttons">
    <a
      href={APP_STORE_URL}
      data-testid="app-store-btn"
      aria-label="Available on the App Store"
      className="transition-transform duration-300 hover:scale-[1.04]"
    >
      <img src="/badge-appstore.png" alt="Available on the App Store" className="h-[54px] w-auto max-w-full" />
    </a>
    <a
      href={GOOGLE_PLAY_URL}
      data-testid="google-play-btn"
      aria-label="Get it on Google Play"
      className="transition-transform duration-300 hover:scale-[1.04]"
    >
      <img src="/badge-googleplay.png" alt="Get it on Google Play" className="h-[54px] w-auto max-w-full" />
    </a>
  </div>
);
