import { siteConfig, socialLinks } from "@/lib/site";
import type { BlogPost } from "@/lib/blog";
import type { ServiceData } from "@/lib/services";

const BUSINESS_ID = `${siteConfig.url}/#business`;
const ORGANIZATION_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;
const LOGO_URL = `${siteConfig.url}/cliffs_logo-transparent.png`;

const sameAs = socialLinks.length > 0 ? { sameAs: socialLinks.map((link) => link.url) } : {};

const allCities = siteConfig.serviceArea.map((city) => ({ "@type": "City", name: city }));

/** The one local business. Rendered on every page from the root layout. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": BUSINESS_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: LOGO_URL,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    telephone: siteConfig.phone.e164,
    email: siteConfig.email,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    // geo: add the office's real latitude/longitude once confirmed (Google Business Profile shows it).
    // hasMap: "https://maps.google.com/?cid=REPLACE_WITH_GBP_CID", // add once GBP is verified
    priceRange: "$$",
    ...sameAs,
    areaServed: allCities,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    makesOffer: siteConfig.services.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service },
    })),
    parentOrganization: { "@type": "Organization", name: siteConfig.owner },
  };
}

/** Organization + WebSite, rendered on the home page. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        logo: { "@type": "ImageObject", url: LOGO_URL },
        email: siteConfig.email,
        telephone: siteConfig.phone.e164,
        parentOrganization: { "@type": "Organization", name: siteConfig.owner },
        ...sameAs,
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: siteConfig.name,
        url: siteConfig.url,
        inLanguage: "en-CA",
        publisher: { "@id": ORGANIZATION_ID },
      },
    ],
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqJsonLd(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** One service, offered by the business across every city it covers. */
export function serviceJsonLd(service: ServiceData) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/services/${service.slug}#service`,
    name: service.title,
    serviceType: service.name,
    description: service.metaDescription,
    url: `${siteConfig.url}/services/${service.slug}`,
    image: `${siteConfig.url}${service.heroImage}`,
    provider: { "@id": BUSINESS_ID },
    areaServed: allCities,
  };
}

/**
 * City page: the business's security services in one city.
 * References the single business by @id instead of duplicating it, so search engines
 * don't read each city page as a separate (fake) location.
 */
export function cityServiceJsonLd(city: { name: string; slug: string; description: string }) {
  const url = `${siteConfig.url}/service-areas/${city.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: `Security services in ${city.name}`,
    serviceType: "Security guard and patrol services",
    description: city.description,
    url,
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "City", name: city.name },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Security services in ${city.name}`,
      itemListElement: siteConfig.services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service },
      })),
    },
  };
}

export function blogPostingJsonLd(post: BlogPost) {
  const articleUrl = `${siteConfig.url}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${articleUrl}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    headline: post.title,
    description: post.description,
    image: [`${siteConfig.url}${post.image}`],
    // Date-only ISO 8601 avoids hardcoding a UTC offset that is wrong half the year.
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: "en-CA",
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
    articleSection: post.category,
    keywords: post.keywords.join(", "),
  };
}
