import { Reveal, ChapterLabel } from "@/components/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  ["What is MVP?", "MVP is a live Padel match tracking and statistics application. It replaces pen-and-paper stat sheets with fast, one-tap digital tracking."],
  ["Who is it for?", "Coaches, players, team captains, and match observers — anyone who needs to record what happens on court without missing the rally."],
  ["Is MVP free?", "Yes. The current public version includes a free tier with core live tracking, basic statistics, and match summary."],
  ["What is Beta Tester access?", "Beta Testers receive temporary access to Pro features for one month, and help shape the product with real match feedback."],
  ["How do I become a Beta Tester?", "Register your email through the Beta Tester form on this page. We'll contact you with instructions for accessing MVP Beta features."],
  ["Is Tennis supported?", "Not yet. The current MVP release focuses on Padel."],
  ["What happens after Beta?", "Pro features will eventually become part of the paid version of MVP."],
  ["Will MVP support advanced analytics?", "Yes. Advanced analytics are part of the long-term product roadmap."],
];

export const Faq = () => (
  <section id="faq" className="relative bg-white py-24 sm:py-32" data-testid="faq-section">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-12">
      <div className="lg:col-span-4">
        <ChapterLabel number="09" title="FAQ" />
        <Reveal>
          <h2 className="font-display font-black uppercase tracking-tight leading-[0.95] text-4xl sm:text-5xl text-navy" data-testid="faq-headline">
            Quick <span className="text-court-pink">answers.</span>
          </h2>
        </Reveal>
      </div>
      <div className="lg:col-span-8">
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
            {FAQS.map(([q, a], i) => (
              <AccordionItem key={q} value={`item-${i}`} className="border-navy/10">
                <AccordionTrigger
                  data-testid={`faq-q-${i + 1}`}
                  className="font-display font-bold text-lg text-navy text-left hover:text-court-pink hover:no-underline py-5"
                >
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-navy/60 text-base leading-relaxed" data-testid={`faq-a-${i + 1}`}>
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </div>
  </section>
);
