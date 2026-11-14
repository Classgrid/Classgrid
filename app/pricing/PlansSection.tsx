"use client";

import { Fragment, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, CornerRightDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRICING_FAQS as FAQS } from "./faqs";

// The whole pricing page for the Free, Pro, Max and Enterprise plans (laid out like a framed grid: thin side lines,
// a line between sections). Written here, not in Sanity, until the plan numbers are kept in Sanity. Prices for
// people include GST.

const CHAT_APP_URL = "https://chat.classgrid.in";
const CONTACT_URL = "/contact";

type Billing = "monthly" | "yearly";

// A feature line: the bold lead (a number) and the rest
type Feature = [lead: string, rest?: string];

type Plan = {
  id: "free" | "pro" | "max" | "enterprise";
  name: string;
  tagline: string;
  price: Record<Billing, { amount: string; per: string; note?: string }>;
  compareLine: Record<Billing, string>;
  student?: Record<Billing, string>;
  badge?: string;
  featured?: boolean;
  includesLabel?: string;
  features: Feature[];
  cta: { label: string; href: string };
};

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Try Classgrid AI every day",
    price: {
      monthly: { amount: "₹0", per: "/month" },
      yearly: { amount: "₹0", per: "/month" },
    },
    compareLine: { monthly: "Free forever", yearly: "Free forever" },
    features: [
      ["40 messages", " every 5 hours"],
      ["4 images", " and photo edits a week"],
      ["20 voice replies", " a day"],
      ["30 minutes", " of WhatsApp AI calls a month"],
      ["3 projects"],
      ["600 MB", " Library"],
    ],
    cta: { label: "Start for free", href: CHAT_APP_URL },
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For students and builders who use AI every day",
    badge: "Popular",
    featured: true,
    price: {
      monthly: { amount: "₹499", per: "/month" },
      yearly: { amount: "₹333", per: "/month", note: "₹3,999 billed yearly" },
    },
    compareLine: { monthly: "₹499 per month", yearly: "₹3,999 per year" },
    student: { monthly: "₹299/month", yearly: "₹2,499/year" },
    includesLabel: "Everything in Free, plus",
    features: [
      ["300 messages", " every 5 hours"],
      ["Claude Sonnet and Opus"],
      ["Claude Fable,", " a few answers a week"],
      ["Deep", " thinking"],
      ["100 images", " and photo edits a month"],
      ["150 minutes", " of WhatsApp AI calls a month"],
      ["25 projects"],
      ["5 GB", " Library"],
    ],
    cta: { label: "Get Pro", href: CHAT_APP_URL },
  },
  {
    id: "max",
    name: "Max",
    tagline: "For heavy daily work, long chats and coding",
    price: {
      monthly: { amount: "₹1,999", per: "/month" },
      yearly: { amount: "₹1,250", per: "/month", note: "₹14,999 billed yearly" },
    },
    compareLine: { monthly: "₹1,999 per month", yearly: "₹14,999 per year" },
    student: { monthly: "₹1,499/month", yearly: "₹10,999/year" },
    includesLabel: "Everything in Pro, plus",
    features: [
      ["1,000 messages", " every 5 hours"],
      ["5x", " the Claude use of Pro"],
      ["About 20", " Claude Fable answers a week"],
      ["300 images", " and photo edits a month"],
      ["400 minutes", " of WhatsApp AI calls a month"],
      ["Unlimited", " projects"],
      ["20 GB", " Library"],
      ["Priority", " at busy times"],
    ],
    cta: { label: "Get Max", href: CHAT_APP_URL },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For schools, colleges and teams",
    badge: "Coming soon",
    price: {
      monthly: { amount: "Contact us", per: "" },
      yearly: { amount: "Contact us", per: "" },
    },
    compareLine: { monthly: "Per seat, yearly", yearly: "Per seat, yearly" },
    includesLabel: "Everything in Max, plus",
    features: [
      ["Priced per seat,", " billed yearly"],
      ["From 50 seats,", " with volume discounts"],
      ["One shared pool", " for every member"],
      ["Admin controls,", " SSO and your branding"],
      ["A named contact", " and a 45-day free pilot"],
    ],
    cta: { label: "Contact us", href: CONTACT_URL },
  },
];

// One-time top-up packs, valid for 30 days on any plan
const PACKS = [
  { price: "₹49", credits: "1,50,000" },
  { price: "₹99", credits: "3,30,000" },
  { price: "₹199", credits: "6,90,000" },
  { price: "₹499", credits: "18,00,000" },
  { price: "₹999", credits: "39,00,000" },
];

type CompareValue = string | boolean;
type CompareGroup = { label: string; rows: { label: string; values: [CompareValue, CompareValue, CompareValue, CompareValue] }[] };

// Free, Pro, Max, Enterprise. false = not included, true = included
const COMPARE: CompareGroup[] = [
  {
    label: "Chat and AI",
    rows: [
      { label: "Everyday chat", values: ["40 every 5 hours", "300 every 5 hours", "1,000 every 5 hours", "Shared pool"] },
      { label: "Everyday chat a week", values: ["150", "2,000", "6,000", "Shared pool"] },
      { label: "Claude Sonnet and Opus", values: [false, "About 30 long answers a week", "5x Pro", "Shared pool"] },
      { label: "Claude Fable", values: [false, "A few answers a week", "About 20 answers a week", "Shared pool"] },
      { label: "Thinking modes", values: ["Fast, Normal", "Fast, Normal, Deep", "Fast, Normal, Deep", "Fast, Normal, Deep"] },
      { label: "Memory of a chat", values: ["32K tokens", "128K tokens", "400K tokens", "Up to 1M tokens"] },
      { label: "Helpers working at once", values: ["1", "3", "5", "5"] },
    ],
  },
  {
    label: "Images and voice",
    rows: [
      { label: "Images and photo edits", values: ["4 a week", "100 a month", "300 a month", "60 per seat a month"] },
      { label: "Voice replies", values: ["20 a day", "150 a day", "500 a day", "150 per seat a day"] },
      { label: "Voice input", values: ["15 minutes a day", "2 hours a day", "5 hours a day", "2 hours per seat a day"] },
    ],
  },
  {
    label: "WhatsApp",
    rows: [
      { label: "AI call minutes a month", values: ["30", "150", "400", "100 per seat"] },
      { label: "AI calls a day", values: ["3", "10", "30", "Shared pool"] },
      { label: "Minutes per call", values: ["5", "10", "15", "15"] },
      { label: "Scheduled messages a day", values: ["10", "100", "300", "Shared pool"] },
    ],
  },
  {
    label: "Projects and code",
    rows: [
      { label: "Projects", values: ["3", "25", "Unlimited", "Unlimited"] },
      { label: "Coding agent runs a month", values: ["30", "500", "1,500", "300 per seat"] },
      { label: "Cloud sandbox hours a month", values: ["3", "30", "100", "25 per seat"] },
      { label: "Work on your own PC", values: [true, true, true, true] },
    ],
  },
  {
    label: "Files and account",
    rows: [
      { label: "File uploads", values: ["3 a day", "50 every 5 hours", "150 every 5 hours", "150 every 5 hours"] },
      { label: "Largest file", values: ["10 MB", "50 MB", "200 MB", "200 MB"] },
      { label: "Library storage", values: ["600 MB", "5 GB", "20 GB", "5 GB per seat"] },
      { label: "Signed-in devices", values: ["2", "5", "10", "10 per seat"] },
      { label: "Grids, Schedule, Calls, Studio and the apps", values: [true, true, true, true] },
      { label: "Support", values: ["Community", "Email", "Priority email", "Named contact"] },
    ],
  },
];

// Grain for the price blocks: an inline SVG noise layer, so the colour block looks printed rather than flat
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const isExternal = (href: string) => /^https?:\/\//.test(href);

function ButtonLink({ href, variant = "solid", className, children }: { href: string; variant?: "solid" | "outline"; className?: string; children: ReactNode }) {
  const classes = cn(
    "inline-flex h-11 items-center justify-center gap-1.5 rounded-full px-6 text-[15px] font-medium transition-colors",
    variant === "solid"
      ? "bg-foreground text-background hover:bg-zinc-700 dark:hover:bg-zinc-300"
      : "border border-border bg-background hover:bg-black/5 dark:hover:bg-white/10",
    className
  );
  return isExternal(href) ? (
    <a href={href} className={classes}>
      {children}
      <ArrowUpRight className="h-4 w-4" />
    </a>
  ) : (
    <Link href={href} className={classes}>
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

function BillingSwitch({ billing, onChange, className }: { billing: Billing; onChange: (b: Billing) => void; className?: string }) {
  return (
    <div role="radiogroup" aria-label="Billing" className={cn("inline-flex rounded-full border border-border bg-background p-1", className)}>
      {(["monthly", "yearly"] as const).map((b) => (
        <button
          key={b}
          type="button"
          role="radio"
          aria-checked={billing === b}
          onClick={() => onChange(b)}
          className={cn(
            "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            billing === b ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {b === "monthly" ? "Monthly" : "Yearly"}
          {b === "yearly" ? (
            <span className={cn("ml-1.5 text-xs", billing === b ? "text-background/70" : "text-emerald-600 dark:text-emerald-400")}>
              save up to 37%
            </span>
          ) : null}
        </button>
      ))}
    </div>
  );
}

// The block at the top of a card: name top left, price bottom left. The featured plan's block is coloured
function PriceBlock({ plan, billing }: { plan: Plan; billing: Billing }) {
  const price = plan.price[billing];
  return (
    <div
      className={cn(
        "relative flex h-[200px] flex-col justify-between overflow-hidden rounded-2xl border p-5",
        plan.featured
          ? "border-transparent bg-[linear-gradient(135deg,#047857_0%,#10b981_42%,#f59e0b_78%,#ea580c_100%)] text-white"
          : "border-border bg-black/[0.035] dark:bg-white/[0.05]"
      )}
    >
      <span
        aria-hidden
        className={cn("pointer-events-none absolute inset-0", plan.featured ? "opacity-[0.22] mix-blend-overlay" : "opacity-[0.06] dark:opacity-[0.08]")}
        style={{ backgroundImage: NOISE }}
      />
      <div className="relative">
        <h3 className="text-2xl font-medium tracking-[-0.02em]">{plan.name}</h3>
        {plan.badge ? (
          <span
            className={cn(
              "mt-2 inline-block rounded-full border px-2 py-px text-xs font-medium",
              plan.featured ? "border-white/80 text-white" : "border-border text-muted-foreground"
            )}
          >
            {plan.badge}
          </span>
        ) : null}
      </div>
      <div className="relative">
        <p className="flex items-baseline gap-1">
          <span className="text-[28px] font-medium leading-none tracking-[-0.02em] tabular-nums">{price.amount}</span>
          {price.per ? <span className={cn("text-sm", plan.featured ? "text-white/85" : "text-muted-foreground")}>{price.per}</span> : null}
        </p>
        {price.note || plan.student ? (
          <p className={cn("mt-1.5 text-[13px] leading-5", plan.featured ? "text-white/85" : "text-muted-foreground")}>
            {price.note ? <span className="block">{price.note}</span> : null}
            {plan.student ? <span className="block">Students: {plan.student[billing]}</span> : null}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function PlanColumn({ plan, billing }: { plan: Plan; billing: Billing }) {
  return (
    <div className="flex flex-col p-4 sm:p-5">
      <PriceBlock plan={plan} billing={billing} />
      <ButtonLink href={plan.cta.href} className="mt-4 w-full">
        {plan.cta.label}
      </ButtonLink>
      <p className="mt-4 text-[14px] leading-6 text-muted-foreground">{plan.tagline}</p>

      <div className="mt-6">
        {plan.includesLabel ? (
          <p className="flex items-center gap-1.5 border-b border-dotted border-border pb-3 text-[14px] text-muted-foreground">
            {plan.includesLabel}
            <CornerRightDown className="h-3.5 w-3.5" />
          </p>
        ) : null}
        <ul>
          {plan.features.map(([lead, rest]) => (
            <li key={lead + (rest ?? "")} className="flex items-start gap-3 border-b border-dotted border-border py-3 text-[15px] leading-6 last:border-b-0">
              <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>
                <span className="font-medium">{lead}</span>
                {rest ? <span className="text-foreground/80">{rest}</span> : null}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CompareCell({ value, align = "right" }: { value: CompareValue; align?: "right" | "left" }) {
  if (value === true)
    return <Check className={cn("h-4 w-4", align === "right" ? "ml-auto" : "")} aria-label="Included" />;
  if (value === false)
    return <Minus className={cn("h-4 w-4 text-muted-foreground/50", align === "right" ? "ml-auto" : "")} aria-label="Not included" />;
  return <span>{value}</span>;
}

function TopUps() {
  const [picked, setPicked] = useState(1);
  const pack = PACKS[picked];
  return (
    <div className="grid gap-10 px-5 py-16 md:grid-cols-2 md:gap-12 md:px-8 md:py-24">
      <div>
        <h2 className="text-balance text-3xl font-medium leading-[1.1] tracking-[-0.03em] md:text-[40px]">
          Need more in a month? Top up any plan
        </h2>
        <p className="mt-5 flex items-center gap-2.5 text-[15px]">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-xs">1</span>
          Pick a pack
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {PACKS.map((p, i) => (
            <button
              key={p.price}
              type="button"
              onClick={() => setPicked(i)}
              aria-pressed={picked === i}
              className={cn(
                "rounded-xl border px-3 py-2.5 text-left transition-colors",
                picked === i ? "border-foreground bg-foreground text-background" : "border-border hover:bg-black/5 dark:hover:bg-white/10"
              )}
            >
              <span className="block text-[15px] font-medium tabular-nums">{p.price}</span>
            </button>
          ))}
        </div>
        <p className="mt-6 flex items-center gap-2.5 text-[15px]">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-xs">2</span>
          Use it on top of your plan
        </p>
        <p className="mt-3 max-w-md text-[14px] leading-6 text-muted-foreground">
          A pack is used only after your plan&apos;s limit is reached, and it lasts 30 days. Buy it in the app, from Upgrade.
        </p>
      </div>

      <div className="relative flex min-h-[320px] flex-col overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#047857_0%,#10b981_42%,#f59e0b_78%,#ea580c_100%)] p-6 text-white sm:p-8">
        <span aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay" style={{ backgroundImage: NOISE }} />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-2xl font-medium tracking-[-0.02em]">Top-up pack</p>
            <p className="mt-1 text-sm text-white/85">One time, no subscription</p>
          </div>
          <p className="text-right">
            <span className="block text-[40px] font-medium leading-none tracking-[-0.03em] tabular-nums">{pack.price}</span>
            <span className="mt-1 block text-sm text-white/85">including GST</span>
          </p>
        </div>
        <ul className="relative mt-8 space-y-3 text-[15px]">
          <li className="flex items-start gap-3">
            <Check className="mt-1 h-4 w-4 shrink-0" />
            <span>
              <span className="font-medium tabular-nums">{pack.credits}</span> credits
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="mt-1 h-4 w-4 shrink-0" />
            <span>Lasts 30 days</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="mt-1 h-4 w-4 shrink-0" />
            <span>Works on Free, Pro and Max</span>
          </li>
        </ul>
        <a
          href={CHAT_APP_URL}
          className="relative mt-auto inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-white px-6 pt-0 text-[15px] font-medium text-black transition-colors hover:bg-white/90"
          style={{ marginTop: "2.5rem" }}
        >
          Top up in the app
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

function ComparePlans({ billing, onBilling }: { billing: Billing; onBilling: (b: Billing) => void }) {
  const [phonePlan, setPhonePlan] = useState(1);
  return (
    <div className="py-16 md:py-24">
      <div className="flex flex-col gap-5 px-5 sm:flex-row sm:items-end sm:justify-between md:px-8">
        <h2 className="text-3xl font-medium tracking-[-0.03em] md:text-[40px]">Compare plans</h2>
        <BillingSwitch billing={billing} onChange={onBilling} className="self-start sm:self-auto" />
      </div>

      {/* Phone: one plan at a time */}
      <div className="mt-8 px-5 md:hidden">
        <div className="grid grid-cols-4 gap-1 rounded-full border border-border p-1">
          {PLANS.map((plan, i) => (
            <button
              key={plan.id}
              type="button"
              onClick={() => setPhonePlan(i)}
              className={cn(
                "rounded-full py-2 text-[13px] font-medium transition-colors",
                phonePlan === i ? "bg-foreground text-background" : "text-muted-foreground"
              )}
            >
              {plan.name}
            </button>
          ))}
        </div>
        <p className="mt-3 text-center text-sm text-muted-foreground">{PLANS[phonePlan].compareLine[billing]}</p>
        {COMPARE.map((group) => (
          <div key={group.label} className="mt-6">
            <p className="rounded-lg bg-black/[0.035] px-3 py-2 text-[13px] font-medium text-muted-foreground dark:bg-white/[0.05]">{group.label}</p>
            <dl>
              {group.rows.map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-4 border-b border-dotted border-border px-3 py-3 text-[15px] last:border-b-0">
                  <dt className="text-muted-foreground">{row.label}</dt>
                  <dd className="max-w-[55%] text-right font-medium">
                    <CompareCell value={row.values[phonePlan]} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      {/* Wider screens: every plan side by side */}
      <div className="mt-10 hidden border-t border-border md:block">
        <table className="w-full table-fixed border-collapse text-[15px]">
          <colgroup>
            <col className="w-[28%]" />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="px-8 py-5 text-left font-normal" />
              {PLANS.map((plan) => (
                <th key={plan.id} scope="col" className="border-l border-border px-5 py-5 text-right align-top font-normal">
                  <span className="block text-[17px] font-medium">{plan.name}</span>
                  <span className="mt-1 block text-[13px] text-muted-foreground">{plan.compareLine[billing]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE.map((group) => (
              <Fragment key={group.label}>
                <tr className="border-y border-border bg-black/[0.03] dark:bg-white/[0.04]">
                  <th scope="colgroup" colSpan={5} className="px-8 py-2.5 text-left text-[13px] font-medium text-muted-foreground">
                    {group.label}
                  </th>
                </tr>
                {group.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="border-b border-dotted border-border px-8 py-4 text-left font-normal text-foreground/85">
                      {row.label}
                    </th>
                    {row.values.map((value, i) => (
                      <td key={PLANS[i].id} className="border-b border-l border-border border-b-transparent px-5 py-4 text-right leading-6">
                        <span className="block border-b border-dotted border-border pb-0">
                          <CompareCell value={value} />
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Faqs() {
  return (
    <div className="grid gap-8 px-5 py-16 md:grid-cols-[1fr_2fr] md:gap-12 md:px-8 md:py-24">
      <h2 className="text-3xl font-medium tracking-[-0.03em] md:text-[40px]">FAQs</h2>
      <div>
        {FAQS.map((faq) => (
          <details key={faq.question} className="group border-b border-dotted border-border">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[16px] [&::-webkit-details-marker]:hidden">
              {faq.question}
              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <p className="pb-5 pr-8 text-[15px] leading-7 text-muted-foreground">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

export function PricingPage() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <div className="mx-auto max-w-[1180px] border-x border-border">
      {/* Hero */}
      <section className="flex flex-col gap-6 px-5 pb-10 pt-16 sm:flex-row sm:items-end sm:justify-between md:px-8 md:pb-12 md:pt-24">
        <div>
          <h1 className="text-balance text-[40px] font-medium leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-[64px]">
            Plans for every way you use AI
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-[17px] leading-7 text-muted-foreground">
            Start free. Move to Pro or Max when you need more, and top up any month.
          </p>
        </div>
        <BillingSwitch billing={billing} onChange={setBilling} className="self-start sm:self-auto" />
      </section>

      {/* Plans */}
      <section className="grid border-y border-border sm:grid-cols-2 lg:grid-cols-4 [&>*]:border-border max-sm:[&>*+*]:border-t sm:[&>*:nth-child(even)]:border-l lg:[&>*+*]:border-l sm:max-lg:[&>*:nth-child(n+3)]:border-t">
        {PLANS.map((plan) => (
          <PlanColumn key={plan.id} plan={plan} billing={billing} />
        ))}
      </section>
      <p className="border-b border-border px-5 py-3 text-center text-[13px] text-muted-foreground">
        Prices include GST. Students get Pro and Max for less.
      </p>

      {/* Top-up packs */}
      <section id="top-up" className="scroll-mt-24 border-b border-border">
        <TopUps />
      </section>

      {/* Compare */}
      <section id="compare" className="scroll-mt-24 border-b border-border">
        <ComparePlans billing={billing} onBilling={setBilling} />
      </section>

      {/* FAQ */}
      <section className="border-b border-border">
        <Faqs />
      </section>

      {/* Closing call to action */}
      <section className="flex flex-col gap-6 px-5 py-14 sm:flex-row sm:items-center sm:justify-between md:px-8 md:py-16">
        <h2 className="text-balance text-2xl font-medium tracking-[-0.02em] md:text-[32px]">Start with Classgrid AI today</h2>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={CONTACT_URL} variant="outline">
            Talk to us
          </ButtonLink>
          <ButtonLink href={CHAT_APP_URL}>Start for free</ButtonLink>
        </div>
      </section>
    </div>
  );
}
