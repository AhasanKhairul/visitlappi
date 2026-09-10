import Image from "next/image";

/**
 * Renders a real photo (from the WordPress media library) when one is
 * available. Falls back to an abstract duotone gradient, keyed to real
 * content tones (aurora, polar dusk, snowfield, birch forest), for
 * fixture data or CMS entries that don't have a photo yet.
 */
const TONES = {
  aurora: "from-[#0e1a2b] via-[#1f8f70] to-[#2fbe96]",
  dusk: "from-[#0e1a2b] via-[#3a2f4a] to-[#b5652f]",
  snow: "from-[#c9d0d4] via-[#eff2f0] to-[#ffffff]",
  forest: "from-[#0e1a2b] via-[#1f3d2f] to-[#2fbe96]",
} as const;

export function PhotoBlock({
  tone = "aurora",
  label,
  src,
  className = "",
}: {
  tone?: keyof typeof TONES;
  label?: string;
  /** Real photo URL. When provided, this renders instead of the gradient. */
  src?: string;
  className?: string;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={label ?? ""}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${TONES[tone]} ${className}`}
      role="img"
      aria-label={label ?? "Placeholder photography"}
    >
      <div className="absolute inset-0 mix-blend-overlay opacity-30 bg-[radial-gradient(circle_at_30%_20%,white,transparent_60%)]" />
    </div>
  );
}
