import { createFileRoute } from "@tanstack/react-router";
import { FieldTool } from "@/components/field-tool";
import { SiteShell } from "@/components/site-shell";
import { calculatorSchema, pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/hvac")({
  head: () => ({
    ...pageSeo({
      title: "Duct Size and Room Cooling Calculator | FieldDesk",
      description: "Screen a room cooling load, turn it into supply air, and size a round or rectangular duct. Planning numbers, not a Manual J or Manual D permit.",
      path: "/hvac",
    }),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(calculatorSchema({ name: "Duct Size and Room Cooling Calculator", description: "Screen a room cooling load, calculate supply air, and size a round or rectangular duct.", path: "/hvac" })) }],
  }),
  component: () => (
    <SiteShell>
      <FieldTool />
    </SiteShell>
  ),
});
