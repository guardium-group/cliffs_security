"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/services";

const stats = [
  { value: "24/7", label: "Dispatch and monitoring" },
  { value: String(services.length), label: "Security services" },
  { value: "Daily", label: "Check-in reports" },
  { value: "AB", label: "Licensed officers" },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

// Part 1 of "Why Cliffs Security": the pitch and the proof points.
// The four feature cards live in <OurStandards /> further down the home page.
export function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-24 bg-brand-dark overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 max-w-7xl">

        {/* Top: headline + description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mb-10 sm:mb-14">

          {/* Left: heading */}
          <div className="lg:col-span-5">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/70 mb-4">
              Why Cliffs Security
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight text-balance">
              Dynamic and always on.
            </h2>
          </div>

          {/* Right: description */}
          <div className="lg:col-span-7 lg:flex lg:items-end">
            <p className="text-white/60 leading-relaxed text-base lg:text-lg max-w-[60ch]">
              Cliffs Security is part of the Guardium Group of Companies. We protect construction sites, office towers, condos, retail and events with officers who show up, report back and take your site as seriously as you do.
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-brand-dark px-5 py-6 sm:px-8 sm:py-8 flex flex-col gap-1"
            >
              <span className="text-4xl lg:text-5xl font-bold text-white tracking-tighter">
                {stat.value}
              </span>
              <span className="text-sm text-white/60 font-medium">{stat.label}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
