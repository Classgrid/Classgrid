"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Calendar,
  ChevronDown,
  FileBarChart,
  Folder,
  Inbox,
  Library,
  MessagesSquare,
  Plus,
  Search,
  SquarePen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MASTERO_FOLDERS, PROJECT_FOLDERS, type SidebarFolder } from "./data";

const NAV = [
  { label: "New Chat", Icon: SquarePen },
  { label: "Schedule", Icon: Calendar },
  { label: "Library", Icon: Library },
  { label: "Grids", Icon: MessagesSquare },
  { label: "Requests", Icon: Inbox },
  { label: "Audit Logs", Icon: FileBarChart },
];

function MasteroMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden>
      <rect x="1" y="1" width="14" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 11V5.2l3.5 3.6 3.5-3.6V11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
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
            "flex h-8 min-w-0 flex-1 items-center gap-2.5 rounded-md pl-2 pr-14 text-[13.5px] transition-colors hover:bg-[#262626]",
            open ? "text-[#ececec]" : "text-white/55",
          )}
        >
          <Folder className="h-4 w-4 shrink-0" strokeWidth={2} />
          <span className="truncate">{folder.name}</span>
        </button>
        <div className="absolute right-1 flex items-center">
          <span className="rounded p-1 text-white/55 opacity-0 transition-opacity group-hover/fld:opacity-100">
            <Plus className="h-3.5 w-3.5" />
          </span>
          <button type="button" onClick={() => setOpen((v) => !v)} className="rounded p-1 text-white/55" aria-label="Open or close project">
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
                c.active ? "bg-[#262626] text-[#ececec]" : "text-white/70 hover:bg-[#262626]",
              )}
            >
              <span className="min-w-0 flex-1 truncate">{c.title}</span>
              <span className="shrink-0 text-[11.5px] text-white/40">{c.time}</span>
            </div>
          ))}
          {folder.more ? (
            <div className="cursor-pointer rounded-md px-2 py-1.5 text-xs font-medium text-white/50 transition-colors hover:bg-[#262626] hover:text-white/80">
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
    <aside className={cn("flex w-[248px] shrink-0 flex-col border-r border-white/[0.08] bg-[#181818] text-[#ececec]", className)}>
      {/* Name (the desktop shows only the name) with back / forward */}
      <div className="flex h-12 items-center gap-1 px-3">
        <span className="flex-1 text-[15px] font-semibold tracking-tight">Classgrid</span>
        <span className="flex h-7 w-7 items-center justify-center rounded-md text-white/55 hover:bg-[#262626]">
          <ArrowLeft className="h-4 w-4" />
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-md text-white/30">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>

      <div className="px-2">
        <div className="mb-1 flex h-8 items-center gap-2.5 rounded-md px-2 text-[13.5px] text-white/55 hover:bg-[#262626]">
          <Search className="h-4 w-4" />
          <span className="flex-1">Search</span>
          <kbd className="rounded border border-white/10 px-1 text-[10px] text-white/40">Ctrl K</kbd>
        </div>
        {NAV.map(({ label, Icon }) => (
          <div key={label} className="flex h-8 cursor-pointer items-center gap-2.5 rounded-md px-2 text-[13.5px] text-white/80 transition-colors hover:bg-[#262626]">
            <Icon className="h-4 w-4 text-white/60" />
            {label}
          </div>
        ))}
      </div>

      <div className="mt-4 min-h-0 flex-1 overflow-y-auto px-2 [scrollbar-width:none]">
        <div className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium text-white/45">
          <MasteroMark className="h-3.5 w-3.5" /> Mastero projects
        </div>
        <div className="pt-1">
          {MASTERO_FOLDERS.map((f) => (
            <FolderBlock key={f.name} folder={f} />
          ))}
        </div>
        <div className="mt-2 px-2 py-1.5 text-xs font-medium text-white/45">Projects</div>
        {PROJECT_FOLDERS.map((f) => (
          <FolderBlock key={f.name} folder={f} />
        ))}
      </div>

      {/* User row */}
      <div className="flex items-center gap-2.5 border-t border-white/[0.08] p-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f97316] text-[12px] font-semibold text-white">D</span>
        <span className="min-w-0 flex-1 truncate text-[13.5px] font-medium">Demo User</span>
        <Bell className="h-4 w-4 text-white/55" />
      </div>
    </aside>
  );
}
