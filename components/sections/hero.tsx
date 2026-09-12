import { HeroMedia } from "@/components/ui/hero-media";
import { SearchBox } from "@/components/ui/search-box";
import { getHomepageSettings } from "@/lib/cms/homepage-settings";

export async function Hero() {
  const settings = await getHomepageSettings();

  return (
    <section className="relative">
      <div className="relative h-[78svh] min-h-[520px] w-full overflow-hidden">
        <HeroMedia
          videoUrl={settings.heroVideoUrl}
          imageUrl={settings.heroImageUrl}
          imageAlt={settings.heroImageAlt || "Northern Lights over Finnish Lapland"}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-polar via-polar/30 to-polar/10" />

        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-24 sm:px-8">
          <span className="coord-label text-paper/60">66°33&apos;N — the Arctic Circle</span>
          <h1 className="mt-3 max-w-3xl font-impact text-6xl uppercase leading-[0.95] tracking-tight text-paper sm:text-7xl">
            Discover Finnish Lapland
          </h1>
          <p className="mt-5 max-w-lg text-lg text-paper/80">
            Where silence has a sound, cold has a feeling, and nature has a
            thousand colors — welcome to Lappi.
          </p>
        </div>
      </div>

      <div className="relative mx-auto -mt-8 max-w-4xl px-5 sm:px-8">
        <SearchBox />
      </div>
    </section>
  );
}
