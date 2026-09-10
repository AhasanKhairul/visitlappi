import { experiences } from "@/lib/fixtures/experiences";
import { ExperienceCard } from "@/components/ui/experience-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function PopularExperiences() {
  return (
    <section className="border-y border-mist-light/60 bg-paper-raised">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <SectionHeading
          title="Popular experiences"
          description="Booked and rated by travelers who came before you."
          seeAllHref="/experiences"
        />
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.slice(0, 6).map((e) => (
            <ExperienceCard key={e.slug} experience={e} />
          ))}
        </div>
      </div>
    </section>
  );
}
