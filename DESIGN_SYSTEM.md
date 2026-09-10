# VisitLappi.com — Design System

## Visual Direction
Premium Nordic/Arctic travel — cinematic photography-led, generous whitespace, editorial confidence. Not a generic tourism template, not glassmorphism-heavy, not cluttered. Every visual choice should feel intentional to Lapland specifically (deep blues/near-blacks for polar night and aurora, warm accent for firelight/cabins, clean whites for snow) rather than a generic "travel site" palette — exact hex values to be finalized in a dedicated design pass, not hard-coded here.

## Tokens (implemented as CSS variables, consumed by Tailwind config — never bypassed with arbitrary values)

**Color roles** (not final hex — role definitions):
`--color-bg`, `--color-bg-elevated`, `--color-text-primary`, `--color-text-secondary`, `--color-accent` (aurora-inspired), `--color-accent-warm` (fire/cabin), `--color-border`, `--color-success`, `--color-warning`, `--color-error`. Dark-mode-adjacent "polar night" palette used for hero sections even in light mode, for atmosphere.

**Typography**
- Display/headline face: a confident serif or high-contrast sans for editorial gravitas (candidate: a serif like Fraunces or Newsreader for headlines, paired with a clean grotesk like Inter or General Sans for UI/body — final pairing to be selected in Phase 1).
- Scale: `--font-size-xs` through `--font-size-5xl`, fluid via `clamp()` for responsive headline sizing without separate mobile/desktop overrides.
- Line-height and letter-spacing tokens per scale step, not per-component overrides.

**Spacing** — 4px base unit scale (`--space-1` = 4px … `--space-24` = 96px), used for all padding/margin/gap; no arbitrary pixel values in components.

**Radius** — `--radius-sm` (buttons, inputs), `--radius-md` (cards), `--radius-lg` (hero/media containers), `--radius-full` (pills/avatars).

**Shadow** — `--shadow-sm` (resting card), `--shadow-md` (hover-elevated card), `--shadow-lg` (modals/overlays) — subtle, never heavy drop shadows.

**Breakpoints** — mobile-first: base (< 640px), `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px). Design and build mobile layout first per component.

**Animation timing** — `--ease-standard`, `--duration-fast` (120–150ms, hover states), `--duration-base` (200–250ms, card transitions), `--duration-slow` (400ms+, page/section reveals). All motion gated behind `prefers-reduced-motion: no-preference`.

## Component Interaction Patterns
- **Destination card:** image scales ~1.03–1.05 on hover, content shifts subtly upward, an arrow/chevron fades in. Mobile: tap navigates directly, no hover-dependent affordance required to use the card.
- **Experience card:** image zoom + card elevation (`shadow-sm` → `shadow-md`) + CTA color/underline transition on hover.
- **Navigation:** underline-draw animation on link hover, not color-only (for contrast/accessibility reasons too).
- **Buttons:** background/border transition on hover and a distinct, visible `:focus-visible` state (not removed for aesthetics).

## Core Reusable Components (spec §54)
Header, MobileNavigation, Hero, SearchBox, DestinationCard, ExperienceCard, ArticleCard, AttractionCard, RouteCard, EventCard, BusinessCard, MediaGallery, VideoPlayer, Map, FilterPanel, SearchResults, Breadcrumbs, Rating, ReviewList, FAQ, CTA, Newsletter, Footer.

Each ships with defined states: default, hover, focus, active, loading, empty, error/disabled — no component is "done" without these accounted for.

## Accessibility Baseline (non-negotiable, not a later pass)
- Keyboard navigation through nav, filters, galleries, and forms with a visible focus ring at every step.
- Color contrast meeting WCAG AA minimum for all text/background combinations in the token set — verified before tokens are finalized, not after.
- All interactive icons have accessible labels; all meaningful images have real (non-decorative-placeholder) alt text sourced from the CMS.
- Filter panel and map both have a fully keyboard/screen-reader-usable path, and the map has a non-map alternative (a list view) on mobile so it never blocks the primary content flow (§22, §31).

## What to Avoid
Generic default WordPress/Bootstrap look, excessive gradients or glassmorphism, decorative animation that isn't tied to user action, stock-photo-generic imagery in place of real Lapland photography.
