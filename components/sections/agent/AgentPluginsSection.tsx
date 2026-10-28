import Link from "next/link";
import { Check, ChevronRight, Search } from "lucide-react";
import { Reveal } from "@/components/sections/Reveal";
import { PLUGINS } from "@/content/plugins";
import { cn } from "@/lib/utils";

// Mirrors the "Plugins & Integrations" tab of the AI Hub in the Classgrid app (AiHubModal.tsx)
const PANEL_PLUGINS = PLUGINS.slice(0, 8);
const GMAIL = PLUGINS.find((plugin) => plugin.id === "gmail")!;

export function AgentPluginsSection() {
  return (
    <section className="bg-background text-[#0d0d0d] dark:bg-black dark:text-white">
      <div className="mx-auto max-w-[1728px] px-5 pb-24 md:px-10 md:pb-32 lg:pb-40">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          {/* Text */}
          <Reveal className="lg:col-span-4 lg:pb-8">
            <h3 className="text-balance text-3xl font-medium leading-[1.12] tracking-[-0.03em] md:text-[44px]">
              A plugin for every app you use
            </h3>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-black/75 md:text-[21px] md:leading-[1.65] dark:text-white/70">
              Connect Gmail, Google Drive, Notion, Slack, GitHub and more from the AI Hub. Classgrid AI works as you
              inside them.
            </p>
            <Link
              href="/plugins"
              className="mt-10 inline-block border-b border-current pb-1 text-lg font-medium transition-opacity hover:opacity-70 md:text-xl"
            >
              See all plugins
            </Link>
          </Reveal>

          {/* Visual */}
          <Reveal delay={0.1} className="lg:col-span-8">
            <Link
              href="/plugins"
              aria-label="See all plugins"
              className="group relative block overflow-hidden rounded-2xl bg-gradient-to-br from-[#4fc1b0] via-[#5e9fe0] to-[#93a9f6] p-4 sm:p-6 md:aspect-[16/10] md:p-0 lg:aspect-[16/9] dark:from-[#0d4f49] dark:via-[#1b3d78] dark:to-[#363d8c]"
            >
              {/* Soft light blobs */}
              <div aria-hidden className="pointer-events-none absolute -left-16 -top-24 h-80 w-80 rounded-full bg-white/35 blur-3xl dark:bg-white/10" />
              <div aria-hidden className="pointer-events-none absolute -bottom-28 right-10 h-96 w-96 rounded-full bg-[#c7d2fe]/50 blur-3xl dark:bg-[#6366f1]/20" />

              {/* AI Hub plugins panel */}
              <div className="relative rounded-2xl bg-white/60 p-5 shadow-sm ring-1 ring-white/60 backdrop-blur-xl transition-transform duration-500 group-hover:-translate-y-1 md:absolute md:left-[6%] md:top-[8%] md:w-[70%] md:p-6 dark:bg-black/45 dark:ring-white/10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[17px] font-semibold md:text-[19px]">Plugins &amp; Integrations</p>
                    <p className="mt-1 text-[13px] text-black/55 md:text-[14px] dark:text-white/55">
                      Connect apps to use in Classgrid.
                    </p>
                  </div>
                  <span className="hidden items-center gap-2 rounded-full bg-black/[0.05] px-3 py-1.5 text-[13px] text-black/45 sm:inline-flex dark:bg-white/10 dark:text-white/45">
                    <Search className="h-3.5 w-3.5" />
                    Search plugins
                  </span>
                </div>

                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {PANEL_PLUGINS.map((plugin) => (
                    <li
                      key={plugin.id}
                      className="flex items-center gap-3 rounded-xl bg-white/70 px-3 py-2.5 ring-1 ring-black/5 dark:bg-white/[0.06] dark:ring-white/10"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-black/5 dark:bg-[#0f0f0f] dark:ring-white/10">
                        <img
                          src={plugin.logo}
                          alt=""
                          loading="lazy"
                          className={cn("h-5 w-5 object-contain", plugin.invertInDark && "dark:invert")}
                        />
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[14px] font-medium md:text-[15px]">{plugin.name}</span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-black/35 dark:text-white/35" />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Floating "connected" card */}
              <Reveal
                delay={0.35}
                distance={24}
                className="relative mt-4 md:absolute md:bottom-[8%] md:right-[4%] md:mt-0 md:w-[40%]"
              >
                <div className="rounded-2xl bg-white p-5 shadow-xl ring-1 ring-black/5 md:p-6 dark:bg-[#0f0f0f] dark:ring-white/10">
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black/[0.05] dark:bg-white/10">
                      <img src={GMAIL.logo} alt="" className="h-6 w-6 object-contain" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="whitespace-nowrap text-[16px] font-medium md:text-[17px]">Gmail connected</p>
                      <p className="text-[14px] text-emerald-600 dark:text-emerald-400">Ready to use in chat</p>
                    </div>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      <Check className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Reveal>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
