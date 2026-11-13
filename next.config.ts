import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://challenges.cloudflare.com https://static.cloudflareinsights.com https://www.googletagmanager.com`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://images.unsplash.com https://picsum.photos https://tile.openstreetmap.org https://*.google-analytics.com https://*.googletagmanager.com",
      "font-src 'self' data:",
      "frame-src https://challenges.cloudflare.com https://www.google.com https://maps.google.com",
      "connect-src 'self' https://challenges.cloudflare.com https://cloudflareinsights.com https://api.web3forms.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Services renamed to match search terms (SEO pass, 2026-11-10). Keep old URLs working.
  async redirects() {
    return [
      { source: "/services/static-guards", destination: "/services/security-guards", permanent: true },
      { source: "/services/private-protection", destination: "/services/executive-protection", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
