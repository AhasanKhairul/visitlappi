import { getAllDestinations } from "@/lib/cms/destinations";
import { DestinationCard } from "@/components/ui/destination-card";

export const metadata = {
  title: "Destinations",
  description: "Browse every destination in Finnish Lapland covered by VisitLappi.",
};

export default async function DestinationsPage() {
  const destinations = await getAllDestinations();
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <h1 className="font-display text-4xl text-ink">Destinations</h1>
      <p className="mt-2 max-w-xl text-ink/70">
        From the Arctic Circle capital to fell villages and Sámi
        heartland — every Lapland destination VisitLappi covers.
      </p>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {destinations.map((d) => (
          <DestinationCard key={d.slug} destination={d} />
        ))}
      </div>
    </div>
  );
}
