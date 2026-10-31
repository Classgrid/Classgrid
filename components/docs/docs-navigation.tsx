"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Docs navigation order — keep in sync with docs-sidebar.tsx
const DOCS_NAV_ORDER = [
  { slug: "introduction", title: "Introduction", category: "Getting Started" },
  { slug: "quickstart", title: "Quickstart", category: "Getting Started" },
  { slug: "verify-whatsapp", title: "Verify Your WhatsApp", category: "Getting Started" },
  { slug: "choose-a-model", title: "Choose a Model", category: "Getting Started" },
  { slug: "agent-mode", title: "Agent Mode", category: "Agent mode" },
  { slug: "web-research", title: "Web Research", category: "Agent mode" },
  { slug: "files-and-documents", title: "Files and Documents", category: "Agent mode" },
  { slug: "images", title: "Images", category: "Agent mode" },
  { slug: "code-and-data", title: "Code and Data", category: "Agent mode" },
  { slug: "publish-a-website", title: "Publish a Website", category: "Agent mode" },
  { slug: "answer-cards", title: "Answer Cards", category: "Agent mode" },
  { slug: "schedules-and-reminders", title: "Schedules and Reminders", category: "Agent mode" },
  { slug: "long-tasks", title: "Long Tasks", category: "Agent mode" },
  { slug: "email-the-agent", title: "Email the Agent", category: "Agent mode" },
  { slug: "library", title: "Library", category: "Agent mode" },
  { slug: "skills-and-custom-instructions", title: "Skills and Custom Instructions", category: "Agent mode" },
  { slug: "incognito", title: "Incognito", category: "Agent mode" },
  { slug: "project-mode", title: "Project Mode", category: "Project Mode" },
  { slug: "connect-github", title: "Connect GitHub", category: "Project Mode" },
  { slug: "working-with-the-agent", title: "Working with the Agent", category: "Project Mode" },
  { slug: "review-and-undo", title: "Review and Undo", category: "Project Mode" },
  { slug: "pull-requests-and-backups", title: "Pull Requests and Backups", category: "Project Mode" },
  { slug: "deploy-with-vercel", title: "Deploy with Vercel", category: "Project Mode" },
  { slug: "studio-mode", title: "Studio Mode", category: "Studio Mode" },
  { slug: "studio-tabs", title: "Studio Tabs", category: "Studio Mode" },
  { slug: "studio-live-browser", title: "The Live Browser", category: "Studio Mode" },
  { slug: "studio-permissions", title: "Permissions", category: "Studio Mode" },
  { slug: "studio-review-changes", title: "Review Changes", category: "Studio Mode" },
  { slug: "studio-browser-helpers", title: "Helpers and the Scratchpad", category: "Studio Mode" },
  { slug: "grids", title: "Grids", category: "Grids" },
  { slug: "groups-and-permissions", title: "Groups and Permissions", category: "Grids" },
  { slug: "polls-and-message-options", title: "Polls and Message Options", category: "Grids" },
  { slug: "ai-in-grids", title: "AI in Grids", category: "Grids" },
  { slug: "share-grid", title: "Share Grid", category: "Grids" },
  { slug: "share-links", title: "Share Links", category: "Grids" },
  { slug: "whatsapp-calls", title: "Call Classgrid AI on WhatsApp", category: "WhatsApp" },
  { slug: "whatsapp-messages", title: "WhatsApp Messages", category: "WhatsApp" },
  { slug: "plugins", title: "Plugins", category: "Plugins" },
  { slug: "connect-and-disconnect-apps", title: "Connect and Disconnect Apps", category: "Plugins" },
  { slug: "credits-and-top-ups", title: "Credits and Top Ups", category: "Account" },
  { slug: "privacy-and-data", title: "Privacy and Your Data", category: "Account" },
];

export function DocsNavigation() {
  const pathname = usePathname();
  const currentSlug = pathname?.replace(/^\/docs\/?/, "") || "introduction";

  const currentIndex = DOCS_NAV_ORDER.findIndex((item) => item.slug === currentSlug);
  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? DOCS_NAV_ORDER[currentIndex - 1] : null;
  const next = currentIndex < DOCS_NAV_ORDER.length - 1 ? DOCS_NAV_ORDER[currentIndex + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav className="mt-16 pt-8 border-t border-white/[0.08] hidden sm:block">
      <div className="flex items-center justify-between">
        {/* Previous */}
        {prev ? (
          <Link
            href={`/docs/${prev.slug}`}
            className="group flex items-center gap-2 text-sm text-slate-600 dark:text-zinc-400 transition-colors hover:text-slate-900 dark:hover:text-white"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <div>
              <div className="text-[11px] text-slate-500 dark:text-zinc-500 mb-0.5">Previous</div>
              <div className="font-medium">
                {prev.category !== DOCS_NAV_ORDER[currentIndex]?.category && (
                  <span className="text-slate-500 dark:text-zinc-500">{prev.category} / </span>
                )}
                {prev.title}
              </div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {/* Next */}
        {next ? (
          <Link
            href={`/docs/${next.slug}`}
            className="group flex items-center gap-2 text-sm text-slate-600 dark:text-zinc-400 transition-colors hover:text-slate-900 dark:hover:text-white text-right"
          >
            <div>
              <div className="text-[11px] text-slate-500 dark:text-zinc-500 mb-0.5">Next</div>
              <div className="font-medium">
                {next.title}
                {next.category !== DOCS_NAV_ORDER[currentIndex]?.category && (
                  <span className="text-slate-500 dark:text-zinc-500"> / {next.category}</span>
                )}
              </div>
            </div>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
