export function SearchBox() {
  return (
    <form className="grid gap-px overflow-hidden rounded-[6px] border border-mist-light/60 bg-mist-light/60 shadow-[0_12px_32px_rgba(14,26,43,0.18)] sm:grid-cols-[1.2fr_1.2fr_1fr_auto]">
      <label className="flex flex-col gap-1 bg-paper-raised px-5 py-3.5">
        <span className="text-xs text-mist">Where</span>
        <input
          type="text"
          placeholder="Rovaniemi, Levi, Inari…"
          className="bg-transparent text-sm text-ink placeholder:text-mist/70 focus:outline-none"
        />
      </label>
      <label className="flex flex-col gap-1 bg-paper-raised px-5 py-3.5">
        <span className="text-xs text-mist">What</span>
        <input
          type="text"
          placeholder="Northern Lights, husky safari…"
          className="bg-transparent text-sm text-ink placeholder:text-mist/70 focus:outline-none"
        />
      </label>
      <label className="flex flex-col gap-1 bg-paper-raised px-5 py-3.5">
        <span className="text-xs text-mist">When</span>
        <input
          type="text"
          placeholder="Any time"
          className="bg-transparent text-sm text-ink placeholder:text-mist/70 focus:outline-none"
        />
      </label>
      <button
        type="submit"
        className="bg-aurora px-8 py-3.5 text-sm text-polar transition-colors hover:bg-aurora-dim hover:text-paper"
      >
        Search
      </button>
    </form>
  );
}
