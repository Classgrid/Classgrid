"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Minus } from "lucide-react";
import { PillTabs } from "@/components/ui/pill-tabs";
import { cn } from "@/lib/utils";

// The Free, Pro, Max and Enterprise plans. Written here, not in Sanity, until the plan numbers are kept in Sanity
// (aiPricingPage has only the old free and pay-as-you-go cards). Prices for people include GST.

const CHAT_APP_URL = "https://chat.classgrid.in";

type Billing = "monthly" | "yearly";

type Plan = {
  id: "free" | "pro" | "max" | "enterprise";
  name: string;
  tagline: string;
  price: Record<Billing, { amount: string; per: string; note?: string }>;
  student?: Record<Billing, string>;
  badge?: string;
  featured?: boolean;
  includesLabel?: string;
  features: string[];
  cta: { label: string; href: string };
};

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Try Classgrid AI every day, free.",
    price: {
      monthly: { amount: "₹0", per: "/month" },
      yearly: { amount: "₹0", per: "/month" },
    },
    features: [
      "40 messages every 5 hours",
      "4 images and photo edits a week",
      "20 voice replies a day",
      "30 minutes of WhatsApp AI calls a month",
      "3 projects",
      "600 MB Library",
    ],
    cta: { label: "Start for free", href: CHAT_APP_URL },
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For students and builders who use AI every day.",
    badge: "Popular",
    featured: true,
    price: {
      monthly: { amount: "₹499", per: "/month" },
      yearly: { amount: "₹333", per: "/month", note: "₹3,999 billed yearly" },
    },
    student: { monthly: "₹299/month", yearly: "₹2,499/year" },
    includesLabel: "Everything in Free, plus",
    features: [
      "300 messages every 5 hours",
      "Claude Sonnet and Opus",
      "Claude Fable, a few answers a week",
      "Deep thinking",
      "100 images and photo edits a month",
      "150 minutes of WhatsApp AI calls a month",
      "25 projects",
      "5 GB Library",
    ],
    cta: { label: "Get Pro", href: CHAT_APP_URL },
  },
  {
    id: "max",
    name: "Max",
    tagline: "For heavy daily work, long chats and coding.",
    price: {
      monthly: { amount: "₹1,999", per: "/month" },
      yearly: { amount: "₹1,250", per: "/month", note: "₹14,999 billed yearly" },
    },
    student: { monthly: "₹1,499/month", yearly: "₹10,999/year" },
    includesLabel: "Everything in Pro, plus",
    features: [
      "1,000 messages every 5 hours",
      "5x the Claude use of Pro",
      "About 20 Claude Fable answers a week",
      "300 images and photo edits a month",
      "400 minutes of WhatsApp AI calls a month",
      "Unlimited projects",
      "20 GB Library",
      "Priority at busy times",
    ],
    cta: { label: "Get Max", href: CHAT_APP_URL },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For schools, colleges and teams.",
    badge: "Coming soon",
    price: {
      monthly: { amount: "Contact us", per: "" },
      yearly: { amount: "Contact us", per: "" },
    },
    includesLabel: "Everything in Max, plus",
    features: [
      "Priced per seat, billed yearly",
      "From 50 seats, with volume discounts",
      "One shared pool for every member",
      "Admin controls, SSO and your branding",
      "A named contact and a 45-day free pilot",
    ],
    cta: { label: "Contact us", href: "/contact" },
  },
];

type CompareValue = string | boolean;
type CompareRow = { label: string; values: [CompareValue, CompareValue, CompareValue, CompareValue] };
type CompareArea = { id: string; label: string; rows: CompareRow[] };

// Free, Pro, Max, Enterprise. false = not included, true = included
const COMPARE: CompareArea[] = [
  {
    id: "chat",
    label: "Chat and AI",
    rows: [
      { label: "Everyday chat", values: ["40 every 5 hours, 150 a week", "300 every 5 hours, 2,000 a week", "1,000 every 5 hours, 6,000 a week", "Shared pool"] },
      { label: "Claude Sonnet and Opus", values: [false, "About 30 long answers a week", "5x Pro", "Shared pool"] },
      { label: "Claude Fable", values: [false, "A few answers a week", "About 20 answers a week", "Shared pool"] },
      { label: "Thinking modes", values: ["Fast, Normal", "Fast, Normal, Deep", "Fast, Normal, Deep", "Fast, Normal, Deep"] },
      { label: "Memory of a chat", values: ["32K tokens", "128K tokens", "400K tokens", "Up to 1M tokens"] },
      { label: "Helpers working at once", values: ["1", "3", "5", "5"] },
    ],
  },
  {
    id: "media",
    label: "Images and voice",
    rows: [
      { label: "Images and photo edits", values: ["4 a week", "100 a month", "300 a month", "60 per seat a month"] },
      { label: "Voice replies", values: ["20 a day", "150 a day", "500 a day", "150 per seat a day"] },
      { label: "Voice input", values: ["15 minutes a day", "2 hours a day", "5 hours a day", "2 hours per seat a day"] },
    ],
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    rows: [
      { label: "AI call minutes a month", values: ["30", "150", "400", "100 per seat"] },
      { label: "AI calls a day", values: ["3", "10", "30", "Shared pool"] },
      { label: "Minutes per call", values: ["5", "10", "15", "15"] },
      { label: "Scheduled messages", values: ["10 a day", "100 a day", "300 a day", "Shared pool"] },
    ],
  },
  {
    id: "code",
    label: "Projects and code",
    rows: [
      { label: "Projects", values: ["3", "25", "Unlimited", "Unlimited"] },
      { label: "Coding agent runs a month", values: ["30", "500", "1,500", "300 per seat"] },
      { label: "Cloud sandbox hours a month", values: ["3", "30", "100", "25 per seat"] },
      { label: "Work on your own PC (desktop app)", values: [true, true, true, true] },
    ],
  },
  {
    id: "account",
    label: "Files and account",
    rows: [
      { label: "File uploads", values: ["3 a day, up to 10 MB", "50 every 5 hours, up to 50 MB", "150 every 5 hours, up to 200 MB", "150 every 5 hours, up to 200 MB"] },
      { label: "Library storage", values: ["600 MB", "5 GB", "20 GB", "5 GB per seat"] },
      { label: "Signed-in devices", values: ["2", "5", "10", "10 per seat"] },
      { label: "Support", values: ["Community", "Email", "Priority email", "Named contact"] },
    ],
  },
];

const isExternal = (href: string) => /^https?:\/\//.test(href);

function PlanButton({ href, featured, children }: { href: string; featured?: boolean; children: string }) {
  const classes = cn(
    "inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-full px-6 text-[15px] font-medium transition-colors",
    featured
      ? "bg-foreground text-background hover:bg-zinc-700 dark:hover:bg-zinc-300"
      : "border border-black/15 hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
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

export function PlanCards() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <div>
      <div className="flex flex-col items-center gap-3">
        <PillTabs
          tabs={[
            { id: "monthly", label: "Monthly" },
            { id: "yearly", label: "Yearly" },
          ]}
          activeId={billing}
          onChange={(id) => setBilling(id as Billing)}
          layoutId="pricing-billing"
        />
        <p className="text-sm text-black/55 dark:text-white/55">
          {billing === "yearly" ? "Yearly saves about 33% on Pro and 37% on Max" : "Pay monthly, cancel any time"}
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {PLANS.map((plan) => {
          const price = plan.price[billing];
          return (
            <div
              key={plan.id}
              className={cn(
                "flex flex-col rounded-3xl border p-6 sm:p-7",
                plan.featured
                  ? "border-black/80 bg-black/[0.02] dark:border-white/70 dark:bg-white/[0.03]"
                  : "border-black/10 dark:border-white/10"
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-medium">{plan.name}</h3>
                {plan.badge ? (
                  <span className="rounded-full border border-black/15 px-2.5 py-0.5 text-xs font-medium text-black/70 dark:border-white/20 dark:text-white/70">
                    {plan.badge}
                  </span>
                ) : null}
              </div>
              <p className="mt-2 min-h-[3rem] text-[15px] leading-6 text-black/65 dark:text-white/60">{plan.tagline}</p>

              <div className="mt-6 min-h-[5.5rem]">
                <p className="flex items-baseline gap-1">
                  <span className="text-4xl font-medium tracking-[-0.03em] tabular-nums">{price.amount}</span>
                  {price.per ? <span className="text-[15px] text-black/55 dark:text-white/55">{price.per}</span> : null}
                </p>
                {price.note ? <p className="mt-1 text-sm text-black/55 dark:text-white/55">{price.note}</p> : null}
                {plan.student ? (
                  <p className="mt-1 text-sm text-black/55 dark:text-white/55">Students: {plan.student[billing]}</p>
                ) : null}
              </div>

              <div className="mt-5">
                <PlanButton href={plan.cta.href} featured={plan.featured}>
                  {plan.cta.label}
                </PlanButton>
              </div>

              <div className="mt-7 border-t border-black/10 pt-6 dark:border-white/10">
                {plan.includesLabel ? <p className="mb-4 text-sm font-medium">{plan.includesLabel}</p> : null}
                <ul className="space-y-3 text-[15px] leading-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="mt-1 h-4 w-4 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-1 text-center text-sm text-black/55 sm:flex-row sm:justify-center sm:gap-2 dark:text-white/55">
        <span>Prices include GST.</span>
        <span>
          Need more in a month?{" "}
          <a href="#top-up" className="underline underline-offset-4 hover:text-foreground">
            Top-up packs from ₹49
          </a>
          .
        </span>
      </div>
    </div>
  );
}

function CompareCell({ value }: { value: CompareValue }) {
  if (value === true) return <Check className="mx-auto h-4 w-4" aria-label="Included" />;
  if (value === false) return <Minus className="mx-auto h-4 w-4 text-black/30 dark:text-white/30" aria-label="Not included" />;
  return <span>{value}</span>;
}

export function ComparePlans() {
  const [areaId, setAreaId] = useState(COMPARE[0].id);
  const area = COMPARE.find((a) => a.id === areaId) ?? COMPARE[0];
  // On a phone the four columns don't fit: one plan at a time, picked here
  const [phonePlan, setPhonePlan] = useState(1);

  return (
    <div>
      <div className="flex justify-center">
        <PillTabs
          tabs={COMPARE.map((a) => ({ id: a.id, label: a.label }))}
          activeId={area.id}
          onChange={setAreaId}
          layoutId="pricing-compare"
        />
      </div>

      <div className="mt-6 md:hidden">
        <div className="grid grid-cols-4 gap-1 rounded-full border border-black/10 p-1 dark:border-white/10">
          {PLANS.map((plan, i) => (
            <button
              key={plan.id}
              type="button"
              onClick={() => setPhonePlan(i)}
              className={cn(
                "rounded-full py-2 text-[13px] font-medium transition-colors",
                phonePlan === i ? "bg-foreground text-background" : "text-black/60 dark:text-white/60"
              )}
            >
              {plan.name}
            </button>
          ))}
        </div>
        <dl className="mt-4 overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
          {area.rows.map((row) => (
            <div
              key={row.label}
              className="flex items-start justify-between gap-4 border-b border-black/5 px-4 py-3.5 text-[15px] last:border-b-0 dark:border-white/5"
            >
              <dt className="text-black/70 dark:text-white/65">{row.label}</dt>
              <dd className="max-w-[55%] text-right font-medium">
                <CompareCell value={row.values[phonePlan]} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-6 hidden overflow-x-auto rounded-2xl border border-black/10 md:block dark:border-white/10">
        <table className="w-full min-w-[760px] table-fixed border-collapse text-left text-[15px]">
          <colgroup>
            <col className="w-[28%]" />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10">
              <th scope="col" className="sticky left-0 z-10 bg-background px-5 py-4 font-medium dark:bg-black">
                {area.label}
              </th>
              {PLANS.map((plan) => (
                <th key={plan.id} scope="col" className="px-4 py-4 text-center font-medium">
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {area.rows.map((row) => (
              <tr key={row.label} className="border-b border-black/5 last:border-b-0 dark:border-white/5">
                <th scope="row" className="sticky left-0 z-10 bg-background px-5 py-4 text-left font-normal dark:bg-black">
                  {row.label}
                </th>
                {row.values.map((value, i) => (
                  <td key={PLANS[i].id} className="px-4 py-4 text-center leading-6 text-black/80 dark:text-white/80">
                    <CompareCell value={value} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm leading-6 text-black/55 dark:text-white/55">
        Message limits refill every 5 hours. At a limit you can wait for the refill, top up or move to a bigger plan;
        everyday chat moves to a smaller model instead of stopping. Enterprise is coming soon.
      </p>
    </div>
  );
}
