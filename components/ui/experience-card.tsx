import Link from "next/link";
import { Experience } from "@/lib/types/content";
import { PhotoBlock } from "./photo-block";

export function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Link
      href={`/experiences/${experience.destinationSlug}/${experience.slug}`}
      className="group block overflow-hidden rounded-[6px] border border-mist-light/70 bg-paper-raised transition-shadow duration-200 hover:shadow-[0_8px_24px_rgba(14,26,43,0.12)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <PhotoBlock
          tone={experience.heroImage as "aurora" | "snow" | "forest"}
          label={experience.title}
          className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        {experience.badges[0] && (
          <span className="absolute left-3 top-3 rounded-[3px] bg-paper-raised/95 px-2.5 py-1 text-xs text-ink">
            {experience.badges[0]}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-mist">{experience.category}</p>
        <h3 className="mt-1 font-display text-lg leading-snug text-ink">
          {experience.title}
        </h3>
        <div className="mt-2 flex items-center gap-1.5 text-sm text-ink/80">
          <span aria-hidden className="text-copper">★</span>
          <span>{experience.rating.toFixed(1)}</span>
          <span className="text-mist">({experience.reviewCount})</span>
          <span className="mx-1 text-mist-light">·</span>
          <span className="text-mist">{experience.duration}</span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-mist-light/60 pt-3">
          <div>
            <span className="text-xs text-mist">From </span>
            <span className="font-display text-lg text-ink">
              €{experience.price}
            </span>
          </div>
          {experience.freeCancellation && (
            <span className="text-xs text-aurora-dim">Free cancellation</span>
          )}
        </div>
      </div>
    </Link>
  );
}
