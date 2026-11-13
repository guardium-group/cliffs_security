"use client";

import { ClipboardCheck, LayoutGrid, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Free site assessment",
    description:
      "Tell us about your site, event or concern. We walk it with you and identify the risks, entry points and hours that matter.",
  },
  {
    number: "02",
    icon: LayoutGrid,
    title: "A coverage plan that fits",
    description:
      "Static guards, mobile patrols, technology, or a hybrid of all three, sized to the threat and your budget.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Guards on site, reports in your inbox",
    description:
      "Trained, licensed officers start on the agreed schedule, with check-in reports so you always know what happened.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 bg-brand-dark overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 sm:mb-20">
          <div className="lg:col-span-5">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/70 mb-4">
              How it works
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight text-balance">
              Modern threats. Modern responses.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:flex lg:items-end">
            <p className="text-white/60 leading-relaxed max-w-[55ch]">
              People and technology working together: guards where you need
              eyes on, monitored systems everywhere else, and a documented audit
              trail at all times.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-brand-dark p-8 lg:p-10 flex flex-col gap-6"
            >
              <div className="flex items-start justify-between">
                <span className="text-5xl font-bold text-white/60 leading-none tracking-tighter select-none">
                  {step.number}
                </span>
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <step.icon className="h-5 w-5 text-primary-on-dark" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-white font-semibold text-lg">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-white/60 text-xs font-mono">
          We hire licensed security officers with First Aid and CPR/AED training.
        </p>
      </div>
    </section>
  );
}
