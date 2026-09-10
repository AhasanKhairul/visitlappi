import Link from "next/link";
import { Article } from "@/lib/types/content";
import { PhotoBlock } from "./photo-block";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/stories/${article.slug}`} className="group flex gap-5">
      <div className="relative aspect-[4/3] w-32 shrink-0 overflow-hidden rounded-[6px] sm:w-44">
        <PhotoBlock
          tone={article.heroImage as "aurora" | "snow" | "forest"}
          label={article.title}
          className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-xs text-mist">
          {article.destination} · {article.readTime}
        </p>
        <h3 className="mt-1.5 font-display text-xl leading-snug text-ink transition-colors group-hover:text-aurora-dim">
          {article.title}
        </h3>
        <p className="mt-1.5 hidden text-sm text-mist sm:block">
          {article.subtitle}
        </p>
      </div>
    </Link>
  );
}
