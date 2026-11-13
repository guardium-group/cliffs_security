import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Phone, MapPin, ShieldCheck, Building2 } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceAreas, getArea } from "@/lib/service-areas";
import { services } from "@/lib/services";
import { siteConfig, SHOW_TESTIMONIALS } from "@/lib/site";
import { RichText } from "@/components/rich-text";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { breadcrumbJsonLd, cityServiceJsonLd, faqJsonLd } from "@/lib/structured-data";
import { Testimonials } from "@/components/testimonials";
import { CTACarousel } from "@/components/cta-carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type AreaPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return serviceAreas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = getArea(slug);

  if (!area) {
    return { title: "Area not found", robots: { index: false, follow: false } };
  }

  // Keep the full title (with " | Cliffs Security") at 60 characters or fewer.
  const longTitle = `Security Guards & Patrols in ${area.name}`;
  const title = longTitle.length <= 42 ? longTitle : `Security Guards in ${area.name}`;

  return pageMetadata({
    title,
    description: area.metaDescription,
    path: `/service-areas/${area.slug}`,
  });
}

export default async function ServiceAreaPage({ params }: AreaPageProps) {
  const { slug } = await params;
  const area = getArea(slug);

  if (!area) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: siteConfig.url },
          { name: "Service Areas", url: `${siteConfig.url}/service-areas` },
          { name: area.name, url: `${siteConfig.url}/service-areas/${area.slug}` },
        ])}
      />
      <JsonLd data={cityServiceJsonLd({ name: area.name, slug: area.slug, description: area.metaDescription })} />
      <JsonLd data={faqJsonLd(area.faqs)} />

      <article className="bg-white">
        {/* Hero header */}
        <header className="relative overflow-hidden bg-brand-dark pt-36 sm:pt-40 pb-16 sm:pb-20 text-white">
          <div className="absolute inset-0 opacity-30" aria-hidden="true">
            <Image
              src="/images/security/hero-team.webp"
              alt=""
              fill
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-br from-brand-dark via-brand-dark/75 to-brand-dark/40" />
          </div>

          <div className="relative z-10 container mx-auto px-5 sm:px-6 max-w-7xl">
            <Link
              href="/service-areas"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Service areas
            </Link>

            <div className="flex flex-wrap items-center gap-3 border-l border-primary pl-3 text-xs font-mono uppercase tracking-[0.16em] text-white/70 mb-5">
              <span className="text-white flex items-center gap-1.5">
                <MapPin className="h-3 w-3" />
                {area.name}
              </span>
              <span>·</span>
              <span>Alberta</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-balance max-w-7xl mb-4">
              Security Services in {area.name}
            </h1>
            <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-3xl mb-8">
              {area.intro}
            </p>

            <a
              href={siteConfig.phone.href}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.phone.display}
            </a>
          </div>
        </header>

        {/* Key facts bar */}
        <div className="bg-brand-dark text-white">
          <div className="container mx-auto px-5 sm:px-6 max-w-7xl py-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-primary-on-dark flex-shrink-0" />
                <div>
                  <p className="text-white/60 text-xs font-mono uppercase tracking-wide">Coverage</p>
                  <p className="font-semibold">{area.coverage}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary-on-dark flex-shrink-0" />
                <div>
                  <p className="text-white/60 text-xs font-mono uppercase tracking-wide">Dispatch</p>
                  <p className="font-semibold">24/7 — {siteConfig.phone.compact}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="h-4 w-4 text-primary-on-dark flex-shrink-0" />
                <div>
                  <p className="text-white/60 text-xs font-mono uppercase tracking-wide">Property types</p>
                  <p className="font-semibold">{area.propertyTypes.length} types protected in {area.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-5 sm:px-6 max-w-7xl py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

            {/* Main content */}
            <div className="lg:col-span-8 space-y-12">

              {/* Routes we cover */}
              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink tracking-tight mb-4">
                  Properties we protect in {area.name}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-5">
                  Our officers and patrols cover a wide range of properties in and around {area.name}, including:
                </p>
                <ul className="space-y-2">
                  {area.propertyTypes.map((type) => (
                    <li key={type} className="flex items-center gap-3 text-gray-700 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {type}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Landmarks */}
              {area.keyDistricts.length > 0 && (
                <section>
                  <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink tracking-tight mb-4">
                    Areas we cover in {area.name}
                  </h2>
                  <ul className="space-y-2">
                    {area.keyDistricts.map((landmark) => (
                      <li key={landmark} className="flex items-center gap-3 text-gray-700 text-sm">
                        <MapPin className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                        {landmark}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* City-specific sections */}
              {area.sections?.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink tracking-tight mb-4">
                    {section.heading}
                  </h2>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>
                        <RichText text={paragraph} />
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              {/* Service links */}
              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink tracking-tight mb-4">
                  Services available in {area.name}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  All of our services are available across {area.name} and the surrounding area.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.map((s) => ({ label: s.name, slug: s.slug })).map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-primary/30 hover:bg-white hover:shadow-sm transition-all duration-200 group"
                    >
                      <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-primary transition-colors flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-brand-ink">{s.label}</span>
                    </Link>
                  ))}
                </div>
              </section>

              {/* FAQs */}
              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink tracking-tight mb-6">
                  Frequently asked questions about security in {area.name}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {area.faqs.map((faq, i) => (
                    <AccordionItem key={faq.q} value={`faq-${i}`}>
                      <AccordionTrigger className="text-base text-left">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 leading-relaxed">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-32 space-y-4">
                <div className="rounded-2xl bg-brand-dark text-white p-6 sm:p-7">
                  <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/70 mb-3">
                    {area.name} security dispatch
                  </p>
                  <p className="text-white/70 text-sm leading-relaxed mb-5">
                    Need security in {area.name}? Call dispatch 24/7 to arrange guards, patrols or a free site assessment.
                  </p>
                  <a
                    href={siteConfig.phone.href}
                    className={cn(buttonVariants({ size: "lg" }), "w-full gap-2 rounded-full px-5 text-sm")}
                  >
                    <Phone className="h-4 w-4" />
                    {siteConfig.phone.display}
                  </a>
                  <Link
                    href="/contact"
                    className={cn(buttonVariants({ variant: "inverse", size: "lg" }), "w-full gap-2 rounded-full px-5 text-sm mt-3")}
                  >
                    Get a free quote
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5">
                  <p className="text-xs font-mono uppercase tracking-[0.16em] text-gray-400 mb-3">
                    Other areas we serve
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {serviceAreas
                      .filter((a) => a.slug !== area.slug)
                      .map((a) => (
                        <Link
                          key={a.slug}
                          href={`/service-areas/${a.slug}`}
                          className="text-xs font-mono text-gray-500 bg-white border border-gray-200 hover:border-primary/40 hover:text-brand-ink rounded-full px-3.5 py-2.5 transition-colors duration-200"
                        >
                          {a.name}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* <ServicesSection limit={4} /> */}
      {SHOW_TESTIMONIALS && <Testimonials />}
      <CTACarousel />
    </>
  );
}
