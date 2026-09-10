# VisitLappi.com — SEO Architecture

## URL Structure
```
/                                            homepage
/destinations/                               destination directory
/destinations/{slug}/                        destination page, e.g. /destinations/rovaniemi/
/things-to-do/{slug}/                        topic hub, e.g. /things-to-do/northern-lights/
/experiences/{destination-slug}/             experience listing, filterable
/experiences/{destination-slug}/{slug}/      experience detail
/routes/{slug}/                              route page, e.g. /routes/rovaniemi-to-inari/
/guides/{slug}/                              editorial guide/article
/events/                                     event directory
/events/{slug}/
/attractions/{slug}/
/businesses/{category}/{slug}/
/search/?q=
/about/, /contact/, /partners/, legal pages per §49
```
Rules: lowercase, hyphenated, trailing slash consistent, no query params in canonical entity URLs. Destination is always the primary segment for experience URLs (not category-first) so destination silos stay clean for crawlers.

## Faceted Search (Experience Filters) — §19 duplicate-content control
- Filter state lives in query params (`?category=aurora&duration=short`), which is correct for shareability, but:
  - Only a small, defined set of **single-filter** combinations get indexed (e.g. `?category=aurora` alone) — these get a self-referencing canonical.
  - **Multi-filter combinations** (category + duration + price, etc.) are `noindex, follow` and canonical to the unfiltered destination listing.
  - Sort params (`?sort=price`) never change canonical — always canonical to the unsorted URL.
  - This is implemented as a rule table in `/lib/seo/canonical.ts`, not ad hoc per-page logic.

## Technical SEO Checklist (per page type)
- Semantic HTML, single H1 per page, logical H2/H3 nesting.
- Canonical tag on every page (self-referencing unless the faceted rule above applies).
- `robots.txt` generated from a config file, not hand-edited per environment.
- XML sitemap: segmented by content type (`sitemap-destinations.xml`, `sitemap-experiences.xml`, etc.), regenerated on publish via WP webhook, plus an image sitemap.
- Breadcrumbs (`BreadcrumbList` schema) on every non-homepage page, reflecting the actual URL hierarchy.
- Open Graph + Twitter Card metadata sourced from the shared SEO field group in `CONTENT_MODEL.md`.
- 404 page that offers destination/search entry points, not a dead end.
- 301 redirect map maintained as a config file (old slug → new slug) whenever a URL changes — never silently break existing indexed URLs.

## Structured Data (JSON-LD) by content type
| Content type | Schema |
|---|---|
| Destination | `TouristDestination` (or `Place` if `TouristDestination` support is inconsistent at implementation time — verify against current Google guidance before building) |
| Experience | `Product` + `Offer` (price/currency/availability) — do **not** use `Product` review/rating markup unless reviews are real and verified (§25, §29: no schema decoration without real data) |
| Attraction | `TouristAttraction` |
| Article | `Article` |
| Route | `ItemList` of stops, or `Trip`-adjacent schema depending on final Google support |
| Event | `Event` |
| Business | `LocalBusiness` (subtype per category) |
| Every page | `BreadcrumbList`; homepage additionally `WebSite` + `SearchAction` |

Schema fields must map 1:1 to real CMS fields — if a field is empty, the schema property is omitted, never filled with a placeholder.

## Content Clusters (implements §52)
Each cluster has one pillar page (a `/things-to-do/{slug}/` hub) and multiple supporting entities (articles, destination sections, experiences) that link to and from it. Example — Northern Lights cluster:
- Pillar: `/things-to-do/northern-lights/`
- Supporting: `/guides/best-time-to-see-northern-lights/`, per-destination Aurora sections on Rovaniemi/Inari/etc. destination pages, Aurora-tagged experiences, an Aurora photography guide, an Aurora-with-children guide, Aurora FAQ.
- Internal linking between these is driven by the `season`/`category` taxonomy relationship, not manually maintained link lists — reduces the risk of clusters going stale.

Planned initial clusters: Northern Lights, Midnight Sun, Winter Activities (husky/reindeer/snowmobile), Getting to Lapland (airport/transport), Sámi Culture, Family Travel in Lapland.

## Anti-Doorway-Page Controls (§53, §81)
- CMS-level required fields (see `CONTENT_MODEL.md` non-negotiable gate) prevent a destination page from publishing as a thin shell.
- An editorial checklist item — "does this page provide value if the reader never clicks a Finnra link?" — is part of the publish workflow, not just a stated principle.
- No programmatic generation of near-duplicate destination or city pages from a template with only the place name swapped.

## Core Web Vitals Targets
- LCP < 2.5s, INP < 200ms, CLS < 0.1 on mobile 4G, measured via Lighthouse CI on every PR touching frontend routes, not just at launch.
