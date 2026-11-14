import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Phone, Check } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { services, getService } from "@/lib/services";
import { serviceAreas } from "@/lib/service-areas";
import { blogPosts } from "@/lib/blog";
import { siteConfig, SHOW_TESTIMONIALS } from "@/lib/site";
import { RichText } from "@/components/rich-text";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { breadcrumbJsonLd, serviceJsonLd, faqJsonLd } from "@/lib/structured-data";
import { ServiceAreas } from "@/components/service-areas";
import { Testimonials } from "@/components/testimonials";
import { CTACarousel } from "@/components/cta-carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return { title: "Service not found", robots: { index: false, follow: false } };
  }

  return pageMetadata({
    title: service.title,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    image: service.heroImage,
    imageAlt: service.heroImageAlt,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const relatedServices = services.filter((s) => service.relatedSlugs.includes(s.slug));
  const relatedGuides = blogPosts
    .filter((p) => p.relatedService?.href === `/services/${service.slug}`)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 4);
  const cityLinks = serviceAreas.map((area) => ({
    label: area.name,
    href: `/service-areas#${area.slug}`,
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: siteConfig.url },
          { name: "Services", url: `${siteConfig.url}/services` },
          { name: service.title, url: `${siteConfig.url}/services/${service.slug}` },
        ])}
      />
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd data={faqJsonLd(service.faqs)} />

      <article className="bg-white">
        {/* Hero header */}
        <header className="relative overflow-hidden bg-brand-dark pt-36 sm:pt-40 pb-16 sm:pb-20 text-white">
          <div className="absolute inset-0 opacity-35" aria-hidden="true">
            <Image
              src={service.heroImage}
              alt={service.heroImageAlt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-br from-brand-dark via-brand-dark/70 to-brand-dark/30" />
          </div>

          <div className="relative z-10 container mx-auto px-5 sm:px-6 max-w-7xl">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              All services
            </Link>

            <div className="flex flex-wrap items-center gap-3 border-l border-primary pl-3 text-xs font-mono uppercase tracking-[0.16em] text-white/70 mb-5">
              <span className="text-white">{service.name}</span>
              <span>·</span>
              <span>Edmonton &amp; area</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-balance max-w-4xl mb-6">
              {service.title}
            </h1>
            <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-3xl mb-8">
              {service.intro}
            </p>

            <a
              href={siteConfig.phone.href}
              className={buttonVariants({ className: "gap-2" })}
            >
              <Phone className="h-4 w-4" />
              {siteConfig.phone.display}
            </a>
          </div>
        </header>

        {/* Content */}
        <div className="container mx-auto px-5 sm:px-6 max-w-7xl py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

            {/* Main content */}
            <div className="lg:col-span-8">
              <div className="space-y-12">
                {service.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink tracking-tight mb-4 text-balance">
                      {section.heading}
                    </h2>
                    <div className="space-y-4 text-gray-600 leading-relaxed text-base sm:text-lg max-w-[68ch]">
                      {section.body.map((paragraph, i) => (
                        <p key={i}>
                          <RichText text={paragraph} />
                        </p>
                      ))}
                    </div>
                    {section.list && (
                      <ul className="mt-6 space-y-2.5 max-w-2xl">
                        {section.list.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                              <Check className="h-3 w-3 text-primary" strokeWidth={2.5} />
                            </span>
                            <span className="text-gray-600 text-sm sm:text-base leading-relaxed">
                              <RichText text={item} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}

                {/* FAQs */}
                <section>
                  <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink tracking-tight mb-6">
                    Frequently asked questions
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                    {service.faqs.map((faq, i) => (
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

                {/* City links */}
                <section>
                  <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink tracking-tight mb-6">
                    {service.name} near you
                  </h2>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-1">
                    {cityLinks.map((city) => (
                      <li key={city.href}>
                        <Link
                          href={city.href}
                          className="flex items-center gap-2 py-2 text-sm text-gray-700 hover:text-primary transition-colors group"
                        >
                          <ArrowRight className="h-3.5 w-3.5 text-gray-300 group-hover:text-primary transition-colors flex-shrink-0" />
                          {city.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-32 space-y-4">

                {/* Phone CTA */}
                <div className="rounded-2xl bg-brand-dark text-white p-6 sm:p-7">
                  <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/70 mb-3">
                    24/7 Dispatch
                  </p>
                  <p className="text-white/70 leading-relaxed mb-5 text-sm">
                    Need coverage now? Our dispatch team answers every call, day or night.
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

                {/* Related services */}
                {relatedServices.length > 0 && (
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-6">
                    <p className="text-xs font-mono uppercase tracking-[0.16em] text-gray-400 mb-4">
                      Related services
                    </p>
                    <ul className="space-y-1">
                      {relatedServices.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            className="flex items-center gap-2 py-2 text-sm text-gray-700 hover:text-primary transition-colors group"
                          >
                            <ArrowRight className="h-3.5 w-3.5 text-gray-300 group-hover:text-primary transition-colors flex-shrink-0" />
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Related guides */}
                {relatedGuides.length > 0 && (
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-6">
                    <p className="text-xs font-mono uppercase tracking-[0.16em] text-gray-400 mb-4">
                      Related guides
                    </p>
                    <ul className="space-y-1">
                      {relatedGuides.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/blog/${p.slug}`}
                            className="flex items-start gap-2 py-2 text-sm text-gray-700 hover:text-primary transition-colors group"
                          >
                            <ArrowRight className="h-3.5 w-3.5 mt-0.5 text-gray-300 group-hover:text-primary transition-colors flex-shrink-0" />
                            {p.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            </aside>
          </div>
        </div>
      </article>

      <ServiceAreas />
      {SHOW_TESTIMONIALS && <Testimonials />}
      <CTACarousel />
    </>
  );
}
