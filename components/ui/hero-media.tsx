import Image from "next/image";
import { AuroraBackground } from "./aurora-background";

/**
 * Picks, in priority order: a real uploaded video, then a real uploaded
 * photo, then falls back to the built-in animated aurora effect so the
 * hero never looks broken or empty.
 */
export function HeroMedia({
  videoUrl,
  imageUrl,
  imageAlt,
  className = "",
}: {
  videoUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
  className?: string;
}) {
  if (videoUrl) {
    return (
      <video
        className={`h-full w-full object-cover ${className}`}
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />
    );
  }

  if (imageUrl) {
    return (
      <div className={`relative h-full w-full ${className}`}>
        <Image
          src={imageUrl}
          alt={imageAlt ?? ""}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </div>
    );
  }

  return <AuroraBackground className={className} />;
}
