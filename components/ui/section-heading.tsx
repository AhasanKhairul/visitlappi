import Link from "next/link";

export function SectionHeading({
  title,
  description,
  seeAllHref,
}: {
  title: string;
  description?: string;
  seeAllHref?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <h2 className="font-display text-3xl text-ink sm:text-4xl">{title}</h2>
        {description && (
          <p className="mt-2 max-w-xl text-ink/70">{description}</p>
        )}
      </div>
      {seeAllHref && (
        <Link
          href={seeAllHref}
          className="hidden shrink-0 text-sm text-ink/70 underline decoration-mist-light underline-offset-4 transition-colors hover:text-aurora-dim hover:decoration-aurora-dim sm:inline-block"
        >
          See all
        </Link>
      )}
    </div>
  );
}
