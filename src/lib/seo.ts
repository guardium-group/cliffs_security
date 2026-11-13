import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

interface PageSeo {
  /** Page part of the title; " | Cliffs Security" is appended by the layout template. */
  title: string;
  /** 155 characters or fewer. */
  description: string;
  /** Path beginning with "/" ("/" for the home page). */
  path: string;
  /** Use the title as-is instead of the layout template (for titles that already carry the brand). */
  absoluteTitle?: boolean;
  /** Social share image (site-relative path). Defaults to the site OG image. */
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
}

/**
 * Builds complete page metadata.
 * Next.js replaces the layout's openGraph/twitter objects instead of merging them,
 * so every page needs the full set (siteName, locale, image, twitter card) here.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  image = siteConfig.ogImage,
  imageAlt = `${siteConfig.name}, security services in Edmonton`,
  type = "website",
}: PageSeo): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const isDefaultImage = image === siteConfig.ogImage;
  const images = [
    isDefaultImage
      ? { url: image, width: 1200, height: 630, alt: imageAlt }
      : { url: image, alt: imageAlt },
  ];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: "en_CA",
      type,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
