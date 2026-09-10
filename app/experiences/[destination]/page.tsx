import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllDestinations, getDestinationBySlug } from "@/lib/cms/destinations";
import { getExperiencesByDestination } from "@/lib/fixtures/experiences";
import { ExperienceCard } from "@/components/ui/experience-card";

export const dynamicParams = true;

export async function generateStaticParams() {
  const destinations = await getAllDestinations();
  return destinations.map((d) => ({ destination: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { destination: string };
}) {
  const destination = await getDestinationBySlug(params.destination);
  if (!destination) return {};
  return {
    title: `Things to Do in ${destination.title}`,
    description: `Browse experiences and activities in ${destination.title}, Finnish Lapland.`,
  };
}

const FILTERS = ["Category", "Duration", "Price", "Rating", "Season", "Family friendly"];

export default async function ExperienceListingPage({
  params,
}: {
  params: { destination: string };
}) {
  const destination = await getDestinationBySlug(params.destination);
  if (!destination) notFound();

  // Experience content isn't connected to the CMS yet — still fixture
  // data here until that pass is done.
  const items = getExperiencesByDestination(destination.slug);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-mist">
        <Link href="/destinations" className="hover:text-ink">
          Destinations
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/destinations/${destination.slug}`} className="hover:text-ink">
          {destination.title}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">Things to Do</span>
      </nav>

      <h1 className="mt-3 font-display text-4xl text-ink">
        Things to Do in {destination.title}
      </h1>
      <p className="mt-2 text-ink/70">
        {items.length} experience{items.length === 1 ? "" : "s"}, from Aurora
        tours to fell skiing.
      </p>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-mist-light/60 pb-6">
        {FILTERS.map((f) => (
          <button
            key={f}
            className="rounded-[3px] border border-mist-light px-3.5 py-1.5 text-sm text-ink/80 transition-colors hover:border-ink/40"
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.length ? (
          items.map((e) => <ExperienceCard key={e.slug} experience={e} />)
        ) : (
          <p className="text-mist">
            No experiences published for {destination.title} yet — check
            back soon.
          </p>
        )}
      </div>
    </div>
  );
}
