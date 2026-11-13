"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Site-wide inertial ("premium") wheel scrolling via Lenis.
 * The browser still owns the scroll position, so position: sticky / fixed,
 * framer-motion whileInView and scroll-padding all keep working.
 * Touch devices keep native scrolling; reduced-motion users get no smoothing.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,
      // Glide to in-page #anchors, stopping below the fixed header (matches scroll-padding-top).
      anchors: { offset: -128 },
    });
    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // After a route change, stop any glide still in progress and adopt wherever Next.js
  // put the page (top for new pages, the saved position for back/forward).
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    const frame = requestAnimationFrame(() => {
      lenis.scrollTo(window.scrollY, { immediate: true, force: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
