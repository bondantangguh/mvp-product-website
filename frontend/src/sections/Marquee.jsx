import Marquee from "react-fast-marquee";

const ITEMS = ["RECORD", "ANALYZE", "UNDERSTAND", "IMPROVE", "EVERY POINT COUNTS"];

export const EditorialMarquee = () => (
  <div className="relative bg-court-pink -rotate-1 my-[-8px] z-20 border-y-4 border-navy" data-testid="editorial-marquee">
    <Marquee speed={28} gradient={false} className="py-4 sm:py-5">
      {ITEMS.concat(ITEMS).map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="font-display font-black text-2xl sm:text-4xl tracking-tight text-navy uppercase px-6">
            {item}
          </span>
          <span className="text-navy text-xl sm:text-2xl">✦</span>
        </span>
      ))}
    </Marquee>
  </div>
);
