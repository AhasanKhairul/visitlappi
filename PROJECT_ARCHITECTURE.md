# VisitLappi.com — Project Architecture

## 1. Current State (Phase 0 findings)

No existing repository, codebase, CMS, database, or deployment was found for VisitLappi.com. This is a **greenfield build**.

Relevant context from the surrounding ecosystem:
- Finnra Network Oy's own site (finnranetwork.com) is a vanilla HTML/CSS/JS SPA using Supabase (data + storage), EmailJS and Formspree (forms), with clean URL routing and OG metadata already in place.
- Finnra's stack has **no WordPress, no Next.js, no headless CMS** — VisitLappi will not inherit any infrastructure from Finnra; it is a new build that will *link to* Finnra commercially, not share a codebase.
- No design system, auth, or API layer exists yet on either side that VisitLappi can reuse directly. Any Finnra integration must go through a small service layer (Section 8) rather than assuming shared internals.

**Implication:** every choice below is a proposal for approval, not a description of what's already running.

## 2. Proposed Architecture Summary

```
┌─────────────────────────────────────────────────────────┐
│  Editorial Layer — WordPress (headless, custom post types)│
└───────────────────────────┬─────────────────────────────┘
                            │ WPGraphQL / REST
┌───────────────────────────▼─────────────────────────────┐
│  Presentation Layer — Next.js (App Router, TS, RSC)       │
│  - SSG/ISR for content pages, SSR for search/filters       │
└───────────────────────────┬─────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
  Application data    Search index         Provider layer
  (Supabase/Postgres) (Algolia/Meilisearch)  (Finnra, future
  - favorites, leads,                         partners, booking)
    quote requests
```

Core separation of concerns (per spec §6):
- **Editorial content** → WordPress. Anything an editor writes or curates.
- **Public presentation** → Next.js. Rendering, routing, SEO, performance.
- **Application functionality** → Next.js API routes / small services. Search, favorites, quote requests, session state.
- **Commercial integrations** → an isolated provider layer (`ExperienceProvider`, `BookingProvider`, `TransferProvider` interfaces) so Finnra — or any future partner — is a plug-in, not baked into components.

## 3. Technology Choices

| Layer | Choice | Rationale |
|---|---|---|
| Frontend | Next.js 15, App Router, TypeScript, React Server Components | SSR/SSG/ISR mix needed for both editorial pages (cacheable) and filtered experience search (dynamic); best-supported on Vercel |
| Styling | Tailwind CSS + a small token layer (CSS variables) | Fast to build consistently, avoids ad hoc CSS, plays well with a documented design system |
| CMS | WordPress (headless), custom post types instead of generic posts | Meets the non-technical editor requirement (§40) without building a bespoke admin |
| CMS↔Frontend | WPGraphQL (preferred) or REST as fallback | GraphQL lets Next.js request exactly the related-entity graph (destination → experiences → operator) in one query |
| App database | Supabase (Postgres) | Only for things WordPress shouldn't own: favorites, quote requests, search analytics events, future accounts/reviews |
| Search | Algolia or Meilisearch, indexed from WP on publish/update via webhook | WP's native search can't do the typo-tolerant, cross-entity, faceted search in §21 |
| Media | WP media library + Cloudflare Images or a similar transform CDN | Automatic AVIF/WebP, responsive variants, without hand-rolled image pipelines |
| Maps | MapLibre GL (self-hosted style) or Mapbox GL | Interactive marker clustering, mobile-safe, avoids Google Maps licensing costs at scale |
| Deployment | Vercel (frontend), managed WP hosting (e.g. WordPress VIP-tier or a solid managed host) with staging | Matches spec §5/§74; separates content infra failure domain from frontend |
| DNS/CDN/security | Cloudflare in front of both | WAF, caching, DDoS protection for the WP origin especially |
| Source control | GitHub, two repos or a monorepo with `apps/web` + `apps/wp-theme-or-plugin` | Keeps WP plugin/theme code versioned alongside the frontend |

**Open decision, not yet made:** GraphQL vs REST for WP, and Algolia vs Meilisearch (cost vs self-hosting trade-off) — flagged in Section 12.

## 4. CMS Architecture

WordPress functions purely as a **structured content API**, not as the rendering layer.

- Custom Post Types: `destination`, `experience`, `attraction`, `article`, `route`, `event`, `business`, plus `author` (or use WP users) and a `media` extension layer on top of the native media library.
- Custom Taxonomies: `region`, `season` (winter/spring/summer/autumn + special tags: northern-lights, midnight-sun, ruska, christmas, ski-season, hiking-season), `category` (per-entity, e.g. experience category/subcategory), `destination-relation` (for cross-linking where a plain field isn't enough).
- Relationships implemented via ACF Pro "Relationship"/"Post Object" fields (or equivalent) — never by parsing free text.
- SEO fields: either build a lightweight custom meta box (title, meta description, canonical, social image, index/noindex, follow/nofollow) rather than pulling in a full SEO plugin's opinionated schema output, since schema needs to match VisitLappi's actual content types (§29, §62).
- Editorial workflow: WP's native Draft → Pending Review → Scheduled → Published states, extended with two custom fields: `last_reviewed_date` and `updated_date` (auto-set on save, editable), to support the freshness requirement (§42).
- Recommended plugins: Advanced Custom Fields (Pro), WPGraphQL (+ WPGraphQL for ACF), Custom Post Type UI (or code-defined CPTs — see open decision below), a webhook plugin (or custom code) to notify Next.js/the search index on publish.

**Open decision:** code-defined CPTs/fields (versioned in Git, no CMS UI for schema changes) vs UI-defined via CPT UI/ACF. Recommendation: code-defined for maintainability, since this project explicitly prioritizes long-term developer sanity over a GUI-configurable schema. Flagged for approval.

## 5. Frontend Architecture

- App Router with route groups separating editorial routes (`/destinations`, `/things-to-do`, `/guides`, `/stories`) from application routes (`/experiences` with filters, `/search`, `/plan`).
- Rendering strategy per content type:
  - Destination/Attraction/Article/Route pages: **SSG + ISR** (revalidate on-demand via WP webhook, plus a time-based fallback, e.g. 1 hour).
  - Experience listing with filters: **SSR** for the initial filtered state (so filters are crawlable and shareable via URL), client-side refinement afterward.
  - Search: **client-rendered** results against the search index, but the empty/landing search page itself is static.
- Server Components by default; Client Components only where interaction requires it (filters, map, gallery, forms, favorites).
- Data fetching: a typed data-access layer (`/lib/cms/*`) wrapping WPGraphQL queries, so no component talks to WordPress directly — this is what makes "redesign frontend without rebuilding CMS" (§6) actually true.
- i18n: `next-intl` or App Router's built-in i18n routing from day one, even with only `en` live, so no string is ever hard-coded English inside logic (§43).

## 6. API Architecture

Next.js route handlers under `/api/*`, one module per domain, each behind a typed service:

```
/api/search        -> queries the search index
/api/destinations  -> thin pass-through/cache layer over WP (mostly unnecessary if using ISR pages directly; used for the map/autocomplete)
/api/quotes         -> validates + stores a Finnra quote request (Supabase), then relays it (email/webhook) to Finnra
/api/newsletter     -> validates + forwards to the newsletter provider
/api/favorites      -> Supabase-backed, requires future auth
```

External/commercial calls never happen directly from client components — they go through these route handlers so keys stay server-side (§45, §57).

## 7. SEO Architecture (summary — full detail in SEO_ARCHITECTURE.md)

- Clean, verb-free URLs matching spec §28 exactly (`/destinations/rovaniemi/`, `/experiences/rovaniemi/northern-lights/`, etc.)
- Canonical + strict parameter handling on filtered experience pages to avoid the classic faceted-search duplicate-content trap (§19, §29).
- Structured data (JSON-LD) per content type: `TouristDestination`/`Place` for destinations, `TouristTrip` or `Product`+`Offer` (evaluate against Google's actual guidance at implementation time) for experiences, `Event` for events, `Article` for stories, `BreadcrumbList` sitewide.
- Sitemap: segmented XML sitemaps per content type, auto-generated from WP publish state, plus an image sitemap.

## 8. Media Architecture

- Single source of truth: WP media library, extended with the metadata fields in spec §14 (alt, caption, photographer, copyright, source, location, destination, season, tags, focal point) via ACF on the attachment.
- Delivery: Cloudflare Images (or `next/image` with a custom loader hitting a transform CDN) for AVIF/WebP + responsive `srcset`, lazy-loaded, with the WP-stored focal point respected in cropping.
- Video: self-hosted lightweight clips or YouTube/Vimeo click-to-load embeds with poster images — never autoplaying with sound, never eagerly loaded (§34, §72).

## 9. Authentication

- **Public site:** no auth required to browse (§24).
- **CMS:** standard WP auth for editors/admins, 2FA via a plugin (e.g. WP 2FA) for admin roles (§45).
- **Future user accounts** (favorites, saved itineraries, reviews): Supabase Auth, kept fully decoupled from WP user accounts — a site visitor is never a WP user.

## 10. Deployment

- Environments: `development` → `staging` → `production`, each with its own WP instance/DB and its own Vercel environment + env vars. No environment shares secrets.
- Pre-production checklist per spec §74 (tests, build, lint, env var check, API connectivity, sitemap/robots check, analytics, error monitoring) should become an actual CI gate, not a manual step.

## 11. Security

- All secrets in environment variables, never in the repo (§45). This includes WPGraphQL auth tokens if the WP instance requires them, search index admin keys, and Supabase service-role keys (server-only).
- Rate limiting on `/api/quotes`, `/api/newsletter`, `/api/search` to prevent abuse/spam.
- Input validation with a schema library (e.g. Zod) on every route handler.
- Cloudflare WAF in front of the WP origin, which is historically the more attacked surface of the two.

## 12. Open Decisions Requiring Your Approval

1. **WPGraphQL vs REST** for CMS↔frontend — recommend GraphQL.
2. **Search provider**: Algolia (managed, costs scale with usage) vs Meilisearch (self-hosted, more ops overhead) — recommend Meilisearch if you want to minimize recurring SaaS cost given this is a lean two-person-adjacent operation; Algolia if you want zero infra ops.
3. **Code-defined vs UI-defined WP content types/fields** — recommend code-defined.
4. **Maps provider**: MapLibre (free, self-hosted tiles) vs Mapbox (nicer defaults, has a free tier then costs) — recommend MapLibre to start, matching the "avoid unnecessary dependencies/cost" principle in the spec.
5. **Hosting for WordPress** — needs a decision on managed host vs self-managed (affects staging setup, backups, security patching cadence).
6. **Repository shape** — single monorepo (Next.js app + WP theme/plugin code) vs two repos. Recommend monorepo for a small team, so `CLAUDE.md` and shared docs apply to the whole project.

## 13. Risks

- **Scope risk:** this spec describes a multi-quarter platform (booking engine, AI trip planner, multilingual, partner marketplace) inside what should be an incremental build. Biggest risk is trying to build too much of Phase 6+ before Phase 1–4 content actually exists and earns traffic.
- **Content risk:** the spec explicitly (and correctly) forbids thin/duplicated SEO pages (§53, §81). With ~20 destinations named, there's real pressure to template-fill them; the content model must make genuinely destination-specific fields (transportation, best time to visit, local FAQ) mandatory, not optional, or editors will skip them under time pressure.
- **Integration risk:** Finnra's current stack (vanilla JS + Supabase) has no API to integrate against yet. The "Finnra API architecture" in spec §38 is aspirational — Phase 7 will realistically be CTAs + a quote-request form emailing/webhooking into Finnra's existing Formspree/EmailJS setup, not a real-time availability API, until Finnra's own backend is built out.
- **SEO risk on experience filters:** faceted URLs (§19) are a well-known duplicate-content and crawl-budget trap if canonicalization isn't strict from day one.
- **Single point of content failure:** if WP goes down, ISR pages keep serving stale content, but anything SSR (experience filters) degrades — worth deciding acceptable staleness windows per page type now.
