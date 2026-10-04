import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FieldDesk — electrical and HVAC field calculators" },
      { name: "description", content: "Motor circuit, voltage drop, service load, wire ampacity, and HVAC duct sizing on one field sheet." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <section className="fade-up">
          <p className="text-xs font-medium tracking-widest text-copper-deep uppercase">One site · two desks</p>
          <h1 className="mt-2 max-w-2xl text-4xl leading-tight sm:text-6xl sm:leading-none">
            Field numbers for the electrical desk and the HVAC desk.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            AmpDesk and AirDesk now sit on the same site. The motor table, the drop check, the service estimate, and the duct sheet share one menu.
          </p>
        </section>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Desk
            name="AmpDesk"
            text="Motor full-load current, conductor ampacity, breaker size, voltage drop, dwelling service, and the 310.16 column."
            links={[
              ["/motor", "Motor sizing"],
              ["/voltage-drop", "Voltage drop"],
              ["/service", "Service load"],
              ["/wire", "Wire ampacity"],
            ]}
          />
          <Desk
            name="AirDesk"
            text="Room cooling screen, supply CFM, and a round or rectangular duct at your friction rate."
            links={[["/hvac", "Load and duct"]]}
          />
        </div>

        <section className="fade-up mt-12 rounded-2xl border border-line bg-surface p-5 sm:p-6">
          <h2 className="text-2xl">Where the numbers come from</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            Every result shows the source next to it. These are planning estimates from published tables, not a permit calculation.
          </p>
          <ul className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <li className="rounded-xl border border-line bg-paper px-4 py-3">
              <span className="font-medium">NEC Table 430.250</span>
              <span className="block text-muted">Three-phase motor full-load current</span>
            </li>
            <li className="rounded-xl border border-line bg-paper px-4 py-3">
              <span className="font-medium">NEC Table 430.248</span>
              <span className="block text-muted">Single-phase motor full-load current</span>
            </li>
            <li className="rounded-xl border border-line bg-paper px-4 py-3">
              <span className="font-medium">NEC 430.22, 430.52, 430.32</span>
              <span className="block text-muted">Conductors, short-circuit device, overload</span>
            </li>
            <li className="rounded-xl border border-line bg-paper px-4 py-3">
              <span className="font-medium">NEC Table 310.16</span>
              <span className="block text-muted">Wire ampacity, 60°C and 75°C</span>
            </li>
            <li className="rounded-xl border border-line bg-paper px-4 py-3">
              <span className="font-medium">NEC 220.12, 220.42, 220.52, 220.53, 220.55, 220.60</span>
              <span className="block text-muted">Dwelling service load shape</span>
            </li>
            <li className="rounded-xl border border-line bg-paper px-4 py-3">
              <span className="font-medium">Sensible heat equation</span>
              <span className="block text-muted">CFM = BTU/h ÷ (1.08 × ΔT)</span>
            </li>
            <li className="rounded-xl border border-line bg-paper px-4 py-3">
              <span className="font-medium">Equal-friction duct method</span>
              <span className="block text-muted">0.109136 × CFM^1.9 ÷ D^5.02</span>
            </li>
            <li className="rounded-xl border border-line bg-paper px-4 py-3">
              <span className="font-medium">Huebscher equivalent diameter</span>
              <span className="block text-muted">Rectangular duct sizing</span>
            </li>
          </ul>
        </section>
      </main>
    </SiteShell>
  );
}

function Desk({ name, text, links }: { name: string; text: string; links: [string, string][] }) {
  return (
    <article className="fade-up rounded-2xl border border-line bg-surface p-5">
      <h2 className="text-3xl">{name}</h2>
      <p className="mt-2 leading-relaxed text-muted">{text}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {links.map(([to, label]) => (
          <Link key={to} to={to} className="inline-flex h-11 items-center rounded-full bg-ink px-4 text-sm font-medium text-paper">
            {label}
          </Link>
        ))}
      </div>
    </article>
  );
}
