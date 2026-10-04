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
      <main className="mx-auto max-w-6xl px-4 py-8">
        <p className="text-xs font-medium tracking-widest text-copper-deep uppercase">One site · two desks</p>
        <h1 className="mt-2 max-w-2xl text-4xl leading-tight sm:text-6xl sm:leading-none">Field numbers for the electrical desk and the HVAC desk.</h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">AmpDesk and AirDesk now sit on the same site. The motor table, the drop check, the service estimate, and the duct sheet share one menu.</p>
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
      </main>
    </SiteShell>
  );
}

function Desk({ name, text, links }: { name: string; text: string; links: [string, string][] }) {
  return (
    <article className="rounded-2xl border border-line bg-surface p-5">
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
