import { useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { FLC_1PH, FLC_3PH, WIRES, ampacityOf, motorSizing, serviceLoad, wireForDrop } from "@/lib/electrical";

const control = "h-11 w-full rounded-xl border border-line bg-surface px-3 text-base text-ink outline-none focus:border-copper";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-line/70 py-2">
      <dt className="leading-snug">{label}</dt>
      <dd className="shrink-0 text-right font-medium tabular-nums">{value}</dd>
    </div>
  );
}

function num(value: number, digits = 0) {
  return value.toLocaleString("en-US", { maximumFractionDigits: digits, minimumFractionDigits: digits });
}

export function MotorTool() {
  const [phase, setPhase] = useState<1 | 3>(3);
  const [hp, setHp] = useState("5");
  const [volts, setVolts] = useState(460);
  const [material, setMaterial] = useState<"cu" | "al">("cu");
  const [temp, setTemp] = useState<"60" | "75">("75");
  const [ocpdPercent, setOcpdPercent] = useState(250);
  const [overload, setOverload] = useState<"sf" | "other">("sf");
  const [feet, setFeet] = useState(50);
  const voltages = phase === 1 ? [115, 230] : [200, 208, 230, 460, 575];
  const hpOptions = Object.keys(phase === 1 ? FLC_1PH : FLC_3PH);
  const result = useMemo(
    () => motorSizing({ phase, hp, volts, material, temp, ocpdPercent, overload, feet }),
    [phase, hp, volts, material, temp, ocpdPercent, overload, feet],
  );
  return (
    <Sheet
      kicker="Article 430 · screening"
      title="Size the motor circuit."
      note="Use table full-load current for the wire, the breaker, and the disconnect. Use the nameplate amperes for the overload relay. The overload line below uses the table so you can see the percentage. Replace it with the nameplate before you set the relay."
      steps={[
        "You pick the motor: one phase or three, the horsepower, and the voltage.",
        "The sheet looks up that motor’s full-load current in the table. The wire is sized from this number, not from the nameplate.",
        "It multiplies that current by 1.25. That is the smallest number of amperes the wire must carry.",
        "It multiplies the same current by the breaker or fuse percent you picked, then rounds up to the next standard size.",
        "It shows an overload so you can see the percent. Set the real relay from the nameplate amperes, not from this line.",
        "It checks how many volts you lose over the one-way length you typed.",
      ]}
    >
      <form className="order-2 grid gap-3 lg:order-1" onSubmit={(event) => event.preventDefault()}>
        <Field label="Phase">
          <select className={control} value={phase} onChange={(e) => { const next = Number(e.target.value) as 1 | 3; setPhase(next); setVolts(next === 1 ? 230 : 460); setHp(next === 1 ? "1" : "5"); }}>
            <option value={3}>Three-phase, Table 430.250</option>
            <option value={1}>Single-phase, Table 430.248</option>
          </select>
        </Field>
        <Field label="Horsepower">
          <select className={control} value={hp} onChange={(e) => setHp(e.target.value)}>
            {hpOptions.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </Field>
        <Field label="Voltage">
          <select className={control} value={volts} onChange={(e) => setVolts(Number(e.target.value))}>
            {voltages.map((item) => <option key={item} value={item}>{item} V</option>)}
          </select>
        </Field>
        <Field label="Short-circuit device">
          <select className={control} value={ocpdPercent} onChange={(e) => setOcpdPercent(Number(e.target.value))}>
            <option value={250}>Inverse-time breaker, 250%</option>
            <option value={175}>Dual-element time-delay fuse, 175%</option>
            <option value={300}>Nontime-delay fuse, 300%</option>
          </select>
        </Field>
        <Field label="Overload basis">
          <select className={control} value={overload} onChange={(e) => setOverload(e.target.value as "sf" | "other")}>
            <option value="sf">Service factor 1.15 or 40°C rise, 125%</option>
            <option value="other">All other motors, 115%</option>
          </select>
        </Field>
        <Field label="Conductor">
          <select className={control} value={`${material}-${temp}`} onChange={(e) => { const [m, t] = e.target.value.split("-"); setMaterial(m as "cu" | "al"); setTemp(t as "60" | "75"); }}>
            <option value="cu-75">Copper, 75°C column</option>
            <option value="cu-60">Copper, 60°C column</option>
            <option value="al-75">Aluminum, 75°C column</option>
            <option value="al-60">Aluminum, 60°C column</option>
          </select>
        </Field>
        <Field label="One-way length, feet">
          <input className={control} type="number" min={0} value={feet} onChange={(e) => setFeet(Number(e.target.value))} />
        </Field>
        <p className="text-sm leading-relaxed text-muted">Single-phase rows in this table are 115 V and 230 V. 200 V, 208 V, 230 V, 460 V, and 575 V are three-phase.</p>
      </form>
      <Result>
        {"error" in result ? <p>{result.error}</p> : (
          <dl>
            <p className="mb-3 rounded-xl bg-pine-soft px-3 py-3 text-sm leading-relaxed text-pine">Branch circuit, planning size. The wire and the short-circuit device use table current, not the nameplate. The overload line uses table current so you can see the percentage. Use the nameplate before you set the relay.</p>
            <Row label="Table FLC" value={`${num(result.flc, 1)} A`} />
            <Row label="Minimum conductor amperes, 125%" value={`${num(result.minAmpacity, 1)} A`} />
            <Row label="Suggested conductor" value={result.wire ? `${result.wire.awg} AWG · ${ampacityOf(result.wire, material, temp)} A` : "Above table"} />
            <Row label={`Short-circuit device, ${ocpdPercent}% then next standard`} value={result.ocpd ? `${result.ocpd} A` : "Above table"} />
            <Row label="Calculated device before rounding" value={`${num(result.rawOcpd, 0)} A`} />
            <Row label="Overload planning value" value={`${num(result.overload, 1)} A`} />
            <p className="mt-3 text-sm leading-relaxed text-muted">430.22 sizes the wire at 125% of table current. 430.52 sets the short-circuit device, then the next standard size. 430.32 sets the overload at 125% when the service factor is 1.15 or the rise is 40°C, otherwise 115%.</p>
            <Row label="Disconnect ampere rating, 115%" value={`${num(result.disconnect, 1)} A`} />
            <Row label="Voltage drop at table FLC" value={result.drop == null ? "—" : `${num(result.drop, 2)} V · ${num(result.dropPercent ?? 0, 1)}%`} />
          </dl>
        )}
        <ReportLink />
      </Result>
    </Sheet>
  );
}

export function DropTool() {
  const [phase, setPhase] = useState<1 | 3>(1);
  const [amps, setAmps] = useState(20);
  const [volts, setVolts] = useState(240);
  const [feet, setFeet] = useState(80);
  const [limit, setLimit] = useState(3);
  const [material, setMaterial] = useState<"cu" | "al">("cu");
  const [temp, setTemp] = useState<"60" | "75">("75");
  const [continuous, setContinuous] = useState(true);
  const result = useMemo(
    () => wireForDrop({ phase, amps, volts, feet, limit, material, temp, continuous }),
    [phase, amps, volts, feet, limit, material, temp, continuous],
  );
  return (
    <Sheet
      kicker="Voltage drop · screening"
      title="Pick a wire that also holds the drop."
      note="Drop uses 2 × K × I × D / cm for single-phase and 1.732 for three-phase. K is 12.9 copper and 21.2 aluminum. D is one-way feet."
      steps={[
        "You enter the load in amps, the voltage, and how far the wire runs. Distance is one way.",
        "If the load runs for three hours or more, leave the continuous box on. The sheet adds 25% before it picks a wire.",
        "It finds the smallest wire that can carry those amps.",
        "It then checks how much voltage that wire loses on the run.",
        "If the loss is over the limit you set, it steps up to a larger wire until the loss is inside the limit, or until the table runs out.",
      ]}
    >
      <form className="order-2 grid gap-3 lg:order-1" onSubmit={(event) => event.preventDefault()}>
        <Field label="Phase"><select className={control} value={phase} onChange={(e) => setPhase(Number(e.target.value) as 1 | 3)}><option value={1}>Single-phase</option><option value={3}>Three-phase</option></select></Field>
        <Field label="Load, amps"><input className={control} type="number" min={1} value={amps} onChange={(e) => setAmps(Number(e.target.value))} /></Field>
        <Field label="Voltage"><input className={control} type="number" min={1} value={volts} onChange={(e) => setVolts(Number(e.target.value))} /></Field>
        <Field label="One-way length, feet"><input className={control} type="number" min={1} value={feet} onChange={(e) => setFeet(Number(e.target.value))} /></Field>
        <Field label="Drop limit, percent"><input className={control} type="number" min={1} max={10} step={0.5} value={limit} onChange={(e) => setLimit(Number(e.target.value))} /></Field>
        <Field label="Conductor"><select className={control} value={`${material}-${temp}`} onChange={(e) => { const [m, t] = e.target.value.split("-"); setMaterial(m as "cu" | "al"); setTemp(t as "60" | "75"); }}><option value="cu-75">Copper, 75°C</option><option value="cu-60">Copper, 60°C</option><option value="al-75">Aluminum, 75°C</option></select></Field>
        <label className="flex min-h-11 items-center gap-3 text-sm"><input type="checkbox" className="size-4 accent-copper" checked={continuous} onChange={(e) => setContinuous(e.target.checked)} />Continuous load, size conductors at 125%</label>
      </form>
      <Result>
        {"error" in result ? <p>{result.error}</p> : (
          <dl>
            <Row label="Amperes the wire must carry" value={`${num(result.required, 1)} A`} />
            <Row label="Wire for those amperes" value={result.ampWire ? `${result.ampWire.awg} AWG` : "—"} />
            <Row label="Wire that also checks drop" value={`${result.chosen.awg} AWG`} />
            <Row label="Estimated drop" value={`${num(result.dropVolts, 2)} V · ${num(result.dropPercent, 2)}%`} />
            <Row label="Within the limit" value={result.within ? "Yes" : "No. Shorten the run or raise the limit."} />
          </dl>
        )}
        <ReportLink />
      </Result>
    </Sheet>
  );
}

export function ServiceTool() {
  const [sqft, setSqft] = useState(1800);
  const [smallAppliance, setSmallAppliance] = useState(2);
  const [laundry, setLaundry] = useState(true);
  const [fixedVa, setFixedVa] = useState(6000);
  const [fixedCount, setFixedCount] = useState(4);
  const [dryer, setDryer] = useState(5000);
  const [range, setRange] = useState(8000);
  const [heat, setHeat] = useState(0);
  const [cool, setCool] = useState(6000);
  const [motor, setMotor] = useState(1200);
  const result = useMemo(
    () => serviceLoad({ sqft, smallAppliance, laundry, fixedVa, fixedCount, dryer, range, heat, cool, motor }),
    [sqft, smallAppliance, laundry, fixedVa, fixedCount, dryer, range, heat, cool, motor],
  );
  return (
    <Sheet
      kicker="Article 220 · screening"
      title="Estimate the dwelling service."
      note="Standard-method shape: 3 VA per square foot, small-appliance circuits, laundry, then the 3,000 VA / 35% split. Range and dryer use the VA you enter, not the demand tables."
      steps={[
        "You enter the floor area and the large loads in the house.",
        "Lighting starts at 3 VA for each square foot, plus 1,500 VA for each small-appliance circuit and the laundry circuit if you leave it on.",
        "The first 3,000 VA of that group is counted in full. Everything above 3,000 VA is counted at 35%.",
        "Fixed appliances, the dryer, and the range are added from the VA you type.",
        "Heating and cooling are not both added. The sheet keeps the larger one, then adds the largest motor.",
        "The total is turned into amps at 240 volts, then a suggested service size.",
      ]}
    >
      <form className="order-2 grid gap-3 lg:order-1" onSubmit={(event) => event.preventDefault()}>
        <Field label="Floor area, square feet"><input className={control} type="number" min={1} value={sqft} onChange={(e) => setSqft(Number(e.target.value))} /></Field>
        <Field label="Small-appliance circuits"><input className={control} type="number" min={2} value={smallAppliance} onChange={(e) => setSmallAppliance(Number(e.target.value))} /></Field>
        <label className="flex min-h-11 items-center gap-3 text-sm"><input type="checkbox" className="size-4 accent-copper" checked={laundry} onChange={(e) => setLaundry(e.target.checked)} />Laundry circuit, 1,500 VA</label>
        <Field label="Fixed appliance VA"><input className={control} type="number" min={0} value={fixedVa} onChange={(e) => setFixedVa(Number(e.target.value))} /></Field>
        <Field label="How many fixed appliances"><input className={control} type="number" min={0} value={fixedCount} onChange={(e) => setFixedCount(Number(e.target.value))} /></Field>
        <Field label="Dryer VA"><input className={control} type="number" min={0} value={dryer} onChange={(e) => setDryer(Number(e.target.value))} /></Field>
        <Field label="Range VA"><input className={control} type="number" min={0} value={range} onChange={(e) => setRange(Number(e.target.value))} /></Field>
        <Field label="Heating VA"><input className={control} type="number" min={0} value={heat} onChange={(e) => setHeat(Number(e.target.value))} /></Field>
        <Field label="Cooling VA"><input className={control} type="number" min={0} value={cool} onChange={(e) => setCool(Number(e.target.value))} /></Field>
        <Field label="Largest motor VA"><input className={control} type="number" min={0} value={motor} onChange={(e) => setMotor(Number(e.target.value))} /></Field>
      </form>
      <Result>
        <dl>
          <Row label="General lighting and circuits" value={`${num(result.general)} VA`} />
          <Row label="After demand factor" value={`${num(result.generalDemand)} VA`} />
          <Row label="Fixed appliances" value={`${num(result.fixedDemand)} VA`} />
          <Row label="Calculated load" value={`${num(result.total)} VA · ${num(result.amps240, 1)} A`} />
          <Row label="Suggested service" value={`${result.service} A`} />
        </dl>
        <ReportLink />
      </Result>
    </Sheet>
  );
}

export function WireTool() {
  const [material, setMaterial] = useState<"cu" | "al">("cu");
  const [temp, setTemp] = useState<"60" | "75">("75");
  const rows = WIRES.filter((wire) => ampacityOf(wire, material, temp) != null);
  return (
    <Sheet
      kicker="Table 310.16 · screening"
      title="Read the ampere column."
      note="Ordinary 14, 12, and 10 AWG copper are limited to 15 A, 20 A, and 30 A overcurrent devices. Motor circuits are one case where Article 430 sets the short-circuit device instead."
      steps={[
        "This page does not size a job. It only shows how many amperes each wire can carry.",
        "Pick copper or aluminum, then the 60°C or 75°C column.",
        "Each row is a wire size and the amperes that size can carry in the column you picked.",
        "On a normal circuit, 14 AWG copper stops at 15 A, 12 AWG at 20 A, and 10 AWG at 30 A. A motor circuit is one case where the breaker can be higher than that.",
      ]}
    >
      <form className="order-2 grid gap-3 lg:order-1" onSubmit={(event) => event.preventDefault()}>
        <Field label="Material"><select className={control} value={material} onChange={(e) => setMaterial(e.target.value as "cu" | "al")}><option value="cu">Copper</option><option value="al">Aluminum</option></select></Field>
        <Field label="Column"><select className={control} value={temp} onChange={(e) => setTemp(e.target.value as "60" | "75")}><option value="75">75°C</option><option value="60">60°C</option></select></Field>
      </form>
      <Result>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-muted"><th className="py-2">Size</th><th className="py-2">Amperes</th></tr></thead>
            <tbody>
              {rows.map((wire) => (
                <tr key={wire.awg} className="border-t border-line">
                  <td className="py-2">{wire.awg} AWG</td>
                  <td className="py-2 tabular-nums">{ampacityOf(wire, material, temp)} A</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ReportLink />
      </Result>
    </Sheet>
  );
}

function ReportLink() {
  return (
    <Link to="/feedback" className="mt-4 inline-flex text-base font-medium text-copper-deep underline underline-offset-4">
      Report calculation
    </Link>
  );
}

function Sheet({ kicker, title, note, steps, children }: { kicker: string; title: string; note: string; steps: string[]; children: ReactNode }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6 pb-10">
      <p className="text-xs font-medium tracking-widest text-copper-deep uppercase">{kicker}</p>
      <h1 className="mt-2 max-w-2xl text-3xl leading-tight sm:text-5xl sm:leading-none">{title}</h1>
      <p className="mt-4 max-w-2xl rounded-xl border border-line bg-warn-soft px-4 py-3 text-sm leading-relaxed text-copper-deep">{note}</p>
      <div className="mt-5 grid items-start gap-4 lg:grid-cols-[22rem_1fr]">{children}</div>
      <How steps={steps} />
    </main>
  );
}

function How({ steps }: { steps: string[] }) {
  return (
    <section className="mt-10 max-w-3xl">
      <h2 className="font-serif text-3xl">What this sheet does</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-6 text-lg leading-relaxed">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </section>
  );
}

function Result({ children }: { children: ReactNode }) {
  return <section className="order-1 rounded-2xl lg:order-2 border border-line bg-surface p-4 sm:p-5 lg:order-2 lg:sticky lg:top-24">{children}</section>;
}
