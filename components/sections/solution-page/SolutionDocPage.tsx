"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { DocumentHero } from "@/components/ui/DocumentHero";
import { SolutionDocShell, type SolutionNavItem, type TocItem } from "@/components/sections/solution-page/SolutionDocShell";
import type { PluginLogo } from "@/components/sections/solution-page/SolutionSections";
import type { SolutionPageContent } from "@/content/solutions/types";
import { cn } from "@/lib/utils";

const H2 = "mb-6 scroll-mt-24 text-2xl font-bold tracking-tight text-foreground";
const P = "text-[16px] leading-8 text-foreground/75";

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="border-b border-border/60">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-4 text-left text-[16px] font-medium text-foreground"
      >
        {question}
        <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      {open ? <p className={cn(P, "pb-5")}>{answer}</p> : null}
    </li>
  );
}

// A text page: the plain explanation of what this part of Classgrid AI does, in the old Solutions layout
export function SolutionDocPage({
  page,
  nav,
  logos,
}: {
  page: SolutionPageContent;
  nav: SolutionNavItem[];
  logos: Record<string, PluginLogo>;
}) {
  const toc: TocItem[] = [
    page.plainEnglish.length ? { id: "overview", label: "Overview" } : null,
    page.features.length ? { id: "what-it-can-do", label: "What it can do" } : null,
    page.exampleTasks.length ? { id: "things-to-try", label: "Things to try" } : null,
    page.plugins.length ? { id: "apps", label: "Works with your apps" } : null,
    page.faqs.length ? { id: "faq", label: "FAQ" } : null,
  ].filter((item): item is TocItem => Boolean(item));

  return (
    <SolutionDocShell nav={nav} toc={toc}>
      <DocumentHero badgeLabel={page.menuLabel} title={page.headline} description={page.subheadline} showAccentBar={false}>
        <a
          href={page.primaryCta.href}
          className="inline-flex h-11 items-center gap-1.5 rounded-full bg-foreground px-6 text-[15px] font-medium text-background transition-opacity hover:opacity-85"
        >
          {page.primaryCta.label}
          <ArrowUpRight className="h-4 w-4" />
        </a>
        <Link
          href="/demo"
          className="inline-flex h-11 items-center rounded-full border border-border px-6 text-[15px] font-medium transition-colors hover:bg-accent"
        >
          Book a demo
        </Link>
      </DocumentHero>

      <hr className="my-12 border-border/60" />

      {page.plainEnglish.length ? (
        <section id="overview" className="mb-16 scroll-mt-24">
          <h2 className={H2}>Overview</h2>
          <div className="space-y-5">
            {page.plainEnglish.map((paragraph, index) => (
              <p key={index} className={P}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ) : null}

      {page.features.length ? (
        <section id="what-it-can-do" className="mb-16 scroll-mt-24">
          <h2 className={H2}>What it can do</h2>
          <div className="space-y-8">
            {page.features.map((feature) => (
              <div key={feature.title}>
                <h3 className="text-[19px] font-semibold tracking-tight text-foreground">{feature.title}</h3>
                <p className={cn(P, "mt-2")}>{feature.text}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {page.exampleTasks.length ? (
        <section id="things-to-try" className="mb-16 scroll-mt-24">
          <h2 className={H2}>Things to try</h2>
          <p className={cn(P, "mb-4")}>Type any of these in Classgrid AI:</p>
          <ul className="list-disc space-y-2 pl-6 marker:text-muted-foreground">
            {page.exampleTasks.map((task) => (
              <li key={task} className={P}>
                {task}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {page.plugins.length ? (
        <section id="apps" className="mb-16 scroll-mt-24">
          <h2 className={H2}>Works with your apps</h2>
          <div className="overflow-hidden rounded-xl border border-border/70">
            <table className="w-full text-left text-[15px]">
              <tbody>
                {page.plugins.map((plugin) => {
                  const logo = logos[plugin.name.toLowerCase()];
                  return (
                    <tr key={plugin.name} className="border-b border-border/60 last:border-0">
                      <td className="w-[44%] px-4 py-3">
                        <span className="flex items-center gap-3 font-medium text-foreground">
                          {logo ? (
                            <img
                              src={logo.logoUrl}
                              alt=""
                              loading="lazy"
                              className={cn("h-5 w-5 shrink-0 object-contain", logo.invertInDark && "dark:invert")}
                            />
                          ) : null}
                          {plugin.name}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-foreground/70">{plugin.line}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Link href="/plugins" className="mt-4 inline-flex items-center gap-1 text-[14px] font-medium text-foreground hover:underline">
            See all plugins
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </section>
      ) : null}

      {page.faqs.length ? (
        <section id="faq" className="mb-16 scroll-mt-24">
          <h2 className={H2}>FAQ</h2>
          <ul className="border-t border-border/60">
            {page.faqs.map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </ul>
        </section>
      ) : null}
    </SolutionDocShell>
  );
}
