import { createFileRoute } from "@tanstack/react-router";
import { ServiceTool } from "@/components/electrical-tool";
import { SiteShell } from "@/components/site-shell";
import { calculatorSchema, pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/service")({
  head: () => ({
    ...pageSeo({
      title: "Dwelling Service Load Calculator — Article 220 | FieldDesk",
      description: "Screen a house service with the standard method: 3 VA per square foot, small-appliance circuits, laundry, then the 3,000 VA and 35% split.",
      path: "/service",
    }),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(calculatorSchema({ name: "Dwelling Service Load Calculator", description: "Screen a dwelling service load using standard-method inputs and a demand split.", path: "/service" })) }],
  }),
  component: () => <SiteShell><ServiceTool /></SiteShell>,
});
