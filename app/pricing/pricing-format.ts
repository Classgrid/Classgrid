export type RefillPeriod = { value: number; unit: string };

export type LivePricing = {
  freeTokens: number | null;
  freeRefill: RefillPeriod | null;
  imageLimit: number | null;
  imageRefill: RefillPeriod | null;
  whatsappLimit: number | null;
  whatsappRefill: RefillPeriod | null;
  creditsPerInr: number | null;
  imageTokenCost: number | null;
  topupMinInr: number | null;
  topupMaxInr: number | null;
  creditValidityDays: number | null;
  premiumUnlockInr: number | null;
};

const REFILL_UNITS = new Set(["second", "minute", "hour", "day", "week", "month"]);

const count = (v: unknown, { positive = false } = {}) =>
  typeof v === "number" && Number.isFinite(v) && (positive ? v > 0 : v >= 0) ? v : null;

const period = (v: unknown): RefillPeriod | null => {
  const p = v as RefillPeriod | null;
  return p && Number.isInteger(p.value) && p.value >= 1 && REFILL_UNITS.has(p.unit) ? { value: p.value, unit: p.unit } : null;
};

// Keeps only values that look right, so the page hides a number rather than showing a wrong one.
export function normalizeLivePricing(data: unknown): LivePricing | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  const live: LivePricing = {
    freeTokens: count(d.freeTokens),
    freeRefill: period(d.freeRefill),
    imageLimit: count(d.imageLimit),
    imageRefill: period(d.imageRefill),
    whatsappLimit: count(d.whatsappLimit),
    whatsappRefill: period(d.whatsappRefill),
    creditsPerInr: count(d.creditsPerInr, { positive: true }),
    imageTokenCost: count(d.imageTokenCost, { positive: true }),
    topupMinInr: count(d.topupMinInr, { positive: true }),
    topupMaxInr: count(d.topupMaxInr, { positive: true }),
    creditValidityDays: count(d.creditValidityDays, { positive: true }),
    premiumUnlockInr: count(d.premiumUnlockInr, { positive: true }),
  };
  if (live.topupMinInr !== null && live.topupMaxInr !== null && live.topupMinInr > live.topupMaxInr) {
    live.topupMinInr = null;
    live.topupMaxInr = null;
  }
  return live;
}

export const formatInr = (n: number) => `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n)}`;

export const formatInrExact = (n: number) =>
  `₹${new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)}`;

export const formatNumber = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

// 1500000 -> "1.5M", 250000 -> "250K"
export function formatTokens(n: number) {
  if (n >= 1_000_000) return `${Number((n / 1_000_000).toFixed(2))}M`;
  if (n >= 1_000) return `${Number((n / 1_000).toFixed(1))}K`;
  return formatNumber(n);
}

// Credits per 1M tokens, shown in millions: 7580000 -> "7.58M", 8000 -> "0.008M"
export function formatMillions(n: number) {
  const m = n / 1_000_000;
  if (m > 0 && m < 0.01) return `${Number(m.toFixed(3))}M`;
  return `${m.toFixed(2)}M`;
}

// { value: 7, unit: "day" } -> "7 days"; { value: 1, unit: "week" } -> "week" (reads as "every week")
export function formatRefill(p: RefillPeriod) {
  if (p.value === 1) return p.unit;
  return `${p.value} ${p.unit}s`;
}

export function liveTokens(live: LivePricing | null): Record<string, string | null> {
  return {
    freeTokens: live?.freeTokens != null ? formatTokens(live.freeTokens) : null,
    freeRefill: live?.freeRefill ? formatRefill(live.freeRefill) : null,
    imageLimit: live?.imageLimit != null ? formatNumber(live.imageLimit) : null,
    imageRefill: live?.imageRefill ? formatRefill(live.imageRefill) : null,
    whatsappLimit: live?.whatsappLimit != null ? formatNumber(live.whatsappLimit) : null,
    whatsappRefill: live?.whatsappRefill ? formatRefill(live.whatsappRefill) : null,
    creditsPerInr: live?.creditsPerInr != null ? formatNumber(live.creditsPerInr) : null,
    imageTokenCost: live?.imageTokenCost != null ? formatNumber(live.imageTokenCost) : null,
    topupMin: live?.topupMinInr != null ? formatInr(live.topupMinInr) : null,
    topupMax: live?.topupMaxInr != null ? formatInr(live.topupMaxInr) : null,
    creditDays: live?.creditValidityDays != null ? formatNumber(live.creditValidityDays) : null,
    premiumUnlock: live?.premiumUnlockInr != null ? formatInr(live.premiumUnlockInr) : null,
  };
}

// Swaps {tokens} for live values. Returns null when a token has no live value (or is unknown),
// so the caller can hide that line instead of showing a wrong or empty number.
export function fillLive(text: string | null | undefined, tokens: Record<string, string | null>): string | null {
  if (!text?.trim()) return null;
  let missing = false;
  const out = text.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = tokens[key];
    if (value == null) {
      missing = true;
      return "";
    }
    return value;
  });
  return missing ? null : out.trim();
}
