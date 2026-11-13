import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieConsent } from "@/components/cookie-consent";
import { GoogleAnalytics } from "@/components/google-analytics";
import { AnalyticsEvents } from "@/components/analytics-events";
import { SmoothScroll } from "@/components/smooth-scroll";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site";
import { localBusinessJsonLd } from "@/lib/structured-data";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Security Company in Edmonton | Cliffs Security",
    template: "%s | Cliffs Security",
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Security Company in Edmonton | Cliffs Security",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Cliffs Security officers on duty in Edmonton",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Security Company in Edmonton | Cliffs Security",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-CA"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">
        <JsonLd data={localBusinessJsonLd()} />
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <CookieConsent />
        <GoogleAnalytics />
        <AnalyticsEvents />
        <SmoothScroll />
        <Analytics />
      </body>
    </html>
  );
}
