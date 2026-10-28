import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/sections/Reveal";
import { AgentFinalCtaSection } from "@/components/sections/agent/AgentFinalCtaSection";
import type { SolutionPageContent } from "@/content/solutions/types";

const GROUPS: { key: SolutionPageContent["menuGroup"]; title: string }[] = [
  { key: "product", title: "Products" },
  { key: "useCase", title: "Use cases" },
];

export function SolutionsIndexView({ pages }: { pages: SolutionPageContent[] }) {
  return (
    <div className="bg-background text-[#0d0d0d] dark:bg-black dark:text-white">
      <section className="mx-auto max-w-[1400px] px-5 pb-16 pt-20 md:px-10 md:pb-20 md:pt-28">
        <Reveal className="mx-auto max-w-[68rem] text-center">
          <h1 className="text-balance text-[44px] font-medium leading-[1.05] tracking-[-0.035em] sm:text-6xl lg:text-[72px]">
            Solutions
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg leading-8 text-black/80 md:mt-8 md:text-[21px] md:leading-[1.65] dark:text-white/75">
            See what Classgrid AI can do: the agent, the code editor, group chats and WhatsApp calls, and the everyday
            work they take off your hands.
          </p>
        </Reveal>

        {GROUPS.map((group, groupIndex) => {
          const items = pages.filter((page) => page.menuGroup === group.key);
          if (!items.length) return null;
          return (
            <Reveal key={group.key} delay={0.05 * (groupIndex + 1)} className="mt-16 md:mt-24">
              <h2 className="text-2xl font-medium tracking-[-0.02em] md:text-[32px]">{group.title}</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/solutions/${page.slug}`}
                      className="group flex h-full flex-col justify-between gap-8 rounded-2xl border border-black/10 p-6 transition-colors hover:bg-black/[0.03] md:p-7 dark:border-white/10 dark:bg-[#0f0f0f] dark:hover:bg-white/[0.06]"
                    >
                      <span>
                        <span className="block text-[13px] font-medium uppercase tracking-wider text-black/45 dark:text-white/45">
                          {page.menuLabel}
                        </span>
                        <span className="mt-3 block text-2xl font-medium leading-tight tracking-[-0.02em] md:text-[28px]">
                          {page.headline}
                        </span>
                        <span className="mt-3 block text-[16px] leading-7 text-black/65 dark:text-white/65">
                          {page.subheadline}
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[15px] font-medium">
                        Explore
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </section>

      <AgentFinalCtaSection />
    </div>
  );
}
