import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { BreadcrumbHero } from "@/components/breadcrumb-hero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for Cliffs Security contact forms, quote requests and website communications.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbHero
        title="Privacy Policy"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-5 sm:px-6 max-w-3xl">
          <div className="space-y-8 text-gray-600 leading-relaxed">
            <p className="text-gray-500">Last updated: October 29, 2026</p>

            <div>
              <h2 className="text-2xl font-bold text-brand-ink mb-3">
                Who We Are
              </h2>
              <p>
                This website and our security services are operated by{" "}
                {siteConfig.legalName} (&ldquo;{siteConfig.name}&rdquo;,
                &ldquo;we&rdquo;, &ldquo;us&rdquo;), {siteConfig.address.display},
                owned by {siteConfig.owner}. We are responsible for the personal
                information we collect and handle it in line with Alberta&rsquo;s
                Personal Information Protection Act (PIPA) and, where it
                applies, the federal Personal Information Protection and
                Electronic Documents Act (PIPEDA).
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-brand-ink mb-3">
                Information We Collect
              </h2>
              <p>
                When you use our contact form, call dispatch, or email us, we
                may collect your name, email address, phone number, company,
                site or event details, location details, and the message you
                provide.
              </p>
              <p className="mt-3">
                When we provide security services, we may also collect site
                addresses, access instructions, contact lists for your site,
                incident and patrol reports, photos or video related to
                incidents, and billing information.
              </p>
              <p className="mt-3">
                When you visit the website, our hosting and security providers
                process technical information such as your IP address, browser
                type, and the pages you request. We use IP addresses to block
                spam and limit repeated contact form submissions.
              </p>
              <p className="mt-3">
                If you accept analytics cookies, Google Analytics collects
                website usage information such as pages viewed, approximate
                location, device and browser type, how you arrived at the site,
                and whether you clicked to call us or sent the contact form. We
                do not send your name, email, phone number, or message to Google
                Analytics.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-brand-ink mb-3">
                How We Use Information
              </h2>
              <p>
                We use your information to respond to security and quote
                requests; to schedule and deliver services; to bill and keep
                service records; to work with insurers, police, or emergency
                services when you ask us to or the law requires it; to prevent spam and protect the website; and,
                with your consent, to understand how the website is used.
              </p>
              <p className="mt-3">
                We will not add you to marketing emails or newsletters without
                your express consent.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-brand-ink mb-3">
                Sharing
              </h2>
              <p>
                We do not sell personal information. We may share information
                with service providers who help operate the website or deliver
                customer support, or when required for legal, safety, insurance,
                or service-delivery reasons.
              </p>
              <p className="mt-3">
                These providers include Web3Forms (delivers contact form
                messages), Microsoft 365 (our email), Cloudflare (website
                security and the Turnstile spam check on the contact form),
                Vercel (website hosting and cookieless page-view analytics), and
                Google Analytics (website usage analytics, only with your
                consent).
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-brand-ink mb-3">
                Information Stored Outside Canada
              </h2>
              <p>
                Some of our service providers, including our website hosting,
                security, form delivery, email, and analytics providers, may
                store or process your information outside Canada, mainly in the
                United States. While it is there, it may be subject to the laws
                of that country, including lawful access by its authorities. You
                can ask our privacy contact (below) for written information
                about our policies for service providers outside Canada, or any
                questions about how they collect, use, disclose, or store your
                information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-brand-ink mb-3">
                How Long We Keep Information
              </h2>
              <p>
                We keep information only as long as we reasonably need it for
                business or legal purposes. Website inquiries that do not lead
                to a service are kept for up to 24 months. Service and billing
                records are kept for as long as tax and other laws require,
                typically six years. Google Analytics data is kept for up to 14
                months. When information is no longer needed, we delete it or
                make it anonymous.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-brand-ink mb-3">
                How We Protect Information
              </h2>
              <p>
                We use reasonable safeguards to protect personal information,
                including encrypted connections (HTTPS), spam and bot
                protection, and access limited to staff who need it to dispatch
                and complete services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-brand-ink mb-3">
                Your Choices and Rights
              </h2>
              <p>
                You can ask to see the personal information we hold about you,
                ask us to correct it, or withdraw your consent to how we use it,
                subject to legal or contractual limits. Send your request to our
                privacy contact below. We will respond within 30 days.
              </p>
              <p className="mt-3">
                Google Analytics only runs if you accept analytics cookies. You
                can change or withdraw that choice at any time with the
                &ldquo;Cookie settings&rdquo; link in the website footer. See
                our <Link href="/cookies" className="text-primary">Cookie Policy</Link>{" "}
                for details.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-brand-ink mb-3">
                Complaints
              </h2>
              <p>
                If you have a concern about how we handle your information,
                please contact us first so we can try to resolve it. You also
                have the right to complain to the{" "}
                <a
                  href="https://oipc.ab.ca"
                  className="text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Office of the Information and Privacy Commissioner of Alberta
                </a>{" "}
                or the{" "}
                <a
                  href="https://www.priv.gc.ca"
                  className="text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Office of the Privacy Commissioner of Canada
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-brand-ink mb-3">
                Changes to This Policy
              </h2>
              <p>
                We may update this policy from time to time. The date at the top
                of this page shows when it was last changed.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-brand-ink mb-3">
                Contact Us
              </h2>
              <p>
                Questions, access requests, and privacy concerns can be sent to
                our privacy contact:
              </p>
              <p className="mt-3">
                Operations Manager, {siteConfig.legalName}
                <br />
                {siteConfig.address.display}
                <br />
                Email:{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-primary">
                  {siteConfig.email}
                </a>
                <br />
                Phone:{" "}
                <a href={siteConfig.phone.href} className="text-primary">
                  {siteConfig.phone.display}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
