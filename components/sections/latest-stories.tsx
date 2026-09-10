import { articles } from "@/lib/fixtures/articles";
import { ArticleCard } from "@/components/ui/article-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function LatestStories() {
  return (
    <section className="border-t border-mist-light/60 bg-paper-raised">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <SectionHeading
          title="Latest travel stories"
          description="Practical guides and field notes from Lapland, kept current."
          seeAllHref="/stories"
        />
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
