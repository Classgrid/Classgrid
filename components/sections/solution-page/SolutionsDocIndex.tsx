"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DocumentHero } from "@/components/ui/DocumentHero";
import { SolutionDocShell, type SolutionNavItem } from "@/components/sections/solution-page/SolutionDocShell";

export type SolutionIndexItem = SolutionNavItem & { headline: string; subheadline: string };

const GROUPS: { key: SolutionNavItem["group"]; id: string; title: string }[] = [
  { key: "product", id: "products", title: "Products" },
  { key: "useCase", id: "use-cases", title: "Use cases" },
];

export function SolutionsDocIndex({ items }: { items: SolutionIndexItem[] }) {
  const toc = GROUPS.filter((group) => items.some((item) => item.group === group.key)).map((group) => ({
    id: group.id,
    label: group.title,
  }));

  return (
    <SolutionDocShell nav={items} toc={toc}>
      <DocumentHero
        badgeLabel="Solutions"
        title="What you can do with Classgrid AI"
        description="The agent, the code editor, group chats and WhatsApp calls, and the everyday work they take off your hands."
        showAccentBar={false}
      />

      <hr className="my-12 border-border/60" />

      {GROUPS.map((group) => {
        const groupItems = items.filter((item) => item.group === group.key);
        if (!groupItems.length) return null;
        return (
          <section key={group.key} id={group.id} className="mb-16 scroll-mt-24">
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">{group.title}</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {groupItems.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/solutions/${item.slug}`}
                    className="group flex h-full flex-col gap-2 rounded-xl border border-border/70 p-5 transition-colors hover:bg-accent dark:bg-[#0f0f0f]"
                  >
                    <span className="flex items-center justify-between gap-3 text-[16px] font-semibold text-foreground">
                      {item.label}
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                    </span>
                    <span className="text-[15px] font-medium text-foreground/85">{item.headline}</span>
                    <span className="text-[14px] leading-6 text-muted-foreground">{item.subheadline}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </SolutionDocShell>
  );
}
