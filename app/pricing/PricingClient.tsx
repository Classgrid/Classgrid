"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { PillTabs } from "@/components/ui/pill-tabs";
import { cn } from "@/lib/utils";
import { formatInr, formatInrExact, formatMillions, formatNumber, formatTokens } from "./pricing-format";

type TopupCalculatorProps = {
  min: number;
  max: number;
  creditsPerInr: number;
  creditDays: number | null;
  premiumUnlockInr: number | null;
};

const PRESETS = [500, 1000, 2000, 5000];

export function TopupCalculator({ min, max, creditsPerInr, creditDays, premiumUnlockInr }: TopupCalculatorProps) {
  const [amount, setAmount] = useState(() => Math.min(max, Math.max(min, 1000)));
  const presets = useMemo(
    () => Array.from(new Set([min, ...PRESETS.filter((p) => p > min && p < max), max])),
    [min, max]
  );
  const credits = Math.floor(amount * creditsPerInr);
  const unlocksPremium = premiumUnlockInr !== null && amount >= premiumUnlockInr;

  return (
    <div className="grid overflow-hidden rounded-3xl border border-black/10 md:grid-cols-2 dark:border-white/10">
      <div className="p-6 sm:p-8 md:p-10">
        <p className="text-sm font-medium text-black/55 dark:text-white/55">You top up</p>
        <p className="mt-2 text-5xl font-medium tracking-[-0.03em] tabular-nums md:text-6xl">{formatInr(amount)}</p>

        <div className="mt-8">
          <Slider
            value={[amount]}
            min={min}
            max={max}
            step={1}
            aria-label="Top-up amount"
            onValueChange={(value) => setAmount(Array.isArray(value) ? value[0] : (value as number))}
          />
          <div className="mt-3 flex justify-between text-xs text-black/50 tabular-nums dark:text-white/50">
            <span>{formatInr(min)}</span>
            <span>{formatInr(max)}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setAmount(preset)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium tabular-nums transition-colors",
                amount === preset
                  ? "border-transparent bg-foreground text-background hover:bg-zinc-700 dark:hover:bg-zinc-300"
                  : "border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
              )}
            >
              {formatInr(preset)}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-black/10 bg-black/[0.03] p-6 sm:p-8 md:border-l md:border-t-0 md:p-10 dark:border-white/10 dark:bg-white/[0.04]">
        <p className="text-sm font-medium text-black/55 dark:text-white/55">You get</p>
        <p className="mt-2 text-5xl font-medium tracking-[-0.03em] tabular-nums md:text-6xl">
          {formatTokens(credits)} <span className="text-2xl text-black/55 md:text-3xl dark:text-white/55">credits</span>
        </p>
        <p className="mt-2 text-sm text-black/55 tabular-nums dark:text-white/55">
          {formatNumber(credits)} credits at {formatNumber(creditsPerInr)} credits per ₹1
        </p>

        <ul className="mt-8 space-y-3 text-[15px]">
          {creditDays !== null ? (
            <li className="flex items-start gap-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0" />
              <span>Yours to use for {formatNumber(creditDays)} days</span>
            </li>
          ) : null}
          {unlocksPremium ? (
            <li className="flex items-start gap-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0" />
              <span>Unlocks premium models for good</span>
            </li>
          ) : null}
          <li className="flex items-start gap-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0" />
            <span>Kicks in only after your free tokens run out</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export type PricingModelRow = {
  key: string;
  name: string;
  provider: string | null;
  group: string | null;
  badge: string | null;
  input: number;
  output: number;
  cachedInput: number | null;
  cacheWrite: number | null;
};

type ModelPricingTableProps = {
  models: PricingModelRow[];
  creditsPerInr: number | null;
};

const COLUMNS = [
  { key: "input", label: "Input" },
  { key: "output", label: "Output" },
  { key: "cachedInput", label: "Cached input" },
  { key: "cacheWrite", label: "Cache write" },
] as const;

export function ModelPricingTable({ models, creditsPerInr }: ModelPricingTableProps) {
  const [unit, setUnit] = useState<"credits" | "inr">("credits");
  const showInr = unit === "inr" && creditsPerInr !== null;

  const groups = useMemo(() => {
    const map = new Map<string, PricingModelRow[]>();
    for (const model of models) {
      const label = model.group?.trim() || "Models";
      if (!map.has(label)) map.set(label, []);
      map.get(label)!.push(model);
    }
    return Array.from(map.entries());
  }, [models]);

  const formatValue = (value: number | null) => {
    if (value === null) return "–";
    if (showInr) return formatInrExact(value / creditsPerInr!);
    return formatMillions(value);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-black/55 dark:text-white/55">
          {showInr ? "Rupees per 1M tokens" : "Credits per 1M tokens"}
        </p>
        {creditsPerInr !== null ? (
          <PillTabs
            tabs={[
              { id: "credits", label: "Credits" },
              { id: "inr", label: "₹" },
            ]}
            activeId={unit}
            onChange={(id) => setUnit(id as "credits" | "inr")}
            layoutId="pricing-unit"
            className="self-start sm:self-auto"
          />
        ) : null}
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-black/10 dark:border-white/10">
        <table className="w-full min-w-[680px] border-collapse text-left text-[15px]">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10">
              <th scope="col" className="sticky left-0 z-10 bg-background px-5 py-4 font-medium dark:bg-black">
                Model
              </th>
              {COLUMNS.map((column) => (
                <th key={column.key} scope="col" className="px-5 py-4 text-right font-medium whitespace-nowrap">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          {groups.map(([group, rows]) => (
            <tbody key={group}>
              <tr className="border-b border-black/10 bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.04]">
                <th
                  scope="colgroup"
                  colSpan={COLUMNS.length + 1}
                  className="px-5 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-black/55 dark:text-white/55"
                >
                  {group}
                </th>
              </tr>
              {rows.map((model) => (
                <tr key={model.key} className="border-b border-black/5 last:border-b-0 dark:border-white/5">
                  <th scope="row" className="sticky left-0 z-10 bg-background px-5 py-4 text-left font-normal dark:bg-black">
                    <span className="block font-medium">{model.name}</span>
                    {model.provider || model.badge ? (
                      <span className="mt-1 flex flex-wrap items-center gap-2 text-[13px] text-black/55 dark:text-white/55">
                        {model.provider ? <span>{model.provider}</span> : null}
                        {model.badge ? (
                          <span className="rounded-full border border-black/15 px-2 py-0.5 text-[11px] font-medium text-black/70 dark:border-white/20 dark:text-white/70">
                            {model.badge}
                          </span>
                        ) : null}
                      </span>
                    ) : null}
                  </th>
                  {COLUMNS.map((column) => {
                    const value = model[column.key];
                    return (
                      <td
                        key={column.key}
                        className={cn(
                          "px-5 py-4 text-right tabular-nums whitespace-nowrap",
                          value === null && "text-black/35 dark:text-white/35"
                        )}
                      >
                        {formatValue(value)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
