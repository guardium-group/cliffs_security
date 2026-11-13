# Brand colors + mobile consistency pass

Date: 2026-11-10. Approved in chat.

## Goal
Replace colors that don't match the logo with the supplied palette without drifting from the red brand, and make type, spacing and styling consistent across phones and tablets.

## Colors
Logo red `#e81e25` stays the primary (buttons, highlights, focus ring, map markers).

| Role | Old | New |
| --- | --- | --- |
| Dark sections, gradients (`brand-dark`) | `#3e000c` | `#143642` (changed from `#231651` on 2026-11-10: the indigo read purple next to the red) |
| Headings / near-black text (`text-gray-900`, `text-gray-950`), map tooltip | gray-900 / `#111827` | `#143642` (`brand-ink`) |
| Success state (`text-green-700`) | green-700 | `#28502E` (`brand-success`) |
| Inline text links inside body copy | red | `#0072BB` (`brand-link`) |

`#6610F2` is not used. White, grays (other than headings), `red-50` tints, red error states and amber stars stay as they are.

Red text on `#231651` is 3.56:1, so it is fine for large or bold text. Small red text on indigo must be checked and, where it is body-size, switched to white/opacity.

## Mobile standard
- Page gutters: `px-5 sm:px-6`.
- Standard section padding: `py-16 sm:py-24`.
- h1: `text-4xl sm:text-5xl lg:text-6xl`.
- Section h2: `text-3xl sm:text-4xl`. Sub-section h2: `text-2xl sm:text-3xl`.
- No text smaller than `text-xs` (12px).
- `text-wrap-balance` (undefined, no-op) becomes `text-balance`.
- Form inputs at least 16px (`text-base`) so iOS doesn't zoom on focus.
- Interactive controls at least 44px tall.
- `scroll-padding-top` matches the real header height.

## Verification
Screenshot every route at 320, 360, 390, 430, 768, 820 and 1024px in Chrome. Fix horizontal overflow, cramped spacing and awkward wraps. `npm run lint` and `npm run build` must pass.

## Decisions made during implementation
- Added `primary-on-dark` (`#ff5a5f`, 5.3:1 on indigo). It is the logo red lifted for small red labels on dark sections, where `#e81e25` only reaches 3.56:1.
- The body `--foreground` token now points at `#143642` as well.
- The cookie banner and the hero eyebrows/status dot used lime. They now use brand red and the indigo surface.
- White text on indigo at `/25` to `/50` opacity (2.2:1 to 4.9:1) was raised to `/60` (6.5:1). The decorative breadcrumb chevron stays at `/20`.
- Home hero at 320px: the text column gets `min-w-0`, and below 360px the call button drops the "24/7 - " prefix, so the nowrap button no longer pushes the copy off-screen.
- Footer: below 640px the service-area list spans the full width and comes last ("Fort Saskatchewan" collided with "Stony Plain").
- Legal-page h2s stay at `text-2xl`. They are prose subsection headings and already consistent with each other.
- Tap targets: buttons default to `h-11`, the mobile menu toggle and menu links are at least 44px, contact checkbox rows are 44px, location chips are 38px, and carousel dots have a 44px-tall pseudo hit area.

## Verification results
- A DevTools-protocol audit (`scratchpad/audit/audit.mjs`) ran on 11 routes at all 7 widths. It found no horizontal scroll, no text under 12px and no inputs under 16px.
- Screen-by-screen screenshots were reviewed at 320, 390 and 768px.
- `eslint`, `tsc --noEmit` and `next build` pass.

## Rollback
The baseline copy of `src/` is in the session scratchpad (`src-backup-baseline`). A git baseline commit is still pending, because the classifier blocked it.

## Follow-up: buttons and the "Why" split (2026-11-10)
- **Buttons** (`components/ui/button.tsx`):
  - `default` is a logo-red gradient (`primary` to `primary-deep #c4121a`) with a red glow and a lift on hover. The lift only applies when the viewer hasn't asked for reduced motion (`motion-safe`).
  - `secondary` is solid teal `#143642` with white text, used on light sections.
  - `inverse` is solid white with teal text, used on dark sections and photos.
  - One-off color overrides were removed from the hero, the CTA carousel, the spotlights, the 404 page and the header. The detail-page dispatch cards now use `buttonVariants`.
- **Why Cliffs Security split:**
  - `why-choose-us.tsx` keeps the heading, the blurb and the stats (dark, after Services).
  - The four feature cards moved to the new `our-standards.tsx` ("What you get on every site."), a light grey section between the service spotlights and the service areas.

## SEO pass (2026-11-10)
**Keyword priorities.** These are inferred from what Edmonton competitors (Paladin, GardaWorld, Allied, G4U, Central, World Guardian) rank for, not from measured search volume.

| Page | Primary keyword | Title |
| --- | --- | --- |
| Home | security company Edmonton | Security Company in Edmonton \| Cliffs Security |
| /services | security services Edmonton | Security Services in Edmonton |
| /services/security-guards (was static-guards) | security guards Edmonton | Security Guards in Edmonton |
| /services/mobile-patrols | mobile patrol security Edmonton | Mobile Patrol Security in Edmonton |
| /services/event-security | event security Edmonton | Event Security in Edmonton |
| /services/fire-watch | fire watch security Edmonton | Fire Watch Security in Edmonton |
| /services/executive-protection (was private-protection) | executive protection Edmonton | Executive Protection in Edmonton |
| /services/cctv-access-control | remote video monitoring Edmonton | Remote Video Monitoring in Edmonton |
| City pages | security guards {city} | Security Guards & Patrols in {City} (or Security Guards in {City} if too long) |

**Metadata.**
- `src/lib/seo.ts` `pageMetadata()` builds the title, description, canonical, full Open Graph and Twitter tags for every page. Next replaces the layout's Open Graph object instead of merging it, so each page needs the full set.
- Titles are 60 characters or less and descriptions 160 or less. This is checked by `scratchpad/seo-audit.mjs` against every sitemap URL.
- Blog posts can set a shorter `seoTitle`.

**Headings.**
- The home page's h1 is "Security company in Edmonton". The rotating slogan is now a styled `<p>`.
- The breadcrumb-hero h1s carry keywords.
- The footer link labels are `<p>`.

**Structured data.**
- One `LocalBusiness`, with a logo and without the fake geo.
- Home adds `Organization` and `WebSite`.
- City pages use a `Service` node that points at the business, instead of duplicating it.
- Blog dates are date-only.

**Content.**
- Unique sections, description and FAQs for Sherwood Park, St. Albert, Spruce Grove, Leduc (with Nisku) and Fort Saskatchewan.
- New posts: `fire-watch-requirements-alberta` and `security-guard-cost-edmonton` (no prices quoted).

**Redirects.** `/services/static-guards` and `/services/private-protection` return permanent 308s.
