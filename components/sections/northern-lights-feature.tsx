import Link from "next/link";
import { PhotoBlock } from "@/components/ui/photo-block";

export function NorthernLightsFeature() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <div className="grid overflow-hidden rounded-[6px] md:grid-cols-2">
        <div className="relative aspect-[4/3] md:aspect-auto">
          <PhotoBlock tone="dusk" label="Northern Lights over a fell" className="h-full w-full" />
        </div>
        <div className="flex flex-col justify-center bg-polar px-8 py-12 text-paper sm:px-12">
          <span className="coord-label text-paper/60">August–April</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">
            Chasing the Northern Lights
          </h2>
          <p className="mt-4 max-w-md text-paper/75">
            Aurora forecasts, the best viewing spots away from town lights,
            and what to actually wear while you wait for the sky to move.
          </p>
          <Link
            href="/things-to-do/northern-lights"
            className="mt-6 inline-block w-fit border-b border-aurora pb-0.5 text-aurora transition-colors hover:border-paper hover:text-paper"
          >
            The full Aurora guide
          </Link>
        </div>
      </div>
    </section>
  );
}
