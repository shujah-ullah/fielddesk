import { useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Copy, Fan, Ruler, ThermometerSun } from "lucide-react";
import { DUTIES, INSULATION, SUN, WINDOWS, ZONES, cfmFromBtu, coolingLoad, formatNum, sizeDuct, type DutyId } from "@/lib/hvac";

const control = "h-11 w-full rounded-xl border border-line bg-surface px-3 text-base text-ink outline-none focus:border-copper";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

export function FieldTool() {
  const [area, setArea] = useState(240);
  const [height, setHeight] = useState(8);
  const [zoneId, setZoneId] = useState("3");
  const [insulationId, setInsulationId] = useState("average");
  const [windowId, setWindowId] = useState("typical");
  const [sunId, setSunId] = useState("mixed");
  const [occupants, setOccupants] = useState(2);
  const [kitchen, setKitchen] = useState(false);
  const [deltaT, setDeltaT] = useState(20);
  const [cfmOverride, setCfmOverride] = useState<number | null>(null);
  const [friction, setFriction] = useState(0.08);
  const [duty, setDuty] = useState<DutyId>("branch");
  const [aspect, setAspect] = useState(3);
  const [copied, setCopied] = useState(false);
  const load = useMemo(
    () => coolingLoad({ area, height, zoneId, insulationId, windowId, sunId, occupants, kitchen }),
    [area, height, zoneId, insulationId, windowId, sunId, occupants, kitchen],
  );
  const loadCfm = cfmFromBtu(load.coolBtu, deltaT);
  const cfm = cfmOverride ?? Math.round(loadCfm);
  const duct = sizeDuct(cfm, friction, duty, aspect);

  async function copyCard() {
    if (!duct) return;
    const text = [
      `Cooling ${formatNum(load.coolBtu)} BTU/h · ${formatNum(load.tons, 2)} tons`,
      `Suggested equipment ${formatNum(load.suggestedTons, 1)} tons`,
      `Supply ${formatNum(cfm)} CFM at ${deltaT}°F rise`,
      `Round ${duct.stockIn} in · ${formatNum(duct.velocity)} fpm · ${formatNum(duct.friction, 3)} in. w.g./100 ft`,
      `Rectangular ${duct.width} x ${duct.height} in`,
      "AirDesk screening estimate. Not a Manual J or Manual D permit calculation.",
    ].join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 pb-28 sm:pb-10">
      <p className="text-xs font-medium tracking-widest text-copper-deep uppercase">Screening sheet · not Manual J</p>
      <h1 className="mt-2 text-3xl leading-tight sm:text-5xl">Size the room, then the duct.</h1>
      <p className="mt-4 rounded-xl border border-line bg-warn-soft px-4 py-3 text-sm text-copper-deep">Planning numbers only. Not a Manual J or Manual D permit calculation.</p>
      <div className="mt-5 grid items-start gap-4 lg:grid-cols-[22rem_1fr]">
        <form className="order-1 grid gap-4" onSubmit={(event) => event.preventDefault()}>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Calculate</h2>
            <a href="#result" className="inline-flex h-9 items-center rounded-full bg-ink px-3 text-sm font-medium text-paper">Calculate</a>
          </div>
          <section className="rounded-2xl border border-line bg-surface p-4">
            <h2 className="flex items-center gap-2 text-2xl"><ThermometerSun className="size-5 text-copper" aria-hidden="true" />Cooling load</h2>
            <div className="mt-3 grid gap-3">
              <Field label="Floor area, square feet"><input className={control} type="number" min={1} value={area} onChange={(e) => setArea(Number(e.target.value))} /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Ceiling height, feet"><input className={control} type="number" min={7} step={0.5} value={height} onChange={(e) => setHeight(Number(e.target.value))} /></Field>
                <Field label="People in the room"><input className={control} type="number" min={0} value={occupants} onChange={(e) => setOccupants(Number(e.target.value))} /></Field>
              </div>
              <Field label="IECC climate zone"><select className={control} value={zoneId} onChange={(e) => setZoneId(e.target.value)}>{ZONES.map((zone) => <option key={zone.id} value={zone.id}>{zone.label}</option>)}</select></Field>
              <Field label="Insulation"><select className={control} value={insulationId} onChange={(e) => setInsulationId(e.target.value)}>{INSULATION.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></Field>
              <Field label="Glass"><select className={control} value={windowId} onChange={(e) => setWindowId(e.target.value)}>{WINDOWS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></Field>
              <Field label="Sun"><select className={control} value={sunId} onChange={(e) => setSunId(e.target.value)}>{SUN.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></Field>
              <label className="flex min-h-11 items-center gap-3 text-sm"><input type="checkbox" className="size-4 accent-copper" checked={kitchen} onChange={(e) => setKitchen(e.target.checked)} />Add a 4,000 BTU/h kitchen allowance</label>
            </div>
          </section>
          <section className="rounded-2xl border border-line bg-surface p-4">
            <h2 className="flex items-center gap-2 text-2xl"><Fan className="size-5 text-copper" aria-hidden="true" />Airflow</h2>
            <div className="mt-3 grid gap-3">
              <Field label="Cooling temperature difference, °F"><input className={control} type="number" min={8} max={40} value={deltaT} onChange={(e) => setDeltaT(Number(e.target.value))} /></Field>
              <Field label="CFM override, blank uses the load"><input className={control} type="number" min={0} placeholder={String(Math.round(loadCfm))} value={cfmOverride ?? ""} onChange={(e) => setCfmOverride(e.target.value === "" ? null : Number(e.target.value))} /></Field>
            </div>
          </section>
          <section className="rounded-2xl border border-line bg-surface p-4">
            <h2 className="flex items-center gap-2 text-2xl"><Ruler className="size-5 text-copper" aria-hidden="true" />Duct</h2>
            <div className="mt-3 grid gap-3">
              <Field label="Design friction, in. w.g. per 100 ft"><input className={control} type="number" min={0.02} max={0.3} step={0.01} value={friction} onChange={(e) => setFriction(Number(e.target.value))} /></Field>
              <Field label="Where this duct runs"><select className={control} value={duty} onChange={(e) => setDuty(e.target.value as DutyId)}>{DUTIES.map((item) => <option key={item.id} value={item.id}>{item.label} · keep under {item.limit} fpm</option>)}</select></Field>
              <Field label="Max rectangular aspect ratio"><input className={control} type="number" min={1} max={4} step={0.5} value={aspect} onChange={(e) => setAspect(Number(e.target.value))} /></Field>
            </div>
          </section>
        </form>
        <section id="result" className="order-2 grid scroll-mt-28 gap-4 lg:sticky lg:top-24">
          <article className="rounded-2xl border border-line bg-surface p-4">
            <p className="text-sm text-muted">Cooling</p>
            <p key={load.coolBtu} className="result-pop mt-1 font-serif text-4xl tabular-nums sm:text-5xl">{formatNum(load.coolBtu)}</p>
            <p className="mt-2 text-sm">{formatNum(load.tons, 2)} tons · suggested {formatNum(load.suggestedTons, 1)} tons</p>
          </article>
          <article className="rounded-2xl border border-line bg-surface p-4">
            <p className="text-sm text-muted">Supply air</p>
            <p key={cfm} className="result-pop mt-1 font-serif text-4xl tabular-nums sm:text-5xl">{formatNum(cfm)}</p>
            <p className="mt-2 text-sm">CFM at {deltaT}°F</p>
          </article>
          {duct ? (
            <article className="rounded-2xl border border-line bg-surface p-4">
              <p className="text-sm text-muted">Round duct</p>
              <p key={duct.stockIn} className="result-pop mt-1 font-serif text-4xl tabular-nums sm:text-5xl">{duct.stockIn}<span className="text-2xl"> in</span></p>
              <p className="mt-2 text-sm">{formatNum(duct.velocity)} fpm · {formatNum(duct.friction, 3)} in. w.g./100 ft · rectangle {duct.width} × {duct.height} in</p>
              <p className="mt-3 text-sm">{duct.overVelocity ? "Velocity is above the noise limit. Raise the duct one size." : "Velocity is inside the limit used for this run type."}</p>
            </article>
          ) : null}
          <button type="button" onClick={copyCard} className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-5 text-base font-medium text-paper sm:w-auto">
            <Copy className="size-4" aria-hidden="true" />{copied ? "Copied" : "Copy the field card"}
          </button>
          <Link to="/feedback" className="inline-flex text-sm font-medium text-copper-deep underline underline-offset-4">Report calculation</Link>
        </section>
      </div>
      <section className="mt-10 max-w-3xl">
        <h2 className="font-serif text-3xl">What this sheet does</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 text-lg leading-relaxed">
          <li>You enter the room: floor area, ceiling height, climate zone, insulation, glass, sun, and how many people.</li>
          <li>The sheet screens a cooling number from those choices. It is a planning number, not a full room-by-room load.</li>
          <li>It turns that cooling number into supply air. Airflow is the cooling load divided by 1.08 times the temperature difference you set.</li>
          <li>It sizes a round duct for that air at the friction rate you set, then a rectangle that moves the same air.</li>
          <li>If the air is moving too fast for that kind of run, the note tells you to go up one size.</li>
        </ol>
      </section>
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur sm:hidden">
        <dl className="grid grid-cols-3 gap-2 text-center">
          <div><dt className="text-[11px] uppercase tracking-wide text-muted">Cooling</dt><dd className="text-sm font-semibold tabular-nums">{formatNum(load.coolBtu)}</dd></div>
          <div><dt className="text-[11px] uppercase tracking-wide text-muted">CFM</dt><dd className="text-sm font-semibold tabular-nums">{formatNum(cfm)}</dd></div>
          <div><dt className="text-[11px] uppercase tracking-wide text-muted">Duct</dt><dd className="text-sm font-semibold tabular-nums">{duct ? `${duct.stockIn} in` : "—"}</dd></div>
        </dl>
      </div>
    </main>
  );
}
