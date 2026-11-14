"use client";

import { Fragment, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, CornerRightDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Billing, CompareGroup, CompareValue, Faq, PricingView, TopupInfo, ViewPlan } from "./plans-data";

// The whole pricing page for the plans (laid out like a framed grid: thin side lines, a line between sections). Every
// number comes from the live feed the super admin sets, through plans-data.ts. Prices for people include GST.

const CHAT_APP_URL = "https://chat.classgrid.in";
const CONTACT_URL = "/contact";

// Grain for the price blocks: an inline SVG noise layer, so the colour block looks printed rather than flat
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
const BRAND_GRADIENT = "bg-[linear-gradient(135deg,#047857_0%,#10b981_42%,#f59e0b_78%,#ea580c_100%)]";

const isExternal = (href: string) => /^https?:\/\//.test(href);
const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

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

function BillingSwitch({ billing, onChange, savePercent, className }: { billing: Billing; onChange: (b: Billing) => void; savePercent: number | null; className?: string }) {
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
          {b === "yearly" && savePercent ? (
            <span className={cn("ml-1.5 text-xs", billing === b ? "text-background/70" : "text-emerald-600 dark:text-emerald-400")}>
              save up to {savePercent}%
            </span>
          ) : null}
        </button>
      ))}
    </div>
  );
}

// A feature line with its leading number in bold ("2,000 chats every 5 hours"); a "Name: value" line bolds the name
function FeatureText({ line }: { line: string }) {
  const lead = /^(?:[₹]?[\d][\d,.]*(?:\s?(?:GB|MB|K|M|x))?|Unlimited|About \d[\d,]*)\b/.exec(line) ?? /^[^:]{2,40}:/.exec(line);
  if (!lead) return <span>{line}</span>;
  return (
    <span>
      <span className="font-medium">{lead[0]}</span>
      <span className="text-foreground/80">{line.slice(lead[0].length)}</span>
    </span>
  );
}

// The block at the top of a card: name top left, price bottom left. The featured plan's block is coloured
function PriceBlock({ plan, billing }: { plan: ViewPlan; billing: Billing }) {
  const price = plan.price[billing];
  return (
    <div
      className={cn(
        "relative flex h-[200px] flex-col justify-between overflow-hidden rounded-2xl border p-5",
        plan.featured ? cn("border-transparent text-white", BRAND_GRADIENT) : "border-border bg-black/[0.035] dark:bg-white/[0.05]"
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

function PlanColumn({ plan, billing }: { plan: ViewPlan; billing: Billing }) {
  return (
    <div className="flex flex-col p-4 sm:p-5">
      <PriceBlock plan={plan} billing={billing} />
      <ButtonLink href={plan.cta.href} className="mt-4 w-full">
        {plan.cta.label}
      </ButtonLink>
      {plan.tagline ? <p className="mt-4 text-[14px] leading-6 text-muted-foreground">{plan.tagline}</p> : null}

      <div className="mt-6">
        {plan.includesLabel ? (
          <p className="flex items-center gap-1.5 border-b border-dotted border-border pb-3 text-[14px] text-muted-foreground">
            {plan.includesLabel}
            <CornerRightDown className="h-3.5 w-3.5" />
          </p>
        ) : null}
        <ul>
          {plan.features.map((line) => (
            <li key={line} className="flex items-start gap-3 border-b border-dotted border-border py-3 text-[15px] leading-6 last:border-b-0">
              <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <FeatureText line={line} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CompareCell({ value }: { value: CompareValue }) {
  if (value === true) return <Check className="ml-auto h-4 w-4" aria-label="Included" />;
  if (value === false) return <Minus className="ml-auto h-4 w-4 text-muted-foreground/50" aria-label="Not included" />;
  if (value === "") return <span className="text-muted-foreground/50">–</span>;
  return <span>{value}</span>;
}

// The real top-up, from the feed: any amount between its minimum and maximum
function TopUps({ topup }: { topup: TopupInfo }) {
  const presets = useMemo(() => {
    const steps = [topup.min, 500, 1000, 2000, 5000, topup.max].filter((n) => n >= topup.min && n <= topup.max);
    return Array.from(new Set(steps)).slice(0, 6);
  }, [topup]);
  const [amount, setAmount] = useState(presets[Math.min(1, presets.length - 1)]);
  const credits = topup.creditsPerInr ? Math.floor(amount * topup.creditsPerInr) : null;

  return (
    <div className="grid gap-10 px-5 py-16 md:grid-cols-2 md:gap-12 md:px-8 md:py-24">
      <div>
        <h2 className="text-balance text-3xl font-medium leading-[1.1] tracking-[-0.03em] md:text-[40px]">Need more in a month? Top up</h2>
        <p className="mt-5 flex items-center gap-2.5 text-[15px]">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-xs">1</span>
          Pick an amount
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {presets.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setAmount(p)}
              aria-pressed={amount === p}
              className={cn(
                "rounded-xl border px-3 py-2.5 text-left text-[15px] font-medium tabular-nums transition-colors",
                amount === p ? "border-foreground bg-foreground text-background" : "border-border hover:bg-black/5 dark:hover:bg-white/10"
              )}
            >
              {inr(p)}
            </button>
          ))}
        </div>
        <p className="mt-6 flex items-center gap-2.5 text-[15px]">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-xs">2</span>
          Use it when you need it
        </p>
        <p className="mt-3 max-w-md text-[14px] leading-6 text-muted-foreground">
          Any amount from {inr(topup.min)} to {inr(topup.max)}, from Upgrade in the app.
          {topup.validityDays ? ` It lasts ${topup.validityDays} days.` : ""}
        </p>
      </div>

      <div className={cn("relative flex min-h-[300px] flex-col overflow-hidden rounded-3xl p-6 text-white sm:p-8", BRAND_GRADIENT)}>
        <span aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay" style={{ backgroundImage: NOISE }} />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-2xl font-medium tracking-[-0.02em]">Top-up</p>
            <p className="mt-1 text-sm text-white/85">One time, no subscription</p>
          </div>
          <p className="text-right">
            <span className="block text-[40px] font-medium leading-none tracking-[-0.03em] tabular-nums">{inr(amount)}</span>
            <span className="mt-1 block text-sm text-white/85">including GST</span>
          </p>
        </div>
        <ul className="relative mt-8 space-y-3 text-[15px]">
          {credits !== null ? (
            <li className="flex items-start gap-3">
              <Check className="mt-1 h-4 w-4 shrink-0" />
              <span>
                <span className="font-medium tabular-nums">{credits.toLocaleString("en-IN")}</span> credits
              </span>
            </li>
          ) : null}
          {topup.validityDays ? (
            <li className="flex items-start gap-3">
              <Check className="mt-1 h-4 w-4 shrink-0" />
              <span>Lasts {topup.validityDays} days</span>
            </li>
          ) : null}
          <li className="flex items-start gap-3">
            <Check className="mt-1 h-4 w-4 shrink-0" />
            <span>Buy it any time from Upgrade in the app</span>
          </li>
        </ul>
        <a
          href={CHAT_APP_URL}
          className="relative mt-10 inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-white px-6 text-[15px] font-medium text-black transition-colors hover:bg-white/90"
        >
          Top up in the app
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

function ComparePlans({ plans, groups, billing, onBilling, savePercent }: { plans: ViewPlan[]; groups: CompareGroup[]; billing: Billing; onBilling: (b: Billing) => void; savePercent: number | null }) {
  const [phonePlan, setPhonePlan] = useState(Math.min(1, plans.length - 1));
  return (
    <div className="py-16 md:py-24">
      <div className="flex flex-col gap-5 px-5 sm:flex-row sm:items-end sm:justify-between md:px-8">
        <h2 className="text-3xl font-medium tracking-[-0.03em] md:text-[40px]">Compare plans</h2>
        <BillingSwitch billing={billing} onChange={onBilling} savePercent={savePercent} className="self-start sm:self-auto" />
      </div>

      {/* Phone: one plan at a time */}
      <div className="mt-8 px-5 md:hidden">
        <div className="grid gap-1 rounded-full border border-border p-1" style={{ gridTemplateColumns: `repeat(${plans.length}, minmax(0, 1fr))` }}>
          {plans.map((plan, i) => (
            <button
              key={plan.key}
              type="button"
              onClick={() => setPhonePlan(i)}
              className={cn("rounded-full py-2 text-[13px] font-medium transition-colors", phonePlan === i ? "bg-foreground text-background" : "text-muted-foreground")}
            >
              {plan.name}
            </button>
          ))}
        </div>
        <p className="mt-3 text-center text-sm text-muted-foreground">{plans[phonePlan]?.compareLine[billing]}</p>
        {groups.map((group) => (
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
            {plans.map((plan) => (
              <col key={plan.key} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="px-8 py-5 text-left font-normal" />
              {plans.map((plan) => (
                <th key={plan.key} scope="col" className="border-l border-border px-5 py-5 text-right align-top font-normal">
                  <span className="block text-[17px] font-medium">{plan.name}</span>
                  <span className="mt-1 block text-[13px] text-muted-foreground">{plan.compareLine[billing]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <Fragment key={group.label}>
                <tr className="border-y border-border bg-black/[0.03] dark:bg-white/[0.04]">
                  <th scope="colgroup" colSpan={plans.length + 1} className="px-8 py-2.5 text-left text-[13px] font-medium text-muted-foreground">
                    {group.label}
                  </th>
                </tr>
                {group.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="border-b border-dotted border-border px-8 py-4 text-left font-normal text-foreground/85">
                      {row.label}
                    </th>
                    {row.values.map((value, i) => (
                      <td key={plans[i]?.key ?? i} className="border-l border-border px-5 py-4 text-right leading-6">
                        <span className="block border-b border-dotted border-border">
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

function Faqs({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="grid gap-8 px-5 py-16 md:grid-cols-[1fr_2fr] md:gap-12 md:px-8 md:py-24">
      <h2 className="text-3xl font-medium tracking-[-0.03em] md:text-[40px]">FAQs</h2>
      <div>
        {faqs.map((faq) => (
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

export function PricingPage({ view }: { view: PricingView }) {
  const [billing, setBilling] = useState<Billing>("monthly");
  const { plans, compare, faqs, topup, yearlySavePercent } = view;
  const hasStudent = plans.some((p) => p.student);

  return (
    <div className="mx-auto max-w-[1180px] border-x border-border">
      {/* Hero */}
      <section className="flex flex-col gap-6 px-5 pb-10 pt-16 sm:flex-row sm:items-end sm:justify-between md:px-8 md:pb-12 md:pt-24">
        <div>
          <h1 className="text-balance text-[40px] font-medium leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-[64px]">
            Plans for every way you use AI
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-[17px] leading-7 text-muted-foreground">
            Start free, and move to a bigger plan when you need more.
          </p>
        </div>
        <BillingSwitch billing={billing} onChange={setBilling} savePercent={yearlySavePercent} className="self-start sm:self-auto" />
      </section>

      {/* Plans */}
      <section
        className={cn(
          "grid border-y border-border sm:grid-cols-2 [&>*]:border-border max-sm:[&>*+*]:border-t sm:[&>*:nth-child(even)]:border-l",
          plans.length >= 4 ? "lg:grid-cols-4 lg:[&>*+*]:border-l sm:max-lg:[&>*:nth-child(n+3)]:border-t" : "lg:grid-cols-3 lg:[&>*+*]:border-l"
        )}
      >
        {plans.map((plan) => (
          <PlanColumn key={plan.key} plan={plan} billing={billing} />
        ))}
      </section>
      <p className="border-b border-border px-5 py-3 text-center text-[13px] text-muted-foreground">
        Prices include GST.{hasStudent ? " Students pay less." : ""}
      </p>

      {/* Top-up */}
      {topup ? (
        <section id="top-up" className="scroll-mt-24 border-b border-border">
          <TopUps topup={topup} />
        </section>
      ) : null}

      {/* Compare */}
      {compare.length ? (
        <section id="compare" className="scroll-mt-24 border-b border-border">
          <ComparePlans plans={plans} groups={compare} billing={billing} onBilling={setBilling} savePercent={yearlySavePercent} />
        </section>
      ) : null}

      {/* FAQ */}
      {faqs.length ? (
        <section className="border-b border-border">
          <Faqs faqs={faqs} />
        </section>
      ) : null}

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
