import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/sections/Reveal";
import { AgentFaqSection } from "@/components/sections/agent/AgentFaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { getAiPricingPage } from "@/sanity/lib/marketing";
import { ModelPricingTable, TopupCalculator, type PricingModelRow } from "./PricingClient";
import { fillLive, liveTokens, normalizeLivePricing, type LivePricing } from "./pricing-format";

const PLATFORM_API = process.env.NEXT_PUBLIC_PLATFORM_API_URL || "https://api.classgrid.in";
const CHAT_APP_URL = "https://chat.classgrid.in";

type PlanData = {
  name?: string | null;
  priceLabel?: string | null;
  tagline?: string | null;
  features?: string[] | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
};

type AiPricingPageData = {
  lastUpdated?: string | null;
  hero?: {
    eyebrow?: string | null;
    title?: string | null;
    subtitle?: string | null;
    primaryCtaLabel?: string | null;
    primaryCtaHref?: string | null;
  } | null;
  freePlan?: PlanData | null;
  paygPlan?: PlanData | null;
  calculator?: { title?: string | null; subtitle?: string | null; show?: boolean | null } | null;
  howItWorks?: { title?: string | null; steps?: { _key?: string; title?: string | null; body?: string | null }[] | null } | null;
  modelPricing?: {
    title?: string | null;
    intro?: string | null;
    note?: string | null;
    models?: {
      _key?: string;
      name?: string | null;
      provider?: string | null;
      group?: string | null;
      input?: number | null;
      output?: number | null;
      cachedInput?: number | null;
      cacheWrite?: number | null;
      badge?: string | null;
      order?: number | null;
    }[] | null;
  } | null;
  teams?: { title?: string | null; body?: string | null; ctaLabel?: string | null; ctaHref?: string | null } | null;
  faqs?: { _key?: string; question?: string | null; answer?: string | null }[] | null;
  seo?: { title?: string | null; description?: string | null } | null;
};

const DEFAULT_TITLE = "Pricing";
const DEFAULT_DESCRIPTION =
  "Start free with Classgrid AI and top up only when you need more. See what's free, how top-ups work and what every model costs.";

async function getLivePricing(): Promise<LivePricing | null> {
  try {
    const res = await fetch(`${PLATFORM_API}/api/public/ai-pricing`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    return normalizeLivePricing(await res.json());
  } catch {
    return null;
  }
}

function formatDate(value?: string | null) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${value}T00:00:00Z`)
  );
}

const isNumber = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v) && v >= 0;

const isExternal = (href: string) => /^https?:\/\//.test(href);

function CtaLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const classes = cn(
    "inline-flex h-12 items-center justify-center gap-1.5 rounded-full bg-foreground px-7 text-[16px] font-medium text-background transition-colors hover:bg-zinc-700 dark:hover:bg-zinc-300",
    className
  );
  if (isExternal(href)) {
    return (
      <a href={href} className={classes}>
        {children}
        <ArrowUpRight className="h-4 w-4" />
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string | null }) {
  return (
    <Reveal className="max-w-3xl">
      <h2 className="text-balance text-4xl font-medium leading-[1.08] tracking-[-0.035em] md:text-5xl">{title}</h2>
      {subtitle ? (
        <p className="mt-5 text-pretty text-lg leading-8 text-black/70 md:text-[19px] dark:text-white/65">{subtitle}</p>
      ) : null}
    </Reveal>
  );
}

function PlanCard({
  plan,
  tokens,
  featured,
  delay,
}: {
  plan: PlanData;
  tokens: Record<string, string | null>;
  featured?: boolean;
  delay: number;
}) {
  const price = fillLive(plan.priceLabel, tokens);
  const tagline = fillLive(plan.tagline, tokens);
  const features = (plan.features ?? []).map((line) => fillLive(line, tokens)).filter((line): line is string => !!line);

  return (
    <Reveal delay={delay} className="h-full">
      <div
        className={cn(
          "flex h-full flex-col rounded-3xl border p-6 sm:p-8 md:p-10",
          featured ? "border-black/80 dark:border-white/70" : "border-black/10 dark:border-white/10"
        )}
      >
        <h3 className="text-xl font-medium">{plan.name}</h3>
        {price ? <p className="mt-6 text-5xl font-medium tracking-[-0.03em] md:text-6xl">{price}</p> : null}
        {tagline ? <p className="mt-4 text-[17px] leading-7 text-black/70 dark:text-white/65">{tagline}</p> : null}

        {features.length ? (
          <ul className="mt-8 space-y-3.5 border-t border-black/10 pt-8 text-[15px] leading-6 dark:border-white/10">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {plan.ctaLabel && plan.ctaHref ? (
          <div className="mt-auto pt-10">
            <CtaLink href={plan.ctaHref} className="w-full">
              {plan.ctaLabel}
            </CtaLink>
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}

export async function generateMetadata() {
  const page = (await getAiPricingPage()) as AiPricingPageData | null;
  return buildPageMetadata({
    title: page?.seo?.title?.trim() || DEFAULT_TITLE,
    description: page?.seo?.description?.trim() || DEFAULT_DESCRIPTION,
    path: "/pricing",
  });
}

export default async function PricingPage() {
  const [page, live] = await Promise.all([
    getAiPricingPage() as Promise<AiPricingPageData | null>,
    getLivePricing(),
  ]);
  const tokens = liveTokens(live);
  const lastUpdated = formatDate(page?.lastUpdated);

  const heroTitle = page?.hero?.title?.trim() || "Simple pricing, start free";
  const heroSubtitle = fillLive(page?.hero?.subtitle, tokens);
  const heroCtaLabel = page?.hero?.primaryCtaLabel?.trim() || "Start for free";
  const heroCtaHref = page?.hero?.primaryCtaHref?.trim() || CHAT_APP_URL;

  const plans = [page?.freePlan, page?.paygPlan].filter((plan): plan is PlanData => !!plan?.name?.trim());

  const calculator =
    page?.calculator?.show !== false &&
    live?.creditsPerInr != null &&
    live.topupMinInr != null &&
    live.topupMaxInr != null
      ? {
          min: live.topupMinInr,
          max: live.topupMaxInr,
          creditsPerInr: live.creditsPerInr,
          creditDays: live.creditValidityDays,
          premiumUnlockInr: live.premiumUnlockInr,
        }
      : null;

  const steps = (page?.howItWorks?.steps ?? [])
    .map((step, i) => ({ key: step._key ?? String(i), title: fillLive(step.title, tokens), body: fillLive(step.body, tokens) }))
    .filter((step): step is { key: string; title: string; body: string } => !!step.title && !!step.body);

  const models: PricingModelRow[] = (page?.modelPricing?.models ?? [])
    .filter((m) => m.name?.trim() && isNumber(m.input) && isNumber(m.output))
    .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999))
    .map((m, i) => ({
      key: m._key ?? String(i),
      name: m.name!.trim(),
      provider: m.provider?.trim() || null,
      group: m.group?.trim() || null,
      badge: fillLive(m.badge, tokens),
      input: m.input!,
      output: m.output!,
      cachedInput: isNumber(m.cachedInput) ? m.cachedInput : null,
      cacheWrite: isNumber(m.cacheWrite) ? m.cacheWrite : null,
    }));
  const modelNote = fillLive(page?.modelPricing?.note, tokens);

  const faqs = (page?.faqs ?? [])
    .map((faq) => ({ question: fillLive(faq.question, tokens), answer: fillLive(faq.answer, tokens) }))
    .filter((faq): faq is { question: string; answer: string } => !!faq.question && !!faq.answer);

  const teams = page?.teams;
  const teamsBody = fillLive(teams?.body, tokens);

  return (
    <div className="relative overflow-x-clip bg-background text-[#0d0d0d] dark:bg-black dark:text-white">
      <JsonLd
        data={[
          {
            "@type": "WebPage",
            "@id": "https://classgrid.in/pricing/#webpage",
            name: "Classgrid AI Pricing",
            url: "https://classgrid.in/pricing",
            about: { "@id": "https://classgrid.in/#software" },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://classgrid.in/" },
              { "@type": "ListItem", position: 2, name: "Pricing", item: "https://classgrid.in/pricing" },
            ],
          },
          ...(faqs.length
            ? [
                {
                  "@type": "FAQPage",
                  mainEntity: faqs.map((faq) => ({
                    "@type": "Question",
                    name: faq.question,
                    acceptedAnswer: { "@type": "Answer", text: faq.answer },
                  })),
                },
              ]
            : []),
        ]}
      />

      {/* Hero */}
      <section className="mx-auto max-w-[1400px] px-5 pb-16 pt-20 md:px-10 md:pb-20 md:pt-28">
        <Reveal className="mx-auto max-w-[60rem] text-center">
          {page?.hero?.eyebrow ? (
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-black/55 dark:text-white/55">
              {page.hero.eyebrow}
            </p>
          ) : null}
          <h1 className="text-balance text-[44px] font-medium leading-[1.05] tracking-[-0.035em] sm:text-6xl lg:text-[72px]">
            {heroTitle}
          </h1>
          {heroSubtitle ? (
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-black/80 md:mt-8 md:text-[21px] md:leading-[1.65] dark:text-white/75">
              {heroSubtitle}
            </p>
          ) : null}
          <div className="mt-10 flex flex-col items-center gap-4">
            <CtaLink href={heroCtaHref}>{heroCtaLabel}</CtaLink>
            {lastUpdated ? <p className="text-sm text-black/50 dark:text-white/50">Last updated {lastUpdated}</p> : null}
          </div>
        </Reveal>
      </section>

      {/* Plans */}
      {plans.length ? (
        <section className="mx-auto max-w-[1100px] px-5 pb-24 md:px-10 md:pb-32">
          <div className={cn("grid gap-5", plans.length > 1 && "md:grid-cols-2")}>
            {plans.map((plan, i) => (
              <PlanCard key={plan.name} plan={plan} tokens={tokens} featured={i === 1} delay={0.05 + i * 0.08} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Top-up calculator */}
      {calculator ? (
        <section className="mx-auto max-w-[1100px] px-5 pb-24 md:px-10 md:pb-32">
          <SectionHeading
            title={page?.calculator?.title?.trim() || "See what you get"}
            subtitle={fillLive(page?.calculator?.subtitle, tokens)}
          />
          <Reveal delay={0.1} className="mt-10 md:mt-12">
            <TopupCalculator {...calculator} />
          </Reveal>
        </section>
      ) : null}

      {/* How tokens are used */}
      {steps.length ? (
        <section className="mx-auto max-w-[1100px] px-5 pb-24 md:px-10 md:pb-32">
          <SectionHeading title={page?.howItWorks?.title?.trim() || "How your tokens are used"} />
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-12">
            {steps.map((step, i) => (
              <li key={step.key} className="h-full">
                <Reveal delay={0.05 + i * 0.05} className="h-full">
                  <div className="h-full rounded-3xl border border-black/10 p-6 sm:p-8 dark:border-white/10">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/15 text-sm font-medium tabular-nums dark:border-white/20">
                      {i + 1}
                    </span>
                    <h3 className="mt-6 text-xl font-medium">{step.title}</h3>
                    <p className="mt-3 text-[15px] leading-7 text-black/70 dark:text-white/65">{step.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {/* Model pricing */}
      {models.length ? (
        <section id="models" className="mx-auto max-w-[1100px] scroll-mt-24 px-5 pb-24 md:px-10 md:pb-32">
          <SectionHeading
            title={page?.modelPricing?.title?.trim() || "Model pricing"}
            subtitle={fillLive(page?.modelPricing?.intro, tokens)}
          />
          <Reveal delay={0.1} className="mt-10 md:mt-12">
            <ModelPricingTable models={models} creditsPerInr={live?.creditsPerInr ?? null} />
            {modelNote || lastUpdated ? (
              <div className="mt-5 space-y-2 text-sm leading-6 text-black/55 dark:text-white/55">
                {modelNote ? <p className="whitespace-pre-line">{modelNote}</p> : null}
                {lastUpdated ? <p>Last updated {lastUpdated}</p> : null}
              </div>
            ) : null}
          </Reveal>
        </section>
      ) : null}

      {/* For teams */}
      {teams?.title?.trim() ? (
        <section className="mx-auto max-w-[1100px] px-5 pb-24 md:px-10 md:pb-32">
          <Reveal>
            <div className="flex flex-col gap-8 rounded-3xl border border-black/10 bg-black/[0.03] p-6 sm:p-10 md:flex-row md:items-center md:justify-between md:p-12 dark:border-white/10 dark:bg-white/[0.04]">
              <div className="max-w-2xl">
                <h2 className="text-balance text-3xl font-medium leading-[1.1] tracking-[-0.03em] md:text-4xl">
                  {teams.title}
                </h2>
                {teamsBody ? <p className="mt-4 text-[17px] leading-7 text-black/70 dark:text-white/65">{teamsBody}</p> : null}
              </div>
              {teams.ctaLabel && teams.ctaHref ? (
                <CtaLink href={teams.ctaHref} className="shrink-0 self-start md:self-auto">
                  {teams.ctaLabel}
                </CtaLink>
              ) : null}
            </div>
          </Reveal>
        </section>
      ) : null}

      {/* FAQ */}
      {faqs.length ? <AgentFaqSection title="Questions" faqs={faqs} /> : null}
    </div>
  );
}
