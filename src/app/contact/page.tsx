import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbHero } from "@/components/breadcrumb-hero";
import { ContactPageContent } from "@/components/contact-page-content";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig, SHOW_TESTIMONIALS } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { CTACarousel } from "@/components/cta-carousel";
import { ServiceAreas } from "@/components/service-areas";
import { ServiceFAQ } from "@/components/service-faq";
import { Testimonials } from "@/components/testimonials";

export const metadata: Metadata = pageMetadata({
  title: "Get a Security Quote in Edmonton | Cliffs Security",
  absoluteTitle: true,
  description:
    "Get a free security quote in Edmonton or call 24/7 dispatch for security guards, mobile patrols, event security, fire watch and video monitoring.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: siteConfig.url },
          { name: "Contact", url: `${siteConfig.url}/contact` },
        ])}
      />
      <BreadcrumbHero
        title="Contact Our Edmonton Security Team"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
      />
      <ContactPageContent />
      <ServiceAreas />
      <ServiceFAQ />
      {SHOW_TESTIMONIALS && <Testimonials />}
      <CTACarousel />
    </>
  );
}
