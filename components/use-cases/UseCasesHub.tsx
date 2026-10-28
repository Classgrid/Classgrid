"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { USE_CASE_AUDIENCES, USE_CASE_CAPABILITIES, type UseCase } from "@/content/useCases";
import { UseCaseIcon } from "@/components/use-cases/UseCaseIcon";
import { cn } from "@/lib/utils";

export function UseCasesHub({ useCases }: { useCases: UseCase[] }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string[]>([]);
  const [activeAudiences, setActiveAudiences] = useState<string[]>([]);

  // Only offer filters that at least one use case has
  const capabilities = useMemo(
    () => USE_CASE_CAPABILITIES.filter((cap) => useCases.some((item) => item.capabilities.includes(cap))),
    [useCases]
  );
  const audiences = useMemo(
    () => USE_CASE_AUDIENCES.filter((aud) => useCases.some((item) => item.audiences?.includes(aud))),
    [useCases]
  );

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return useCases.filter((item) => {
      if (active.length && !active.some((cap) => item.capabilities.includes(cap as UseCase["capabilities"][number]))) return false;
      if (activeAudiences.length && !activeAudiences.some((aud) => item.audiences?.includes(aud as UseCase["audiences"][number]))) return false;
      if (!q) return true;
      return [item.title, item.summary, ...item.capabilities, ...(item.audiences ?? [])].join(" ").toLowerCase().includes(q);
    });
  }, [useCases, query, active, activeAudiences]);

  const toggleIn = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (value: string) =>
    setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));

  return (
    <div className="grid border-t border-black/10 lg:grid-cols-[minmax(280px,360px)_1fr] dark:border-white/10">
      <aside className="border-black/10 px-5 py-8 md:px-10 lg:border-r dark:border-white/10">
        <div className="lg:sticky lg:top-24">
          <label className="relative block">
            <span className="sr-only">Search use cases</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/45 dark:text-white/45" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="h-12 w-full rounded-xl border border-black/10 bg-white pl-11 pr-4 text-[15px] text-black outline-none transition-colors placeholder:text-black/40 focus:border-black/30 dark:border-white/10 dark:bg-[#0a0a0a] dark:text-white dark:placeholder:text-white/40 dark:focus:border-white/30"
            />
          </label>

          <p className="mt-8 text-[14px] text-black/50 dark:text-white/50">
            {shown.length} {shown.length === 1 ? "result" : "results"}
          </p>
          <FilterGroup title="Who it's for" options={audiences} active={activeAudiences} onToggle={toggleIn(setActiveAudiences)} />
          <FilterGroup title="Type of work" options={capabilities} active={active} onToggle={toggleIn(setActive)} />
          {(active.length > 0 || activeAudiences.length > 0) && (
            <button
              type="button"
              onClick={() => {
                setActive([]);
                setActiveAudiences([]);
              }}
              className="mt-4 text-[13px] text-black/55 underline-offset-4 hover:text-black hover:underline dark:text-white/55 dark:hover:text-white"
            >
              Clear filters
            </button>
          )}
        </div>
      </aside>

      <div className="px-5 py-8 md:px-10">
        {shown.length === 0 ? (
          <p className="py-20 text-center text-[15px] text-black/55 dark:text-white/55">No use cases match your search.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {shown.map((item) => (
              <Link
                key={item.slug}
                href={`/use-cases/${item.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white transition-colors hover:border-black/30 dark:border-white/10 dark:bg-[#0a0a0a] dark:hover:border-white/30"
              >
                <div className="flex aspect-[4/3] items-center justify-center bg-black/[0.03] dark:bg-white/[0.03]">
                  <span className="flex h-20 w-20 items-center justify-center rounded-2xl border border-black/10 bg-white text-black transition-transform duration-300 group-hover:scale-105 dark:border-white/10 dark:bg-black dark:text-white">
                    <UseCaseIcon name={item.icon} className="h-9 w-9" />
                  </span>
                </div>
                <div className="flex flex-1 items-stretch border-t border-black/10 dark:border-white/10">
                  <div className="flex-1 px-5 py-4">
                    <h3 className="text-[16px] font-semibold leading-snug text-black dark:text-white">{item.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-black/60 dark:text-white/60">{item.summary}</p>
                  </div>
                  <span className="flex w-14 shrink-0 items-center justify-center border-l border-black/10 text-black/60 transition-colors group-hover:text-black dark:border-white/10 dark:text-white/60 dark:group-hover:text-white">
                    <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({
  title,
  options,
  active,
  onToggle,
}: {
  title: string;
  options: string[];
  active: string[];
  onToggle: (value: string) => void;
}) {
  if (!options.length) return null;
  return (
    <div className="mt-6">
      <h2 className="text-[15px] font-semibold text-black dark:text-white">{title}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const on = active.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              aria-pressed={on}
              className={cn(
                "rounded-md border px-2.5 py-1.5 font-mono text-[11.5px] uppercase tracking-[0.04em] transition-colors",
                on
                  ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                  : "border-black/10 bg-black/[0.03] text-black/75 hover:border-black/25 hover:text-black dark:border-white/10 dark:bg-white/[0.04] dark:text-white/75 dark:hover:border-white/25 dark:hover:text-white"
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
