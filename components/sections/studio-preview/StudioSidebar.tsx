"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Calendar,
  ChevronDown,
  ChevronsUpDown,
  Shield,
  Folder,
  Library,
  Phone,
  Users,
  Plus,
  Search,
  SquarePen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ClassgridLogoIcon } from "./ClassgridLogoIcon";
import { MASTERO_FOLDERS, PROJECT_FOLDERS, type SidebarFolder } from "./data";

const NAV = [
  { label: "New Chat", Icon: SquarePen },
  { label: "Schedule", Icon: Calendar },
  { label: "Library", Icon: Library },
  { label: "Calls", Icon: Phone },
  { label: "Grids", Icon: ClassgridLogoIcon },
  { label: "Requests", Icon: Users },
  { label: "Audit Logs", Icon: Shield },
];

function MasteroMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
      <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      <path d="M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1" />
      <path d="M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1" />
    </svg>
  );
}

function FolderBlock({ folder }: { folder: SidebarFolder }) {
  const [open, setOpen] = useState(folder.open);
  return (
    <div className="mb-1">
      <div className="group/fld relative flex items-center">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "flex h-8 min-w-0 flex-1 items-center gap-2.5 rounded-md pl-2 pr-14 text-[13.5px] transition-colors hover:bg-[#ececec] dark:hover:bg-[#262626]",
            open ? "text-[#0d0d0d] dark:text-[#ececec]" : "text-black/55 dark:text-white/55",
          )}
        >
          <Folder className="h-4 w-4 shrink-0" strokeWidth={2} />
          <span className="truncate uppercase">{folder.name}</span>
        </button>
        <div className="absolute right-1 flex items-center">
          <span className="rounded p-1 text-black/55 opacity-0 transition-opacity group-hover/fld:opacity-100 dark:text-white/55">
            <Plus className="h-3.5 w-3.5" />
          </span>
          <button type="button" onClick={() => setOpen((v) => !v)} className="rounded p-1 text-black/55 dark:text-white/55" aria-label="Open or close project">
            <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", !open && "-rotate-90")} />
          </button>
        </div>
      </div>
      {open && (
        <div className="mt-0.5 pl-4">
          {folder.chats.map((c) => (
            <div
              key={c.title}
              className={cn(
                "flex h-8 cursor-pointer items-center gap-2 rounded-md px-2 text-[13.5px] transition-colors",
                c.active
                  ? "bg-[#ececec] text-[#0d0d0d] dark:bg-[#262626] dark:text-[#ececec]"
                  : "text-black/70 hover:bg-[#ececec] dark:text-white/70 dark:hover:bg-[#262626]",
              )}
            >
              <span className="min-w-0 flex-1 truncate">{c.title}</span>
              <span className="shrink-0 text-[11.5px] text-black/40 dark:text-white/40">{c.time}</span>
            </div>
          ))}
          {folder.more ? (
            <div className="cursor-pointer rounded-md px-2 py-1.5 text-xs font-medium text-black/50 transition-colors hover:bg-[#ececec] hover:text-black/80 dark:text-white/50 dark:hover:bg-[#262626] dark:hover:text-white/80">
              Show {folder.more} more
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export function StudioSidebar({ className }: { className?: string }) {
  return (
    <aside className={cn("flex w-[248px] shrink-0 flex-col border-r border-black/[0.08] bg-[#f7f7f7] text-[#0d0d0d] dark:border-white/[0.08] dark:bg-[#181818] dark:text-[#ececec]", className)}>
      {/* Real Studio header: big name, then back, forward, search and the collapse icon (no logo) */}
      <div className="flex h-14 items-center gap-0.5 px-4 pt-1">
        <span className="mr-auto text-[24px] font-semibold tracking-tight">Classgrid</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-md text-black/70 hover:bg-[#ececec] dark:text-white/70 dark:hover:bg-[#262626]">
          <ArrowLeft className="h-4 w-4" />
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-md text-black/30 dark:text-white/30">
          <ArrowRight className="h-4 w-4" />
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-md text-black/70 hover:bg-[#ececec] dark:text-white/70 dark:hover:bg-[#262626]">
          <Search className="h-4 w-4" />
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-md text-black/70 hover:bg-[#ececec] dark:text-white/70 dark:hover:bg-[#262626]">
          <ChevronsUpDown className="h-4 w-4" />
        </span>
      </div>

      {/* Real Studio rows: New Chat, Schedule, Library, Calls, Grids, Requests, Audit Logs (Search is in the header) */}
      <div className="border-b border-black/[0.08] px-2 pb-2 pt-1 dark:border-white/[0.08]">
        {NAV.map(({ label, Icon }) => (
          <div key={label} className="flex h-8 cursor-pointer items-center gap-3 rounded-sm p-2 text-sm text-black/80 transition-colors hover:bg-[#ececec] dark:text-white/80 dark:hover:bg-[#262626]">
            <Icon size={20} className="shrink-0 text-black/60 dark:text-white/60" />
            <span className="truncate">{label}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 min-h-0 flex-1 overflow-y-auto px-2 [scrollbar-width:none]">
        <div className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium text-black/45 dark:text-white/45">
          <MasteroMark className="h-3.5 w-3.5" /> Mastero projects
        </div>
        <div className="pt-1">
          {MASTERO_FOLDERS.map((f) => (
            <FolderBlock key={f.name} folder={f} />
          ))}
        </div>
        <div className="mt-2 px-2 py-1.5 text-xs font-medium text-black/45 dark:text-white/45">Projects</div>
        {PROJECT_FOLDERS.map((f) => (
          <FolderBlock key={f.name} folder={f} />
        ))}
      </div>

      {/* User row */}
      <div className="flex items-center gap-2.5 border-t border-black/[0.08] p-3 dark:border-white/[0.08]">
        <img src="/logo.png" alt="" className="h-5 w-5 shrink-0 object-contain" />
        <span className="min-w-0 flex-1 truncate text-[13px] font-semibold">Classgrid</span>
        <Bell className="h-4 w-4 text-black/55 dark:text-white/55" />
      </div>
    </aside>
  );
}
