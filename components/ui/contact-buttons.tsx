/**
 * Click-to-chat / click-to-call buttons pointing at Finnra's existing
 * WhatsApp and phone line (used today for transfer/booking enquiries).
 * Reused wherever a transfer/booking CTA appears — destination pages,
 * the contact page — not as a persistent floating button (per plan).
 */
const FINNRA_WHATSAPP_NUMBER = "358504792464"; // +358 50 4792464, no spaces/plus for wa.me links
const FINNRA_PHONE_DISPLAY = "+358 50 4792464";
const FINNRA_PHONE_TEL = "+358504792464";

export function ContactButtons({
  message,
  variant = "dark",
}: {
  message?: string;
  className?: string;
  variant?: "dark" | "light";
}) {
  const waHref = `https://wa.me/${FINNRA_WHATSAPP_NUMBER}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

  const isDark = variant === "dark";

  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 rounded-[3px] px-4 py-2.5 text-sm transition-colors ${
          isDark
            ? "bg-aurora text-polar hover:bg-aurora-dim hover:text-paper"
            : "bg-polar text-paper hover:bg-polar-deep"
        }`}
      >
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-4 w-4 fill-current"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12.001 2.003c-5.514 0-9.998 4.484-9.998 9.997 0 1.762.464 3.484 1.345 4.997L2 22l5.116-1.342a9.96 9.96 0 0 0 4.885 1.244h.004c5.513 0 9.997-4.484 9.997-9.997 0-2.671-1.04-5.182-2.929-7.071a9.935 9.935 0 0 0-7.072-2.831zm0 18.152h-.003a8.15 8.15 0 0 1-4.153-1.137l-.298-.177-3.037.796.811-2.96-.194-.304a8.144 8.144 0 0 1-1.253-4.353c0-4.502 3.664-8.166 8.166-8.166a8.109 8.109 0 0 1 5.775 2.396 8.113 8.113 0 0 1 2.391 5.776c-.001 4.502-3.665 8.129-8.205 8.129z" />
        </svg>
        WhatsApp Finnra
      </a>
      <a
        href={`tel:${FINNRA_PHONE_TEL}`}
        className={`inline-flex items-center gap-2 rounded-[3px] border px-4 py-2.5 text-sm transition-colors ${
          isDark
            ? "border-paper/30 text-paper hover:border-paper"
            : "border-ink/20 text-ink hover:border-ink/50"
        }`}
      >
        <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 fill-current">
          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.49a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.25 1.02l-2.19 2.2z" />
        </svg>
        Call {FINNRA_PHONE_DISPLAY}
      </a>
    </div>
  );
}
