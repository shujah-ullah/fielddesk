import { createFileRoute } from "@tanstack/react-router";
import { FieldTool } from "@/components/field-tool";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/hvac")({
  head: () => ({
    meta: [
      { title: "HVAC load and duct calculator — FieldDesk" },
      { name: "description", content: "Screen a room cooling load, supply CFM, and equal-friction duct size." },
    ],
  }),
  component: () => (
    <SiteShell>
      <FieldTool />
    </SiteShell>
  ),
});
