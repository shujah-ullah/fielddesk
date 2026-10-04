/** Field screening math. Not a Manual J or Manual D permit calculation. */

export const FRICTION_K = 0.109136;

export const ZONES = [
  { id: "1", label: "Zone 1 · Miami, Honolulu", cool: 30, heat: 22 },
  { id: "2", label: "Zone 2 · Houston, Phoenix, Orlando", cool: 28, heat: 28 },
  { id: "3", label: "Zone 3 · Atlanta, Dallas, Los Angeles", cool: 25, heat: 32 },
  { id: "4", label: "Zone 4 · New York, Seattle, D.C.", cool: 22, heat: 38 },
  { id: "5", label: "Zone 5 · Chicago, Denver, Boston", cool: 20, heat: 45 },
  { id: "6", label: "Zone 6 · Minneapolis, Milwaukee", cool: 18, heat: 52 },
  { id: "7", label: "Zone 7 · Duluth, northern Maine", cool: 16, heat: 58 },
] as const;

export const INSULATION = [
  { id: "poor", label: "Poor · pre-1980, leaky", factor: 1.18 },
  { id: "average", label: "Average · 1980–2005", factor: 1 },
  { id: "good", label: "Good · 2006–2020", factor: 0.86 },
  { id: "tight", label: "Tight · recent energy code", factor: 0.74 },
] as const;

export const WINDOWS = [
  { id: "few", label: "Few windows", factor: 0.95 },
  { id: "typical", label: "Typical windows", factor: 1 },
  { id: "large", label: "Large windows", factor: 1.12 },
  { id: "glass", label: "Mostly glass", factor: 1.22 },
] as const;

export const SUN = [
  { id: "shaded", label: "Shaded", factor: 0.94 },
  { id: "mixed", label: "Mixed", factor: 1 },
  { id: "exposed", label: "Full sun", factor: 1.1 },
] as const;

export const DUTIES = [
  { id: "branch", label: "Supply branch", limit: 700 },
  { id: "trunk", label: "Supply trunk", limit: 900 },
  { id: "return", label: "Return trunk", limit: 700 },
] as const;

export const ROUND_SIZES = [4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];

const RECT_SIZES = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];

export type DutyId = (typeof DUTIES)[number]["id"];

export type LoadInput = {
  area: number;
  height: number;
  zoneId: string;
  insulationId: string;
  windowId: string;
  sunId: string;
  occupants: number;
  kitchen: boolean;
};

export type LoadResult = {
  zoneLabel: string;
  baseBtu: number;
  peopleBtu: number;
  kitchenBtu: number;
  coolBtu: number;
  heatBtu: number;
  tons: number;
  suggestedTons: number;
  oversizePct: number;
};

export type DuctResult = {
  exactIn: number;
  stockIn: number;
  velocity: number;
  friction: number;
  limit: number;
  overVelocity: boolean;
  width: number;
  height: number;
  rectVelocity: number;
  rectFriction: number;
  rectDe: number;
};

export function zoneById(id: string) {
  return ZONES.find((zone) => zone.id === id) ?? ZONES[2];
}

export function factorOf<T extends { id: string; factor: number }>(list: readonly T[], id: string) {
  return list.find((item) => item.id === id)?.factor ?? 1;
}

export function coolingLoad(input: LoadInput): LoadResult {
  const zone = zoneById(input.zoneId);
  const height = input.height > 0 ? input.height : 8;
  const area = Math.max(0, input.area);
  const occupants = Math.max(0, input.occupants);
  const shell =
    factorOf(INSULATION, input.insulationId) *
    factorOf(WINDOWS, input.windowId) *
    factorOf(SUN, input.sunId) *
    (height / 8);
  const baseBtu = area * zone.cool * shell;
  const peopleBtu = occupants * 400;
  const kitchenBtu = input.kitchen ? 4000 : 0;
  const coolBtu = baseBtu + peopleBtu + kitchenBtu;
  const heatBtu = area * zone.heat * (height / 8) * factorOf(INSULATION, input.insulationId);
  const tons = coolBtu / 12000;
  const suggestedTons = Math.max(0.5, Math.ceil(tons * 2 - 1e-9) / 2);
  const oversizePct = tons > 0 ? ((suggestedTons - tons) / tons) * 100 : 0;
  return {
    zoneLabel: zone.label,
    baseBtu,
    peopleBtu,
    kitchenBtu,
    coolBtu,
    heatBtu,
    tons,
    suggestedTons,
    oversizePct,
  };
}

/** Sensible airflow at standard air density. CFM = BTU/h / (1.08 * delta T). */
export function cfmFromBtu(btu: number, deltaT: number) {
  if (deltaT <= 0) return 0;
  return btu / (1.08 * deltaT);
}

/** Galvanized round duct, inches water gauge per 100 ft. */
export function frictionLoss(cfm: number, diameterIn: number) {
  if (cfm <= 0 || diameterIn <= 0) return 0;
  return (FRICTION_K * Math.pow(cfm, 1.9)) / Math.pow(diameterIn, 5.02);
}

export function diameterForFriction(cfm: number, friction: number) {
  if (cfm <= 0 || friction <= 0) return 0;
  return Math.pow((FRICTION_K * Math.pow(cfm, 1.9)) / friction, 1 / 5.02);
}

export function velocityFpm(cfm: number, diameterIn: number) {
  if (cfm <= 0 || diameterIn <= 0) return 0;
  return (cfm * 576) / (Math.PI * diameterIn * diameterIn);
}

export function equivalentDiameter(width: number, height: number) {
  if (width <= 0 || height <= 0) return 0;
  return (1.3 * Math.pow(width * height, 0.625)) / Math.pow(width + height, 0.25);
}

export function velocityRect(cfm: number, width: number, height: number) {
  const area = (width * height) / 144;
  if (area <= 0) return 0;
  return cfm / area;
}

export function sizeDuct(cfm: number, frictionTarget: number, dutyId: DutyId, maxAspect: number): DuctResult | null {
  if (cfm <= 0 || frictionTarget <= 0) return null;
  const duty = DUTIES.find((item) => item.id === dutyId) ?? DUTIES[0];
  const exactIn = diameterForFriction(cfm, frictionTarget);
  const stockIn = ROUND_SIZES.find((size) => frictionLoss(cfm, size) <= frictionTarget) ?? ROUND_SIZES[ROUND_SIZES.length - 1];
  const velocity = velocityFpm(cfm, stockIn);
  const friction = frictionLoss(cfm, stockIn);
  const aspect = Math.min(4, Math.max(1, maxAspect));
  let best: { width: number; height: number; de: number } | null = null;
  for (const width of RECT_SIZES) {
    for (const height of RECT_SIZES) {
      if (width < height) continue;
      if (width / height > aspect + 1e-6) continue;
      const de = equivalentDiameter(width, height);
      if (frictionLoss(cfm, de) > frictionTarget) continue;
      const area = width * height;
      if (!best || area < best.width * best.height) best = { width, height, de };
    }
  }
  const rect = best ?? { width: 30, height: 30, de: equivalentDiameter(30, 30) };
  return {
    exactIn,
    stockIn,
    velocity,
    friction,
    limit: duty.limit,
    overVelocity: velocity > duty.limit,
    width: rect.width,
    height: rect.height,
    rectDe: rect.de,
    rectVelocity: velocityRect(cfm, rect.width, rect.height),
    rectFriction: frictionLoss(cfm, rect.de),
  };
}

export function formatNum(value: number, digits = 0) {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  });
}
