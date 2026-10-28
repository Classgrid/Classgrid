"use client";

import { useState } from "react";
import { Reveal } from "@/components/sections/Reveal";
import { SolutionPanel } from "@/components/sections/solution-page/SolutionPanel";
import { cn } from "@/lib/utils";
import type { DemoTab } from "@/content/solutions/types";

export function SolutionDemo({ heading, tabs }: { heading: string; tabs: DemoTab[] }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active] ?? tabs[0];
  if (!tab) return null;

  return (
    <section className="bg-background text-[#0d0d0d] dark:bg-black dark:text-white">
      <div className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10 md:pb-32">
        <Reveal className="text-center">
          <h2 className="text-balance text-3xl font-medium tracking-[-0.03em] md:text-[44px] md:leading-[1.15]">
            {heading}
          </h2>
        </Reveal>

        <Reveal delay={0.05} className="mt-10 flex flex-wrap justify-center gap-2 md:mt-12">
          {tabs.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "rounded-full px-5 py-2 text-[15px] font-medium transition-colors",
                index === active
                  ? "bg-[#0d0d0d] text-white dark:bg-white dark:text-black"
                  : "bg-black/[0.05] text-black/70 hover:bg-black/[0.08] dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/15"
              )}
            >
              {item.label}
            </button>
          ))}
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-10 max-w-[1100px] md:mt-12">
          <div key={active} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <SolutionPanel visual={tab.visual} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
