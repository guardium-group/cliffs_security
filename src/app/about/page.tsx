import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbHero } from "@/components/breadcrumb-hero";
import { ServiceAreas } from "@/components/service-areas";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Users, GraduationCap, Handshake } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig, SHOW_TESTIMONIALS } from "@/lib/site";
import { services } from "@/lib/services";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { Testimonials } from "@/components/testimonials";
import { BlogPreview } from "@/components/blog-preview";
import { CTACarousel } from "@/components/cta-carousel";

export const metadata: Metadata = pageMetadata({
  title: "About Cliffs Security | Licensed Edmonton Security Company",
  absoluteTitle: true,
  description:
    "Cliffs Security is a licensed Edmonton security company, part of the Guardium Group of Companies, providing guards, patrols, event security and monitoring.",
  path: "/about",
});

const stats = [
  { value: "24/7", label: "Security Dispatch" },
  { value: String(services.length), label: "Security Services" },
  { value: String(siteConfig.serviceArea.length), label: "Communities Served" },
  { value: "AB", label: "Licensed Officers" },
];

const values = [
  {
    icon: Users,
    title: "Community centric",
    description:
      "We protect the places where people live, work and gather, and we treat every site as part of a community.",
  },
  {
    icon: GraduationCap,
    title: "Investing in our people",
    description:
      "Licensed, trained officers with First Aid and CPR/AED, supported by supervisors and clear post orders.",
  },
  {
    icon: Handshake,
    title: "Commitment to our clients",
    description:
      "Clear communication, regular reports and a team that answers the phone when you need it.",
  },
  {
    icon: ShieldCheck,
    title: "Opportunity diversification",
    description:
      "Guards, patrols, events, hazard watches and technology, so every client gets coverage that fits.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: siteConfig.url },
          { name: "About", url: `${siteConfig.url}/about` },
        ])}
      />
      <BreadcrumbHero
        title="About Cliffs Security"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />

      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              Our Story
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-ink leading-tight tracking-tight text-balance mb-6">
              Security that shows up and{" "}
              <span className="text-primary">reports back</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Cliffs Security protects construction sites, office towers,
                condominiums, retail stores, industrial yards and events across
                Edmonton and the Capital Region. Our work is practical: put the
                right officer in the right place, check what needs checking, and
                tell you exactly what happened.
              </p>
              <p>
                As a licensed security company in Edmonton, we provide security
                guards, mobile patrol security, event security, fire, flood and
                gas watch, executive protection, and remote video monitoring
                with access control. Many clients use a mix of all of these,
                sized to their risk and budget.
              </p>
              <p>
                Cliffs Security is part of the {siteConfig.owner}, alongside
                Cliffs Towing and Guardium Security. Dispatch can be reached any
                time at {siteConfig.phone.display}.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-primary">
        <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl sm:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
          <div className="text-center mb-10 sm:mb-14">
            <Badge variant="secondary" className="mb-4">
              Our Standards
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-ink leading-tight tracking-tight text-balance mb-4">
              What We <span className="text-primary">Stand For</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-brand-ink mb-2">{value.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceAreas />
      {SHOW_TESTIMONIALS && <Testimonials />}
      <BlogPreview   />
      <CTACarousel />
    </>
  );
}
