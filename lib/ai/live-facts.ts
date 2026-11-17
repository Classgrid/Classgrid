// LIVE FACTS for every Classgrid AI that answers people: the site chat, the support inbox replies, the WhatsApp AI and
// Telegram (all through rag-answer.ts), and the WhatsApp help bot's download reply (login-help-bot.ts).
// Plans, prices, limits and top-ups come from the live feed the super admin sets (GET /api/public/ai-pricing, the
// same feed classgrid.in/pricing shows), read with the pricing page's own parsers (lib/pricing/plans-data.ts), so
// no plan number is ever typed into a prompt. The desktop app's versions come from Sanity (lib/desktopRelease.ts).
// The block is kept in memory for 5 minutes. When the feed is down or has no plans, the block states no plan numbers
// and points to classgrid.in/pricing (never the pricing page's fallback numbers).
import { buildPricingView, plansFromFeed, topupFromFeed } from "@/lib/pricing/plans-data";

const PLATFORM_API = process.env.NEXT_PUBLIC_PLATFORM_API_URL || "https://api.classgrid.in";
const PRICING_URL = "https://classgrid.in/pricing";
const DOWNLOAD_URL = "https://classgrid.in/download";

const CACHE_MS = 5 * 60 * 1000;
const CACHE_MS_WHEN_DOWN = 60 * 1000; // try again sooner when the feed could not be read
const FEED_TIMEOUT_MS = 5000;
const DESKTOP_TIMEOUT_MS = 6000;
const FIRST_LOAD_WAIT_MS = 7000; // the first answer after a start waits at most this long for the facts
const MAX_NOTES = 6;

export type DesktopFacts = {
  windows: { version: string; date: string | null; notes: string[] } | null;
  macos: string | null; // the version, or null: coming soon
  linux: string | null;
};

export type LiveFactsDeps = {
  fetchFeed: () => Promise<unknown>;
  loadDesktop: () => Promise<DesktopFacts | null>;
};

const isNum = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);
const rupees = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
const list = (items: string[]) => (items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`);

async function fetchFeedLive(): Promise<unknown> {
  try {
    const res = await fetch(`${PLATFORM_API}/api/public/ai-pricing`, { signal: AbortSignal.timeout(FEED_TIMEOUT_MS) });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

async function loadDesktopLive(): Promise<DesktopFacts | null> {
  try {
    // Loaded only when needed: the Sanity client needs its settings, and the chat must still answer without them
    const { getLatestPerPlatform, formatReleaseDate } = await import("@/lib/desktopRelease");
    const latest = await Promise.race([
      getLatestPerPlatform(),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), DESKTOP_TIMEOUT_MS)),
    ]);
    if (!latest) return null;
    const win = latest.windows;
    return {
      windows: win
        ? {
            version: win.version,
            date: formatReleaseDate(win.releaseDate),
            notes: (win.notes || []).map((n) => String(n).trim()).filter(Boolean).slice(0, MAX_NOTES),
          }
        : null,
      macos: latest.macos?.version ?? null,
      linux: latest.linux?.version ?? null,
    };
  } catch {
    return null;
  }
}

const DEFAULT_DEPS: LiveFactsDeps = { fetchFeed: fetchFeedLive, loadDesktop: loadDesktopLive };

// The plans part: every plan in plan order, from the feed only. null when the feed is down or has no plans.
function plansPart(feed: unknown): string[] | null {
  const plans = plansFromFeed(feed);
  if (!plans) return null;
  const topup = topupFromFeed(feed);
  const view = buildPricingView(plans, topup);
  const lines: string[] = [
    "Plans and prices (in plan order). Prices are in Indian rupees and include GST:",
  ];
  plans.forEach((p, i) => {
    const v = view.plans[i];
    const name = `${p.name}${p.comingSoon ? " (coming soon)" : ""}`;
    let price: string;
    if (p.priceInrMonthly < 0) price = "contact us for the price";
    else if (p.priceInrMonthly === 0) price = "no cost";
    else price = v.compareLine.yearly !== v.compareLine.monthly ? `${v.compareLine.monthly} or ${v.compareLine.yearly}` : v.compareLine.monthly;
    const parts = [`- ${name}: ${price}.`];
    if (v.student) {
      const student = v.student.yearly !== v.student.monthly ? `${v.student.monthly} or ${v.student.yearly}` : v.student.monthly;
      parts.push(`Student price: ${student} (needs a student application: the person confirms a student email when they buy).`);
    }
    // The limits, worded as the compare table on the pricing page words them
    const limits = view.compare
      .flatMap((g) => g.rows)
      .map((r) => ({ label: r.label, value: r.values[i] }))
      .filter((r) => r.value !== "")
      .map((r) => `${r.label}: ${r.value === false ? "not included" : r.value === true ? "yes" : r.value}`);
    if (limits.length) parts.push(`Limits: ${limits.join("; ")}.`);
    // A plan with no price or limits yet (contact us, coming soon) is described by its own lines from the dashboard
    if ((p.priceInrMonthly < 0 || p.comingSoon) && v.features.length) parts.push(`What it includes: ${v.features.join("; ")}.`);
    lines.push(parts.join(" "));
  });
  if (isNum(view.yearlySavePercent) && view.yearlySavePercent > 0) {
    lines.push(`Paying yearly saves up to ${view.yearlySavePercent}% compared with paying monthly.`);
  }
  const paid = plans.filter((p) => p.priceInrMonthly > 0 && !p.comingSoon).map((p) => p.name);
  const free = plans.filter((p) => p.priceInrMonthly === 0).map((p) => p.name);
  if (topup) {
    const who = paid.length ? `only for the paid plans (${list(paid)})` : "only for the paid plans";
    const notFor = free.length ? `, not for ${list(free)}` : "";
    const rate = topup.creditsPerInr ? ` Each ₹1 gives ${topup.creditsPerInr.toLocaleString("en-IN")} AI credits.` : "";
    const days = topup.validityDays ? ` and stays valid for ${topup.validityDays} days` : "";
    lines.push(
      `Top-ups (extra AI credits): ${who}${notFor}. Any amount from ${rupees(topup.min)} to ${rupees(topup.max)}.${rate} A top-up is used after the plan's limit runs out${days}.`
    );
  } else {
    lines.push(`Top-ups: only for the paid plans${paid.length ? ` (${list(paid)})` : ""}. Their current amounts are on ${PRICING_URL}.`);
  }
  lines.push(`Pricing page: ${PRICING_URL}`);
  return lines;
}

function desktopPart(desktop: DesktopFacts | null): string[] {
  const lines: string[] = [];
  const win = desktop?.windows;
  if (win) {
    lines.push(
      `Desktop app for Windows: the latest version is ${win.version}${win.date ? `, released ${win.date}` : ""}. Download it from ${DOWNLOAD_URL}.`
    );
    if (win.notes.length) {
      lines.push(`What changed in ${win.version}:`);
      for (const note of win.notes) lines.push(`- ${note}`);
    }
  } else {
    lines.push(`Desktop app: the latest version and its download are on ${DOWNLOAD_URL}.`);
  }
  if (desktop) {
    const other = (name: string, version: string | null) => (version ? `${name}: version ${version}, from ${DOWNLOAD_URL}.` : `${name}: coming soon.`);
    lines.push(`${other("macOS", desktop.macos)} ${other("Linux", desktop.linux)}`);
  }
  return lines;
}

const MODES_LINE =
  "Modes: Classgrid AI has two modes, Agent and Studio. Project (the AI code editor for GitHub projects) is an item in Studio's left sidebar, at https://chat.classgrid.in/c/studio/project (old /c/project links open there). This is so on the website and in the desktop app since version 1.0.26 (16 November 2026). Never describe Project as a separate third mode.";

// The phone app: classgrid.in offers no phone download (no store link, no app file), so none is given
const PHONE_LINE =
  "Phone app: Classgrid has an Android phone app, but it is not listed for download on the website yet. There is no download link to share, so never make one up.";

/** The LIVE FACTS block for a feed and desktop facts as given (no network). */
export function formatLiveFacts(feed: unknown, desktop: DesktopFacts | null): string {
  const plans = plansPart(feed);
  return [
    "LIVE FACTS (from the Classgrid dashboard, current right now)",
    plans
      ? `Plans, prices and limits are set in Classgrid's own dashboard and can change at any time. Always use the numbers in these LIVE FACTS. Never use older numbers from memory or from any other text. If a number is not here, point to ${PRICING_URL}.`
      : `The live plan list could not be read right now. The current plans, prices and limits are on ${PRICING_URL}. Do not state any price or limit as a number: point to that page instead. Plans, prices and limits are set in Classgrid's own dashboard and can change at any time, so never use numbers from memory or from any other text.`,
    ...(plans ?? []),
    "",
    ...desktopPart(desktop),
    MODES_LINE,
    PHONE_LINE,
  ].join("\n");
}

/** Reads the feed and the desktop versions now (no cache) and builds the block. Never throws. */
export async function buildLiveFacts(deps: LiveFactsDeps = DEFAULT_DEPS): Promise<{ text: string; plansOk: boolean; desktop: DesktopFacts | null }> {
  const [feed, desktop] = await Promise.all([
    deps.fetchFeed().catch(() => null),
    deps.loadDesktop().catch(() => null),
  ]);
  return { text: formatLiveFacts(feed, desktop), plansOk: !!plansFromFeed(feed), desktop };
}

let cached: { text: string; expiresAt: number } | null = null;
let lastDesktop: DesktopFacts | null = null;
let refreshing: Promise<string> | null = null;

function refresh(): Promise<string> {
  if (!refreshing) {
    refreshing = (async () => {
      const built = await buildLiveFacts({
        fetchFeed: DEFAULT_DEPS.fetchFeed,
        // A desktop read that fails keeps the last versions it had
        loadDesktop: async () => (await DEFAULT_DEPS.loadDesktop()) ?? lastDesktop,
      });
      if (built.desktop) lastDesktop = built.desktop;
      cached = { text: built.text, expiresAt: Date.now() + (built.plansOk ? CACHE_MS : CACHE_MS_WHEN_DOWN) };
      return built.text;
    })().finally(() => {
      refreshing = null;
    });
  }
  return refreshing;
}

/**
 * The LIVE FACTS block for a prompt, kept in memory for 5 minutes. When it is older, the last block is used while a
 * new one is read in the background. Never throws: if nothing could be read in time, the block names the pricing
 * and download pages and states no plan numbers.
 */
export async function getLiveFactsBlock(): Promise<string> {
  if (cached && cached.expiresAt > Date.now()) return cached.text;
  if (cached) {
    void refresh().catch(() => undefined);
    return cached.text;
  }
  const waited = await Promise.race([
    refresh().catch(() => null),
    new Promise<null>((resolve) => setTimeout(() => resolve(null), FIRST_LOAD_WAIT_MS)),
  ]);
  return waited ?? formatLiveFacts(null, lastDesktop);
}

/** The desktop versions read last (null before the first read), for replies that cannot wait, like the WhatsApp help bot. */
export function getCachedDesktopFacts(): DesktopFacts | null {
  if (!cached || cached.expiresAt <= Date.now()) void refresh().catch(() => undefined);
  return lastDesktop;
}
