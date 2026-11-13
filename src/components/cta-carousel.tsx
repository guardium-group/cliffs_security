"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

interface CTASlide {
  headline: string;
  subtext: string;
  ctaText: string;
  ctaLink: string;
  ctaType?: "link" | "phone";
}

interface CTACarouselProps {
  slides?: CTASlide[];
  autoplayInterval?: number;
}

const defaultSlides: CTASlide[] = [
  {
    headline: "Need a guard tonight?",
    subtext: "Call Cliffs Security dispatch 24/7. Have the site address and the hours you need covered ready.",
    ctaText: "Call Now",
    ctaLink: siteConfig.phone.href,
    ctaType: "phone",
  },
  {
    headline: "Still thinking? Let's talk.",
    subtext: "Book a free site assessment and get a coverage plan sized to your risk and budget.",
    ctaText: "Get a free quote",
    ctaLink: "/contact",
    ctaType: "link",
  },
  {
    headline: "Part of the Guardium Group",
    subtext: "Cliffs Security brings group-wide security experience to properties and events across the Capital Region.",
    ctaText: "About us",
    ctaLink: "/about",
    ctaType: "link",
  },
];

export function CTACarousel({
  slides = defaultSlides,
  autoplayInterval = 5000,
}: CTACarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoplayInterval);
    return () => clearInterval(interval);
  }, [slides.length, autoplayInterval]);

  const currentSlide = slides[currentIndex];

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/security/brand-collage.webp"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-br from-black via-black/65 to-gray-900/75 backdrop-blur-xs" />
      </div>

      <div className="container mx-auto px-5 sm:px-6 max-w-7xl relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-3 sm:space-y-4"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight text-balance">
                {currentSlide.headline}
              </h2>
              <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto">
                {currentSlide.subtext}
              </p>
              <div className="pt-2">
                {currentSlide.ctaType === "phone" ? (
                  <Button
                    size="lg"
                    className="rounded-full"
                    asChild
                  >
                    <a href={currentSlide.ctaLink}>
                      <Phone className="mr-2 h-4 w-4" />
                      {currentSlide.ctaText}
                    </a>
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="rounded-full"
                    asChild
                  >
                    <Link href={currentSlide.ctaLink}>
                      {currentSlide.ctaText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="flex justify-center gap-4 mt-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative h-1 rounded-full transition-all duration-300 before:absolute before:-inset-x-2 before:-inset-y-5 before:content-[''] ${
                  index === currentIndex
                    ? "w-8 bg-white"
                    : "w-2 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
