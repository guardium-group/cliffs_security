# Cliffs Security

Marketing site for Cliffs Security, a Guardium Group company. It is built from the Cliffs Towing codebase (Next.js 16, Tailwind v4, framer-motion) and uses the Guardium Security service lineup.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

Read `AGENTS.md` before changing Next.js APIs.

## Where content lives

| What | File |
| --- | --- |
| Business name, phone, email, address, service areas, social links | `src/lib/site.ts` |
| The 6 services (cards, spotlights, detail pages, nav, footer) | `src/lib/services.ts` |
| Service icons | `src/lib/service-icons.ts` |
| City pages | `src/lib/service-areas.ts` |
| Blog posts | `src/lib/blog.ts` |
| Contact form service options | `src/lib/validations/contact.ts` |
| Home FAQ | `src/components/service-faq.tsx` |

The header, footer, service cards, spotlights and sitemap are all generated from these data files, so adding a service or city in one place updates every page.

## Before launch: replace the placeholders

- [ ] Phone, email and domain in `src/lib/site.ts` (currently 780-000-0000, info@cliffssecurity.ca, cliffssecurity.ca)
- [ ] Social profile URLs in `siteConfig.social`. Empty entries are hidden, both in the footer and in the JSON-LD.
- [ ] Photos in `public/images/security/`. They are copied from Guardium Security and show Guardium uniforms, the "G" badge and the 1-888-770-0010 vehicle livery.
- [x] Logo: `public/cliffs_logo.jpg` is the Cliffs Security Services source logo. The site uses `public/cliffs_logo-transparent.png`, a transparent cut of it. If the JPG changes, regenerate the PNG.
- [ ] Testimonials: `src/components/testimonials.tsx` has placeholder reviews only. Replace them with real reviews, then set `SHOW_TESTIMONIALS = true` in `src/lib/site.ts`.
- [ ] Contact form keys in `.env.local`. See `.env.example`: Web3Forms access key and form ID, Turnstile site and secret keys, and the GA4 ID. Without the Turnstile key the form shows a "call us" fallback.

## SEO before and after launch

- [ ] Replace the placeholders above first: the domain drives every canonical URL, the sitemap and the structured data, and the phone appears in the JSON-LD and `public/llms.txt`.
- [ ] Replace the Guardium photos, including the social share image `public/images/og/cliffs-security-og.jpg` (1200x630).
- [ ] Create and verify a Google Business Profile at the Roper Rd address with the same name, phone and hours. Then add the profile link to `siteConfig.social` (or `sameAs`) and uncomment `hasMap` and add `geo` in `src/lib/structured-data.ts`.
- [ ] Submit `https://<domain>/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
- [ ] Collect real Google reviews and turn testimonials on.
- [ ] Keyword map, titles and the renamed service URLs are documented in `docs/superpowers/specs/2026-11-10-brand-colors-mobile-design.md` (SEO section). Old URLs `/services/static-guards` and `/services/private-protection` redirect permanently in `next.config.ts`.
