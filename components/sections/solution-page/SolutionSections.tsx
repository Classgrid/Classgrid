import Link from "next/link";
import { ArrowRight, MessageSquareText } from "lucide-react";
import { Reveal } from "@/components/sections/Reveal";
import { SolutionPanel } from "@/components/sections/solution-page/SolutionPanel";
import { cn } from "@/lib/utils";
import type { SolutionFeature } from "@/content/solutions/types";

const SECTION = "bg-background text-[#0d0d0d] dark:bg-black dark:text-white";
const H2 = "text-balance text-4xl font-medium leading-[1.08] tracking-[-0.035em] md:text-5xl lg:text-[56px]";
const BODY = "text-pretty text-lg leading-8 text-black/75 md:text-[21px] md:leading-[1.65] dark:text-white/70";

export function SolutionFeatures({ features }: { features: SolutionFeature[] }) {
  return (
    <section className={SECTION}>
      <div className="mx-auto max-w-[1728px] space-y-24 px-5 pb-24 md:space-y-32 md:px-10 md:pb-32 lg:pb-40">
        {features.map((feature, index) => {
          const flip = index % 2 === 1;
          return (
            <div key={feature.title} className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
              <Reveal className={cn("lg:col-span-4", flip && "lg:order-2")}>
                <h3 className="text-balance text-3xl font-medium leading-[1.12] tracking-[-0.03em] md:text-[44px]">
                  {feature.title}
                </h3>
                <p className={cn("mt-6 max-w-xl", BODY)}>{feature.text}</p>
              </Reveal>
              <Reveal delay={0.1} className={cn("lg:col-span-8", flip && "lg:order-1")}>
                <SolutionPanel visual={feature.visual} flip={flip} />
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export type PluginLogo = { logoUrl: string; invertInDark?: boolean | null };

export function SolutionPlugins({
  heading,
  plugins,
  logos,
}: {
  heading: string;
  plugins: { name: string; line: string }[];
  logos: Record<string, PluginLogo>;
}) {
  if (!plugins.length) return null;
  return (
    <section className={SECTION}>
      <div className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10 md:pb-32 lg:pb-40">
        <Reveal className="mx-auto max-w-[60rem] text-center">
          <h2 className={H2}>{heading}</h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 md:mt-16">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {plugins.map((plugin) => {
              const logo = logos[plugin.name.toLowerCase()];
              return (
                <li
                  key={plugin.name}
                  className="flex items-start gap-4 rounded-2xl border border-black/10 p-5 dark:border-white/10 dark:bg-[#0f0f0f]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white ring-1 ring-black/5 dark:bg-black dark:ring-white/10">
                    {logo ? (
                      <img
                        src={logo.logoUrl}
                        alt=""
                        loading="lazy"
                        className={cn("h-7 w-7 object-contain", logo.invertInDark && "dark:invert")}
                      />
                    ) : (
                      <span className="text-[15px] font-semibold">{plugin.name.charAt(0)}</span>
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[16px] font-medium">{plugin.name}</span>
                    <span className="mt-1 block text-[14px] leading-6 text-black/60 dark:text-white/60">{plugin.line}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 text-center">
          <Link
            href="/plugins"
            className="inline-block border-b border-current pb-1 text-lg font-medium transition-opacity hover:opacity-70 md:text-xl"
          >
            See all plugins
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

const CHAT_APP_URL = "https://chat.classgrid.in";

export function SolutionTasks({ heading, tasks }: { heading: string; tasks: string[] }) {
  if (!tasks.length) return null;
  return (
    <section className={SECTION}>
      <div className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10 md:pb-32 lg:pb-40">
        <Reveal className="mx-auto max-w-[60rem] text-center">
          <h2 className={H2}>{heading}</h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 md:mt-16">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tasks.map((task) => (
              <li key={task}>
                <a
                  href={CHAT_APP_URL}
                  className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-black/10 p-5 transition-colors hover:bg-black/[0.03] dark:border-white/10 dark:bg-[#0f0f0f] dark:hover:bg-white/[0.06]"
                >
                  <MessageSquareText className="h-5 w-5 text-black/40 dark:text-white/40" />
                  <span className="text-[16px] font-medium leading-6">{task}</span>
                  <span className="inline-flex items-center gap-1 text-[14px] text-black/50 transition-colors group-hover:text-black dark:text-white/50 dark:group-hover:text-white">
                    Try it
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function SolutionPlainEnglish({ heading, paragraphs }: { heading: string; paragraphs: string[] }) {
  if (!paragraphs.length) return null;
  return (
    <section className={SECTION}>
      <div className="mx-auto max-w-[1520px] px-5 pb-24 md:px-10 md:pb-32 lg:pb-40">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <h2 className={cn(H2, "lg:sticky lg:top-28")}>{heading}</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <div className="space-y-6">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className={BODY}>
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
