// Shape mirrors CONTENT_MODEL.md. In production these come from WPGraphQL —
// fixtures here stand in for that data-access layer so the frontend can be
// built and reviewed before WordPress is stood up (Phase 2 running ahead of
// Phase 3, per DEVELOPMENT_ROADMAP.md).

export type Season =
  | "winter"
  | "spring"
  | "summer"
  | "autumn"
  | "northern-lights"
  | "midnight-sun"
  | "ruska";

export interface Destination {
  slug: string;
  title: string;
  region: string;
  coordinates: { lat: number; lng: number };
  shortDescription: string;
  heroImage: string;
  bestTimeToVisit: string;
  seasons: Season[];
  activityCount: number;
}

export interface Experience {
  slug: string;
  destinationSlug: string;
  title: string;
  category: string;
  heroImage: string;
  duration: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  freeCancellation: boolean;
  badges: string[];
}

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  destination: string;
  readTime: string;
  updatedDate: string;
}
