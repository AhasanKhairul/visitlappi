/**
 * Stands in for real editorial photography, which will come from the WP
 * media library once the CMS is connected (see MEDIA architecture in
 * PROJECT_ARCHITECTURE.md). Deliberately an abstract duotone gradient
 * rather than a fake stock-photo look-alike, keyed to real content tones
 * (aurora, polar dusk, snowfield, birch forest) so sections aren't blank
 * while content is pending.
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
  className = "",
}: {
  tone?: keyof typeof TONES;
  label?: string;
  className?: string;
}) {
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
