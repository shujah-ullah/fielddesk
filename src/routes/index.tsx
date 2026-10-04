import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FieldDesk — electrical and HVAC field calculators" },
      { name: "description", content: "Motor circuit, voltage drop, service load, wire ampacity, and HVAC duct sizing, with the table each number comes from." },
    ],
  }),
  component: Home,
});

const SAMPLES = [
  { value: "7.6 A", label: "5 hp, 460 V motor", source: "NEC Table 430.250", note: "Three-phase full-load current. Not the nameplate." },
  { value: "9.5 A", label: "Conductor for that motor", source: "NEC 430.22", note: "125% of the table current." },
  { value: "9.5 A", label: "Overload, 1.15 service factor", source: "NEC 430.32", note: "125% if the factor is 1.15 or the rise is 40°C. Otherwise 115%." },
  { value: "400 CFM", label: "8,640 BTU/h at a 20°F rise", source: "Sensible-heat equation", note: "CFM = BTU/h ÷ (1.08 × temperature difference)." },
];

const SOURCES = [
  ["NEC Table 430.250", "Three-phase motor full-load current"],
  ["NEC Table 430.248", "Single-phase motor full-load current"],
  ["NEC 430.22", "Branch-circuit conductors, 125%"],
  ["NEC 430.52", "Short-circuit device, then the next standard size"],
  ["NEC 430.32", "Overload. 125% or 115%, from the nameplate"],
  ["NEC Table 310.16", "Wire ampacity, 60°C and 75°C columns"],
  ["NEC 220.12 and 220.42", "Dwelling lighting, then the demand split"],
  ["Sensible heat", "CFM = BTU/h ÷ (1.08 × ΔT)"],
  ["Equal friction", "Duct friction from CFM and diameter"],
  ["Huebscher", "Round duct turned into a rectangle"],
];

function Home() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <section className="fade-up">
          <p className="text-xs font-medium tracking-widest text-copper-deep uppercase">Field sheets · not a permit set</p>
          <h1 className="mt-2 max-w-2xl text-4xl leading-tight sm:text-6xl sm:leading-none">Check the number before you leave the truck.</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">Motor wire, breaker, voltage drop, house service, and duct size. Each result names the table it came from.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link to="/motor" className="inline-flex h-11 items-center rounded-full bg-ink px-4 text-sm font-medium text-paper">Start with a motor</Link>
            <Link to="/hvac" className="inline-flex h-11 items-center rounded-full border border-line bg-surface px-4 text-sm font-medium">Size a duct</Link>
          </div>
        </section>

        <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SAMPLES.map((item, index) => (
            <article key={item.label} className={`fade-up fade-up-delay-${index + 1} rounded-2xl border border-line bg-surface p-4`}>
              <p className="result-pop font-serif text-4xl tabular-nums">{item.value}</p>
              <p className="mt-2 text-sm font-medium">{item.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.note}</p>
              <p className="mt-3 text-xs font-medium tracking-wide text-copper-deep uppercase">{item.source}</p>
            </article>
          ))}
        </section>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Desk name="Electrical" text="Pick the motor, the run, or the house. The sheet shows the table current, the wire, and the breaker." links={[["/motor", "Motor"], ["/voltage-drop", "Voltage drop"], ["/service", "Service load"], ["/wire", "Wire ampacity"]]} />
          <Desk name="HVAC" text="Enter the room. The sheet gives a cooling screen, the supply air, and a duct size." links={[["/hvac", "Load and duct"]]} />
        </div>

        <section className="fade-up mt-10 rounded-2xl border border-line bg-surface p-5 sm:p-6">
          <h2 className="text-2xl">Where these numbers come from</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">Registered against the published table named on each card. Use them to screen a job. Do not stamp them on a permit.</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {SOURCES.map(([name, detail]) => (
              <li key={name} className="rounded-xl border border-line bg-paper px-4 py-3">
                <span className="font-medium">{name}</span>
                <span className="mt-1 block text-sm text-muted">{detail}</span>
              </li>
            ))}
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
          <Link key={to} to={to} className="inline-flex h-11 items-center rounded-full bg-ink px-4 text-sm font-medium text-paper">{label}</Link>
        ))}
      </div>
    </article>
  );
}
