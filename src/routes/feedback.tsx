import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";

const FORM_URL = "https://docs.google.com/forms/d/10WFyzyrMaa4l9x0SITptJZCOIxRF0XEOleOeWtBBDBU/viewform";
const FORM_EMBED = `${FORM_URL}?embedded=true`;

export const Route = createFileRoute("/feedback")({
  head: () => ({ meta: [{ title: "Field check — FieldDesk" }] }),
  component: FeedbackPage,
});

function FeedbackPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-3xl px-4 py-8">
        <p className="text-xs font-medium tracking-widest text-copper-deep uppercase">Field check</p>
        <h1 className="mt-2 text-4xl leading-tight sm:text-5xl">Tell us what the sheet got wrong.</h1>
        <p className="mt-4 text-base leading-relaxed text-muted">Run one job, then send the correction. The answers go to a Google Sheet. No account.</p>
        <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm leading-relaxed">
          <li>5 hp, 460 V, three-phase motor. Copper, 75°C, inverse-time breaker.</li>
          <li>1,800 sq ft dwelling service with the sample loads.</li>
          <li>240 sq ft room, Zone 3, 8 ft ceiling, then the duct.</li>
        </ol>
        <a href={FORM_URL} target="_blank" rel="noreferrer" className="mt-5 inline-flex h-11 items-center rounded-full bg-ink px-4 text-sm font-medium text-paper">Open the form</a>
        <iframe title="FieldDesk field check" src={FORM_EMBED} className="mt-6 h-[980px] w-full rounded-2xl border border-line bg-surface" />
      </main>
    </SiteShell>
  );
}
