import { fetchGraphQL } from "./client";

export interface HomepageSettings {
  heroVideoUrl?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
}

type RawHomepageSettings = {
  homepageSetting?: {
    heroMedia?: {
      heroVideo?: { node?: { mediaItemUrl?: string } } | null;
      heroImage?: { node?: { sourceUrl?: string; altText?: string } } | null;
    } | null;
  } | null;
};

/** Falls back to an empty object (triggering the animated aurora effect) if unset or unreachable. */
export async function getHomepageSettings(): Promise<HomepageSettings> {
  try {
    const data = await fetchGraphQL<RawHomepageSettings>(
      `
      query HomepageSettings {
        homepageSetting(id: "main", idType: SLUG) {
          heroMedia {
            heroVideo {
              node {
                mediaItemUrl
              }
            }
            heroImage {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    `,
      undefined,
      60
    );
    const media = data.homepageSetting?.heroMedia;
    return {
      heroVideoUrl: media?.heroVideo?.node?.mediaItemUrl || undefined,
      heroImageUrl: media?.heroImage?.node?.sourceUrl || undefined,
      heroImageAlt: media?.heroImage?.node?.altText || undefined,
    };
  } catch (err) {
    console.error("getHomepageSettings: falling back to animated aurora.", err);
    return {};
  }
}
