/** Planning estimates from published NEC tables. Not a permit calculation. */

export const FLC_3PH: Record<string, Record<number, number>> = {
  "0.5": { 200: 2.5, 208: 2.4, 230: 2.2, 460: 1.1, 575: 0.9 },
  "5": { 200: 17.5, 208: 16.7, 230: 15.2, 460: 7.6, 575: 6.1 },
  "10": { 200: 32.2, 208: 30.8, 230: 28, 460: 14, 575: 11 }
};

export function motorSizing(input: { phase: 1 | 3; hp: string; volts: number; overload: "sf" | "other" }) {
  const flc = (input.phase === 3 ? FLC_3PH : {})[input.hp]?.[input.volts];
  if (!flc) return { error: "That horsepower is not listed at this voltage." as const };
  const overloadFactor = input.overload === "sf" ? 1.25 : 1.15;
  return { flc, minAmpacity: flc * 1.25, overload: flc * overloadFactor };
}
