import { createFileRoute } from "@tanstack/react-router";
import { ServiceTool } from "@/components/electrical-tool";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/service")({
  head: () => ({
    meta: [
      { title: "Dwelling Service Load Calculator — Article 220 | FieldDesk" },
      {
        name: "description",
        content:
          "Screen a house service with the standard method: 3 VA per square foot, small-appliance circuits, laundry, then the 3,000 VA and 35% split.",
      },
    ],
  }),
  component: () => <SiteShell><ServiceTool /></SiteShell>,
});

