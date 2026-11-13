"use client";

import { Clock, ShieldCheck, ClipboardList, Cctv } from "lucide-react";
import { motion } from "framer-motion";

// Part 2 of "Why Cliffs Security": what every client gets, whichever service they book.
const standards = [
  {
    icon: ShieldCheck,
    title: "Licensed and trained officers",
    description:
      "Every officer holds an Alberta security licence and is trained in First Aid and CPR/AED before their first shift on your site.",
  },
  {
    icon: Clock,
    title: "Always on",
    description:
      "Nights, weekends and holidays. When you call dispatch, a person answers and help is arranged.",
  },
  {
    icon: ClipboardList,
    title: "Reports you can hand to your board",
    description:
      "Check-in reports and incident logs land in your inbox, so you always know what happened on site.",
  },
  {
    icon: Cctv,
    title: "People and technology together",
    description:
      "Guards where you need eyes on, monitored cameras and access control everywhere else, sized to the risk and the budget.",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export function OurStandards() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
        <div className="max-w-2xl mb-10 sm:mb-14">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-primary mb-4">
            Our standard
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-ink leading-tight tracking-tight text-balance">
            What you get on every site.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {standards.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
                <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-ink mb-2 text-base leading-snug">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
