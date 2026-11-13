"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services as serviceData } from "@/lib/services";
import { getServiceIcon } from "@/lib/service-icons";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const allServices = serviceData.map((service) => ({
  icon: getServiceIcon(service.slug),
  title: service.name,
  shortDescription: service.shortDescription,
  href: `/services/${service.slug}`,
  badge: service.badge,
}));

interface ServicesSectionProps {
  limit?: number;
}

export function ServicesSection({ limit }: ServicesSectionProps) {
  const services = limit ? allServices.slice(0, limit) : allServices;

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left: Section header */}
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
          >
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-primary mb-4">
              What we do
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-ink leading-tight tracking-tight mb-4 text-balance">
              Six ways we keep you covered.
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8 max-w-[50ch]">
              From a single officer at a front desk to monitored cameras across a construction site, Cliffs Security matches the coverage to the risk and the budget.
            </p>
            {limit && (
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary group"
              >
                View all services
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            )}
          </motion.div>

          {/* Right: Service cards grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  custom={i + 1}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                >
                  <Link
                    href={service.href}
                    className="group relative flex flex-col gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-[0_4px_24px_-6px_rgba(0,0,0,0.1)] border border-gray-200/80 hover:border-primary/25 transition-all duration-300 h-full"
                  >
                    {service.badge && (
                      <span className="absolute top-4 right-4 rounded-full bg-red-50 border border-primary/20 px-2.5 py-0.5 text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                        {service.badge}
                      </span>
                    )}
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                      <service.icon className="h-5 w-5 text-gray-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-ink mb-1.5 leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-primary mt-auto transition-all duration-200 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
