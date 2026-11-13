import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { HomeHero } from "@/components/home-hero";
import { ServicesSection } from "@/components/services-section";
import { WhyChooseUs } from "@/components/why-choose-us";
import { ServiceSpotlights } from "@/components/service-spotlights";
import { OurStandards } from "@/components/our-standards";
import { HowItWorks } from "@/components/how-it-works";
import { ServiceFAQ } from "@/components/service-faq";
import { CTACarousel } from "@/components/cta-carousel";
import { ServiceAreas } from "@/components/service-areas";
import { BlogPreview } from "@/components/blog-preview";
import { Testimonials } from "@/components/testimonials";
import { SHOW_TESTIMONIALS } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  title: "Security Company in Edmonton | Cliffs Security",
  absoluteTitle: true,
  description:
    "Cliffs Security is a licensed security company in Edmonton offering security guards, mobile patrols, event security, fire watch and video monitoring.",
  path: "/",
});

const heroSlides = [
  {
    image: "/images/security/hero-team.webp",
    title: "Protecting what",
    highlight: "matters most.",
    description:
      "Security guards, mobile patrols, event security and remote video monitoring for businesses, property managers and event organizers across Edmonton and the Capital Region.",
  },
  {
    image: "/images/security/mobile-patrol.webp",
    title: "Patrols that keep",
    highlight: "your site seen to.",
    description:
      "Marked patrol vehicles, alarm response and daily reports, so your property is checked all night long, not just once.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <HomeHero slides={heroSlides} />
      <ServicesSection limit={4} />
      <WhyChooseUs />
      <ServiceSpotlights limit={3} />
      <OurStandards />
      <ServiceAreas />
      <HowItWorks />
      <ServiceFAQ />
      {SHOW_TESTIMONIALS && <Testimonials />}
      <BlogPreview />
      <CTACarousel />
    </>
  );
}
