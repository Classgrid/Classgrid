"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlarmClock,
  ArrowRight,
  BarChart3,
  Bot,
  Code2,
  FileText,
  LayoutGrid,
  Mail,
  Megaphone,
  MessagesSquare,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type SolutionNavItem = { slug: string; label: string; group: "product" | "useCase" };
export type TocItem = { id: string; label: string };

const ICONS: Record<string, LucideIcon> = {
  "agent-mode": Bot,
  "project-mode": Code2,
  grids: MessagesSquare,
  "whatsapp-calls": Phone,
  "email-and-calendar": Mail,
  "documents-and-files": FileText,
  "content-and-social": Megaphone,
  "reminders-and-automation": AlarmClock,
  research: BarChart3,
};

const GROUPS: { key: SolutionNavItem["group"]; title: string }[] = [
  { key: "product", title: "Products" },
  { key: "useCase", title: "Use cases" },
];

const RELATED = [
  { label: "All plugins", href: "/plugins" },
  { label: "Documentation", href: "/docs" },
  { label: "Pricing", href: "/pricing" },
];

function NavLink({ item, active }: { item: { href: string; label: string; icon: LucideIcon }; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={cn(
        "group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-colors",
        active ? "bg-foreground/5 font-semibold text-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
    >
      <Icon
        className={cn(
          "h-3.5 w-3.5 shrink-0 transition-colors",
          active ? "text-foreground" : "text-muted-foreground/60 group-hover:text-foreground"
        )}
      />
      {item.label}
    </Link>
  );
}

// Old Solutions page layout (side menu · reading column · "On this page"), now for the Classgrid AI pages
export function SolutionDocShell({
  nav,
  toc,
  children,
}: {
  nav: SolutionNavItem[];
  toc: TocItem[];
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState(toc[0]?.id ?? "");

  useEffect(() => {
    if (!toc.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px" }
    );
    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [toc]);

  const allItem = { href: "/solutions", label: "All solutions", icon: LayoutGrid };

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-black">
      {/* Phones: the side menu becomes a row of links */}
      <div className="border-b border-border/60 px-4 py-3 lg:hidden">
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
          {[{ slug: "", label: "All" }, ...nav].map((item) => {
            const href = item.slug ? `/solutions/${item.slug}` : "/solutions";
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-[13px] transition-colors",
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1400px] items-start">
        {/* Left side menu */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 overflow-y-auto border-r border-border/60 lg:block">
          <nav className="space-y-7 px-4 py-6 text-sm">
            <ul>
              <li>
                <NavLink item={allItem} active={pathname === "/solutions"} />
              </li>
            </ul>
            {GROUPS.map((group) => {
              const items = nav.filter((item) => item.group === group.key);
              if (!items.length) return null;
              return (
                <div key={group.key}>
                  <p className="mb-3 px-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    {group.title}
                  </p>
                  <ul className="space-y-1">
                    {items.map((item) => {
                      const href = `/solutions/${item.slug}`;
                      return (
                        <li key={item.slug}>
                          <NavLink
                            item={{ href, label: item.label, icon: ICONS[item.slug] ?? FileText }}
                            active={pathname === href}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Reading column */}
        <div className="flex min-w-0 flex-1 justify-center px-5 py-10 md:px-10 lg:px-14 xl:px-16">
          <div className="w-full max-w-[760px]">{children}</div>
        </div>

        {/* On this page */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-56 shrink-0 overflow-y-auto border-l border-border/60 px-5 py-10 xl:block">
          {toc.length > 0 ? (
            <>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/80">On this page</p>
              <ul className="space-y-1">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={cn(
                        "block rounded-md px-2.5 py-1.5 text-[13px] transition-all duration-200",
                        activeId === item.id
                          ? "bg-foreground/5 font-semibold text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <hr className="my-6 border-border/60" />
            </>
          ) : null}

          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Related</p>
          <ul className="space-y-2 text-[13px]">
            {RELATED.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground">
                  <ArrowRight className="h-3 w-3 shrink-0" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
