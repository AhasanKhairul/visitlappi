import Link from "next/link";
import { Destination } from "@/lib/types/content";
import { PhotoBlock } from "./photo-block";

function coord(d: Destination) {
  const lat = d.coordinates.lat.toFixed(1);
  return `${lat}°N`;
}

export function DestinationCard({
  destination,
  size = "regular",
}: {
  destination: Destination;
  size?: "large" | "regular";
}) {
  const isLarge = size === "large";
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group block"
    >
      <div
        className={`relative overflow-hidden rounded-[6px] ${
          isLarge ? "aspect-[4/3]" : "aspect-[3/4]"
        }`}
      >
        <PhotoBlock
          tone={destination.heroImage as "aurora" | "snow" | "forest"}
          src={destination.heroImageUrl}
          label={destination.heroImageAlt || destination.title}
          className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-polar/80 via-polar/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 transition-transform duration-300 ease-out group-hover:-translate-y-1">
          <span className="coord-label text-paper/70">{coord(destination)}</span>
          <h3 className="font-display text-2xl text-paper">{destination.title}</h3>
          <p className="mt-1 text-sm text-paper/75">{destination.activityCount} things to do</p>
        </div>
      </div>
    </Link>
  );
}
