"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { services } from "@/lib/services";

const spotlights = services.map((service) => ({
  id: service.slug,
  eyebrow: service.name,
  title: service.spotlight.title,
  description: service.spotlight.description,
  image: service.heroImage,
  imageAlt: service.heroImageAlt,
  benefits: service.spotlight.benefits,
  stat: service.spotlight.stat,
  urgentBadge: service.spotlight.urgentBadge,
}));

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

interface ServiceSpotlightsProps {
  limit?: number;
}

export function ServiceSpotlights({ limit }: ServiceSpotlightsProps) {
  const items = limit ? spotlights.slice(0, limit) : spotlights;
  return (
    <div className="bg-white">
      {items.map((service, index) => {
        const isEven = index % 2 === 0;
        return (
          <section
            key={service.id}
            id={service.id}
            className="relative py-16 sm:py-24 scroll-mt-24"
          >
            <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  isEven ? "" : "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
                }`}
              >
                {/* Image column */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="lg:col-span-5"
                >
                  {/* Double-bezel container */}
                  <div className="rounded-[2rem] bg-gray-100 p-1.5 ring-1 ring-black/5">
                    <div className="relative rounded-[calc(2rem-0.375rem)] overflow-hidden aspect-[4/3] bg-gray-200">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-cover"
                      />
                      {/* Subtle gradient overlay for readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 to-transparent" />

                      {/* Stat badge on image */}
                      {service.stat && (
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                          <p className="text-2xl font-bold text-brand-ink leading-none">{service.stat.value}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{service.stat.label}</p>
                        </div>
                      )}

                      {/* Urgent badge */}
                      {service.urgentBadge && (
                        <div className="absolute top-4 right-4 bg-primary text-white text-xs font-mono uppercase tracking-widest px-3 py-1.5 rounded-full">
                          {service.urgentBadge}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Content column */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="lg:col-span-7 flex flex-col gap-6"
                >
                  <p className="text-xs font-mono uppercase tracking-[0.18em] text-primary">
                    {service.eyebrow}
                  </p>

                  <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink leading-tight tracking-tight text-balance">
                    {service.title}
                  </h2>

                  <p className="text-gray-500 leading-relaxed max-w-[60ch]">
                    {service.description}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-3">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="h-3 w-3 text-primary" strokeWidth={2.5} />
                        </span>
                        <span className="text-gray-600 text-sm leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button
                      asChild
                      size="lg"
                      className="rounded-full"
                    >
                      <a href={siteConfig.phone.href}>
                        <Phone className="mr-2 h-4 w-4" />
                        Call now - {siteConfig.phone.display}
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="secondary"
                      className="rounded-full group"
                    >
                      <Link href="/contact">
                        Get a free quote
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {limit && (
        <div className="bg-white border-gray-100 py-6 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary group"
          >
            View all services
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </div>
  );
}
