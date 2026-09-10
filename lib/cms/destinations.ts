import { fetchGraphQL, CmsFetchError } from "./client";
import { destinations as fixtureDestinations } from "@/lib/fixtures/destinations";
import type { Destination } from "@/lib/types/content";

const DESTINATION_FIELDS = `
  title
  slug
  destinationDetails {
    shortDescription
    fullDescription
    heroImage {
      node {
        sourceUrl
        altText
      }
    }
    municipality
    latitude
    longitude
    bestTimeToVisit
  }
`;

type RawDestination = {
  title: string;
  slug: string;
  destinationDetails: {
    shortDescription?: string | null;
    fullDescription?: string | null;
    heroImage?: { node?: { sourceUrl?: string; altText?: string } } | null;
    municipality?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    bestTimeToVisit?: string | null;
  } | null;
};

function mapDestination(raw: RawDestination): Destination {
  const d = raw.destinationDetails;
  return {
    slug: raw.slug,
    title: raw.title,
    region: d?.municipality || "",
    coordinates: { lat: d?.latitude || 0, lng: d?.longitude || 0 },
    shortDescription: d?.shortDescription || "",
    fullDescription: d?.fullDescription || undefined,
    heroImage: "aurora", // fallback gradient tone if no real photo
    heroImageUrl: d?.heroImage?.node?.sourceUrl,
    heroImageAlt: d?.heroImage?.node?.altText || raw.title,
    bestTimeToVisit: d?.bestTimeToVisit || "",
    seasons: [],
    activityCount: 0,
  };
}

/**
 * All published destinations from WordPress. Falls back to the local
 * fixture list if the CMS is unreachable, so a temporary WordPress outage
 * doesn't take down the whole site build.
 */
export async function getAllDestinations(): Promise<Destination[]> {
  try {
    const data = await fetchGraphQL<{
      destinations: { nodes: RawDestination[] };
    }>(`
      query AllDestinations {
        destinations(first: 100) {
          nodes { ${DESTINATION_FIELDS} }
        }
      }
    `);
    if (!data.destinations.nodes.length) return fixtureDestinations;
    return data.destinations.nodes.map(mapDestination);
  } catch (err) {
    console.error("getAllDestinations: falling back to fixtures.", err);
    return fixtureDestinations;
  }
}

/** A single destination by slug. Returns null if not found in the CMS at all. */
export async function getDestinationBySlug(
  slug: string
): Promise<Destination | null> {
  try {
    const data = await fetchGraphQL<{ destination: RawDestination | null }>(
      `
      query DestinationBySlug($slug: ID!) {
        destination(id: $slug, idType: SLUG) { ${DESTINATION_FIELDS} }
      }
    `,
      { slug }
    );
    if (!data.destination) return null;
    return mapDestination(data.destination);
  } catch (err) {
    if (err instanceof CmsFetchError) {
      console.error(`getDestinationBySlug(${slug}) failed.`, err);
    }
    // Fall back to fixture data for this slug, if it exists there.
    return fixtureDestinations.find((d) => d.slug === slug) || null;
  }
}
