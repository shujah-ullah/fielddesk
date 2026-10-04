import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FieldDesk — calculators for technicians, engineers, and operators" },
      {
        name: "description",
        content:
          "FieldDesk holds AmpDesk and AirDesk. AmpDesk sizes motor circuits, voltage drop, service load, and wire. AirDesk sizes cooling load, airflow, and duct.",
      },
    ],
  }),
  component: Home,
});

const SOURCES = [
  ["Motor current", "NEC Tables 430.248 and 430.250"],
  ["Wire size", "NEC 430.22 and Table 310.16"],
  ["Breaker or fuse", "NEC 430.52"],
  ["Overload", "NEC 430.32, set from the nameplate"],
  ["House service", "NEC Article 220"],
  ["Supply air", "BTU/h divided by 1.08 times the temperature rise"],
  ["Duct size", "Equal-friction method"],
];

function Home() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <section className="fade-up max-w-3xl">
          <p className="text-sm font-semibold tracking-widest text-copper-deep uppercase">Field calculators</p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] sm:text-7xl">
            Calculators for technicians, engineers, and operators.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink">
            FieldDesk is two desks on one site. Screen the job before you order the wire or the duct.
          </p>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">
            These are planning sheets. They are not a permit, and they do not replace the nameplate or the person on the job.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/motor" className="inline-flex h-14 items-center rounded-full bg-ink px-6 text-lg font-medium text-paper">
              Open AmpDesk
            </Link>
            <Link to="/hvac" className="inline-flex h-14 items-center rounded-full border border-line bg-surface px-6 text-lg font-medium">
              Open AirDesk
            </Link>
          </div>
        </section>

        <section className="mt-12 grid gap-5 md:grid-cols-2">
          <article className="fade-up rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <p className="text-sm font-semibold tracking-widest text-copper-deep uppercase">Electrical</p>
            <h2 className="mt-2 font-serif text-4xl">AmpDesk</h2>
            <p className="mt-4 text-lg leading-relaxed">For the motor, the run, and the house.</p>
            <ul className="mt-4 space-y-2 text-lg leading-relaxed text-muted">
              <li>Enter horsepower and voltage.</li>
              <li>See the table current, the wire, the breaker, and the overload.</li>
              <li>Check a long run, a house service, or a wire size on its own sheet.</li>
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <Link to="/motor" className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-4 text-base font-medium text-paper">Size a motor</Link>
              <div className="flex flex-wrap gap-2">
                <Link to="/voltage-drop" className="inline-flex h-11 items-center rounded-full border border-line px-4 text-base">Check a run</Link>
                <Link to="/service" className="inline-flex h-11 items-center rounded-full border border-line px-4 text-base">House service</Link>
                <Link to="/wire" className="inline-flex h-11 items-center rounded-full border border-line px-4 text-base">Wire size</Link>
              </div>
            </div>
          </article>
          <article className="fade-up rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <p className="text-sm font-semibold tracking-widest text-copper-deep uppercase">HVAC</p>
            <h2 className="mt-2 font-serif text-4xl">AirDesk</h2>
            <p className="mt-4 text-lg leading-relaxed">For the room and the duct.</p>
            <ul className="mt-4 space-y-2 text-lg leading-relaxed text-muted">
              <li>Enter the room size and the climate zone.</li>
              <li>See a cooling screen and the supply air.</li>
              <li>Get a round duct, and a rectangle that matches it.</li>
            </ul>
            <div className="mt-6">
              <Link to="/hvac" className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-5 text-base font-medium text-paper">Size the room and the duct</Link>
            </div>
          </article>
        </section>

        <section id="reference" className="fade-up mt-14 scroll-mt-24">
          <h2 className="font-serif text-4xl">Where the numbers come from</h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">Each sheet names its source. This is the short list.</p>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {SOURCES.map(([use, source]) => (
              <li key={use} className="grid gap-1 py-4 sm:grid-cols-2 sm:items-baseline sm:gap-8">
                <span className="text-lg font-medium">{use}</span>
                <span className="text-lg text-muted">{source}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </SiteShell>
  );
}
