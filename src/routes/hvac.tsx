import { createFileRoute } from "@tanstack/react-router";
import { FieldTool } from "@/components/field-tool";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/hvac")({
  head: () => ({
    meta: [
      { title: "Duct Size and Room Cooling Calculator | FieldDesk" },
      {
        name: "description",
        content:
          "Screen a room cooling load, turn it into supply air, and size a round or rectangular duct. Planning numbers, not a Manual J or Manual D permit.",
      },
    ],
  }),
  component: () => (
    <SiteShell>
      <FieldTool />
    </SiteShell>
  ),
});
