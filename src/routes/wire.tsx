import { createFileRoute } from "@tanstack/react-router";
import { WireTool } from "@/components/electrical-tool";
import { SiteShell } from "@/components/site-shell";

const faq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which temperature column should I use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the column that matches the termination. Most breakers and lugs are 60°C or 75°C. The 90°C column is the insulation rating.",
      },
    },
    {
      "@type": "Question",
      name: "Are 14, 12, and 10 AWG limited below the table?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On a normal circuit, 14 AWG copper stops at 15 A, 12 AWG at 20 A, and 10 AWG at 30 A. A motor circuit is one case where the breaker can be higher.",
      },
    },
  ],
};

export const Route = createFileRoute("/wire")({
  head: () => ({
    meta: [
      { title: "Wire Ampacity Table 310.16 — 60°C, 75°C, 90°C | FieldDesk" },
      {
        name: "description",
        content:
          "Look up copper or aluminum amperes from Table 310.16 at 60°C, 75°C, or 90°C. Most lugs limit the circuit to 60°C or 75°C.",
      },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faq) }],
  }),
  component: () => <SiteShell><WireTool /></SiteShell>,
});

