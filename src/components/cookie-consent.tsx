"use client";

import { useState, useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import Link from "next/link";
import { getConsent, onConsentBannerOpen, setConsent } from "@/lib/consent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

// The site only sets two kinds of storage, so only two categories are listed.
// Analytics (Google Analytics) is the one optional category the consent value controls.
type Category = {
  key: "essential" | "analytics";
  title: string;
  note: string;
  required: boolean;
};

const CATEGORIES: Category[] = [
  {
    key: "essential",
    title: "Essential",
    note: "Remembers your cookie choice and keeps the site and contact form working. Always on.",
    required: true,
  },
  {
    key: "analytics",
    title: "Analytics",
    note: "Google Analytics shows us which pages help visitors, so we can improve the site. Off unless you allow it.",
    required: false,
  },
];

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const titleId = useId();

  useEffect(() => {
    const open = () => {
      setAnalytics(getConsent() === "accepted");
      setVisible(true);
    };
    const unsubscribe = onConsentBannerOpen(open);
    if (getConsent()) return unsubscribe;

    const timer = window.setTimeout(open, 0);
    return () => {
      window.clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  const choose = (allowAnalytics: boolean) => {
    setConsent(allowAnalytics ? "accepted" : "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          data-lenis-prevent
          role="region"
          aria-labelledby={titleId}
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-[100] max-h-[85svh] overflow-y-auto bg-white border-t border-gray-200 shadow-[0_-16px_48px_-16px_rgba(20,54,66,0.3)]"
        >
          <div className="container mx-auto px-5 sm:px-6 max-w-7xl py-4 sm:py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">

              {/* Intro */}
              <div className="md:col-span-2 lg:col-span-1 flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                  <Cookie className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h2 id={titleId} className="font-semibold text-brand-ink text-base">
                    We value your privacy
                  </h2>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1 leading-relaxed">
                    Choose which cookies we can use. You can change this any time from
                    &ldquo;Cookie settings&rdquo; in the footer. Read our{" "}
                    <Link href="/cookies" className="text-brand-link underline underline-offset-2 hover:no-underline">
                      Cookie Policy
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="text-brand-link underline underline-offset-2 hover:no-underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>

              {/* Category cards */}
              {CATEGORIES.map((category) => {
                const checked = category.required || analytics;
                const labelId = `${titleId}-${category.key}`;
                return (
                  <div
                    key={category.key}
                    className="rounded-xl border border-gray-200 bg-gray-50 p-3.5 sm:p-4 flex items-start justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span id={labelId} className="font-semibold text-brand-ink text-sm">
                          {category.title}
                        </span>
                        {category.required ? (
                          <Badge variant="secondary" className="px-2 py-0.5">Required</Badge>
                        ) : (
                          <Badge variant="outline" className="px-2 py-0.5">Optional</Badge>
                        )}
                      </div>
                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{category.note}</p>
                    </div>
                    <Switch
                      checked={checked}
                      disabled={category.required}
                      onCheckedChange={category.required ? undefined : setAnalytics}
                      aria-labelledby={labelId}
                      className="-mr-1.5 -mt-2"
                    />
                  </div>
                );
              })}
            </div>

            {/* Bulk actions */}
            <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-gray-100 grid grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-end sm:gap-3">
              <Button variant="outline" className="rounded-full text-brand-ink border-gray-300 hover:bg-gray-50" onClick={() => choose(false)}>
                Reject optional
              </Button>
              <Button variant="secondary" className="rounded-full" onClick={() => choose(analytics)}>
                Save choices
              </Button>
              <Button className="rounded-full col-span-2 order-first sm:order-none" onClick={() => choose(true)}>
                Accept all
              </Button>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
