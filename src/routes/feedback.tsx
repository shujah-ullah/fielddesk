import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";

const ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSfPuUiujTS9JwL-45VxKJt34TsTgAHvgzdgoYcHeBIkpzH7OA/formResponse";

const TRADES = ["Electrician.", "HVAC.", "Both.", "Engineer."];
const SHEETS = ["Motor", "Voltage drop", "Service load", "Wire ampacity", "HVAC load and duct."];

export const Route = createFileRoute("/feedback")({
  head: () => ({ meta: [{ title: "Field check — FieldDesk" }] }),
  component: FeedbackPage,
});

function FeedbackPage() {
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setPending(true);
    const body = new FormData(form);
    try {
      await fetch(ACTION, { method: "POST", mode: "no-cors", body });
      setSent(true);
      form.reset();
    } finally {
      setPending(false);
    }
  }

  return (
    <SiteShell>
      <main className="mx-auto max-w-xl px-4 py-6 sm:py-8">
        <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-surface px-4 py-5 sm:px-6">
          <p className="text-xs font-medium tracking-widest text-copper-deep uppercase">Field check</p>
          <h1 className="mt-2 text-3xl leading-tight sm:text-4xl">Tell us what the sheet got wrong.</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">Run one job, then send the correction. No account. Answers go to the FieldDesk sheet.</p>
          <p className="mt-3 text-sm leading-relaxed">Try a 5 hp, 460 V motor, the 1,800 sq ft service, or a 240 sq ft Zone 3 room.</p>

          {sent ? (
            <p className="mt-5 rounded-xl border border-line bg-warn-soft px-4 py-3 text-sm text-copper-deep">Sent. The correction is in the sheet. Run another job if you have one.</p>
          ) : null}

          <Choice name="entry.2095269738" label="1. Your trade" options={TRADES} required />
          <Choice name="entry.429096856" label="2. Which sheet" options={SHEETS} required />
          <Area name="entry.620491421" label="3. What you entered" hint="Example: 5 hp, 460 V, three-phase, copper 75°C." required />
          <Area name="entry.1709546884" label="4. What FieldDesk showed" required />
          <Area name="entry.198954980" label="5. What you would use on the job" required />
          <Area name="entry.1791486836" label="6. What is wrong, if anything" hint="The wire, breaker, tonnage, or duct size you would change." />
          <Short name="entry.1847572912" label="7. Your name, optional" />
          <Short name="entry.859741771" label="8. Email, optional" type="email" />

          <button type="submit" disabled={pending} className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-copper px-5 text-base font-medium text-paper disabled:opacity-60">
            {pending ? "Sending" : "Send the correction"}
          </button>
        </form>
      </main>
    </SiteShell>
  );
}

function Choice({ name, label, options, required }: { name: string; label: string; options: string[]; required?: boolean }) {
  return (
    <fieldset className="mt-5">
      <legend className="text-sm font-semibold">{label}</legend>
      <div className="mt-2 grid gap-2">
        {options.map((option) => (
          <label key={option} className="flex min-h-11 items-center gap-3 rounded-xl border border-line px-3 text-sm">
            <input required={required} type="radio" name={name} value={option} className="size-4 accent-copper" />
            {option.replace(/\.$/, "")}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Area({ name, label, hint, required }: { name: string; label: string; hint?: string; required?: boolean }) {
  return (
    <label className="mt-5 block">
      <span className="text-sm font-semibold">{label}</span>
      {hint ? <span className="mt-1 block text-sm text-muted">{hint}</span> : null}
      <textarea required={required} name={name} rows={3} className="mt-2 w-full rounded-xl border border-line bg-paper px-3 py-2 text-base text-ink outline-none focus:border-copper" />
    </label>
  );
}

function Short({ name, label, type = "text" }: { name: string; label: string; type?: string }) {
  return (
    <label className="mt-5 block">
      <span className="text-sm font-semibold">{label}</span>
      <input type={type} name={name} className="mt-2 h-11 w-full rounded-xl border border-line bg-paper px-3 text-base text-ink outline-none focus:border-copper" />
    </label>
  );
}
