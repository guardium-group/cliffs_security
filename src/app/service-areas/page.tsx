import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceAreas } from "@/lib/service-areas";
import { siteConfig, SHOW_TESTIMONIALS } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { RichText } from "@/components/rich-text";
import { services } from "@/lib/services";
import { CTACarousel } from "@/components/cta-carousel";
import { Testimonials } from "@/components/testimonials";

export const metadata: Metadata = pageMetadata({
  title: "Edmonton-Area Security Service Areas",
  description:
    "Security services across the Edmonton area: Sherwood Park, St. Albert, Spruce Grove, Leduc, Fort Saskatchewan and 7 more Capital Region communities.",
  path: "/service-areas",
});

export default function ServiceAreasPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: siteConfig.url },
          { name: "Service Areas", url: `${siteConfig.url}/service-areas` },
        ])}
      />

      <div className="bg-white">
        {/* Hero */}
        <header className="bg-brand-dark pt-36 sm:pt-40 pb-16 sm:pb-20 text-white">
          <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
            <div className="flex flex-wrap items-center gap-3 border-l border-primary pl-3 text-xs font-mono uppercase tracking-[0.16em] text-white/70 mb-5">
              <span className="text-white flex items-center gap-1.5">
                <MapPin className="h-3 w-3" />
                Alberta
              </span>
              <span>·</span>
              <span>Greater Edmonton Region</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-balance max-w-7xl mb-4">
              Security service areas we cover
            </h1>
            <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-3xl mb-6">
              Cliffs Security protects properties and events in Edmonton and 11 surrounding Capital Region communities, with dispatch available 24/7. Explore the communities, properties and districts we cover below.
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

        <div className="container mx-auto px-5 sm:px-6 max-w-7xl py-16 sm:py-24">
          <nav aria-label="Jump to a community" className="mb-12">
            <h2 className="text-2xl font-bold text-brand-ink mb-5">Communities we serve</h2>
            <div className="flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <a key={area.slug} href={`#${area.slug}`} className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:border-primary hover:text-primary">
                  {area.name}
                </a>
              ))}
            </div>
          </nav>
          <div className="grid gap-6 lg:grid-cols-2">
            {serviceAreas.map((area) => (
              <section key={area.slug} id={area.slug} className="scroll-mt-32 rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-brand-ink mb-3">{area.name}</h2>
                <p className="text-gray-600 leading-relaxed">{area.intro}</p>
                <p className="mt-4 text-sm font-semibold text-brand-ink">{area.coverage}</p>
                <h3 className="mt-6 font-semibold text-brand-ink">Properties we protect</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
                  {area.propertyTypes.map((type) => <li key={type}>{type}</li>)}
                </ul>
                {area.keyDistricts.length > 0 && <>
                  <h3 className="mt-5 font-semibold text-brand-ink">Areas we cover</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
                    {area.keyDistricts.map((district) => <li key={district}>{district}</li>)}
                  </ul>
                </>}
                {area.sections?.map((section) => (
                  <div key={section.heading} className="mt-5">
                    <h3 className="font-semibold text-brand-ink">{section.heading}</h3>
                    {section.body.map((paragraph) => <p key={paragraph} className="mt-2 text-sm leading-relaxed text-gray-600"><RichText text={paragraph} /></p>)}
                  </div>
                ))}
              </section>
            ))}
          </div>
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-brand-ink mb-4">Security services across the region</h2>
            <div className="flex flex-wrap gap-3">
              {services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`} className="rounded-full border border-gray-200 px-4 py-2 text-sm text-brand-ink hover:border-primary hover:text-primary">{service.name}</Link>)}
            </div>
            <p className="mt-6 text-gray-600">Need help choosing coverage? <Link href="/contact" className="text-brand-link underline underline-offset-4">Contact us for a quote.</Link></p>
          </section>
        </div>
      </div>
      
      {SHOW_TESTIMONIALS && <Testimonials />}
      <CTACarousel />
    </>
  );
}
