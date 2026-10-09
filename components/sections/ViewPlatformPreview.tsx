"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Search, 
  MessageSquarePlus, 
  Calendar, 
  Library, 
  Pin,
  Clock,
  MoreHorizontal,
  Bell,
  Paperclip,
  Mic,
  ArrowUp,
  ChevronLeft,
  ChevronDown,
  Copy,
  ThumbsUp,
  ThumbsDown,
  SquarePen
} from "lucide-react";

const CustomSlidersIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 8h11" />
    <circle cx="16" cy="8" r="2" />
    <path d="M18 8h3" />
    <path d="M3 16h4" />
    <circle cx="9" cy="16" r="2" />
    <path d="M11 16h10" />
  </svg>
);

const CustomPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 17v5" />
    <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
  </svg>
);

const CustomChatIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092a10 10 0 1 0-4.777-4.719" />
  </svg>
);

// The chat bubble shown next to pinned chats in the Classgrid app (same SVG as the app's sidebar)
const ChatBubbleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path fill="none" d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092a10 10 0 1 0-4.777-4.719" />
  </svg>
);

export function ViewPlatformPreview() {
  const [input, setInput] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() && !submittedMessage) return;
    
    if (!submittedMessage) {
      setSubmittedMessage(input);
      setInput("");
    }
  }

  const panelInput = (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="group relative w-full shadow-sm rounded-2xl border border-border bg-white dark:bg-[#0f0f0f] focus-within:border-black/80 dark:focus-within:border-white/50 focus-within:ring-1 focus-within:ring-black/80 dark:focus-within:ring-white/50 transition-all duration-300">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Ask a question..."
          className="w-full resize-none bg-transparent pt-4 pb-12 pl-4 pr-4 sm:pl-24 sm:pr-60 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none overflow-y-auto min-h-[56px] max-h-[180px] leading-relaxed"
        />

        {/* Bottom Left actions */}
        <div className="absolute bottom-3 left-4 flex items-center gap-1">
          <button type="button" onClick={handleSubmit} className="h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all cursor-pointer">
            <Paperclip className="h-4 w-4 -rotate-45" />
          </button>
          <button type="button" onClick={handleSubmit} className="h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all cursor-pointer">
            <CustomSlidersIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Bottom Right actions */}
        <div className="absolute bottom-3 right-3 flex items-center gap-0.5">
          <button type="button" onClick={handleSubmit} className="h-8 shrink-0 rounded-full flex items-center gap-1.5 px-2.5 text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all cursor-pointer">
            <span className="hidden sm:inline">Auto</span>
            <span className="sm:hidden">Auto</span>
            <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-60" />
          </button>
          <button type="button" onClick={handleSubmit} className="h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all cursor-pointer">
            <Mic className="h-4 w-4" />
          </button>
          <button 
            type="submit" 
            disabled={!input.trim()}
            className="h-8 w-8 shrink-0 rounded-full bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 transition-all shadow-sm flex items-center justify-center ml-1"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <main className="bg-background text-foreground pb-20 overflow-x-hidden">
      {/* ─── Main Interactive Preview ─── */}
      <section className="relative pt-8 pb-12 md:pb-16">
        <div className="relative z-10 mx-auto max-w-[1400px] px-6">
          <div className="mx-auto w-full max-w-5xl">
            <div className="flex flex-col overflow-hidden bg-background dark:bg-black rounded-2xl border border-border shadow-2xl h-[480px] md:h-[600px] transition-all relative">
              {/* Browser chrome */}
                <div className="flex items-center gap-4 border-b border-border bg-muted/40 dark:bg-[#0a0a0a] px-4 py-2.5 shrink-0">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                </div>

                {/* Agent App Layout */}
                <div className="flex flex-1 min-h-0 overflow-hidden relative">
                  
                  {/* Sidebar */}
                  <aside className="w-[220px] shrink-0 border-r border-border bg-muted/20 dark:bg-black hidden md:flex flex-col text-foreground">
                    <div className="flex items-center gap-2 p-3 font-semibold text-[13px]">
                      <img src="/logo.png" alt="" className="w-5 h-5 object-contain" />
                      Classgrid
                    </div>

                    <div className="mx-3 mt-1 mb-3 flex items-center gap-2 rounded-lg border border-border bg-muted/40 dark:bg-[#0f0f0f] px-2.5 py-1.5 text-muted-foreground cursor-pointer hover:bg-muted/60 transition-colors">
                      <Search className="w-3.5 h-3.5" />
                      <span className="text-xs flex-1">Search chat</span>
                      <kbd className="text-[9px] border border-border rounded px-1 bg-background/50">⌘K</kbd>
                    </div>

                    <div className="px-3 flex items-center gap-2 text-[13px] font-semibold py-1.5 text-foreground cursor-pointer hover:bg-muted/50 rounded-md mx-1">
                      <ChevronLeft className="w-4 h-4" />
                      Agent
                    </div>

                    <nav className="px-2 mt-2 space-y-0.5">
                      <a href="#" onClick={handleSubmit} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-muted/60 text-foreground text-[13px] font-medium transition-colors">
                        <SquarePen className="w-4 h-4" />
                        New Chat
                      </a>
                      <a href="#" onClick={handleSubmit} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-muted-foreground hover:bg-muted/40 hover:text-foreground text-[13px] font-medium transition-colors">
                        <Calendar className="w-4 h-4" />
                        Schedule
                      </a>
                      <a href="#" onClick={handleSubmit} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-muted-foreground hover:bg-muted/40 hover:text-foreground text-[13px] font-medium transition-colors">
                        <Library className="w-4 h-4" />
                        Library
                      </a>
                    </nav>

                    <div className="mt-4 px-3 flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                      <CustomPinIcon className="w-3 h-3" /> Pinned
                    </div>
                    <div className="mt-1 px-2 space-y-0.5">
                      <div className="px-2.5 py-1.5 text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-lg cursor-pointer truncate flex items-center gap-2">
                        <CustomChatIcon className="w-[15px] h-[15px] opacity-80 shrink-0" />
                        ClassGrid Cloud Website
                      </div>
                      <div className="px-2.5 py-1.5 text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-lg cursor-pointer truncate flex items-center gap-2">
                        <CustomChatIcon className="w-[15px] h-[15px] opacity-80 shrink-0" />
                        Testing Sending
                      </div>
                    </div>

                    <div className="mt-4 px-3 flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                      <Clock className="w-3 h-3" /> Today
                    </div>
                    <div className="mt-1 px-2 space-y-0.5">
                      <div className="px-2.5 py-1.5 text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-lg cursor-pointer truncate">Now What?</div>
                      <div className="px-2.5 py-1.5 text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-lg cursor-pointer truncate">Ticket Check</div>
                      <div className="px-2.5 py-1.5 text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-lg cursor-pointer truncate">Chart Drawing</div>
                    </div>

                    <div className="mt-auto border-t border-border p-3 flex items-center gap-2">
                      <img src="https://cdn.classgrid.in/android-chrome-512x512.png" alt="Classgrid" className="w-7 h-7 rounded-full object-cover" />
                      <div className="text-[13px] font-medium text-foreground truncate flex-1">Classgrid</div>
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer" />
                      <Bell className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer" />
                    </div>
                  </aside>

                  {/* Main Chat Area */}
                  <div className="flex-1 flex flex-col relative bg-background dark:bg-black">
                    
                    {!submittedMessage ? (
                      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8">
                        <div className="max-w-[68rem] w-full flex flex-col items-center gap-6">
                          <img src="/logo.png" alt="Classgrid" className="h-12 w-12 object-contain" />
                          
                          <div className="text-center space-y-1.5">
                            <h2 className="text-xl font-semibold text-foreground tracking-tight">
                              What do you want to know today?
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              Your AI Agent
                            </p>
                          </div>

                          <div className="w-full max-w-[640px]">
                            {panelInput}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1 overflow-y-auto overscroll-contain scroll-smooth pb-12">
                           <div className="flex w-full flex-col gap-1 items-end pt-8 px-4 md:px-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                             <div className="relative max-w-[70%] rounded-3xl bg-muted/60 px-5 py-3 text-[15px] text-foreground">
                               {submittedMessage}
                             </div>
                           </div>
                           
                           <div className="flex w-full flex-col gap-1 items-start mt-6 px-4 md:px-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150 fill-mode-both">
                             <div className="flex gap-3 max-w-[85%] sm:max-w-[80%]">
                               <div className="w-7 h-7 rounded-full bg-background border border-border shadow-sm flex items-center justify-center shrink-0">
                                 <img src="/logo.png" alt="Classgrid" className="h-4 w-4" />
                               </div>
                               <div className="space-y-1.5 flex-1 min-w-0 text-[15px] leading-relaxed text-foreground mt-0.5">
                                 <p className="mb-2">This is a preview version of the Classgrid AI Agent.</p>
                                 <p className="mb-4">To continue this conversation and explore powerful AI workflows, please create a free account on Classgrid Agent!</p>
                                 
                                 <a href="https://chat.classgrid.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-[14px] hover:bg-primary/90 transition-colors shadow-sm">
                                   Open Agent Chat <ArrowUp className="w-4 h-4 rotate-45" />
                                 </a>
                                 
                                 <div className="flex items-center gap-1 mt-3">
                                   <button type="button" className="flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-200 cursor-pointer text-muted-foreground/60 hover:bg-muted hover:text-foreground" title="Copy response">
                                     <Copy className="h-3.5 w-3.5" />
                                   </button>
                                   <button type="button" className="flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-200 cursor-pointer text-muted-foreground/60 hover:bg-muted hover:text-foreground" title="Helpful">
                                     <ThumbsUp className="h-3.5 w-3.5" />
                                   </button>
                                   <button type="button" className="flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-200 cursor-pointer text-muted-foreground/60 hover:bg-muted hover:text-foreground" title="Not helpful">
                                     <ThumbsDown className="h-3.5 w-3.5" />
                                   </button>
                                 </div>
                               </div>
                             </div>
                           </div>
                        </div>
                        <div className="shrink-0 bg-background dark:bg-black pt-2 pb-6 px-4 md:px-8 max-w-4xl w-full mx-auto animate-in slide-in-from-top-4 duration-500">
                          {panelInput}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>
    </main>
  );
}
