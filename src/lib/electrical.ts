/** Planning estimates from published NEC tables. Not a permit calculation. */

export const FLC_3PH: Record<string, Record<number, number>> = {
  "0.5": { 200: 2.5, 208: 2.4, 230: 2.2, 460: 1.1, 575: 0.9 },
  "0.75": { 200: 3.7, 208: 3.5, 230: 3.2, 460: 1.6, 575: 1.3 },
  "1": { 200: 4.8, 208: 4.6, 230: 4.2, 460: 2.1, 575: 1.7 },
  "1.5": { 200: 6.9, 208: 6.6, 230: 6.0, 460: 3.0, 575: 2.4 },
  "2": { 200: 7.8, 208: 7.5, 230: 6.8, 460: 3.4, 575: 2.7 },
  "3": { 200: 11, 208: 10.6, 230: 9.6, 460: 4.8, 575: 3.9 },
  "5": { 200: 17.5, 208: 16.7, 230: 15.2, 460: 7.6, 575: 6.1 },
  "7.5": { 200: 25.3, 208: 24.2, 230: 22, 460: 11, 575: 9 },
  "10": { 200: 32.2, 208: 30.8, 230: 28, 460: 14, 575: 11 },
  "15": { 200: 48.3, 208: 46.2, 230: 42, 460: 21, 575: 17 },
  "20": { 200: 62.1, 208: 59.4, 230: 54, 460: 27, 575: 22 },
  "25": { 200: 78.2, 208: 74.8, 230: 68, 460: 34, 575: 27 },
  "30": { 200: 92, 208: 88, 230: 80, 460: 40, 575: 32 },
  "40": { 200: 120, 208: 114, 230: 104, 460: 52, 575: 41 },
  "50": { 200: 150, 208: 143, 230: 130, 460: 65, 575: 52 },
  "60": { 200: 177, 208: 169, 230: 154, 460: 77, 575: 62 },
  "75": { 200: 221, 208: 211, 230: 192, 460: 96, 575: 77 },
  "100": { 200: 285, 208: 273, 230: 248, 460: 124, 575: 99 },
  "125": { 200: 359, 208: 343, 230: 312, 460: 156, 575: 125 },
  "150": { 200: 414, 208: 396, 230: 360, 460: 180, 575: 144 },
  "200": { 200: 552, 208: 528, 230: 480, 460: 240, 575: 192 },
  "250": { 460: 302, 575: 242 },
  "300": { 460: 361, 575: 289 },
  "350": { 460: 414, 575: 336 },
  "400": { 460: 477, 575: 382 },
  "450": { 460: 515, 575: 412 },
  "500": { 460: 590, 575: 472 },
};

export const FLC_1PH: Record<string, Record<number, number>> = {
  "0.167": { 115: 4.4, 230: 2.2 },
  "0.25": { 115: 5.8, 230: 2.9 },
  "0.33": { 115: 7.2, 230: 3.6 },
  "0.5": { 115: 9.8, 230: 4.9 },
  "0.75": { 115: 13.8, 230: 6.9 },
  "1": { 115: 16, 230: 8 },
  "1.5": { 115: 20, 230: 10 },
  "2": { 115: 24, 230: 12 },
  "3": { 115: 34, 230: 17 },
  "5": { 115: 56, 230: 28 },
  "7.5": { 115: 80, 230: 40 },
  "10": { 115: 100, 230: 50 },
};

export type Wire = {
  awg: string;
  cm: number;
  cu60: number;
  cu75: number;
  cu90: number;
  al60: number | null;
  al75: number | null;
  al90: number | null;
};

export const WIRES: Wire[] = [
  { awg: "14", cm: 4110, cu60: 15, cu75: 20, cu90: 25, al60: null, al75: null, al90: null },
  { awg: "12", cm: 6530, cu60: 20, cu75: 25, cu90: 30, al60: 15, al75: 20, al90: 25 },
  { awg: "10", cm: 10380, cu60: 30, cu75: 35, cu90: 40, al60: 25, al75: 30, al90: 35 },
  { awg: "8", cm: 16510, cu60: 40, cu75: 50, cu90: 55, al60: 35, al75: 40, al90: 45 },
  { awg: "6", cm: 26240, cu60: 55, cu75: 65, cu90: 75, al60: 40, al75: 50, al90: 55 },
  { awg: "4", cm: 41740, cu60: 70, cu75: 85, cu90: 95, al60: 55, al75: 65, al90: 75 },
  { awg: "3", cm: 52620, cu60: 85, cu75: 100, cu90: 115, al60: 65, al75: 75, al90: 85 },
  { awg: "2", cm: 66360, cu60: 95, cu75: 115, cu90: 130, al60: 75, al75: 90, al90: 100 },
  { awg: "1", cm: 83690, cu60: 110, cu75: 130, cu90: 145, al60: 85, al75: 100, al90: 115 },
  { awg: "1/0", cm: 105600, cu60: 125, cu75: 150, cu90: 170, al60: 100, al75: 120, al90: 135 },
  { awg: "2/0", cm: 133100, cu60: 145, cu75: 175, cu90: 195, al60: 115, al75: 135, al90: 150 },
  { awg: "3/0", cm: 167800, cu60: 165, cu75: 200, cu90: 225, al60: 130, al75: 155, al90: 175 },
  { awg: "4/0", cm: 211600, cu60: 195, cu75: 230, cu90: 260, al60: 150, al75: 180, al90: 205 },
  { awg: "250", cm: 250000, cu60: 215, cu75: 255, cu90: 290, al60: 170, al75: 205, al90: 230 },
  { awg: "300", cm: 300000, cu60: 240, cu75: 285, cu90: 320, al60: 195, al75: 230, al90: 260 },
  { awg: "350", cm: 350000, cu60: 260, cu75: 310, cu90: 350, al60: 210, al75: 250, al90: 280 },
  { awg: "400", cm: 400000, cu60: 280, cu75: 335, cu90: 380, al60: 225, al75: 270, al90: 305 },
  { awg: "500", cm: 500000, cu60: 320, cu75: 380, cu90: 430, al60: 260, al75: 310, al90: 350 },
  { awg: "600", cm: 600000, cu60: 350, cu75: 420, cu90: 475, al60: 285, al75: 340, al90: 385 },
  { awg: "750", cm: 750000, cu60: 400, cu75: 475, cu90: 535, al60: 320, al75: 385, al90: 435 },
  { awg: "1000", cm: 1000000, cu60: 455, cu75: 545, cu90: 615, al60: 375, al75: 445, al90: 500 },
];

const BREAKERS = [15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 110, 125, 150, 175, 200, 225, 250, 300, 350, 400, 450, 500, 600, 700, 800, 1000, 1200];

export function nextStandard(value: number) {
  return BREAKERS.find((size) => size >= value) ?? null;
}

export function ampacityOf(wire: Wire, material: "cu" | "al", temp: "60" | "75") {
  if (material === "al") return temp === "60" ? wire.al60 : wire.al75;
  return temp === "60" ? wire.cu60 : wire.cu75;
}

export function pickWire(required: number, material: "cu" | "al", temp: "60" | "75") {
  return WIRES.find((wire) => {
    const ampacity = ampacityOf(wire, material, temp);
    return ampacity != null && ampacity >= required;
  }) ?? null;
}

export function voltageDrop(phase: 1 | 3, material: "cu" | "al", amps: number, feet: number, cm: number) {
  const k = material === "al" ? 21.2 : 12.9;
  const factor = phase === 1 ? 2 : 1.732;
  return (factor * k * amps * feet) / cm;
}

export function motorSizing(input: {
  phase: 1 | 3;
  hp: string;
  volts: number;
  material: "cu" | "al";
  temp: "60" | "75";
  ocpdPercent: number;
  overload: "sf" | "other";
  feet: number;
}) {
  const table = input.phase === 1 ? FLC_1PH : FLC_3PH;
  const flc = table[input.hp]?.[input.volts];
  if (!flc) return { error: "That horsepower is not listed at this voltage in the table used here." as const };
  const minAmpacity = flc * 1.25;
  const wire = pickWire(minAmpacity, input.material, input.temp);
  const rawOcpd = flc * (input.ocpdPercent / 100);
  const ocpd = nextStandard(rawOcpd);
  const overloadFactor = input.overload === "sf" ? 1.25 : 1.15;
  const drop = wire && input.feet > 0
    ? voltageDrop(input.phase, input.material, flc, input.feet, wire.cm)
    : null;
  return {
    flc,
    minAmpacity,
    wire,
    rawOcpd,
    ocpd,
    overload: flc * overloadFactor,
    disconnect: flc * 1.15,
    drop,
    dropPercent: drop ? (drop / input.volts) * 100 : null,
  };
}

export function wireForDrop(input: {
  phase: 1 | 3;
  amps: number;
  volts: number;
  feet: number;
  limit: number;
  material: "cu" | "al";
  temp: "60" | "75";
  continuous: boolean;
}) {
  const required = input.amps * (input.continuous ? 1.25 : 1);
  const candidates = WIRES.filter((wire) => {
    const ampacity = ampacityOf(wire, input.material, input.temp);
    return ampacity != null && ampacity >= required;
  });
  const chosen = candidates.find((wire) => (voltageDrop(input.phase, input.material, input.amps, input.feet, wire.cm) / input.volts) * 100 <= input.limit)
    ?? candidates[candidates.length - 1];
  if (!chosen) return { error: "No conductor in this table can carry these amperes." as const };
  const dropVolts = voltageDrop(input.phase, input.material, input.amps, input.feet, chosen.cm);
  return {
    required,
    ampWire: pickWire(required, input.material, input.temp),
    chosen,
    dropVolts,
    dropPercent: (dropVolts / input.volts) * 100,
    within: (dropVolts / input.volts) * 100 <= input.limit,
  };
}

export function serviceLoad(input: {
  sqft: number;
  smallAppliance: number;
  laundry: boolean;
  fixedVa: number;
  fixedCount: number;
  dryer: number;
  range: number;
  heat: number;
  cool: number;
  motor: number;
}) {
  const general = input.sqft * 3 + input.smallAppliance * 1500 + (input.laundry ? 1500 : 0);
  const generalDemand = general <= 3000 ? general : 3000 + (general - 3000) * 0.35;
  const fixedDemand = input.fixedCount >= 4 ? input.fixedVa * 0.75 : input.fixedVa;
  const hvac = Math.max(input.heat, input.cool);
  const largestMotor = input.motor * 0.25;
  const total = generalDemand + fixedDemand + input.dryer + input.range + hvac + largestMotor;
  const amps240 = total / 240;
  const service = [100, 125, 150, 200, 225, 300, 400].find((size) => size >= amps240) ?? 400;
  return { general, generalDemand, fixedDemand, dryer: input.dryer, range: input.range, hvac, largestMotor, total, amps240, service };
}
