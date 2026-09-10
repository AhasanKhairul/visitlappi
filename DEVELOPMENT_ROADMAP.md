# VisitLappi.com — Development Roadmap

Each phase should end with something reviewable — not just code, a working increment. Phases are sequential but 1–2 and 3 can overlap once the content model is approved (frontend can build against mock/fixture data while WP is stood up).

## Phase 0 — Discovery ✅ (this document set)
Deliverables: `PROJECT_ARCHITECTURE.md`, `CLAUDE.md`, `CONTENT_MODEL.md`, `SEO_ARCHITECTURE.md`, `DESIGN_SYSTEM.md`, this roadmap. **Gate: your approval of the open decisions in `PROJECT_ARCHITECTURE.md` §12 before Phase 1 starts.**

## Phase 1 — Design System
Typography, color, spacing, buttons, cards, nav, responsive rules, motion, accessibility states — built as actual code (Tailwind config + a component style guide page), not just documented.

## Phase 2 — Core Frontend
Homepage (modular sections per spec §16), header, footer, destination pages, article pages, experience listing + detail — built initially against fixture/mock content so frontend isn't blocked on CMS setup.

## Phase 3 — CMS
WordPress instance, code-defined custom post types/fields/taxonomies per `CONTENT_MODEL.md`, WPGraphQL, webhook-based revalidation into Next.js. Swap Phase 2's fixture data for real CMS data.

## Phase 4 — Search & Filtering
Search index setup (Algolia/Meilisearch — pending decision), global search with autocomplete, experience filters with the canonical/indexing rules from `SEO_ARCHITECTURE.md`, event filtering.

## Phase 5 — Map
Interactive Lapland map (destinations, attractions, experiences, transport hubs), marker → preview card, mobile list-view alternative.

## Phase 6 — Routes & Trip Planning
Route pages and itinerary templates; a static/template-driven version of the trip planner (§23) — no AI personalization yet, just structured recommended itineraries.

## Phase 7 — Finnra Integration
Contextual CTA components (CMS-editable), the quote-request form (§67) wired to Finnra's existing intake (Formspree/EmailJS today — see Risks in `PROJECT_ARCHITECTURE.md`), and the `ExperienceProvider`/`BookingProvider`/`TransferProvider` abstraction so a real Finnra API can slot in later without a rewrite.

## Phase 8 — SEO & Performance
Full metadata/schema rollout, sitemap/robots finalization, Core Web Vitals tuning, image/video optimization pass across everything built so far.

## Phase 9 — Testing
Unit tests (utilities, filters), integration tests (CMS/API, search, forms, quote flow), E2E (homepage → destination → experience → filter → article), accessibility audit, SEO validation pass, security review.

## Phase 10 — Launch
Production environment finalized, domain + Cloudflare DNS/CDN live, monitoring/error tracking, backups, GA4 + Search Console verified, final pre-launch checklist from `PROJECT_ARCHITECTURE.md` §10.

---

## Explicitly Deferred (not in initial roadmap, architecture prepared but not built)
- Full booking/payment engine (§66) — booking links/enquiry/external booking only, initially.
- AI travel assistant (§65) — content structure supports it later; not built now.
- User accounts, saved favorites, reviews (§24, §25) — Supabase Auth is the planned path; deferred until there's a reason to require registration.
- Multilingual content beyond English (§43) — i18n *architecture* is in place from Phase 1 so this isn't a later rewrite, but Finnish/German/etc. content itself is a content-production decision, not a Phase 0–10 engineering task.
- Partner marketplace / partner dashboard (§39) — data model allows for it; UI is future work.
