import Link from "next/link";
import Image from "next/image";
import { CookieSettingsButton } from "@/components/cookie-settings-button";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  LinkedinIcon,
} from "@/components/ui/social-icons";
import { siteConfig, serviceAreaLinks, socialLinks as configuredSocialLinks } from "@/lib/site";
import { services } from "@/lib/services";
import { industries } from "@/lib/industries";

const socialIcons = {
  facebook: { name: "Facebook", icon: FacebookIcon },
  instagram: { name: "Instagram", icon: InstagramIcon },
  x: { name: "X", icon: TwitterIcon },
  linkedin: { name: "LinkedIn", icon: LinkedinIcon },
} as const;

const socialLinks = configuredSocialLinks.map((link) => ({
  ...socialIcons[link.network as keyof typeof socialIcons],
  href: link.url,
}));

const serviceLinks = services.map((service) => ({
  name: service.name,
  href: `/services/${service.slug}`,
}));

const companyLinks = [
  { name: "About us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Service Areas", href: "/service-areas" },
  { name: "Articles", href: "/blog" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

const legalLinks = [
  { name: "Privacy policy", href: "/privacy-policy" },
  { name: "Terms of service", href: "/terms" },
  { name: "Cookie policy", href: "/cookies" },
];

export function Footer() {
  return (
    <footer className="bg-brand-dark relative overflow-hidden">
      <div
        className="absolute -top-40 right-0 w-[700px] h-[700px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative container mx-auto px-5 sm:px-6 max-w-7xl">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pt-16 pb-12 border-b border-white/[0.08]">

          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-6">
            <Link href="/" className="inline-block">
              <Image
                src="/cliffs_logo-transparent.png"
                alt="Cliffs Security home"
                width={134}
                height={56}
                className="h-14 w-auto object-contain brightness-0 invert"
              />
            </Link>

            <p className="text-white/60 text-sm leading-relaxed max-w-[220px]">
              Licensed security officers, patrols and monitoring for Edmonton
              and the Capital Region. Dispatch 24/7 at{" "}
              <a href={siteConfig.phone.href} className="text-white/70 hover:text-white">
                {siteConfig.phone.compact}
              </a>
              .
            </p>

            {socialLinks.length > 0 && (
            <div className="flex items-center gap-2 mt-auto">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center text-white/60 hover:bg-white hover:text-brand-dark transition-all duration-200"
                >
                  <social.icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
            )}
          </div>

          {/* Services */}
          <div>
            <p className="text-white/60 font-mono text-xs uppercase tracking-[0.2em] mb-5">
              Services
            </p>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/55 hover:text-white text-sm leading-snug transition-colors duration-150"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white/60 font-mono text-xs uppercase tracking-[0.2em] mb-5">Industries</p>
            <ul className="space-y-3">
              <li><Link href="/industries" className="text-white/70 hover:text-white text-sm">All industries</Link></li>
              {industries.map(item => <li key={item.slug}><Link href={`/industries/${item.slug}`} className="text-white/70 hover:text-white text-sm">{item.name}</Link></li>)}
            </ul>
          </div>

          {/* Service Areas */}
          <div className="col-span-2 sm:col-span-1 order-last sm:order-none">
            <p className="text-white/60 font-mono text-xs uppercase tracking-[0.2em] mb-5">
              Service Areas
            </p>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2.5">
              {serviceAreaLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/55 hover:text-white text-sm leading-snug transition-colors duration-150"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Legal stacked */}
          <div className="flex flex-col gap-10">
            <div>
              <p className="text-white/60 font-mono text-xs uppercase tracking-[0.2em] mb-5">
                Company
              </p>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/55 hover:text-white text-sm transition-colors duration-150"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-white/60 font-mono text-xs uppercase tracking-[0.2em] mb-5">
                Legal
              </p>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/55 hover:text-white text-sm transition-colors duration-150"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <CookieSettingsButton className="text-white/55 hover:text-white text-sm transition-colors duration-150 cursor-pointer" />
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6 text-xs text-white/60 text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <p>
            A{" "}
            <Link
              href="https://guardiumgroup.com"
              target="_blank"
              rel="noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              Guardium Group
            </Link>{" "}
            company &middot; Built by{" "}
            <Link
              href="https://guardiumgroup.com/companies/technologies"
              target="_blank"
              rel="noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              Guardium Technologies
            </Link>
          </p>
        </div>

      </div>
    </footer>
  );
}
