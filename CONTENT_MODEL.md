# VisitLappi.com — Content Model

All types below are WordPress custom post types (code-defined) with ACF field groups. Relationship fields are bidirectional where noted — implement via ACF Bidirectional Relationship (or query the inverse side at build time in Next.js, cached).

## Shared SEO field group (attached to every content type)
`seo_title`, `meta_description`, `canonical_url`, `social_image`, `noindex` (bool), `nofollow` (bool)

## Shared freshness field group (attached to destination, article, route — anything with "practical info")
`published_date`, `updated_date`, `last_reviewed_date`, `author`, `editor`

---

### Destination
`title`, `slug`, `short_description`, `full_description` (rich text), `hero_image`, `gallery` (media[]), `hero_video`, `region` (taxonomy), `municipality`, `coordinates` (lat/lng), `population` (optional), `best_time_to_visit`, `seasons` (taxonomy, multi), `things_to_do` (relationship → experience/attraction), `attractions` (relationship → attraction), `experiences` (relationship → experience), `restaurants` (relationship → business, category=restaurant), `accommodation` (relationship → business, category=hotel/cabin), `transportation` (rich text or structured sub-fields: airport, bus, train, car), `events` (relationship → event), `related_destinations` (relationship → destination), `related_articles` (relationship → article), `faq` (repeater: question/answer)

### Experience
`title`, `slug`, `short_description`, `full_description`, `destination` (relationship → destination), `category` / `subcategory` (taxonomy), `hero_image`, `gallery`, `video`, `duration`, `price`, `currency`, `rating`, `review_count`, `season` (taxonomy), `difficulty`, `age_requirement`, `family_friendly` (bool), `group_type` (private/group), `pickup_available` (bool), `meeting_point`, `coordinates`, `included` (repeater), `excluded` (repeater), `what_to_bring` (repeater), `requirements`, `accessibility`, `cancellation_policy`, `operator` (relationship → business), `booking_url`, `booking_provider` (select — internal enum matching the provider abstraction), `featured` (bool), `verified` (bool)

### Attraction
`title`, `destination` (relationship), `description`, `images`, `video`, `location`/`coordinates`, `opening_information`, `price`, `accessibility`, `website`, `related_experiences` (relationship), `related_articles` (relationship)

### Article
`title`, `slug`, `subtitle`, `author`, `editor`, `hero_image`, `gallery`, `video`, `body` (rich text), `destination` (relationship, multi), `categories`/`tags` (taxonomy), `seasons` (taxonomy), `related_destinations`, `related_experiences`, `related_attractions`, `related_routes` (all relationship fields), `faq` (repeater)

### Route
`title`, `description`, `starting_point`/`ending_point` (relationship → destination or free text), `duration`, `distance`, `recommended_season` (taxonomy), `map` (derived from stop coordinates), `stops` (repeater: destination/attraction relationship + note), `destinations`, `attractions`, `accommodation`, `restaurants`, `activities` (all relationship fields), `transportation`, `gallery`, `video`, `itinerary` (repeater: day number, title, description, linked entities)

### Event
`title` (`event_name`), `slug`, `description`, `date`, `start_time`/`end_time`, `location`/`coordinates`, `organizer`, `ticket_information`, `website`, `image`, `video`, `destination` (relationship), `category` (taxonomy), `recurring` (bool + recurrence rule if true)

### Business / Operator
`name`, `description`, `category` (taxonomy: tour operator, restaurant, hotel, cabin, transportation, guide, attraction, equipment rental, sauna, other), `destination` (relationship), `address`, `coordinates`, `website`, `contact`, `social_links` (repeater), `images`, `booking_url`, `verified` (bool), `partner` (bool), `featured` (bool), `editorial_notes` (internal only — never rendered publicly)

### Media (extension on native WP attachment, via ACF on attachment)
Images: `title`, `description`, `alt_text` (native), `caption`, `photographer`, `copyright`, `source`, `location`, `destination` (relationship), `season` (taxonomy), `tags`, `focal_point` (x/y)
Videos: `title`, `description`, `thumbnail`, `video_source` (upload or external embed URL), `caption`, `copyright`, `destination`, `season`, `tags`

---

## Taxonomies (shared across types where applicable)
- `region` — Rovaniemi, Levi, Ylläs, Saariselkä, Inari, Ivalo, Pyhä-Luosto, Salla, Kittilä, Muonio, Enontekiö, Utsjoki, Sodankylä, Kemijärvi, Ranua, Posio, Kemi, Tornio, Kuusamo/Ruka, Hailuoto, + extensible for future additions.
- `season` — winter, spring, summer, autumn + special tags: northern-lights, midnight-sun, ruska, christmas, ski-season, hiking-season.
- `experience_category` / `experience_subcategory` — per §18 UX patterns (e.g. Aurora, Husky/Reindeer, Snowmobile, Hiking, Culture, Family).
- `article_category` / `article_tag`

## Relationship Graph (implements spec §27)
```
Destination → Experience, Attraction, Article, Route, Event, Business
Experience  → Destination, Business (operator)
Attraction  → Destination
Article     → Destination, Experience, Attraction, Route
Route       → Destination (multi, via stops)
Event       → Destination
```
This graph must be queryable in both directions via WPGraphQL — e.g. "all articles referencing this destination" is as important as "this article's destination."

## Non-negotiable content-quality gate
A destination page cannot publish with only `title`, `short_description`, and `hero_image` filled — `full_description`, `things_to_do`, `transportation`, and at least one `faq` entry are required fields at the CMS level, specifically to prevent the "thin templated city page" failure mode the spec forbids (§53, §81).
