/** Planning estimates from published NEC tables. Not a permit calculation. */

export function motorSizing(input: { overload: "sf" | "other"; flc: number }) {
  const overloadFactor = input.overload === "sf" ? 1.25 : 1.15;
  return { minAmpacity: input.flc * 1.25, overload: input.flc * overloadFactor };
}
