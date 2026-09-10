# VisitLappi.com — Frontend (Phase 1 + Phase 2 slice)

This is a working Next.js scaffold implementing the design system
(Phase 1) and the first slice of the core frontend (Phase 2) from
`DEVELOPMENT_ROADMAP.md`: homepage, destination directory, destination
detail pages, and experience listing pages, running against typed
fixture data that mirrors the shape defined in `CONTENT_MODEL.md`.

## What's real vs. what's a stand-in

- **Real:** the Next.js App Router structure, TypeScript types, Tailwind
  v4 design tokens, all components, routing, and static generation.
- **Stand-in:** `lib/fixtures/*` plays the role WPGraphQL will play once
  WordPress is stood up (Phase 3). Swapping fixtures for a real
  `lib/cms` data-access layer should not require touching components —
  that's the point of the CMS/frontend separation in
  `PROJECT_ARCHITECTURE.md` §6.
- **Stand-in:** `PhotoBlock` renders abstract gradient placeholders
  instead of real photography, since no licensed Lapland photography
  was available to use. Swap for `next/image` against the WP media
  library in Phase 3/§8.
- **Environment-specific:** `app/layout.tsx` uses a system-font fallback
  instead of `next/font/google` because this build ran in a sandbox
  with no access to fonts.googleapis.com. The file has the exact
  `next/font/google` block to restore, commented inline — do this
  first in a normal dev environment.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build — verified passing
npx eslint .      # verified clean
```

## Structure

```
app/                    routes (App Router)
  destinations/          directory + [slug] detail page
  experiences/[destination]/   listing page with filter UI (not yet wired)
components/
  layout/                header, footer
  sections/               homepage sections (hero, popular destinations, etc.)
  ui/                     cards, search box, photo placeholder
lib/
  types/content.ts        types mirroring CONTENT_MODEL.md
  fixtures/               placeholder data standing in for WPGraphQL
```

## Design decisions worth knowing about

Palette, type pairing (Newsreader/Archivo), and the coordinate-label
motif (`66°33'N`) were chosen deliberately to read as Arctic-specific
rather than a generic travel/SaaS template — see `DESIGN_SYSTEM.md`
for the full token rationale.

## Not yet built

Experience detail pages, article/story pages, routes, events, map,
search, trip planner, Finnra quote-request form logic (the CTA UI
exists on the destination page; it currently just links out), auth,
and everything else still in `DEVELOPMENT_ROADMAP.md` Phase 3 onward.
