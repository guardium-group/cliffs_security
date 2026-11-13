export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Sends a GA4 event. No-op until GA4 has loaded (i.e. without analytics consent). */
export function trackEvent(name: string, params?: GtagParams) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}

/** Stops GA4 sending hits and removes its first-party cookies. */
export function disableAnalytics() {
  if (!GA_MEASUREMENT_ID) return;
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;

  const hostParts = window.location.hostname.split(".");
  const rootDomain = hostParts.slice(-2).join(".");
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name || !(name === "_ga" || name.startsWith("_ga_"))) continue;
    for (const domain of ["", `; domain=.${rootDomain}`, `; domain=${window.location.hostname}`]) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  }
}

export function enableAnalytics() {
  if (!GA_MEASUREMENT_ID) return;
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
}
