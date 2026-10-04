import { createFileRoute } from "@tanstack/react-router";
import { DropTool } from "@/components/electrical-tool";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/voltage-drop")({
  head: () => ({ meta: [{ title: "Voltage drop calculator — FieldDesk" }] }),
  component: () => <SiteShell><DropTool /></SiteShell>,
});
