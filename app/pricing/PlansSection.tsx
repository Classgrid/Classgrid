"use client";

import { Fragment, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ArrowRight, ArrowUpRight, Check, CheckCircle2, ChevronDown, CornerRightDown, Minus } from "lucide-react";
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

// A ₹ price that counts from the old amount to the new one when monthly/yearly changes (GSAP); other text as is
function PriceAmount({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(text);
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    const from = Number(shown.current.replace(/[^\d]/g, ""));
    const to = Number(text.replace(/[^\d]/g, ""));
    shown.current = text;
    if (!el || reduce || !/^₹[\d,]+$/.test(text) || !Number.isFinite(from) || from === to) {
      if (el) el.textContent = text;
      return;
    }
    const counter = { value: from };
    const tween = gsap.to(counter, {
      value: to,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = `₹${Math.round(counter.value).toLocaleString("en-IN")}`;
      },
    });
    return () => {
      tween.kill();
    };
  }, [text, reduce]);
  return <span ref={ref}>{text}</span>;
}

// The block at the top of a card: name top left, price bottom left. The plan in focus (hovered, else the featured
// one) glows in the brand gradient, which fades in and out (Framer Motion)
function PriceBlock({ plan, billing, active, current }: { plan: ViewPlan; billing: Billing; active: boolean; current: boolean }) {
  const price = plan.price[billing];
  const badge = current ? "Subscribed" : plan.badge;
  return (
    <div
      className={cn(
        "relative flex h-[200px] flex-col justify-between overflow-hidden rounded-2xl border p-5 transition-colors duration-300",
        active ? "border-transparent text-white" : "border-border bg-black/[0.035] dark:bg-white/[0.05]"
      )}
    >
      <motion.span
        aria-hidden
        className={cn("pointer-events-none absolute inset-0", BRAND_GRADIENT)}
        initial={false}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 1.08 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      />
      <span
        aria-hidden
        className={cn("pointer-events-none absolute inset-0 transition-opacity duration-300", active ? "opacity-[0.22] mix-blend-overlay" : "opacity-[0.06] dark:opacity-[0.08]")}
        style={{ backgroundImage: NOISE }}
      />
      <div className="relative">
        <h3 className="text-2xl font-medium tracking-[-0.02em]">{plan.name}</h3>
        {badge ? (
          <span
            className={cn(
              "mt-2 inline-block rounded-full border px-2 py-px text-xs font-medium",
              active ? "border-white/80 text-white" : "border-border text-muted-foreground"
            )}
          >
            {current ? <CheckCircle2 className="mr-1 inline h-3.5 w-3.5 align-[-2px]" aria-hidden /> : null}
            {badge}
          </span>
        ) : null}
      </div>
      <div className="relative">
        <p className="flex items-baseline gap-1">
          <span className="text-[28px] font-medium leading-none tracking-[-0.02em] tabular-nums">
            <PriceAmount text={price.amount} />
          </span>
          {price.per ? <span className={cn("text-sm", active ? "text-white/85" : "text-muted-foreground")}>{price.per}</span> : null}
        </p>
        {price.note || plan.student ? (
          <p className={cn("mt-1.5 text-[13px] leading-5", active ? "text-white/85" : "text-muted-foreground")}>
            {price.note ? <span className="block">{price.note}</span> : null}
            {plan.student ? <span className="block">Students: {plan.student[billing]}</span> : null}
          </p>
        ) : null}
      </div>
    </div>
  );
}

// Where the card stands against the visitor's plan (plans are listed smallest first)
type Relation = "guest" | "current" | "below" | "above";

function PlanColumn({ plan, billing, active, relation, index, onFocus }: { plan: ViewPlan; billing: Billing; active: boolean; relation: Relation; index: number; onFocus: () => void }) {
  const current = relation === "current";
  // Signed in: the plan you're on says Subscribed and buying it again adds time; a bigger plan says Upgrade; a
  // smaller one is already included. Not signed in: the plain words.
  const isFree = !plan.cta.buy && plan.cta.label !== "Contact us";
  const label = current
    ? plan.cta.buy ? (billing === "yearly" ? "Add 1 year" : "Add 1 month") : "Your plan"
    : relation === "below" && plan.cta.buy ? "Upgrade"
    : relation === "above" && (plan.cta.buy || isFree) ? "Included"
    : plan.cta.label;
  const inert = (current && !plan.cta.buy) || (relation === "above" && (plan.cta.buy || isFree));
  return (
    <motion.div
      className="flex flex-col p-4 sm:p-5"
      onMouseEnter={onFocus}
      onFocusCapture={onFocus}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <PriceBlock plan={plan} billing={billing} active={active} current={current} />
      {inert ? (
        <span aria-disabled className="mt-4 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-full border border-border px-6 text-[15px] font-medium text-muted-foreground">
          {current ? <CheckCircle2 className="h-4 w-4" aria-hidden /> : <Check className="h-4 w-4" aria-hidden />}
          {label}
        </span>
      ) : (
        <ButtonLink href={plan.cta.href[billing]} className="mt-4 w-full">
          {label}
        </ButtonLink>
      )}
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
    </motion.div>
  );
}

// A section that rises in when it scrolls into view
function Rise({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
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

// The signed-in visitor's plan (the login cookie is shared across classgrid.in), or null when not signed in
const PLATFORM_API = process.env.NEXT_PUBLIC_PLATFORM_API_URL || "https://api.classgrid.in";
function useCurrentPlan(reloadToken = 0) {
  const [key, setKey] = useState<string | null>(null);
  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`${PLATFORM_API}/api/ai/plan`, { credentials: "include", signal: ctrl.signal, cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((plan: { enabled?: boolean; key?: string } | null) => {
        if (plan?.enabled && typeof plan.key === "string") setKey(plan.key.toLowerCase());
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, [reloadToken]);
  return key;
}

// Back from the payment page (?subscribed=pro&term=month): a notice with a tick, the receipt line, a button to the
// chat, and the chat opens by itself after a few seconds. Read inside Suspense (useSearchParams, Next 15).
const SUBSCRIBED_WAIT_S = 5;
function SubscribedNotice({ plans, onSubscribed }: { plans: ViewPlan[]; onSubscribed: (key: string) => void }) {
  const params = useSearchParams();
  const raw = (params.get("subscribed") ?? "").toLowerCase();
  const key = /^[a-z]{2,20}$/.test(raw) ? raw : "";
  const plan = plans.find((p) => p.key === key);
  const chatUrl = key ? `${CHAT_APP_URL}/c?ai_payment=success&plan=${encodeURIComponent(key)}` : CHAT_APP_URL;
  const [left, setLeft] = useState(SUBSCRIBED_WAIT_S);
  const clicked = useRef(false);

  useEffect(() => {
    if (!key) return;
    onSubscribed(key);
    const tick = window.setInterval(() => setLeft((n) => Math.max(0, n - 1)), 1000);
    const go = window.setTimeout(() => {
      if (!clicked.current) window.location.assign(chatUrl);
    }, SUBSCRIBED_WAIT_S * 1000);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(go);
    };
  }, [key, chatUrl, onSubscribed]);

  if (!key) return null;
  return (
    <div role="status" className="mx-5 mb-8 flex flex-col gap-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/5 p-5 sm:flex-row sm:items-center sm:justify-between md:mx-8">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
        <div>
          <p className="text-[17px] font-medium">You&apos;re subscribed to {plan?.name ?? key.charAt(0).toUpperCase() + key.slice(1)}.</p>
          <p className="mt-1 text-[14px] text-muted-foreground">The receipt is in your email. Classgrid opens in {left}s.</p>
        </div>
      </div>
      <a
        href={chatUrl}
        onClick={() => {
          clicked.current = true;
        }}
        className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-full bg-foreground px-6 text-[15px] font-medium text-background transition-colors hover:bg-zinc-700 dark:hover:bg-zinc-300"
      >
        Open Classgrid
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  );
}

export function PricingPage({ view }: { view: PricingView }) {
  const [billing, setBilling] = useState<Billing>("monthly");
  const { plans, compare, faqs, topup, yearlySavePercent } = view;
  // The plan in focus wears the gradient: the hovered one, else the featured one
  const restingKey = plans.find((p) => p.featured)?.key ?? plans[0]?.key;
  const [focusKey, setFocusKey] = useState(restingKey);
  // Just subscribed (back from the payment page): that plan counts as the visitor's at once, and the account is read again
  const [subscribedKey, setSubscribedKey] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);
  const onSubscribed = useMemo(() => (key: string) => {
    setSubscribedKey(key);
    setReloadToken((n) => n + 1);
  }, []);
  const currentKey = useCurrentPlan(reloadToken) ?? subscribedKey;
  const currentRank = currentKey ? plans.findIndex((p) => p.key === currentKey) : -1;
  const relationOf = (plan: ViewPlan, i: number): Relation =>
    currentRank < 0 ? "guest" : i === currentRank ? "current" : i > currentRank ? "below" : "above";
  const hasStudent = plans.some((p) => p.student);

  return (
    <div className="mx-auto max-w-[1180px] border-x border-border">
      {/* Hero */}
      <section className="flex flex-col gap-6 px-5 pb-10 pt-16 sm:flex-row sm:items-end sm:justify-between md:px-8 md:pb-12 md:pt-24">
        <Rise>
          <h1 className="text-balance text-[40px] font-medium leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-[64px]">
            Plans for every way you use AI
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-[17px] leading-7 text-muted-foreground">
            Start free, and move to a bigger plan when you need more.
          </p>
        </Rise>
        <Rise delay={0.15} className="self-start sm:self-auto">
          <BillingSwitch billing={billing} onChange={setBilling} savePercent={yearlySavePercent} />
        </Rise>
      </section>

      <Suspense fallback={null}>
        <SubscribedNotice plans={plans} onSubscribed={onSubscribed} />
      </Suspense>

      {/* Plans */}
      <section
        onMouseLeave={() => setFocusKey(restingKey)}
        className={cn(
          "grid border-y border-border sm:grid-cols-2 [&>*]:border-border max-sm:[&>*+*]:border-t sm:[&>*:nth-child(even)]:border-l",
          plans.length >= 4 ? "lg:grid-cols-4 lg:[&>*+*]:border-l sm:max-lg:[&>*:nth-child(n+3)]:border-t" : "lg:grid-cols-3 lg:[&>*+*]:border-l"
        )}
      >
        {plans.map((plan, i) => (
          <PlanColumn key={plan.key} plan={plan} billing={billing} index={i} active={focusKey === plan.key} relation={relationOf(plan, i)} onFocus={() => setFocusKey(plan.key)} />
        ))}
      </section>
      <p className="border-b border-border px-5 py-3 text-center text-[13px] text-muted-foreground">
        Prices include GST.{hasStudent ? " Students pay less." : ""}
      </p>

      {/* Top-up */}
      {topup ? (
        <section id="top-up" className="scroll-mt-24 border-b border-border">
          <Rise>
            <TopUps topup={topup} />
          </Rise>
        </section>
      ) : null}

      {/* Compare */}
      {compare.length ? (
        <section id="compare" className="scroll-mt-24 border-b border-border">
          <Rise>
            <ComparePlans plans={plans} groups={compare} billing={billing} onBilling={setBilling} savePercent={yearlySavePercent} />
          </Rise>
        </section>
      ) : null}

      {/* FAQ */}
      {faqs.length ? (
        <section className="border-b border-border">
          <Rise>
            <Faqs faqs={faqs} />
          </Rise>
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
