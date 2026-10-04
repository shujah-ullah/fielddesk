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
  ["Conductor and breaker", "NEC 430.22 and 430.52"],
  ["Overload", "NEC 430.32, from the nameplate"],
  ["Wire ampacity", "NEC Table 310.16"],
  ["Dwelling service", "NEC Article 220"],
  ["Airflow", "CFM = BTU/h ÷ (1.08 × temperature rise)"],
  ["Duct size", "Equal-friction method"],
];

function Home() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <section className="fade-up max-w-3xl">
          <p className="text-xs font-medium tracking-widest text-copper-deep uppercase">Field calculators</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-6xl sm:leading-none">
            Calculators for technicians, engineers, and operators.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
            FieldDesk is two small desks on one site. Use them to screen a job before you order the wire or the duct. They are planning sheets, not a permit set.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/motor" className="inline-flex h-12 items-center rounded-full bg-ink px-5 text-sm font-medium text-paper">
              Open AmpDesk
            </Link>
            <Link to="/hvac" className="inline-flex h-12 items-center rounded-full border border-line bg-surface px-5 text-sm font-medium">
              Open AirDesk
            </Link>
          </div>
        </section>

        <p className="fade-up mt-8 max-w-3xl rounded-2xl border border-line bg-warn-soft px-4 py-3 text-sm leading-relaxed text-copper-deep">
          Planning tool only. The electrical numbers follow commonly published NEC tables. The HVAC numbers follow the sensible-heat equation and the equal-friction duct method. They are not a substitute for the adopted code, the nameplate, or a licensed person on the job.
        </p>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="fade-up rounded-2xl border border-line bg-surface p-5 sm:p-6">
            <p className="text-xs font-medium tracking-widest text-copper-deep uppercase">Electrical desk</p>
            <h2 className="mt-2 font-serif text-3xl">AmpDesk</h2>
            <p className="mt-3 leading-relaxed text-muted">
              For the motor, the run, and the house. Enter horsepower and voltage. AmpDesk reads the full-load table, then shows the conductor, the breaker or fuse, the overload, and the voltage drop. A separate sheet estimates the dwelling service and reads the wire ampacity column.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
              <Link to="/motor" className="text-copper-deep underline underline-offset-4">Size a motor</Link>
              <Link to="/voltage-drop" className="text-copper-deep underline underline-offset-4">Check a run</Link>
              <Link to="/service" className="text-copper-deep underline underline-offset-4">Estimate the service</Link>
              <Link to="/wire" className="text-copper-deep underline underline-offset-4">Read ampacity</Link>
            </div>
          </article>
          <article className="fade-up rounded-2xl border border-line bg-surface p-5 sm:p-6">
            <p className="text-xs font-medium tracking-widest text-copper-deep uppercase">HVAC desk</p>
            <h2 className="mt-2 font-serif text-3xl">AirDesk</h2>
            <p className="mt-3 leading-relaxed text-muted">
              For the room and the duct. Enter the floor area, the ceiling, and the climate zone. AirDesk screens the cooling load, turns that into supply air, and sizes a round or rectangular duct at the friction rate you set.
            </p>
            <div className="mt-5">
              <Link to="/hvac" className="text-sm font-medium text-copper-deep underline underline-offset-4">Size the room and the duct</Link>
            </div>
          </article>
        </section>

        <section className="fade-up mt-10">
          <h2 className="font-serif text-3xl">Where the numbers come from</h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {SOURCES.map(([use, source]) => (
              <li key={use} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between">
                <span>{use}</span>
                <span className="text-sm text-muted">{source}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </SiteShell>
  );
}
