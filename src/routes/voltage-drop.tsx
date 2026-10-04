import { createFileRoute } from "@tanstack/react-router";
import { DropTool } from "@/components/electrical-tool";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/voltage-drop")({
  head: () => ({
    meta: [
      { title: "Voltage Drop Calculator — One-Way Feet | FieldDesk" },
      {
        name: "description",
        content:
          "Check one-way voltage drop for copper or aluminum. Distance is one way. A continuous load adds 25% before the wire is picked.",
      },
    ],
  }),
  component: DropPage,
});

function DropPage() {
  return (
    <SiteShell>
      <DropTool />
      <section className="mx-auto max-w-3xl px-4 pb-14">
        <h2 className="font-serif text-3xl">Worked example: 20 A, 240 V, 80 ft</h2>
        <p className="mt-4 text-lg leading-relaxed">
          The distance is one way. At 20 A, not continuous, 14 AWG copper can carry the amperes, but the drop is about 10 V, or 4.2%. That is over a 3% limit.
        </p>
        <p className="mt-3 text-lg leading-relaxed">
          12 AWG copper drops about 6.3 V, or 2.6%, which is inside 3%. Three percent on a branch and five percent total is the usual recommendation, not a code maximum.
        </p>
      </section>
    </SiteShell>
  );
}

