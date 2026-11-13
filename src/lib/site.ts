// TODO: replace placeholder phone, email and domain with the real Cliffs Security details.
export const siteConfig = {
  name: "Cliffs Security",
  legalName: "Cliffs Security Services",
  url: "https://cliffssecurity.ca",
  description:
    "Licensed security guards, mobile patrols, event security, fire watch and remote video monitoring across Edmonton and the Capital Region. 24/7 dispatch.",
  phone: {
    display: "+1 (780) 000-0000",
    href: "tel:+17800000000",
    compact: "780-000-0000",
    e164: "+17800000000",
  },
  email: "info@cliffssecurity.ca",
  address: {
    street: "4918 Roper Rd NW Suite 206",
    city: "Edmonton",
    region: "AB",
    postalCode: "T6B 3T7",
    country: "CA",
    display: "4918 Roper Rd NW Suite 206, Edmonton, AB T6B 3T7",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=4918%20Roper%20Rd%20NW%20Suite%20206%2C%20Edmonton%2C%20AB%20T6B%203T7",
  },
  owner: "Guardium Group of Companies",
  hours: "24/7 security dispatch",
  serviceArea: [
    "Edmonton",
    "Sherwood Park",
    "St. Albert",
    "Spruce Grove",
    "Leduc",
    "Beaumont",
    "Devon",
    "Morinville",
    "Fort Saskatchewan",
    "Stony Plain",
    "Nisku",
    "Acheson",
  ],
  services: [
    "Security guards",
    "Mobile patrol security",
    "Event security",
    "Fire watch security",
    "Executive protection",
    "Remote video monitoring and access control",
  ],
  ogImage: "/images/og/cliffs-security-og.jpg",
  // Social profiles: add URLs once the accounts exist. Empty entries are not rendered.
  social: {
    facebook: "",
    instagram: "",
    x: "",
    linkedin: "",
  },
} as const;

/**
 * The testimonials section ships with placeholder reviews only.
 * Keep this false until real client reviews replace them in components/testimonials.tsx.
 */
export const SHOW_TESTIMONIALS = false;

export const socialLinks = Object.entries(siteConfig.social)
  .filter(([, url]) => url.length > 0)
  .map(([network, url]) => ({ network, url }));

export function areaSlug(area: string): string {
  return area.toLowerCase().replace(/\./g, "").replace(/\s+/g, "-");
}

export const serviceAreaLinks = siteConfig.serviceArea.map((area) => ({
  name: area,
  href: `/service-areas/${areaSlug(area)}`,
}));
