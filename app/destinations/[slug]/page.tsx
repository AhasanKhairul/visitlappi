import { notFound } from "next/navigation";
import Link from "next/link";
import { destinations, getDestination } from "@/lib/fixtures/destinations";
import { getExperiencesByDestination } from "@/lib/fixtures/experiences";
import { PhotoBlock } from "@/components/ui/photo-block";
import { ExperienceCard } from "@/components/ui/experience-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const destination = getDestination(params.slug);
  if (!destination) return {};
  return {
    title: destination.title,
    description: destination.shortDescription,
  };
}

export default function DestinationPage({
  params,
}: {
  params: { slug: string };
}) {
  const destination = getDestination(params.slug);
  if (!destination) notFound();

  const relatedExperiences = getExperiencesByDestination(destination.slug);
  const lat = destination.coordinates.lat.toFixed(4);
  const lng = destination.coordinates.lng.toFixed(4);

  return (
    <article>
      <div className="relative h-[56svh] min-h-[380px] w-full overflow-hidden">
        <PhotoBlock
          tone={destination.heroImage as "aurora" | "snow" | "forest"}
          label={destination.title}
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
          <span className="coord-label text-paper/60">
            {lat}°N, {lng}°E — {destination.region}
          </span>
          <h1 className="mt-2 font-display text-4xl text-paper sm:text-5xl">
            {destination.title}
          </h1>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[2fr_1fr]">
        <div>
          <p className="max-w-2xl text-lg text-ink/80">
            {destination.shortDescription}
          </p>

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
              <div>
                <dt className="text-mist">Best time to visit</dt>
                <dd className="mt-1 text-ink">{destination.bestTimeToVisit}</dd>
              </div>
              <div>
                <dt className="text-mist">Region</dt>
                <dd className="mt-1 text-ink">{destination.region}</dd>
              </div>
              <div>
                <dt className="text-mist">Coordinates</dt>
                <dd className="mt-1 text-ink">{lat}°N, {lng}°E</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-[6px] bg-polar p-6 text-paper">
            <h2 className="font-display text-lg">Need an airport transfer?</h2>
            <p className="mt-2 text-sm text-paper/75">
              Private and shared transfers to {destination.title}, booked
              directly with a local operator.
            </p>
            <a
              href="https://finnranetwork.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block border-b border-aurora pb-0.5 text-sm text-aurora transition-colors hover:border-paper hover:text-paper"
            >
              Get a transfer quote
            </a>
          </div>
        </aside>
      </div>
    </article>
  );
}
