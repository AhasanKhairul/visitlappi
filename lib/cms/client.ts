// Thin fetch wrapper around the WordPress/WPGraphQL endpoint. Every CMS
// data function in /lib/cms goes through this — no component or page
// calls WPGraphQL directly (see PROJECT_ARCHITECTURE.md §5).

const WORDPRESS_API_URL =
  process.env.WORDPRESS_API_URL || "https://cms.visitlappi.com/graphql";

export class CmsFetchError extends Error {}

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  revalidateSeconds = 3600
): Promise<T> {
  const res = await fetch(WORDPRESS_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: revalidateSeconds },
  });

  if (!res.ok) {
    throw new CmsFetchError(`WPGraphQL request failed: ${res.status}`);
  }

  const json = await res.json();

  if (json.errors) {
    console.error("WPGraphQL errors:", JSON.stringify(json.errors, null, 2));
    throw new CmsFetchError(
      json.errors.map((e: { message: string }) => e.message).join("; ")
    );
  }

  return json.data as T;
}
