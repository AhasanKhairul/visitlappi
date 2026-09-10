import Link from "next/link";

const COLUMNS = [
  {
    heading: "Explore",
    links: [
      { label: "Destinations", href: "/destinations" },
      { label: "Things to Do", href: "/experiences" },
      { label: "Routes", href: "/routes" },
      { label: "Stories", href: "/stories" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    heading: "Plan",
    links: [
      { label: "Getting Here", href: "/guides/getting-here" },
      { label: "Transportation", href: "/guides/transportation" },
      { label: "When to Visit", href: "/guides/when-to-visit" },
      { label: "Travel Tips", href: "/guides" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "About VisitLappi", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Editorial Policy", href: "/editorial-policy" },
      { label: "Partners", href: "/partners" },
    ],
  },
  {
    heading: "Business",
    links: [
      { label: "Partner With Us", href: "/partners/join" },
      { label: "List Your Experience", href: "/partners/list" },
      { label: "Advertise", href: "/advertise" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-mist-light/60 bg-polar text-paper/90">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="font-display text-base text-paper">{col.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-paper/70 transition-colors hover:text-aurora"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-paper/10 pt-8 text-sm text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            VisitLappi is an independent travel guide, not an official tourism
            authority.{" "}
            <Link href="/about" className="underline decoration-paper/30 underline-offset-4 hover:text-aurora">
              Read our editorial policy
            </Link>
            .
          </p>
          <p className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-aurora">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-aurora">
              Terms
            </Link>
            <a
              href="https://finnranetwork.com"
              className="hover:text-aurora"
              target="_blank"
              rel="noopener noreferrer"
            >
              Airport transfers via Finnra
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
