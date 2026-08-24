import { Nav } from "@/components/Nav";
import { Hero } from "@/sections/Hero";
import { EditorialMarquee } from "@/sections/Marquee";
import { Problem } from "@/sections/Problem";
import { Solution } from "@/sections/Solution";
import { HowItWorks } from "@/sections/HowItWorks";
import { Showcase } from "@/sections/Showcase";
import { Features } from "@/sections/Features";
import { Tiers } from "@/sections/Tiers";
import { Beta } from "@/sections/Beta";
import { Roadmap } from "@/sections/Roadmap";
import { Faq } from "@/sections/Faq";
import { FinalCta } from "@/sections/FinalCta";
import { Footer } from "@/sections/Footer";

export default function Landing() {
  return (
    <main className="bg-navy" data-testid="landing-page">
      <Nav />
      <Hero />
      <EditorialMarquee />
      <Problem />
      <Solution />
      <HowItWorks />
      <Showcase />
      <Features />
      <Tiers />
      <Beta />
      <Roadmap />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}
