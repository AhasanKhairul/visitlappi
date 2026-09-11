import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllDestinations, getDestinationBySlug } from "@/lib/cms/destinations";
import { getExperiencesByDestination } from "@/lib/fixtures/experiences";
import { PhotoBlock } from "@/components/ui/photo-block";
import { ExperienceCard } from "@/components/ui/experience-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactButtons } from "@/components/ui/contact-buttons";

// New destinations published in WordPress after the last deploy still
// render correctly — Next.js generates their page on first visit and
// caches it, rather than 404ing until the next full redeploy.
export const dynamicParams = true;

export async function generateStaticParams() {
  const destinations = await getAllDestinations();
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) return {};
  return {
    title: destination.title,
    description: destination.shortDescription,
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) notFound();

  // Experience content isn't connected to the CMS yet — still fixture
  // data for this section until that pass is done.
  const relatedExperiences = getExperiencesByDestination(destination.slug);
  const lat = destination.coordinates.lat.toFixed(4);
  const lng = destination.coordinates.lng.toFixed(4);
  const hasCoordinates = destination.coordinates.lat !== 0 || destination.coordinates.lng !== 0;

  return (
    <article>
      <div className="relative h-[60svh] min-h-[420px] w-full overflow-hidden">
        <PhotoBlock
          tone={destination.heroImage as "aurora" | "snow" | "forest"}
          src={destination.heroImageUrl}
          label={destination.heroImageAlt || destination.title}
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-polar via-polar/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-10 sm:px-8">
          <nav aria-label="Breadcrumb" className="mb-3 text-sm text-paper/70">
            <Link href="/destinations" className="hover:text-paper">
              Destinations
            </Link>
            <span className="mx-2">/</span>
            <span className="text-paper">{destination.title}</span>
          </nav>
          {hasCoordinates && (
            <span className="coord-label text-paper/60">
              {lat}°N, {lng}°E{destination.region ? ` — ${destination.region}` : ""}
            </span>
          )}
          <h1 className="mt-2 font-display text-4xl text-paper sm:text-5xl">
            {destination.title}
          </h1>
          {destination.shortDescription && (
            <p className="mt-3 max-w-2xl text-lg text-paper/85">
              {destination.shortDescription}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[2fr_1fr]">
        <div>
          {destination.fullDescription ? (
            <div
              className="prose prose-headings:font-display prose-p:mb-8 prose-p:leading-loose [&_br]:block [&_br]:content-[''] [&_br]:mb-6 max-w-2xl text-ink/80"
              dangerouslySetInnerHTML={{ __html: destination.fullDescription }}
            />
          ) : null}

          <section className="mt-10">
            <SectionHeading title="Things to do" seeAllHref={`/experiences/${destination.slug}`} />
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {relatedExperiences.length ? (
                relatedExperiences.map((e) => (
                  <ExperienceCard key={e.slug} experience={e} />
                ))
              ) : (
                <p className="text-mist">
                  Experiences for {destination.title} are being added.
                </p>
              )}
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <div className="rounded-[6px] border border-mist-light/70 p-6">
            <h2 className="font-display text-lg text-ink">Practical info</h2>
            <dl className="mt-4 space-y-4 text-sm">
              {destination.bestTimeToVisit && (
                <div>
                  <dt className="text-mist">Best time to visit</dt>
                  <dd className="mt-1 text-ink">{destination.bestTimeToVisit}</dd>
                </div>
              )}
              {destination.region && (
                <div>
                  <dt className="text-mist">Region</dt>
                  <dd className="mt-1 text-ink">{destination.region}</dd>
                </div>
              )}
              {hasCoordinates && (
                <div>
                  <dt className="text-mist">Coordinates</dt>
                  <dd className="mt-1 text-ink">{lat}°N, {lng}°E</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="rounded-[6px] bg-polar p-6 text-paper">
            <h2 className="font-display text-lg">Need an airport transfer?</h2>
            <p className="mt-2 text-sm text-paper/75">
              Private and shared transfers to {destination.title}, booked
              directly with a local operator.
            </p>
            <div className="mt-4">
              <ContactButtons
                message={`Hi, I'd like a transfer quote to ${destination.title}.`}
              />
            </div>
            <a
              href="https://finnranetwork.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-xs text-paper/60 underline decoration-paper/30 underline-offset-4 hover:text-paper"
            >
              Or browse all Finnra services
            </a>
          </div>
        </aside>
      </div>
    </article>
  );
}
