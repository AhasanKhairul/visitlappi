import { destinations } from "@/lib/fixtures/destinations";
import { DestinationCard } from "@/components/ui/destination-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function PopularDestinations() {
  const [feature, ...rest] = destinations;
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <SectionHeading
        title="Popular destinations"
        description="Each one a different Lapland — a fell village, an Arctic Circle city, a lake at the edge of Sápmi."
        seeAllHref="/destinations"
      />
      <div className="mt-8 grid gap-4">
        <DestinationCard destination={feature} size="large" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {rest.slice(0, 4).map((d) => (
            <DestinationCard key={d.slug} destination={d} />
          ))}
        </div>
      </div>
    </section>
  );
}
