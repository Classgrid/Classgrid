"use client";

// Studio mode preview: a coded copy of the Classgrid desktop app's Studio mode, built the same way as
// ViewPlatformPreview. It follows the site theme (light and dark). Static demo data only; sending a message
// shows a "This is a preview" answer.
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUp,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Copy,
  FilePlus2,
  FileText,
  Globe,
  Mic,
  Minus,
  MoreVertical,
  PanelLeft,
  PanelRight,
  Paperclip,
  Pencil,
  Share,
  ShieldCheck,
  Square,
  SquareTerminal,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { StudioSidebar } from "./studio-preview/StudioSidebar";
import { StudioWorkspace, type WorkspaceTab } from "./studio-preview/StudioWorkspace";
import { CHAT_TITLE, PROJECT, STEPS } from "./studio-preview/data";

const CHAT_APP_URL = "https://chat.classgrid.in";

const SlidersIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 8h11" />
    <circle cx="16" cy="8" r="2" />
    <path d="M18 8h3" />
    <path d="M3 16h4" />
    <circle cx="9" cy="16" r="2" />
    <path d="M11 16h10" />
  </svg>
);

const CodeMark = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" aria-hidden>
    <rect width="24" height="24" rx="6" fill="#f97316" />
    <path d="M9.4 8.3L5.9 12l3.5 3.7M14.6 8.3l3.5 3.7-3.5 3.7M13.1 7l-2.2 10" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Chip = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded-md bg-black/[0.06] px-1.5 py-0.5 font-mono text-[13px] text-[#c7254e] dark:bg-white/[0.08] dark:text-[#ff7b72]">{children}</code>
);

const STEP_ICON = { Read: FileText, Created: FilePlus2, Edited: Pencil, Ran: SquareTerminal, Opened: Globe } as const;
const iconBtn =
  "flex h-8 w-8 items-center justify-center rounded-md text-black/55 transition-colors hover:bg-black/[0.06] hover:text-black dark:text-white/55 dark:hover:bg-white/10 dark:hover:text-white";
const actBtn =
  "flex h-7 w-7 items-center justify-center rounded-lg text-black/45 transition-colors hover:bg-black/[0.06] hover:text-black dark:text-white/45 dark:hover:bg-white/10 dark:hover:text-white";

function AnswerActions({ time }: { time: string }) {
  return (
    <div className="mt-3 flex items-center gap-1">
      <span className={actBtn} title="Copy"><Copy className="h-3.5 w-3.5" /></span>
      <span className={actBtn} title="Helpful"><ThumbsUp className="h-3.5 w-3.5" /></span>
      <span className={actBtn} title="Share"><Share className="h-3.5 w-3.5" /></span>
      <span className={actBtn} title="Not helpful"><ThumbsDown className="h-3.5 w-3.5" /></span>
      <span className="ml-1.5 text-[12px] text-black/35 dark:text-white/35">{time}</span>
    </div>
  );
}

export function StudioModePreview({ flush = false }: { flush?: boolean } = {}) {
  const [sidebarOpen, setSidebarOpen] = useState(true); // desktop width
  const [mobileSidebar, setMobileSidebar] = useState(false); // phone width
  const [paneOpen, setPaneOpen] = useState(false);
  const [tab, setTab] = useState<WorkspaceTab>("files");
  const [thoughtOpen, setThoughtOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sent, setSent] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sent.length) scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [sent.length]);

  const openTab = (t: WorkspaceTab) => {
    setTab(t);
    setPaneOpen(true);
  };

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;
    setSent((s) => [...s, text]);
    setInput("");
  };

  return (
    <section className="bg-background text-foreground">
      <div className={cn("mx-auto max-w-[1400px] px-4 md:px-6", flush ? "pb-10 md:pb-14" : "py-10 md:py-16")}>
        {/* The window follows the site theme: light in light mode, dark in dark mode */}
        <div className="mx-auto flex h-[620px] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-black/10 bg-white text-[#0d0d0d] shadow-2xl ring-1 ring-black/5 md:h-[700px] dark:border-white/10 dark:bg-[#121212] dark:text-[#ececec]">
          {/* Title bar */}
          <div className="flex h-10 shrink-0 items-center gap-3 border-b border-black/[0.08] bg-[#f7f7f7] pl-3 dark:border-white/[0.08] dark:bg-[#181818]">
            <img src="/logo.png" alt="" className="h-4 w-4 shrink-0 object-contain" />
            <nav className="flex items-center gap-0.5 text-[13px] text-black/65 dark:text-white/65">
              {["File", "Edit", "View", "Help"].map((m) => (
                <span key={m} className="cursor-default rounded px-2 py-1 hover:bg-black/[0.06] hover:text-black dark:hover:bg-white/[0.06] dark:hover:text-white">{m}</span>
              ))}
            </nav>
            <div className="ml-auto flex h-full items-center text-black/60 dark:text-white/60">
              <span className="flex h-full w-11 items-center justify-center hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"><Minus className="h-4 w-4" /></span>
              <span className="flex h-full w-11 items-center justify-center hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"><Square className="h-3 w-3" /></span>
              <span className="flex h-full w-11 items-center justify-center hover:bg-[#e81123] hover:text-white"><X className="h-4 w-4" /></span>
            </div>
          </div>

          <div className="relative flex min-h-0 flex-1">
            {/* Sidebar: in the row on desktop, a drawer on phones */}
            <StudioSidebar className={cn("hidden", sidebarOpen && "lg:flex")} />
            {mobileSidebar && (
              <div className="absolute inset-0 z-30 flex lg:hidden">
                <StudioSidebar className="shadow-2xl" />
                <button type="button" aria-label="Close the sidebar" onClick={() => setMobileSidebar(false)} className="flex-1 bg-black/50" />
              </div>
            )}

            {/* Chat column */}
            <div className="relative flex min-w-0 flex-1 flex-col bg-white dark:bg-[#121212]">
              {/* Top bar: sidebar button, project / chat, menu, Open, panel toggle */}
              <div className="flex h-12 shrink-0 items-center gap-1 px-2">
                <button
                  type="button"
                  onClick={() => (window.innerWidth >= 1024 ? setSidebarOpen((v) => !v) : setMobileSidebar(true))}
                  className={iconBtn}
                  aria-label="Show or hide the sidebar"
                >
                  <PanelLeft className="h-4 w-4" />
                </button>
                <div className="flex min-w-0 items-center gap-0.5">
                  <span className="hidden max-w-[12rem] shrink-0 truncate rounded-md px-1.5 py-0.5 text-[13.5px] uppercase text-black/55 hover:bg-black/[0.06] dark:text-white/55 dark:hover:bg-white/[0.06] sm:inline">
                    {PROJECT}
                  </span>
                  <span className="hidden shrink-0 text-black/35 dark:text-white/35 sm:inline">/</span>
                  <span className="inline-flex min-w-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[13.5px] hover:bg-black/[0.06] dark:hover:bg-white/[0.06]">
                    <span className="truncate">{CHAT_TITLE}</span>
                    <ChevronDown className="h-3.5 w-3.5 shrink-0 text-black/50 dark:text-white/50" />
                  </span>
                </div>
                <div className="ml-auto flex shrink-0 items-center gap-0.5">
                  <span className={cn(iconBtn, "hidden sm:flex")}><MoreVertical className="h-4 w-4" /></span>
                  <Link href="/download" className="flex h-8 items-center gap-1.5 rounded-md pl-1.5 pr-2.5 text-[13px] text-black/60 transition-colors hover:bg-black/[0.06] hover:text-black dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white" title="Open in Classgrid Code">
                    <CodeMark />
                    Open
                  </Link>
                  <button type="button" onClick={() => openTab("files")} className={cn(iconBtn, "hidden sm:flex")} aria-label="Overview">
                    <ClipboardList className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => setPaneOpen((v) => !v)} className={iconBtn} aria-label="Show or hide the workspace">
                    <PanelRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Thread */}
              <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-width:thin]">
                <div className="mx-auto w-full max-w-3xl px-4 pb-6 pt-4 md:px-8">
                  <div className="flex justify-end">
                    <div className="max-w-[85%] rounded-3xl bg-[#ececec] px-5 py-3 text-[15px] leading-relaxed dark:bg-[#262626] sm:max-w-[75%]">
                      Add a pricing section to the home page with three plans, then check that the build passes.
                    </div>
                  </div>

                  <div className="mt-6 text-[15px] leading-relaxed">
                    <button type="button" onClick={() => setThoughtOpen((v) => !v)} className="flex items-center gap-1 text-[14px] text-black/50 hover:text-black/80 dark:text-white/50 dark:hover:text-white/80">
                      Thought for 14s
                      <ChevronRight className={cn("h-3.5 w-3.5 transition-transform", thoughtOpen && "rotate-90")} />
                    </button>
                    {thoughtOpen && (
                      <p className="mt-2 border-l-2 border-black/10 pl-3 text-[13.5px] text-black/50 dark:border-white/10 dark:text-white/50">
                        The home page lists its sections in app/page.tsx. I&apos;ll make a Pricing component with three plans,
                        place it after the features, then run the build and open the page to check it.
                      </p>
                    )}

                    {/* The agent's steps: each one opens its tab in the workspace */}
                    <div className="mt-3 space-y-0.5">
                      {STEPS.map((s) => {
                        const Icon = STEP_ICON[s.verb as keyof typeof STEP_ICON];
                        return (
                          <button
                            key={s.verb + s.target}
                            type="button"
                            onClick={() => openTab(s.tab)}
                            className="group flex w-full items-center gap-2 rounded-md px-1.5 py-1 text-left text-[13.5px] text-black/55 transition-colors hover:bg-black/[0.04] hover:text-black/85 dark:text-white/55 dark:hover:bg-white/[0.04] dark:hover:text-white/85"
                          >
                            <Icon className="h-3.5 w-3.5 shrink-0" />
                            <span>{s.verb}</span>
                            <span className="min-w-0 truncate font-mono text-[12.5px] text-black/75 dark:text-white/75">{s.target}</span>
                            {s.add !== undefined && <span className="text-[12px] text-emerald-600 dark:text-emerald-400">+{s.add}</span>}
                            {s.del !== undefined && <span className="text-[12px] text-red-600 dark:text-red-400">-{s.del}</span>}
                            <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-0 group-hover:opacity-100" />
                          </button>
                        );
                      })}
                    </div>

                    <p className="mt-4">
                      Done. I added a <Chip>Pricing</Chip> section with three plans (Starter, Pro and Team) below the
                      features, and placed it in <Chip>app/page.tsx</Chip>. The build passes and the page looks right
                      in the browser.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button type="button" onClick={() => openTab("files")} className="rounded-full border border-black/10 px-3 py-1 text-[12.5px] text-black/70 hover:bg-black/[0.06] dark:border-white/10 dark:text-white/70 dark:hover:bg-white/[0.06]">View the code</button>
                      <button type="button" onClick={() => openTab("terminal")} className="rounded-full border border-black/10 px-3 py-1 text-[12.5px] text-black/70 hover:bg-black/[0.06] dark:border-white/10 dark:text-white/70 dark:hover:bg-white/[0.06]">See the build</button>
                      <button type="button" onClick={() => openTab("browser")} className="rounded-full border border-black/10 px-3 py-1 text-[12.5px] text-black/70 hover:bg-black/[0.06] dark:border-white/10 dark:text-white/70 dark:hover:bg-white/[0.06]">Open the page</button>
                    </div>
                    <AnswerActions time="4:12 PM" />
                  </div>

                  {/* Messages the visitor sends get the preview answer */}
                  {sent.map((m, i) => (
                    <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="mt-8 flex justify-end">
                        <div className="max-w-[85%] whitespace-pre-wrap break-words rounded-3xl bg-[#ececec] px-5 py-3 text-[15px] leading-relaxed dark:bg-[#262626] sm:max-w-[75%]">{m}</div>
                      </div>
                      <div className="mt-6 text-[15px] leading-relaxed">
                        <p>This is a preview of Classgrid Studio.</p>
                        <p className="mt-1 text-black/60 dark:text-white/60">Download the app to give the agent real projects, or open it in your browser.</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Link href="/download" className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#0d0d0d] px-4 text-[14px] font-medium text-white transition-colors hover:bg-black/85 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                            Download for desktop
                          </Link>
                          <a href={CHAT_APP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center gap-2 rounded-lg border border-black/15 px-4 text-[14px] font-medium transition-colors hover:bg-black/[0.06] dark:border-white/15 dark:hover:bg-white/[0.06]">
                            Open in browser <ArrowUpRight className="h-4 w-4" />
                          </a>
                        </div>
                        <AnswerActions time="now" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input box */}
              <form onSubmit={submit} className="mx-auto w-full max-w-3xl shrink-0 px-3 pb-4 md:px-8">
                <div className="relative w-full rounded-2xl border border-black/10 bg-[#f7f7f7] shadow-sm transition-colors focus-within:border-black/40 dark:border-white/10 dark:bg-[#1e1e1e] dark:focus-within:border-white/40">
                  <textarea
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) submit(e);
                    }}
                    placeholder="Ask a question..."
                    aria-label="Ask Classgrid Studio a question"
                    className="mb-12 max-h-[120px] min-h-[40px] w-full resize-none bg-transparent px-4 pt-4 text-[16px] text-black placeholder:text-black/40 focus:outline-none dark:text-white dark:placeholder:text-white/40 sm:text-sm"
                  />
                  <div className="absolute bottom-3 left-3 flex items-center gap-1">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full text-black/55 hover:bg-black/[0.06] hover:text-black dark:text-white/55 dark:hover:bg-white/10 dark:hover:text-white"><Paperclip className="h-4 w-4 -rotate-45" /></span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full text-black/55 hover:bg-black/[0.06] hover:text-black dark:text-white/55 dark:hover:bg-white/10 dark:hover:text-white"><SlidersIcon className="h-4 w-4" /></span>
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center gap-0.5">
                    <span className="hidden h-8 w-8 items-center justify-center rounded-full text-black/55 hover:bg-black/[0.06] hover:text-black dark:text-white/55 dark:hover:bg-white/10 dark:hover:text-white sm:flex" title="Permissions"><ShieldCheck className="h-4 w-4" /></span>
                    <span className="flex h-8 items-center gap-1.5 rounded-full px-2.5 text-[13px] font-medium text-black/55 hover:bg-black/[0.06] hover:text-black dark:text-white/55 dark:hover:bg-white/10 dark:hover:text-white">
                      Auto <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full text-black/55 hover:bg-black/[0.06] hover:text-black dark:text-white/55 dark:hover:bg-white/10 dark:hover:text-white"><Mic className="h-4 w-4" /></span>
                    <button type="submit" disabled={!input.trim()} aria-label="Send" className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#0d0d0d] text-white shadow-sm transition-all hover:bg-black/85 active:scale-95 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                      <ArrowUp className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Workspace: beside the chat on wide screens, over it on phones */}
            {paneOpen && (
              <StudioWorkspace
                tab={tab}
                onTab={setTab}
                onClose={() => setPaneOpen(false)}
                className="absolute inset-0 z-20 md:static md:z-auto md:w-[48%] md:shrink-0"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
