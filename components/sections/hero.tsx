import { PhotoBlock } from "@/components/ui/photo-block";
import { SearchBox } from "@/components/ui/search-box";

export function Hero() {
  return (
    <section className="relative">
      <div className="relative h-[78svh] min-h-[520px] w-full overflow-hidden">
        <PhotoBlock tone="aurora" label="Aurora over Finnish Lapland" className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-polar via-polar/30 to-polar/10" />

        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-24 sm:px-8">
          <span className="coord-label text-paper/60">66°33&apos;N — the Arctic Circle</span>
          <h1 className="mt-3 max-w-2xl font-display text-5xl leading-[1.05] text-paper sm:text-6xl">
            Discover Finnish Lapland
          </h1>
          <p className="mt-4 max-w-lg text-lg text-paper/80">
            Arctic wilderness, Northern Lights and unhurried Nordic days —
            planned by people who live here.
          </p>
        </div>
      </div>

      <div className="relative mx-auto -mt-8 max-w-4xl px-5 sm:px-8">
        <SearchBox />
      </div>
    </section>
  );
}
