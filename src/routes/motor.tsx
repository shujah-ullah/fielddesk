import { createFileRoute } from "@tanstack/react-router";
import { MotorTool } from "@/components/electrical-tool";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/motor")({
  head: () => ({ meta: [{ title: "Motor circuit sizing — FieldDesk" }] }),
  component: () => <SiteShell><MotorTool /></SiteShell>,
});
