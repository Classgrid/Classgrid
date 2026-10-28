"use client";

import { useMemo } from "react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";

const CHAT_APP_URL = "https://chat.classgrid.in";
const DEFAULT_BRAND_COLOR = "#A1A1AA";

export type PluginCardData = {
  key: string;
  name: string;
  logoUrl: string;
  brandColor?: string | null;
  invertInDark?: boolean | null;
};

function makeLogo(plugin: PluginCardData) {
  return function PluginLogo({ className }: { className?: string }) {
    return (
      <img
        src={plugin.logoUrl}
        alt=""
        loading="lazy"
        className={cn(className, "object-contain", plugin.invertInDark && "dark:invert")}
      />
    );
  };
}

export function PluginsGrid({ plugins = [] }: { plugins?: PluginCardData[] }) {
  // BentoCard draws its icon as a component; keep one per plugin so logos aren't recreated on every render
  const logos = useMemo(() => new Map(plugins.map((plugin) => [plugin.key, makeLogo(plugin)])), [plugins]);

  return (
    <BentoGrid className="auto-rows-auto gap-6 md:grid-cols-2 lg:grid-cols-4">
      {plugins.map((plugin) => (
        <BentoCard
          key={plugin.key}
          name={plugin.name}
          description=""
          cta="Connect in Classgrid AI"
          href={CHAT_APP_URL}
          Icon={logos.get(plugin.key)!}
          color="from-transparent"
          iconColor={plugin.brandColor || DEFAULT_BRAND_COLOR}
          centered
          className="min-h-[240px]"
        />
      ))}
    </BentoGrid>
  );
}
