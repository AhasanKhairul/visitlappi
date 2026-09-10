export function Newsletter() {
  return (
    <section className="border-y border-mist-light/60 bg-paper-raised">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="font-display text-3xl text-ink sm:text-4xl">
            Discover Lapland
          </h2>
          <p className="mt-3 max-w-md text-ink/70">
            Seasonal travel ideas, aurora forecasts and practical tips —
            sent when there&apos;s something worth reading, not on a schedule.
          </p>
        </div>
        <form className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-[3px] border border-mist-light bg-paper px-4 py-3 text-ink placeholder:text-mist focus:border-aurora"
          />
          <button
            type="submit"
            className="shrink-0 rounded-[3px] bg-polar px-6 py-3 text-sm text-paper transition-colors hover:bg-polar-deep"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
