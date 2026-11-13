import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { BreadcrumbHero } from "@/components/breadcrumb-hero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy",
  description:
    "Cookie policy for the Cliffs Security website, including essential storage, analytics, maps and embedded services.",
  path: "/cookies",
});

export default function CookiePolicyPage() {
  return (
    <>
      <BreadcrumbHero
        title="Cookie Policy"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cookie Policy" },
        ]}
      />
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-5 sm:px-6 max-w-3xl">
          <div className="space-y-8 text-gray-600 leading-relaxed">
            <p className="text-gray-500">Last updated: October 29, 2026</p>

            <div>
              <h2 className="text-2xl font-bold text-brand-ink mb-3">
                How Cookies Are Used
              </h2>
              <p>
                This website may use essential cookies or similar browser
                storage to keep forms secure, reduce spam, improve reliability,
                and remember basic preferences, including your cookie choice.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-brand-ink mb-3">
                Analytics Cookies
              </h2>
              <p>
                If you click &ldquo;Accept All&rdquo; in the cookie banner, we
                load Google Analytics 4 to understand how visitors find and use
                the site, for example which pages are viewed and whether people
                call us or send the contact form. Google Analytics sets the{" "}
                <code>_ga</code> and <code>_ga_*</code> cookies, which last up
                to two years. Google Analytics is not loaded unless you accept,
                and we do not send your name, email, phone number, or message to
                Google.
              </p>
              <p className="mt-3">
                We also use Vercel Web Analytics, which counts page views in
                aggregate without setting cookies.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-brand-ink mb-3">
                Embedded Services
              </h2>
              <p>
                Some pages embed third-party content: a Google Maps map on the
                contact page and an OpenStreetMap service-area map. These load
                when you open the
                page, whether or not you accept analytics cookies, and the
                providers may set their own cookies or collect technical
                information such as your IP address under their own policies.
              </p>
              <p className="mt-3">
                The contact form uses Cloudflare Turnstile to check that
                submissions come from a person. Turnstile reads technical
                signals from your browser to do this and is needed for the form
                to work.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-brand-ink mb-3">
                Managing Cookies
              </h2>
              <p>
                You can change your choice at any time with the &ldquo;Cookie
                settings&rdquo; link in the website footer. If you withdraw
                consent, Google Analytics stops collecting data and its cookies
                are removed. You can also block or delete cookies through your
                browser settings. Some embedded features may not work as
                expected if cookies are disabled.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-brand-ink mb-3">
                Contact
              </h2>
              <p>
                Questions about this cookie policy can be sent to{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-primary">
                  {siteConfig.email}
                </a>
                . See our{" "}
                <Link href="/privacy-policy" className="text-primary">
                  Privacy Policy
                </Link>{" "}
                for how we handle personal information.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
