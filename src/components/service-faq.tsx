import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteConfig } from "@/lib/site";

export const faqs = [
  {
    q: "Are your security officers licensed?",
    a: "Yes. Every Cliffs Security officer holds a valid Alberta security services licence and is trained in First Aid and CPR/AED before working on a client site.",
  },
  {
    q: "How quickly can you put a guard on my site?",
    a: `For urgent needs we can often place an officer on short notice once we have the address and the hours you need covered. Call ${siteConfig.phone.display} and we will confirm availability while you are on the phone.`,
  },
  {
    q: "Do I have to sign a long-term contract?",
    a: "No. We provide one-off coverage for a single night or event as well as ongoing contracts. We will recommend what makes sense for your site.",
  },
  {
    q: "What is the difference between a static guard and a mobile patrol?",
    a: "A static guard stays at your site for the full shift. A mobile patrol visits your site several times a night in a marked vehicle and then moves on to other properties. Patrols cost less; static guards give constant presence. Many sites use both.",
  },
  {
    q: "Will I get reports on what happened?",
    a: "Yes. You receive check-in reports and incident logs covering who came and went, what was checked and anything that needed attention.",
  },
  {
    q: "How much do security services cost?",
    a: `It depends on the type of coverage, the hours and the site. After a free site assessment we provide a clear quote. Call ${siteConfig.phone.display} or request a quote online.`,
  },
  {
    q: "Do you provide security for events?",
    a: "Yes. We staff galas, festivals, concerts, corporate functions and private events, including crowd management, access control and liquor licence compliance.",
  },
  {
    q: "Can you combine guards with cameras?",
    a: "Yes. Pairing guards or patrols with monitored CCTV and access control often gives better coverage for less than guards alone.",
  },
];

export function ServiceFAQ() {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-primary mb-4">
              Frequently asked
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-ink leading-tight tracking-tight mb-4 text-balance">
              Questions we hear every week.
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Can&apos;t find your answer? Call security dispatch directly. We
              answer 24/7.
            </p>
            <a
              href={siteConfig.phone.href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4"
            >
              {siteConfig.phone.display}
            </a>
          </div>

          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.q} value={`item-${i}`}>
                  <AccordionTrigger className="text-base">{faq.q}</AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <p className="mt-8 text-xs text-gray-400">
              Still have questions?{" "}
              <Link href="/contact" className="text-brand-link underline underline-offset-4 hover:no-underline">
                Send us a message
              </Link>{" "}
              and we&apos;ll get back to you quickly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
