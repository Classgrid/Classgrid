"use client";

import Link from "next/link";
import { ArrowRight, Building2, GraduationCap, School, Target, UserRound, Users, Waypoints } from "lucide-react";
import { getIndustrySolutionPath, getRoleSolutionPath } from "@/lib/route-maps";
import { SectionAccentBar } from "@/components/ui/section-accent-bar";

const industryCards = [
  {
    title: "Agent mode",
    description: "Your AI agent that researches, reads your files, makes documents and keeps working in the background.",
    href: "/solutions/for-schools",
    exploreHref: "/solutions/for-schools",
    icon: School,
    color: "from-foreground/5",
    glow: "hover:shadow-black/10 dark:hover:shadow-white/10",
  },
  {
    title: "Grids",
    description: "Chats, groups and polls with your AI next to them, plus one AI chat shared by up to 4 people.",
    href: "/solutions/for-colleges",
    exploreHref: "/solutions/for-colleges",
    icon: GraduationCap,
    color: "from-sky-500/10",
    glow: "hover:shadow-sky-500/10",
  },
  {
    title: "Project Mode",
    description: "A full code editor in your browser with an agent that edits, runs and opens pull requests on GitHub.",
    href: "/solutions/for-engineering",
    exploreHref: "/solutions/for-engineering",
    icon: Building2,
    color: "from-violet-500/10",
    glow: "hover:shadow-violet-500/10",
  },
  {
    title: "Research & data",
    description: "Answers with real sources, clean spreadsheets, charts and PDF reports made for you.",
    href: "/solutions/for-coaching",
    exploreHref: "/solutions/for-coaching",
    icon: Target,
    color: "from-orange-500/10",
    glow: "hover:shadow-orange-500/10",
  },
];

const roleCards = [
  {
    title: "Documents & files",
    description: "Read any file, get notes and summaries, and make Word, PowerPoint, Excel and PDF files.",
    href: "/solutions/for-students",
    exploreHref: "/solutions/for-students",
    icon: UserRound,
    color: "from-foreground/5",
    glow: "hover:shadow-black/10 dark:hover:shadow-white/10",
    highlight: true,
  },
  {
    title: "Reminders & automation",
    description: "Reminders by email and WhatsApp, long tasks that run in the background, and work you hand off by email.",
    href: "/solutions/for-teachers",
    exploreHref: "/solutions/for-teachers",
    icon: Users,
    color: "from-blue-500/10",
    glow: "hover:shadow-blue-500/10",
  },
  {
    title: "Email & calendar",
    description: "Read and send emails, see your day, add events and hand work to your agent.",
    href: "/solutions/for-admins",
    exploreHref: "/solutions/for-admins",
    icon: Waypoints,
    color: "from-purple-500/10",
    glow: "hover:shadow-purple-500/10",
  },
];

export function SolutionsPortal() {
  return (
    <main className="relative min-h-screen bg-background px-4 pb-20 pt-28 text-foreground md:pt-36 overflow-hidden">
      {/* Faint dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <section className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <SectionAccentBar className="mb-4" />
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-foreground">
            Solutions
          </p>
          <h1 className="mt-4 text-balance text-4xl font-black tracking-tight text-foreground md:text-6xl">
            What you can do with Classgrid AI
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Explore the agent, the code editor, group chats and WhatsApp calls, and the everyday work they take off your hands.
          </p>
        </div>

        {/* Two panels */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">

          {/* ── For Institutions ── */}
          <section className="group/panel relative overflow-hidden rounded-[28px] border border-border/60 bg-card p-8 shadow-sm ring-1 ring-white/5 transition hover:border-border">
            {/* Panel label */}
            <div className="mb-6 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-foreground" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">
                Classgrid AI
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {industryCards.map((card) => {
                const Icon = card.icon;
                return (
                  <Link
                    key={card.title}
                    href={card.href}
                    className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-background/60 p-5 transition-all duration-300
                      hover:-translate-y-1.5 hover:border-foreground/30 hover:shadow-xl hover:shadow-black/5 ${card.glow}`}
                  >
                    {/* Hover glow gradient */}
                    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.color} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-2xl`} />

                    {/* Icon */}
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5 text-foreground transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Text */}
                    <h2 className="relative mt-4 text-[19px] font-bold tracking-tight text-foreground">
                      {card.title}
                    </h2>
                    <p className="relative mt-2 flex-1 text-[13px] leading-6 text-muted-foreground">
                      {card.description}
                    </p>

                    {/* Explore link */}
                    <div className="relative mt-4 flex items-center gap-1 text-[12px] font-semibold text-foreground opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5">
                      Explore <ArrowRight className="h-3 w-3" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* ── For Users ── */}
          <section className="group/panel relative overflow-hidden rounded-[28px] border border-border/60 bg-card p-8 shadow-sm ring-1 ring-white/5 transition hover:border-border">
            {/* Panel label */}
            <div className="mb-6 flex items-center gap-2">
              <UserRound className="h-4 w-4 text-foreground" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">
                Use cases
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 auto-rows-fr">
              {roleCards.map((card, idx) => {
                const Icon = card.icon;
                // Make Students span full width on sm+ since it's the primary user
                const isWide = idx === 0;
                return (
                  <Link
                    key={card.title}
                    href={card.href}
                    className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-background/60 p-5 transition-all duration-300
                      hover:-translate-y-1.5 hover:shadow-xl ${card.glow}
                      ${isWide ? "sm:col-span-2 border-foreground/20" : "border-border hover:border-foreground/30"}`}
                  >
                    {/* Hover glow gradient */}
                    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.color} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-2xl`} />

                    {/* Active glow for Students (primary) */}
                    {isWide && (
                      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/5 to-transparent" />
                    )}

                    <div className="relative flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground/5 text-foreground transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-[19px] font-bold tracking-tight text-foreground">
                          {card.title}
                        </h2>
                        <p className="mt-1.5 text-[13px] leading-6 text-muted-foreground">
                          {card.description}
                        </p>
                      </div>
                    </div>

                    {/* Explore link */}
                    <div className="relative mt-4 flex items-center gap-1 text-[12px] font-semibold text-foreground opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5">
                      Explore <ArrowRight className="h-3 w-3" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>

        {/* Bottom CTA — Explore 25+ modules */}
        <div className="mt-12 text-center">
          <Link
            href="/plugins"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-foreground/40 bg-transparent px-8 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-foreground hover:bg-foreground/5 hover:text-foreground hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-white/10"
          >
            {/* Shimmer sweep */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">Explore all plugins</span>
            <ArrowRight className="relative h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
