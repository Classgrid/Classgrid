"use client";

import {
  ChevronDown,
  ChevronRight,
  FileCode2,
  Folder,
  FolderOpen,
  Globe,
  Lock,
  Maximize2,
  PanelRightClose,
  Plus,
  RotateCw,
  Terminal,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CODE, PROJECT, TERMINAL, TREE } from "./data";

export type WorkspaceTab = "files" | "terminal" | "browser";

const TABS: { kind: WorkspaceTab; label: string; Icon: typeof Globe }[] = [
  { kind: "files", label: "Files", Icon: FolderOpen },
  { kind: "terminal", label: "Terminal", Icon: Terminal },
  { kind: "browser", label: "Browser", Icon: Globe },
];

const iconBtn = "flex h-8 w-8 items-center justify-center rounded-md text-white/55 transition-colors hover:bg-[#262626] hover:text-white";

function FilesView() {
  return (
    <div className="flex min-h-0 flex-1">
      <div className="hidden w-44 shrink-0 overflow-y-auto border-r border-white/[0.08] py-2 sm:block">
        <div className="px-3 pb-2 text-[11px] font-medium uppercase tracking-wider text-white/40">{PROJECT}</div>
        {TREE.map((r) => (
          <div
            key={`${r.depth}-${r.name}`}
            style={{ paddingLeft: 10 + r.depth * 14 }}
            className={cn(
              "flex h-7 items-center gap-1.5 pr-2 text-[12.5px]",
              r.active ? "bg-[#262626] text-white" : "text-white/70 hover:bg-white/[0.04]",
            )}
          >
            {r.dir ? (
              <>
                {r.open ? <ChevronDown className="h-3 w-3 text-white/40" /> : <ChevronRight className="h-3 w-3 text-white/40" />}
                <Folder className="h-3.5 w-3.5 text-white/50" />
              </>
            ) : (
              <FileCode2 className="ml-[18px] h-3.5 w-3.5 text-[#61afef]/80" />
            )}
            <span className="min-w-0 flex-1 truncate">{r.name}</span>
            {r.badge && <span className={cn("text-[10.5px] font-semibold", r.badge === "A" ? "text-emerald-400" : "text-amber-400")}>{r.badge}</span>}
          </div>
        ))}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-9 shrink-0 items-center gap-2 border-b border-white/[0.08] px-3 text-[12px] text-white/55">
          <span>components</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white/85">Pricing.tsx</span>
          <span className="ml-auto text-emerald-400">+42</span>
        </div>
        <pre className="min-h-0 flex-1 overflow-auto py-2 font-mono text-[12px] leading-[1.7] text-[#abb2bf]">
          {CODE.map((line, i) => (
            <div key={i} className={cn("flex pr-4", i >= 6 && i <= 15 && "bg-emerald-500/[0.07]")}>
              <span className="w-10 shrink-0 select-none pr-3 text-right text-white/25">{i + 1}</span>
              <code className="whitespace-pre">
                {line.map(([t, c], j) => (
                  <span key={j} className={c}>
                    {t}
                  </span>
                ))}
              </code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

function TerminalView() {
  return (
    <div className="min-h-0 flex-1 overflow-auto bg-[#121212] p-4 font-mono text-[12px] leading-[1.7]">
      {TERMINAL.map((l, i) => (
        <div
          key={i}
          className={cn(
            "whitespace-pre",
            l.tone === "cmd" && "text-white",
            l.tone === "ok" && "text-emerald-400",
            l.tone === "dim" && "text-white/40",
            !l.tone && "text-white/75",
          )}
        >
          {l.text || " "}
        </div>
      ))}
      <div className="mt-1 flex items-center text-white">
        PS C:\projects\test-project&gt; <span className="ml-1 inline-block h-3.5 w-1.5 animate-pulse bg-white/70" />
      </div>
    </div>
  );
}

const PLANS = [
  { name: "Starter", price: "Free", items: ["1 project", "Community help"] },
  { name: "Pro", price: "₹499", items: ["10 projects", "Email support", "Custom domain"], featured: true },
  { name: "Team", price: "₹1,999", items: ["Unlimited projects", "Shared workspace"] },
];

function BrowserView() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-white/[0.08] px-3">
        <RotateCw className="h-3.5 w-3.5 text-white/50" />
        <div className="flex h-7 flex-1 items-center gap-2 rounded-md bg-[#262626] px-2.5 text-[12px] text-white/70">
          <Lock className="h-3 w-3 text-white/40" />
          localhost:3000/#pricing
        </div>
      </div>
      {/* The page the agent built, as the user sees it in the live browser */}
      <div className="min-h-0 flex-1 overflow-auto bg-white p-5 text-[#0d0d0d]">
        <p className="text-center text-[11px] font-medium uppercase tracking-wider text-black/40">Pricing</p>
        <h4 className="mt-1 text-center text-lg font-semibold tracking-tight">Simple plans for every team</h4>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {PLANS.map((p) => (
            <div key={p.name} className={cn("rounded-xl border p-3", p.featured ? "border-black bg-black text-white" : "border-black/10")}>
              <p className="text-[12px] font-medium opacity-70">{p.name}</p>
              <p className="mt-1 text-xl font-semibold">{p.price}</p>
              <ul className="mt-2 space-y-1 text-[11.5px] opacity-75">
                {p.items.map((it) => (
                  <li key={it}>• {it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StudioWorkspace({
  tab,
  onTab,
  onClose,
  className,
}: {
  tab: WorkspaceTab;
  onTab: (t: WorkspaceTab) => void;
  onClose: () => void;
  className?: string;
}) {
  return (
    <div className={cn("flex min-w-0 flex-col border-l border-white/[0.08] bg-[#181818]", className)}>
      {/* Tab bar */}
      <div className="flex h-12 shrink-0 items-center gap-1 border-b border-white/[0.08] pl-2 pr-2">
        <div className="flex min-w-0 items-center gap-1 overflow-x-auto [scrollbar-width:none]">
          {TABS.map(({ kind, label, Icon }) => {
            const on = tab === kind;
            return (
              <button
                key={kind}
                type="button"
                onClick={() => onTab(kind)}
                className={cn(
                  "group relative flex h-8 shrink-0 items-center gap-1.5 rounded-md pl-2.5 pr-1 text-sm transition-colors",
                  on ? "text-white" : "text-white/55 hover:bg-[#262626]/60 hover:text-white",
                )}
              >
                {on && <span className="absolute inset-0 rounded-md bg-[#262626]" />}
                <Icon className="relative h-4 w-4 shrink-0" />
                <span className="relative">{label}</span>
                <span className={cn("relative flex h-5 w-5 items-center justify-center rounded", on ? "opacity-100" : "opacity-0 group-hover:opacity-100")}>
                  <X className="h-3.5 w-3.5" />
                </span>
              </button>
            );
          })}
          <span className={iconBtn}>
            <Plus className="h-4 w-4" />
          </span>
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-1">
          <span className={cn(iconBtn, "hidden sm:flex")}>
            <Maximize2 className="h-4 w-4" />
          </span>
          <button type="button" onClick={onClose} className={iconBtn} aria-label="Close the workspace">
            <PanelRightClose className="h-4 w-4" />
          </button>
        </div>
      </div>

      {tab === "files" && <FilesView />}
      {tab === "terminal" && <TerminalView />}
      {tab === "browser" && <BrowserView />}
    </div>
  );
}
