"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Phone, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { motion } from "framer-motion";

export interface HeroSlide {
  image: string;
  title: string;
  highlight: string;
  description: string;
}

interface HomeHeroProps {
  slides: HeroSlide[];
  intervalMs?: number;
  showOnDutyCard?: boolean;
}

const HEADLINE_CLASS =
  "text-4xl sm:text-5xl xl:text-[50px] font-bold mb-1 leading-tight tracking-tight text-white";
const DESCRIPTION_CLASS =
  "text-sm sm:text-base md:text-lg text-white/90 mb-6 sm:mb-6 max-w-3xl leading-relaxed";

function OnDutyCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" as const }}
      className="absolute bottom-8 right-8 z-20 hidden lg:block"
    >
      <div className="w-80 rounded-2xl backdrop-blur-xl bg-black/45 border border-white/10 shadow-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary-on-dark opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary-on-dark" />
          </span>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/70">
            Guards on duty now
          </span>
        </div>
        <p className="text-lg font-semibold leading-snug text-white mb-1">
          24/7 dispatch across Edmonton and the Capital Region.
        </p>
        <p className="text-sm text-white/60 mb-4">
          Licensed officers, patrols and monitoring, one call away.
        </p>
        <a
          href={siteConfig.phone.href}
          className="flex items-center gap-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors px-4 py-3"
        >
          <span className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <ShieldCheck className="h-4 w-4 text-white" />
          </span>
          <span>
            <span className="block text-xs font-mono uppercase tracking-[0.18em] text-white/60">
              Security dispatch
            </span>
            <span className="block font-semibold text-white">{siteConfig.phone.display}</span>
          </span>
        </a>
      </div>
    </motion.div>
  );
}

export function HomeHero({ slides, intervalMs = 5500, showOnDutyCard = true }: HomeHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  // Slide whose text is on screen. It lags activeIndex while the text fades out,
  // so the same <h1> is reused instead of remounted (a new, larger <h1> on each
  // rotation would be reported as a late LCP).
  const [shownIndex, setShownIndex] = useState(0);
  const textVisible = shownIndex === activeIndex;

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [slides.length, intervalMs]);

  if (!slides.length) return null;
  const current = slides[shownIndex] ?? slides[0];

  return (
    <section className="relative min-h-svh sm:min-h-[700px] md:min-h-[750px] xl:h-[775px] overflow-hidden text-white">
      {/* Background Images */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.image}
            // Start at the visible state so the first slide isn't hidden until hydration (LCP).
            initial={false}
            animate={{ opacity: index === activeIndex ? 1 : 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={`${slide.title} ${slide.highlight}`}
              fill
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-black via-black/45 to-black/20" />

      {/* Content */}
      <div className="container mx-auto px-5 sm:px-6 max-w-7xl relative z-10 h-full min-h-svh sm:min-h-[650px] md:min-h-[700px] flex items-center">
        <div className="flex h-full w-full items-center py-16 sm:py-20">
          <div className="min-w-0 max-w-7xl border-l-2 sm:border-l pl-4 sm:pl-8 border-white/50 pb-4">
            {/* The page's one h1 carries the primary keyword; the rotating slogan below is a styled <p>. */}
            <h1 className="text-xs sm:text-sm font-mono uppercase tracking-[0.18em] text-white/80 mb-3 sm:mb-4">
              Security company in Edmonton
            </h1>
            <div className="grid">
              {/* Invisible copies of every slide's text hold the block at the
                  tallest slide's height, so swapping text doesn't shift layout (CLS). */}
              {slides.map((slide) => (
                <div key={slide.image} aria-hidden="true" className="invisible col-start-1 row-start-1">
                  <div className={HEADLINE_CLASS}>
                    {slide.title} {slide.highlight}
                  </div>
                  <p className={DESCRIPTION_CLASS}>{slide.description}</p>
                </div>
              ))}
              <motion.div
                className="col-start-1 row-start-1"
                initial={false}
                animate={textVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: textVisible ? 0.6 : 0.4, ease: "easeOut" }}
                onAnimationComplete={() => {
                  if (!textVisible) setShownIndex(activeIndex);
                }}
              >
                {/* Keep the headline/<p> mounted (a new element would be a late LCP) but key
                    the text inside, so swapped text is new content, not a shift. */}
                <p className={HEADLINE_CLASS}>
                  <span key={shownIndex}>
                    {current.title}{" "}
                    <span className="text-white">{current.highlight}</span>
                  </span>
                </p>

                <p className={DESCRIPTION_CLASS}>
                  <span key={shownIndex}>{current.description}</span>
                </p>
              </motion.div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8 sm:mb-10">
              <Button
                size="lg"
                asChild
                className="w-full sm:w-auto rounded-full px-5 sm:px-8 text-sm sm:text-base"
              >
                <a href={siteConfig.phone.href}>
                  <Phone className="mr-2 h-5 w-5" />
                  <span>
                    Call <span className="hidden min-[360px]:inline">24/7 - </span>
                    {siteConfig.phone.display}
                  </span>
                </a>
              </Button>
              <Button
                size="lg"
                variant="inverse"
                className="w-full sm:w-auto px-5 sm:px-8 rounded-full text-sm sm:text-base"
                asChild
              >
                <Link href="/contact">
                  Get a free quote
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 24/7 dispatch card */}
      {showOnDutyCard && <OnDutyCard />}

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 z-20 flex items-center gap-4">
          {slides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative h-1 rounded-full transition-all duration-300 before:absolute before:-inset-x-2 before:-inset-y-5 before:content-['']",
                index === activeIndex
                  ? "w-8 sm:w-10 bg-white"
                  : "w-2 bg-white/30 hover:bg-white/50"
              )}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          className="w-5 h-7 rounded-full border border-white/80 flex items-start justify-center p-1"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-1 h-2 rounded-full bg-white/80" />
        </motion.div>
        <span className="text-xs text-white/70 font-medium tracking-widest">Scroll</span>
      </motion.div>
    </section>
  );
}
