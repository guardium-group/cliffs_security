"use client";

import { useEffect } from "react";
import { siteConfig } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

const DIRECTIONS_URLS = new Set<string>([siteConfig.address.mapUrl]);

/**
 * One document-level listener for conversion clicks, so server-rendered CTAs
 * (tel: links, directions) are tracked without turning them into client components.
 */
export function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;

      const href = link.getAttribute("href") ?? "";
      const params = {
        link_url: href,
        link_text: link.textContent?.trim().slice(0, 100) || undefined,
        page_path: window.location.pathname,
      };

      if (href.startsWith("tel:")) {
        trackEvent("phone_call_click", params);
      } else if (DIRECTIONS_URLS.has(href)) {
        trackEvent("directions_click", params);
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
