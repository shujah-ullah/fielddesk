import { createFileRoute } from "@tanstack/react-router";
import { ServiceTool } from "@/components/electrical-tool";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/service")({
  head: () => ({ meta: [{ title: "Dwelling service load — FieldDesk" }] }),
  component: () => <SiteShell><ServiceTool /></SiteShell>,
});
