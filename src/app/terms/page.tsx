import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbHero } from "@/components/breadcrumb-hero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "Terms of service for using the Cliffs Security website and requesting security services in Edmonton.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <BreadcrumbHero
        title="Terms of Service"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms of Service" },
        ]}
      />
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-5 sm:px-6 max-w-3xl">
          <div className="space-y-8 text-gray-600 leading-relaxed">
            <p className="text-gray-500">Last updated: May 11, 2026</p>

            <div>
              <h2 className="text-2xl font-bold text-brand-ink mb-3">
                Website Use
              </h2>
              <p>
                This website provides general information about Cliffs
                Security services and ways to contact dispatch. Content may be
                updated without notice.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-brand-ink mb-3">
                Service Requests
              </h2>
              <p>
                Submitting a form does not guarantee immediate service. For
                urgent security needs, call dispatch
                directly at{" "}
                <a href={siteConfig.phone.href} className="text-primary">
                  {siteConfig.phone.display}
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-brand-ink mb-3">
                Pricing and Scope
              </h2>
              <p>
                Quotes and estimates depend on the type of coverage, hours,
                location, number of officers, equipment required, and site
                conditions. Pricing may
                change if the job scope or site conditions differ from the
                information first provided.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-brand-ink mb-3">
                Contact
              </h2>
              <p>
                Questions about these terms can be sent to{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-primary">
                  {siteConfig.email}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
