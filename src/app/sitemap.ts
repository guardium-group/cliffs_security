import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { services } from "@/lib/services";
import { industries } from "@/lib/industries";
import { jobs } from "@/lib/jobs";
import { siteConfig } from "@/lib/site";

// Update a date when that page's content changes. Legal dates match each page's "Last updated" line.
const STATIC_DATES: Record<string, string> = {
  "":               "2026-11-10",
  "/services":      "2026-11-10",
  "/service-areas": "2026-11-13",
  "/industries":    "2026-11-13",
  "/careers":       "2026-11-13",
  "/blog":          "2026-11-10",
  "/about":         "2026-11-10",
  "/contact":       "2026-11-10",
  "/privacy-policy":"2026-10-29",
  "/terms":         "2026-05-11",
  "/cookies":       "2026-10-29",
};

const routes = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/service-areas", changeFrequency: "monthly", priority: 0.85 },
  { path: "/industries", changeFrequency: "monthly", priority: 0.8 },
  { path: "/careers", changeFrequency: "weekly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.9 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: new Date(STATIC_DATES[route.path]),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${siteConfig.url}/services/${s.slug}`,
    lastModified: new Date("2026-11-13"),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    images: [`${siteConfig.url}${post.image}`],
  }));

  const industryRoutes = industries.map(item => ({ url: `${siteConfig.url}/industries/${item.slug}`, lastModified: new Date("2026-11-13") }));
  const jobRoutes = jobs.filter(job => job.active).map(job => ({ url: `${siteConfig.url}/careers/${job.slug}`, lastModified: new Date(job.datePosted) }));
  return [...staticRoutes, ...serviceRoutes, ...industryRoutes, ...jobRoutes, ...blogRoutes];
}
