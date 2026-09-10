import { Hero } from "@/components/sections/hero";
import { PopularDestinations } from "@/components/sections/popular-destinations";
import { PopularExperiences } from "@/components/sections/popular-experiences";
import { NorthernLightsFeature } from "@/components/sections/northern-lights-feature";
import { LatestStories } from "@/components/sections/latest-stories";
import { Newsletter } from "@/components/sections/newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <PopularDestinations />
      <PopularExperiences />
      <NorthernLightsFeature />
      <LatestStories />
      <Newsletter />
    </>
  );
}
