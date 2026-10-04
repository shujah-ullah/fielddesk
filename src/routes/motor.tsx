import { createFileRoute } from "@tanstack/react-router";
import { MotorTool } from "@/components/electrical-tool";
import { SiteShell } from "@/components/site-shell";

const faq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why does the motor wire use table current?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "NEC 430.22 sizes the branch-circuit conductor from the table full-load current, not the nameplate. For one motor, that current is multiplied by 1.25.",
      },
    },
    {
      "@type": "Question",
      name: "Why can the breaker be larger than the wire?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The breaker or fuse is short-circuit and ground-fault protection under 430.52. The overload relay is what protects the wire from a running overload.",
      },
    },
    {
      "@type": "Question",
      name: "Why must the overload use the nameplate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "NEC 430.32 sets the overload from the motor nameplate current. The sheet shows the percentage on table current so you can see the rule. Set the relay from the nameplate.",
      },
    },
  ],
};

export const Route = createFileRoute("/motor")({
  head: () => ({
    meta: [
      { title: "Motor Wire Size Calculator — NEC 430 | FieldDesk" },
      {
        name: "description",
        content:
          "Size a motor branch circuit from table full-load current: wire at 125%, breaker or fuse from 430.52, and an overload check. Planning sheet, not a permit.",
      },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faq) }],
  }),
  component: MotorPage,
});

function MotorPage() {
  return (
    <SiteShell>
      <MotorTool />
      <section className="mx-auto max-w-3xl px-4 pb-14">
        <h2 className="font-serif text-3xl">Worked example: 5 hp, 460 V, three-phase</h2>
        <p className="mt-4 text-lg leading-relaxed">
          Table 430.250 lists 7.6 A. The wire is sized at 125%, so 9.5 A. A 14 AWG copper conductor in the 75°C column is listed at 20 A, which covers 9.5 A.
        </p>
        <p className="mt-3 text-lg leading-relaxed">
          An inverse-time breaker at 250% is 19 A, then the next standard size is 20 A. The overload line at 125% is 9.5 A on table current. Replace that with the nameplate amperes before you set the relay.
        </p>
        <h2 className="mt-8 font-serif text-3xl">Common questions</h2>
        <dl className="mt-4 space-y-4 text-lg leading-relaxed">
          <div>
            <dt className="font-semibold">Why does the wire use table current?</dt>
            <dd className="mt-1 text-muted">The branch-circuit conductor starts from the table full-load current, then 125%. The nameplate is for the overload.</dd>
          </div>
          <div>
            <dt className="font-semibold">Why can the breaker be larger than the wire?</dt>
            <dd className="mt-1 text-muted">That device is short-circuit protection. The overload relay protects the conductor from a running overload.</dd>
          </div>
          <div>
            <dt className="font-semibold">Why must the overload use the nameplate?</dt>
            <dd className="mt-1 text-muted">The percentage is applied to nameplate current. This sheet shows the percentage on table current so you can see the rule.</dd>
          </div>
        </dl>
      </section>
    </SiteShell>
  );
}

