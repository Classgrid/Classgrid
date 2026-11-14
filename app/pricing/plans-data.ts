// Plan data for the pricing page, read from the live feed (GET /api/public/ai-pricing: plans[], set by the super
// admin). The numbers below are only the fallback for when the feed has no plans yet. Everything the page shows,
// the cards, the compare table, the FAQ answers and the top-up box, is built here from that data.

export type FeedLimits = {
  chatsPerWindow?: number;
  chatsPerWeek?: number;
  windowHours?: number;
  claudeCreditsPerWeek?: number;
  fableSharePercent?: number;
  contextTokens?: number;
  helpersPerChat?: number;
  imagesPerPeriod?: number;
  imagesPeriod?: string;
  voiceRepliesPerDay?: number;
  voiceInputMinutesPerDay?: number;
  callMinutesPerPeriod?: number;
  callsPerDay?: number;
  callMaxMinutes?: number;
  whatsappPerDay?: number;
  projectsMax?: number;
  codingRunsPerMonth?: number;
  premiumRunsPerMonth?: number;
  sandboxHoursPerMonth?: number;
  uploadMaxMb?: number;
  libraryStorageMb?: number;
  devicesMax?: number;
  support?: string;
};

export type FeedPlan = {
  key: string;
  name: string;
  tagline?: string;
  comingSoon?: boolean;
  priceInrMonthly: number; // -1 = contact us, 0 = free
  priceInrYearly?: number;
  studentPriceInrMonthly?: number;
  studentPriceInrYearly?: number;
  // The student price's buy links (null when the plan has no student price): the chat confirms the student email first
  studentBuyUrlMonthly?: string | null;
  studentBuyUrlYearly?: string | null;
  features?: string[];
  limits?: FeedLimits;
  // Where the buttons go (set by the server): buying opens the chat, which signs in if needed and starts the payment
  buyUrlMonthly?: string | null;
  buyUrlYearly?: string | null;
  startUrl?: string | null;
};

export type TopupInfo = { min: number; max: number; creditsPerInr: number | null; validityDays: number | null };

export type Billing = "monthly" | "yearly";
export type CompareValue = string | boolean;

export type ViewPlan = {
  key: string;
  name: string;
  tagline: string;
  badge: string | null;
  featured: boolean;
  price: Record<Billing, { amount: string; per: string; note: string | null }>;
  compareLine: Record<Billing, string>;
  student: Record<Billing, string> | null;
  // The student price shown in the card when the Student switch is on, and where its button goes
  studentPrice: Record<Billing, { amount: string; per: string; note: string | null }> | null;
  studentHref: Record<Billing, string> | null;
  includesLabel: string | null;
  features: string[];
  cta: { label: string; href: Record<Billing, string>; buy: boolean };
};

export type CompareGroup = { label: string; rows: { label: string; values: CompareValue[] }[] };
export type Faq = { question: string; answer: string };

export type PricingView = { plans: ViewPlan[]; compare: CompareGroup[]; faqs: Faq[]; topup: TopupInfo | null; yearlySavePercent: number | null };

const CHAT_APP_URL = "https://chat.classgrid.in";
const CONTACT_URL = "/contact";

// Used only while the feed has no plans (the server adds them on its next deploy)
export const FALLBACK_PLANS: FeedPlan[] = [
  {
    key: "free",
    name: "Free",
    tagline: "Try Classgrid AI every day",
    priceInrMonthly: 0,
    priceInrYearly: 0,
    features: [
      "40 chats every 5 hours",
      "No message limit inside a chat",
      "Claude models: no",
      "4 images and photo edits a week",
      "30 minutes of WhatsApp AI calls a month",
      "3 projects",
      "600 MB Library",
    ],
    limits: {
      chatsPerWindow: 40, windowHours: 5, claudeCreditsPerWeek: 0, fableSharePercent: 0, contextTokens: 32000, helpersPerChat: 1,
      imagesPerPeriod: 4, imagesPeriod: "week", voiceInputMinutesPerDay: 15, callMinutesPerPeriod: 30, callsPerDay: 3, callMaxMinutes: 5,
      whatsappPerDay: 10, projectsMax: 3, codingRunsPerMonth: 30, premiumRunsPerMonth: 0, sandboxHoursPerMonth: 3, uploadMaxMb: 10,
      libraryStorageMb: 600, devicesMax: 2, support: "Community",
    },
  },
  {
    key: "pro",
    name: "Pro",
    tagline: "For people who use AI every day",
    priceInrMonthly: 499,
    priceInrYearly: 3999,
    studentPriceInrMonthly: 299,
    studentPriceInrYearly: 2499,
    features: [
      "2,000 chats every 5 hours",
      "Claude models: yes (Sonnet, Opus, and a share of Fable)",
      "Deep thinking",
      "100 images and photo edits a month",
      "150 minutes of WhatsApp AI calls a month",
      "25 projects",
      "5 GB Library",
    ],
    limits: {
      chatsPerWindow: 2000, windowHours: 5, claudeCreditsPerWeek: 500000, fableSharePercent: 20, contextTokens: 128000, helpersPerChat: 3,
      imagesPerPeriod: 100, imagesPeriod: "month", voiceInputMinutesPerDay: 120, callMinutesPerPeriod: 150, callsPerDay: 10, callMaxMinutes: 10,
      whatsappPerDay: 100, projectsMax: 25, codingRunsPerMonth: 500, premiumRunsPerMonth: 30, sandboxHoursPerMonth: 30, uploadMaxMb: 50,
      libraryStorageMb: 5120, devicesMax: 5, support: "Email",
    },
  },
  {
    key: "max",
    name: "Max",
    tagline: "For heavy daily work, long chats and coding",
    priceInrMonthly: 1999,
    priceInrYearly: 14999,
    studentPriceInrMonthly: 1499,
    studentPriceInrYearly: 10999,
    features: [
      "Unlimited chats",
      "Claude models: 5x the usage of Pro",
      "300 images and photo edits a month",
      "400 minutes of WhatsApp AI calls a month",
      "Unlimited projects",
      "20 GB Library",
      "Priority at busy times",
    ],
    limits: {
      chatsPerWindow: -1, windowHours: 5, claudeCreditsPerWeek: 2500000, fableSharePercent: 50, contextTokens: 400000, helpersPerChat: 5,
      imagesPerPeriod: 300, imagesPeriod: "month", voiceInputMinutesPerDay: 300, callMinutesPerPeriod: 400, callsPerDay: 30, callMaxMinutes: 15,
      whatsappPerDay: 300, projectsMax: -1, codingRunsPerMonth: 1500, premiumRunsPerMonth: 100, sandboxHoursPerMonth: 100, uploadMaxMb: 200,
      libraryStorageMb: 20480, devicesMax: 10, support: "Priority email",
    },
  },
  {
    key: "enterprise",
    name: "Enterprise",
    tagline: "Classgrid AI for your whole company",
    comingSoon: true,
    priceInrMonthly: -1,
    priceInrYearly: -1,
    features: [
      "Classgrid AI for everyone on your team",
      "Priced per seat, billed yearly, from 50 seats",
      "One shared AI credit pool",
      "Admin controls, roles, SSO and your branding",
      "A named contact and a 45-day free pilot",
    ],
    limits: { projectsMax: -1, support: "Named contact" },
  },
];

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
const num = (n: number) => Math.round(n).toLocaleString("en-IN");
const isNum = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);

function bytesLabel(mb: number) {
  if (mb >= 1024) return `${num(mb / 1024)} GB`;
  return `${num(mb)} MB`;
}
function tokensLabel(t: number) {
  if (t >= 1_000_000) return `${t % 1_000_000 ? (t / 1_000_000).toFixed(1) : t / 1_000_000}M tokens`;
  return `${Math.round(t / 1000)}K tokens`;
}
// "1 week" / "week" -> "a week", "2 weeks" -> "every 2 weeks"
function periodLabel(period: string | undefined) {
  const m = /^\s*(\d+)?\s*([a-z]+?)s?\s*$/i.exec(period || "month");
  if (!m) return `a ${period}`;
  const n = Number(m[1] || 1);
  return n === 1 ? `a ${m[2].toLowerCase()}` : `every ${n} ${m[2].toLowerCase()}s`;
}
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function minutesLabel(m: number) {
  if (m >= 60 && m % 60 === 0) return `${m / 60} ${m === 60 ? "hour" : "hours"} a day`;
  return `${num(m)} minutes a day`;
}

// -1 = unlimited, 0 = not included, undefined = not given for this plan
function cell(v: number | undefined, show: (n: number) => string): CompareValue {
  if (!isNum(v)) return "";
  if (v < 0) return "Unlimited";
  if (v === 0) return false;
  return show(v);
}

function pricePart(monthly: number, yearly: number | undefined, billing: Billing) {
  if (monthly < 0) return { amount: "Contact us", per: "", note: null };
  if (monthly === 0) return { amount: "₹0", per: "/month", note: null };
  if (billing === "yearly" && isNum(yearly) && yearly > 0) return { amount: inr(yearly / 12), per: "/month", note: `${inr(yearly)} billed yearly` };
  return { amount: inr(monthly), per: "/month", note: null };
}

function compareLine(p: FeedPlan, billing: Billing) {
  if (p.priceInrMonthly < 0) return "Contact us";
  if (p.priceInrMonthly === 0) return "Free";
  if (billing === "yearly" && isNum(p.priceInrYearly) && p.priceInrYearly > 0) return `${inr(p.priceInrYearly)} per year`;
  return `${inr(p.priceInrMonthly)} per month`;
}

function viewPlan(p: FeedPlan, i: number, all: FeedPlan[]): ViewPlan {
  const contact = p.priceInrMonthly < 0;
  const student =
    isNum(p.studentPriceInrMonthly) && p.studentPriceInrMonthly > 0
      ? {
          monthly: `${inr(p.studentPriceInrMonthly)}/month`,
          yearly: isNum(p.studentPriceInrYearly) && p.studentPriceInrYearly > 0 ? `${inr(p.studentPriceInrYearly)}/year` : `${inr(p.studentPriceInrMonthly)}/month`,
        }
      : null;
  return {
    key: p.key,
    name: p.name,
    tagline: p.tagline ?? "",
    badge: p.comingSoon ? "Coming soon" : p.key === "pro" ? "Popular" : null,
    featured: p.key === "pro",
    price: { monthly: pricePart(p.priceInrMonthly, p.priceInrYearly, "monthly"), yearly: pricePart(p.priceInrMonthly, p.priceInrYearly, "yearly") },
    compareLine: { monthly: compareLine(p, "monthly"), yearly: compareLine(p, "yearly") },
    student,
    studentPrice: student
      ? {
          monthly: pricePart(p.studentPriceInrMonthly!, p.studentPriceInrYearly, "monthly"),
          yearly: pricePart(p.studentPriceInrMonthly!, p.studentPriceInrYearly, "yearly"),
        }
      : null,
    studentHref: student && !contact && !p.comingSoon ? studentLinks(p) : null,
    includesLabel: i > 0 ? `Everything in ${all[i - 1].name}, plus` : null,
    features: (p.features ?? []).filter((line) => typeof line === "string" && line.trim()),
    cta: planButton(p, contact),
  };
}

const isHttpsUrl = (v: unknown): v is string => typeof v === "string" && /^https:\/\//.test(v);

// The student price's buttons: the feed's links, or the same chat link it would send (student=1)
function studentLinks(p: FeedPlan): Record<Billing, string> {
  const buy = (term: "month" | "year") => `${CHAT_APP_URL}/agent?buy=${encodeURIComponent(p.key)}&term=${term}&student=1&back=pricing`;
  return {
    monthly: isHttpsUrl(p.studentBuyUrlMonthly) ? p.studentBuyUrlMonthly : buy("month"),
    yearly: isHttpsUrl(p.studentBuyUrlYearly) ? p.studentBuyUrlYearly : buy("year"),
  };
}

// The feed's links; until the server sends them, the same chat links it would send
function planButton(p: FeedPlan, contact: boolean): ViewPlan["cta"] {
  if (contact || p.comingSoon) return { label: "Contact us", href: { monthly: CONTACT_URL, yearly: CONTACT_URL }, buy: false };
  if (p.priceInrMonthly === 0) {
    const start = isHttpsUrl(p.startUrl) ? p.startUrl : CHAT_APP_URL;
    return { label: "Start for free", href: { monthly: start, yearly: start }, buy: false };
  }
  const buy = (term: "month" | "year") => `${CHAT_APP_URL}/agent?buy=${encodeURIComponent(p.key)}&term=${term}&back=pricing`;
  // back=pricing: the payment page sends the visitor back here afterwards ("Subscribed"), then on to the chat
  const fromPricing = (url: string) => (/[?&]back=/.test(url) ? url : `${url}${url.includes("?") ? "&" : "?"}back=pricing`);
  return {
    label: `Get ${p.name}`,
    href: {
      monthly: isHttpsUrl(p.buyUrlMonthly) ? fromPricing(p.buyUrlMonthly) : buy("month"),
      yearly: isHttpsUrl(p.buyUrlYearly) ? fromPricing(p.buyUrlYearly) : buy("year"),
    },
    buy: true,
  };
}

function buildCompare(plans: FeedPlan[]): CompareGroup[] {
  const L = (p: FeedPlan) => p.limits ?? {};
  const hours = plans.map((p) => L(p).windowHours).find(isNum) ?? 5;
  const row = (label: string, get: (l: FeedLimits) => CompareValue) => ({ label, values: plans.map((p) => get(L(p))) });
  const groups: CompareGroup[] = [
    {
      label: "Chat and AI",
      rows: [
        row(`Chats every ${hours} hours`, (l) => cell(l.chatsPerWindow, num)),
        row("Chats a week", (l) => cell(l.chatsPerWeek, num)),
        row("Limit inside a chat", (l) => (isNum(l.chatsPerWindow) ? "None" : "")),
        row("Claude models", (l) => cell(l.claudeCreditsPerWeek, (n) => `${num(n)} credits a week`)),
        row("Claude Fable", (l) => cell(l.fableSharePercent, (n) => `Up to ${n}% of Claude use`)),
        row("Memory of a chat", (l) => cell(l.contextTokens, tokensLabel)),
        row("Helpers working at once", (l) => cell(l.helpersPerChat, num)),
      ],
    },
    {
      label: "Images and voice",
      rows: [
        row("Images and photo edits", (l) => cell(l.imagesPerPeriod, (n) => `${num(n)} ${periodLabel(l.imagesPeriod)}`)),
        row("Voice replies", (l) => cell(l.voiceRepliesPerDay, (n) => `${num(n)} a day`)),
        row("Voice input", (l) => cell(l.voiceInputMinutesPerDay, minutesLabel)),
      ],
    },
    {
      label: "WhatsApp",
      rows: [
        row("AI call minutes a month", (l) => cell(l.callMinutesPerPeriod, num)),
        row("AI calls a day", (l) => cell(l.callsPerDay, num)),
        row("Minutes per call", (l) => cell(l.callMaxMinutes, num)),
        row("Scheduled messages a day", (l) => cell(l.whatsappPerDay, num)),
      ],
    },
    {
      label: "Projects and code",
      rows: [
        row("Projects", (l) => cell(l.projectsMax, num)),
        row("Coding agent runs a month", (l) => cell(l.codingRunsPerMonth, num)),
        row("Claude coding runs a month", (l) => cell(l.premiumRunsPerMonth, num)),
        row("Cloud sandbox hours a month", (l) => cell(l.sandboxHoursPerMonth, num)),
      ],
    },
    {
      label: "Files and account",
      rows: [
        row("Largest file", (l) => cell(l.uploadMaxMb, bytesLabel)),
        row("Library storage", (l) => cell(l.libraryStorageMb, bytesLabel)),
        row("Signed-in devices", (l) => cell(l.devicesMax, num)),
        row("Support", (l) => (l.support?.trim() ? capitalize(l.support.trim()) : "")),
      ],
    },
  ];
  // A row no plan has a value for is left out; a group with no rows too
  return groups
    .map((g) => ({ ...g, rows: g.rows.filter((r) => r.values.some((v) => v !== "")) }))
    .filter((g) => g.rows.length > 0);
}

function buildFaqs(plans: FeedPlan[], topup: TopupInfo | null): Faq[] {
  const free = plans.find((p) => p.priceInrMonthly === 0);
  const paid = plans.filter((p) => p.priceInrMonthly > 0);
  const student = paid.filter((p) => isNum(p.studentPriceInrMonthly) && p.studentPriceInrMonthly! > 0);
  const yearly = paid.filter((p) => isNum(p.priceInrYearly) && p.priceInrYearly! > 0);
  const enterprise = plans.find((p) => p.priceInrMonthly < 0);
  const hours = plans.map((p) => p.limits?.windowHours).find(isNum) ?? 5;
  const list = (items: string[]) => (items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`);
  const faqs: Faq[] = [];
  if (free?.features?.length) {
    faqs.push({ question: "What do I get for free?", answer: `Every account gets: ${list(free.features.map((f) => f.charAt(0).toLowerCase() + f.slice(1)))}. No card is needed.` });
  }
  faqs.push({
    question: "What happens when I reach a limit?",
    answer: `Chat limits refill every ${hours} hours. Until then you can wait${topup ? ", top up" : ""} or move to a bigger plan.`,
  });
  if (student.length) {
    faqs.push({
      question: "Is there a student price?",
      answer: `Yes: ${list(student.map((p) => `${p.name} is ${inr(p.studentPriceInrMonthly!)} a month`))} for students. Turn on Student above the plans, and confirm your student email (like .edu or .ac.in) when you buy.`,
    });
  }
  if (yearly.length) {
    faqs.push({
      question: "How does yearly billing work?",
      answer: `You pay once for 12 months: ${list(yearly.map((p) => `${inr(p.priceInrYearly!)} for ${p.name} (about ${inr(p.priceInrYearly! / 12)} a month)`))}.`,
    });
  }
  if (topup) {
    faqs.push({
      question: "Can I top up?",
      answer: `Yes. Top up any amount from ${inr(topup.min)} to ${inr(topup.max)} from Upgrade in the app${topup.validityDays ? `; top-ups last ${topup.validityDays} days` : ""}.`,
    });
  }
  faqs.push({ question: "Can I change or cancel my plan?", answer: "Yes. Move up, move down or cancel from your account. A cancelled plan stays active until the end of the period you paid for." });
  faqs.push({ question: "Do the prices include GST?", answer: "Yes. Every price on this page includes GST." });
  if (enterprise) {
    faqs.push({
      question: `What is ${enterprise.name}?`,
      answer: `${enterprise.tagline ? `${enterprise.tagline}. ` : ""}${(enterprise.features ?? []).join(". ")}${enterprise.comingSoon ? ". It's coming soon: contact us to plan it." : "."}`,
    });
  }
  return faqs;
}

function yearlySave(plans: FeedPlan[]) {
  const saves = plans
    .filter((p) => p.priceInrMonthly > 0 && isNum(p.priceInrYearly) && p.priceInrYearly > 0)
    .map((p) => 1 - p.priceInrYearly! / (12 * p.priceInrMonthly));
  return saves.length ? Math.round(Math.max(...saves) * 100) : null;
}

// Keeps only well-formed plans from the feed; null when the feed has none
export function plansFromFeed(raw: unknown): FeedPlan[] | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as { plans?: unknown; plansEnabled?: unknown };
  if (r.plansEnabled === false || !Array.isArray(r.plans)) return null;
  const plans = r.plans.filter(
    (p): p is FeedPlan => !!p && typeof p === "object" && typeof (p as FeedPlan).name === "string" && isNum((p as FeedPlan).priceInrMonthly)
  );
  return plans.length ? plans.map((p) => ({ ...p, key: String(p.key || p.name).toLowerCase(), limits: normalizeLimits(p.limits) })) : null;
}

// (the feed's first draft named the chat limits everydayMessagesPerWindow / PerWeek)
function normalizeLimits(l: unknown): FeedLimits {
  if (!l || typeof l !== "object") return {};
  const o = l as FeedLimits & { everydayMessagesPerWindow?: number; everydayMessagesPerWeek?: number };
  return { ...o, chatsPerWindow: o.chatsPerWindow ?? o.everydayMessagesPerWindow, chatsPerWeek: o.chatsPerWeek ?? o.everydayMessagesPerWeek };
}

export function topupFromFeed(raw: unknown): TopupInfo | null {
  const r = (raw ?? {}) as { topupMinInr?: unknown; topupMaxInr?: unknown; creditsPerInr?: unknown; creditValidityDays?: unknown };
  if (!isNum(r.topupMinInr) || !isNum(r.topupMaxInr) || r.topupMinInr <= 0 || r.topupMaxInr < r.topupMinInr) return null;
  return {
    min: r.topupMinInr,
    max: r.topupMaxInr,
    creditsPerInr: isNum(r.creditsPerInr) && r.creditsPerInr > 0 ? r.creditsPerInr : null,
    validityDays: isNum(r.creditValidityDays) && r.creditValidityDays > 0 ? r.creditValidityDays : null,
  };
}

export function buildPricingView(feedPlans: FeedPlan[] | null, topup: TopupInfo | null): PricingView {
  const plans = feedPlans ?? FALLBACK_PLANS;
  return {
    plans: plans.map((p, i) => viewPlan(p, i, plans)),
    compare: buildCompare(plans),
    faqs: buildFaqs(plans, topup),
    topup,
    yearlySavePercent: yearlySave(plans),
  };
}
