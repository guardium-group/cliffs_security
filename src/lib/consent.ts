import { useSyncExternalStore } from "react";

export type ConsentValue = "accepted" | "declined";

export const CONSENT_KEY = "cliffs-security-cookie-consent";
const CHANGE_EVENT = "cliffs-security:consent-change";
const OPEN_EVENT = "cliffs-security:consent-open";

export function getConsent(): ConsentValue | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(value: ConsentValue) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage blocked (private mode etc.) — the choice still applies for this page view.
  }
  window.dispatchEvent(new CustomEvent<ConsentValue>(CHANGE_EVENT, { detail: value }));
}

/** Re-open the cookie banner so visitors can change their choice. */
export function openConsentBanner() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onConsentBannerOpen(callback: () => void) {
  window.addEventListener(OPEN_EVENT, callback);
  return () => window.removeEventListener(OPEN_EVENT, callback);
}

let lastChange: ConsentValue | null = null;

function subscribe(callback: () => void) {
  const onChange = (event: Event) => {
    lastChange = (event as CustomEvent<ConsentValue>).detail ?? null;
    callback();
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_KEY) callback();
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): ConsentValue | null {
  return getConsent() ?? lastChange;
}

export function useConsent(): ConsentValue | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}
