import { createFileRoute } from "@tanstack/react-router";
import { WireTool } from "@/components/electrical-tool";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/wire")({
  head: () => ({ meta: [{ title: "Wire ampacity table — FieldDesk" }] }),
  component: () => <SiteShell><WireTool /></SiteShell>,
});
