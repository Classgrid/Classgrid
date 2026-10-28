"use client";

import { Reveal } from "@/components/sections/Reveal";
import { BentoCard } from "@/components/ui/bento-grid";
import { PLUGINS } from "@/content/plugins";
import { cn } from "@/lib/utils";

const PREVIEW_COUNT = 8;

function PluginLogoRow({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center -space-x-3", className)}>
      {PLUGINS.slice(0, PREVIEW_COUNT).map((plugin) => (
        <span
          key={plugin.id}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-[#111]"
        >
          <img
            src={plugin.logo}
            alt={plugin.name}
            loading="lazy"
            className={cn("h-8 w-8 object-contain", plugin.invertInDark && "dark:invert")}
          />
        </span>
      ))}
    </span>
  );
}

export function PluginsSection() {
  return (
    <section className="bg-background text-[#0d0d0d] dark:bg-black dark:text-white">
      <div className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10 md:pb-32 lg:pb-40">
        <Reveal className="mx-auto max-w-[68rem] text-center">
          <h2 className="text-balance text-4xl font-medium leading-[1.08] tracking-[-0.035em] md:text-5xl lg:text-[64px]">
            Plugins for the apps you already use
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg leading-8 text-black/80 md:mt-8 md:text-[21px] md:leading-[1.65] dark:text-white/75">
            Connect apps from the AI Hub and Classgrid AI can search, sync and take action in them for you.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-14 max-w-[900px] md:mt-20">
          <a href="/plugins" className="block">
            <BentoCard
              name="Plugins"
              description={`${PLUGINS.length} apps, including Gmail, Google Drive, Notion, Slack and GitHub`}
              cta="Open plugins"
              href="/plugins"
              Icon={PluginLogoRow}
              color="from-[#34d399]/20"
              iconColor="#34d399"
              centered
              className="min-h-[300px] cursor-pointer"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
