import Link from "next/link";

const NAV = [
  { label: "Destinations", href: "/destinations" },
  { label: "Things to Do", href: "/experiences" },
  { label: "Routes", href: "/routes" },
  { label: "Stories", href: "/stories" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-mist-light/60 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-ink"
        >
          VisitLappi
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-[0.9375rem] text-ink/80 transition-colors hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-aurora after:transition-[width] after:duration-200 hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/plan"
            className="hidden rounded-[3px] border border-ink/15 px-4 py-2 text-sm text-ink transition-colors hover:border-ink/40 sm:inline-block"
          >
            Plan a trip
          </Link>
          <button
            aria-label="Open menu"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className="h-px w-5 bg-ink" />
            <span className="h-px w-5 bg-ink" />
          </button>
        </div>
      </div>
    </header>
  );
}
