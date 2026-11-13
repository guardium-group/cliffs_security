"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

// TODO: PLACEHOLDER REVIEWS. These are illustrative only and must be replaced
// with real client reviews before SHOW_TESTIMONIALS in lib/site.ts is set to true.
const reviews = [
  {
    name: "Site Superintendent",
    service: "Mobile patrols",
    rating: 5,
    quote:
      "Placeholder review: patrols on our construction site were consistent, and the nightly logs made it easy to show the owner what was checked.",
  },
  {
    name: "Event Director",
    service: "Event security",
    rating: 5,
    quote:
      "Placeholder review: the security team handled entry, ID checks and the late-night crowd without any fuss.",
  },
  {
    name: "Property Manager",
    service: "Static guards",
    rating: 5,
    quote:
      "Placeholder review: the daily check-in reports are exactly what our condo board wanted to see.",
  },
  {
    name: "Facilities Manager",
    service: "Fire watch",
    rating: 5,
    quote:
      "Placeholder review: fire watch was in place the same evening our sprinkler system went down, with every round logged.",
  },
  {
    name: "Retail Owner",
    service: "CCTV & access control",
    rating: 5,
    quote:
      "Placeholder review: cameras plus overnight patrols cut down the break-ins at our store.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="h-3.5 w-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: (typeof reviews)[0] }) {
  return (
    <div className="flex-shrink-0 w-[320px] sm:w-[360px] bg-white rounded-2xl p-6 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.08)] ring-1 ring-gray-100 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <Stars count={review.rating} />
      </div>
      <p className="text-gray-700 text-sm leading-relaxed flex-1">
        &ldquo;{review.quote}&rdquo;
      </p>
      <div>
        <p className="font-semibold text-brand-ink text-sm">{review.name}</p>
        <p className="text-xs text-gray-400">
          {review.service}
        </p>
      </div>
    </div>
  );
}

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const doubled = [...reviews, ...reviews];

  return (
    <section className="py-16 sm:py-24 bg-gray-50 border-t border-gray-100 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto px-5 sm:px-6 max-w-7xl mb-10 sm:mb-12 text-center"
      >
        <p className="text-xs font-mono uppercase tracking-[0.18em] text-primary mb-4">
          Client reviews
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-ink leading-tight tracking-tight text-balance">
          Trusted where it counts.
        </h2>
        <p className="text-gray-500 text-base mt-3 max-w-[48ch] mx-auto leading-relaxed">
          What property managers, site supervisors and event organizers say about working with us.
        </p>
      </motion.div>

      {/* Marquee */}
      <div
        className="relative"
        onMouseEnter={() => {
          if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
        }}
        onMouseLeave={() => {
          if (trackRef.current) trackRef.current.style.animationPlayState = "running";
        }}
      >
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex gap-4 px-4"
          style={{
            animation: "marquee 40s linear infinite",
            width: "max-content",
          }}
        >
          {doubled.map((review, i) => (
            <ReviewCard key={`${review.name}-${i}`} review={review} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
