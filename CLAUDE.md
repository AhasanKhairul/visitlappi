# CLAUDE.md — VisitLappi.com Project Rules

## Project Purpose
VisitLappi.com is an independent, editorially credible travel discovery platform for Finnish Lapland — not a Finnra advertising site, not an official DMO. It combines destination/experience discovery, editorial storytelling, and a growing commercial layer (Finnra CTAs now, booking engine later). See `PROJECT_ARCHITECTURE.md` for the full system design.

## Architecture (see PROJECT_ARCHITECTURE.md for detail)
- WordPress (headless, custom post types) = editorial content source of truth.
- Next.js (App Router, TypeScript, RSC) = presentation + application logic.
- Supabase (Postgres) = application data only (favorites, leads, quote requests) — never a duplicate of WP content.
- Commercial integrations (Finnra, future partners) go through a provider abstraction, never hard-coded into components.

## Coding Standards
- TypeScript strict mode. No `any` without a comment justifying it.
- No component directly calls WPGraphQL, Supabase, or a third-party API — always go through `/lib/cms`, `/lib/data`, or `/lib/providers`.
- No hard-coded destination names, prices, or Finnra copy in components — these come from the CMS or a CMS-editable CTA config, per spec §37/§56.
- Every feature needs loading, empty, and error states before it's considered done.
- Prefer Server Components; justify each Client Component boundary in a code comment if it isn't obviously interactive.
- Keep components single-purpose; extract before a component exceeds ~200 lines or mixes data-fetching with heavy presentation logic.

## CMS Rules
- Content types are code-defined (versioned in Git), not created ad hoc via CMS UI, unless the open decision in `PROJECT_ARCHITECTURE.md` §12 is revisited.
- Every relationship between entities (destination↔experience, article↔destination, etc.) is a structured field, never inferred from text or slugs.
- Every content type carries `last_reviewed_date` and `updated_date`; these display on the frontend for practical-information content (§42).

## SEO Rules
- URLs must match the structure in `SEO_ARCHITECTURE.md` exactly — no ad hoc route naming.
- Every filtered/faceted URL needs an explicit canonical decision before it ships (index vs noindex, canonical target) — see `SEO_ARCHITECTURE.md` §Faceted Search.
- No new destination or city page ships without genuinely destination-specific content in the required fields (not just a templated shell) — this is a hard content-quality gate, not a style preference (spec §53, §81).
- Structured data must match actual page content — never add schema "for SEO" that doesn't correspond to real fields.

## Security Rules
- No secret, API key, or credential is ever committed. All via environment variables, server-side only unless explicitly a public key.
- All external-facing API routes (`/api/quotes`, `/api/newsletter`, `/api/search`) validate input (Zod or equivalent) and are rate-limited.
- Admin routes/roles require 2FA where the platform (WP) supports it.

## Design Rules
- All spacing, color, radius, shadow, and animation values come from the design tokens in `DESIGN_SYSTEM.md` — no arbitrary Tailwind magic values scattered through components.
- Respect `prefers-reduced-motion` on every animation/hover effect.
- Mobile-first: build and test the mobile layout before the desktop layout, not after.

## Content Rules
- No mass-generated thin content. AI may assist drafting, but every published page needs a named human editor of record.
- No duplicating an article across destinations with only the place name swapped.
- Reviews are never scraped from third parties.

## Finnra Integration Rules
- Finnra CTAs are contextual and CMS-editable, never hard-coded marketing copy in a component (spec §37).
- Finnra must never dominate a page's content or the footer (spec §50).
- No page exists solely to rank for a Finnra-related keyword with thin content wrapped around a link (spec §4, §53).
- All Finnra data access goes through the provider abstraction in `/lib/providers` — Finnra's actual integration today is a quote-request form relaying to their existing Formspree/EmailJS setup, not a live API (see Risks in `PROJECT_ARCHITECTURE.md`).

## Testing Rules
- New utilities/business logic (filters, data transforms) need unit tests.
- CMS integration, search, forms, and the quote-request flow need integration tests.
- Core user journeys (homepage → destination → experience → filter → article) need E2E coverage before a release is considered done.
- A Core Web Vitals regression is treated as a bug, not a follow-up.

## Deployment Rules
- Three environments: development, staging, production — no shared secrets between them.
- Nothing reaches production without: tests passing, build succeeding, lint clean, env vars verified, sitemap/robots checked.
- Commits are scoped and conventionally labeled (`feat:`, `fix:`, `perf:`, `seo:`) — no unrelated changes bundled together.

## Claude's Working Process on This Project
1. Read this file and `PROJECT_ARCHITECTURE.md` before starting any task.
2. Inspect the relevant existing code before writing new code.
3. State the plan for anything non-trivial before implementing it.
4. Implement incrementally — do not attempt the whole roadmap in one pass.
5. Run tests/lint/typecheck before declaring a task done.
6. Update this file and the architecture docs when a real architectural decision changes — don't let docs drift from reality.
7. Never rewrite working code without a stated reason.
