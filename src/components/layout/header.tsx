"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon, X, Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Menu, MenuItem, HoveredLink } from "@/components/ui/navbar-menu";
import { siteConfig, serviceAreaLinks } from "@/lib/site";
import { services as serviceData } from "@/lib/services";
import { motion, AnimatePresence } from "framer-motion";


const services = serviceData.map((service) => ({
  name: service.name,
  href: `/services/${service.slug}`,
}));

const serviceAreas = serviceAreaLinks;

const mobileLinkVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        className="fixed top-4 inset-x-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <div className="container mx-auto px-5 sm:px-6 max-w-7xl py-3">
          <motion.div
            className={cn(
              "flex items-center justify-between border bg-white/96 backdrop-blur-xl rounded-full py-3 px-6 transition-all duration-300",
              scrolled
                ? "border-gray-200/80 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.12)]"
                : "border-gray-100 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.06)]"
            )}
          >
            {/* Logo */}
            <Link href="/" className="z-50 flex items-center shrink-0">
              <Image
                src="/cliffs_logo-transparent.png"
                alt="Cliffs Security home"
                width={115}
                height={48}
                className="h-12 w-auto object-contain"
                loading="eager"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <Menu setActive={setActive}>
                <Link
                  href="/"
                  className={cn(
                    "text-sm font-medium transition-colors duration-200",
                    isActive("/") ? "text-primary" : "text-gray-700 hover:text-primary"
                  )}
                >
                  Home
                </Link>

                <MenuItem setActive={setActive} active={active} item="Services">
                  <div className="flex flex-col space-y-3.5">
                    <HoveredLink href="/services">
                      <div className="flex flex-col pb-3 border-b border-gray-100">
                        <span className="text-sm font-semibold text-primary">View all services</span>
                        <span className="text-xs text-gray-400 font-normal mt-0.5">Full list of security services</span>
                      </div>
                    </HoveredLink>
                    {services.map((service) => (
                      <HoveredLink key={service.name} href={service.href}>
                        {service.name}
                      </HoveredLink>
                    ))}
                  </div>
                </MenuItem>

                <MenuItem setActive={setActive} active={active} item="Service Areas">
                  <div>
                    <HoveredLink href="/service-areas">
                      <div className="flex flex-col pb-3 border-b border-gray-100 mb-3">
                        <span className="text-sm font-semibold text-primary">View all service areas</span>
                        <span className="text-xs text-gray-400 font-normal mt-0.5">Edmonton &amp; surrounding communities</span>
                      </div>
                    </HoveredLink>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                      {serviceAreas.map((area) => (
                        <HoveredLink key={area.name} href={area.href}>
                          {area.name}
                        </HoveredLink>
                      ))}
                    </div>
                  </div>
                </MenuItem>

                <Link
                  href="/about"
                  className={cn(
                    "text-sm font-medium transition-colors duration-200",
                    isActive("/about") ? "text-primary" : "text-gray-700 hover:text-primary"
                  )}
                >
                  About
                </Link>

                <Link
                  href="/blog"
                  className={cn(
                    "text-sm font-medium transition-colors duration-200",
                    isActive("/blog") ? "text-primary" : "text-gray-700 hover:text-primary"
                  )}
                >
                  Articles
                </Link>

                <Link
                  href="/contact"
                  className={cn(
                    "text-sm font-medium transition-colors duration-200",
                    isActive("/contact") ? "text-primary" : "text-gray-700 hover:text-primary"
                  )}
                >
                  Contact
                </Link>
              </Menu>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={siteConfig.phone.href}
                className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-primary transition-colors duration-200"
              >
                <Phone className="h-3.5 w-3.5" />
                {siteConfig.phone.display}
              </a>
              <Button
                asChild
                size="sm"
                className="rounded-full"
              >
                <Link href="/contact">Get a quote</Link>
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-3 -mr-2 rounded-full hover:bg-gray-100 transition-colors duration-200 active:scale-95"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5 text-gray-700" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MenuIcon className="h-5 w-5 text-gray-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="lg:hidden bg-white/98 backdrop-blur-xl border border-gray-100 shadow-xl overflow-hidden mx-5 sm:mx-6 rounded-2xl mt-1"
            >
              <div className="px-5 py-5 space-y-1">

                {/* Home */}
                <motion.div custom={0} variants={mobileLinkVariants} initial="hidden" animate="visible">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between py-3 px-3 rounded-xl text-base font-medium transition-colors duration-150",
                      isActive("/") ? "bg-red-50 text-primary" : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                    )}
                  >
                    Home
                    {isActive("/") && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </Link>
                </motion.div>

                {/* Services — expandable */}
                <motion.div custom={1} variants={mobileLinkVariants} initial="hidden" animate="visible">
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === "services" ? null : "services")}
                    className={cn(
                      "flex items-center justify-between w-full py-3 px-3 rounded-xl text-base font-medium transition-colors duration-150",
                      isActive("/services") ? "bg-red-50 text-primary" : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                    )}
                  >
                    Services
                    <motion.span
                      animate={{ rotate: mobileExpanded === "services" ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === "services" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-1 ml-3 pl-3 border-l border-gray-100 space-y-0.5 pb-1">
                          <Link
                            href="/services"
                            onClick={() => { setMobileMenuOpen(false); setMobileExpanded(null); }}
                            className="flex items-center min-h-11 py-2 px-2 rounded-lg text-sm font-semibold text-primary hover:bg-red-50 transition-colors"
                          >
                            View all services
                          </Link>
                          {services.map((service) => (
                            <Link
                              key={service.name}
                              href={service.href}
                              onClick={() => { setMobileMenuOpen(false); setMobileExpanded(null); }}
                              className="flex items-center min-h-11 py-2 px-2 rounded-lg text-sm text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
                            >
                              {service.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Service Areas — expandable */}
                <motion.div custom={2} variants={mobileLinkVariants} initial="hidden" animate="visible">
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === "service-areas" ? null : "service-areas")}
                    className={cn(
                      "flex items-center justify-between w-full py-3 px-3 rounded-xl text-base font-medium transition-colors duration-150",
                      isActive("/service-areas") ? "bg-red-50 text-primary" : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                    )}
                  >
                    Service Areas
                    <motion.span
                      animate={{ rotate: mobileExpanded === "service-areas" ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === "service-areas" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-1 ml-3 pl-3 border-l border-gray-100 space-y-0.5 pb-1">
                          <Link
                            href="/service-areas"
                            onClick={() => { setMobileMenuOpen(false); setMobileExpanded(null); }}
                            className="flex items-center min-h-11 py-2 px-2 rounded-lg text-sm font-semibold text-primary hover:bg-red-50 transition-colors"
                          >
                            View all service areas
                          </Link>
                          {serviceAreas.map((area) => (
                            <Link
                              key={area.name}
                              href={area.href}
                              onClick={() => { setMobileMenuOpen(false); setMobileExpanded(null); }}
                              className="flex items-center min-h-11 py-2 px-2 rounded-lg text-sm text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
                            >
                              {area.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Articles, About, Contact */}
                {[
                  { label: "Articles", href: "/blog" },
                  { label: "About", href: "/about" },
                  { label: "Contact", href: "/contact" },
                ].map((link, i) => (
                  <motion.div key={link.href} custom={i + 3} variants={mobileLinkVariants} initial="hidden" animate="visible">
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between py-3 px-3 rounded-xl text-base font-medium transition-colors duration-150",
                        isActive(link.href) ? "bg-red-50 text-primary" : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                      )}
                    >
                      {link.label}
                      {isActive(link.href) && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  custom={6}
                  variants={mobileLinkVariants}
                  initial="hidden"
                  animate="visible"
                  className="pt-3 border-t border-gray-100 space-y-2.5"
                >
                  <a
                    href={siteConfig.phone.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 min-h-11 px-3 py-2 text-primary font-semibold text-base"
                  >
                    <Phone className="h-4 w-4" />
                    {siteConfig.phone.display}
                  </a>
                  <Button asChild className="w-full rounded-full">
                    <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                      Get a quote
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
