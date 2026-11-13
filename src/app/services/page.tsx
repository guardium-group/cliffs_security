import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbHero } from "@/components/breadcrumb-hero";
import { ServicesSection } from "@/components/services-section";
import { ServiceSpotlights } from "@/components/service-spotlights";
import { HowItWorks } from "@/components/how-it-works";
import { faqs, ServiceFAQ } from "@/components/service-faq";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig, SHOW_TESTIMONIALS } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/structured-data";
import { Testimonials } from "@/components/testimonials";
import { ServiceAreas } from "@/components/service-areas";
import { BlogPreview } from "@/components/blog-preview";
import { CTACarousel } from "@/components/cta-carousel";

export const metadata: Metadata = pageMetadata({
  title: "Security Services in Edmonton",
  description:
    "Security services in Edmonton: licensed security guards, mobile patrols, event security, fire watch, executive protection and remote video monitoring.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: siteConfig.url },
          { name: "Services", url: `${siteConfig.url}/services` },
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      <BreadcrumbHero
        title="Security Services in Edmonton"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      />
      <ServicesSection />
      <ServiceSpotlights />
      <ServiceAreas />
      <HowItWorks />
      <ServiceFAQ />
      {SHOW_TESTIMONIALS && <Testimonials />}
      <BlogPreview />
      <CTACarousel />
    </>
  );
}
