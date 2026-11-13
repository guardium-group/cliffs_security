"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { useConsent } from "@/lib/consent";
import { GA_MEASUREMENT_ID, disableAnalytics, enableAnalytics } from "@/lib/analytics";

/**
 * Loads GA4 only after the visitor accepts analytics cookies.
 * Page views (including client-side navigations) come from GA4 Enhanced Measurement.
 */
export function GoogleAnalytics() {
  const consent = useConsent();
  const wasAccepted = useRef(false);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    if (consent === "accepted") {
      enableAnalytics();
      wasAccepted.current = true;
    } else if (consent === "declined" && wasAccepted.current) {
      // A loaded script can't be unloaded, so withdraw by disabling GA and clearing its cookies.
      disableAnalytics();
    }
  }, [consent]);

  if (!GA_MEASUREMENT_ID || consent !== "accepted") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  );
}
