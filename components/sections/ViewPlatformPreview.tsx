"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Search, 
  MessageSquarePlus, 
  Calendar, 
  Library, 
  Phone,
  Pin,
  Clock,
  Bell,
  Paperclip,
  Mic,
  ArrowUp,
  ChevronDown,
  Copy,
  ThumbsUp,
  ThumbsDown,
  SquarePen,
  PanelLeft,
  Users,
  Shield
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

// The Grids icon of the Classgrid app's sidebar (the same drawing as the app's ClassgridLogoIcon, in the text colour)
const GridsIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 712 712" className={className}>
    <g fill="currentColor">
      <path d="M 167.75 300.92 C166.13,299.98 166.00,297.10 166.00,263.26 C166.00,222.89 166.37,219.56 172.31,207.00 C181.10,188.42 194.98,176.87 216.50,170.25 C223.48,168.10 309.83,167.13 311.13,169.18 C312.65,171.57 312.17,240.92 310.59,249.16 C305.33,276.49 286.45,296.27 261.11,301.00 C253.85,302.35 170.09,302.28 167.75,300.92 ZM 182.63 393.30 C182.24,392.91 178.46,392.35 174.21,392.05 L 166.50 391.50 L 166.50 318.50 L 218.71 318.24 C270.53,317.98 270.93,318.00 272.02,320.04 C272.77,321.43 273.02,330.29 272.81,347.30 C272.51,371.38 272.39,372.74 270.11,377.79 C267.08,384.50 260.80,390.07 253.77,392.28 C249.09,393.76 243.75,394.00 215.83,394.00 C197.96,394.00 183.02,393.68 182.63,393.30 ZM 328.20 261.80 C326.47,260.07 326.47,170.93 328.20,169.20 C329.08,168.32 337.66,168.00 360.59,168.00 L 391.78 168.00 L 392.15 175.25 C392.42,180.62 393.24,183.98 395.31,188.20 L 398.10 193.90 L 397.80 218.70 C397.46,246.81 397.20,247.94 389.28,255.65 C382.40,262.35 379.16,263.00 352.52,263.00 C335.87,263.00 329.06,262.66 328.20,261.80 ZM 290.24 360.25 C290.68,330.98 290.88,328.04 292.85,322.60 C298.29,307.62 307.48,296.19 319.45,289.49 C330.26,283.45 333.19,283.03 364.53,283.01 L 392.56 283.00 L 392.90 296.00 L 365.70 296.01 C337.02,296.02 334.04,296.39 324.99,301.01 C313.58,306.82 304.92,319.97 303.03,334.32 C302.46,338.62 302.00,353.36 302.00,367.07 L 302.00 392.00 L 289.78 392.00 ZM 534.00 237.45 C534.00,213.92 533.23,209.75 527.09,200.26 C522.55,193.23 516.51,188.06 508.43,184.28 C502.53,181.52 502.35,181.50 476.50,181.00 L 450.50 180.50 L 450.32 174.17 L 450.14 167.83 L 476.82 168.21 C501.99,168.57 503.84,168.72 509.50,170.94 C529.10,178.63 543.09,196.30 545.97,217.00 C546.62,221.71 547.00,232.64 546.82,241.50 L 546.50 257.50 L 540.25 257.80 L 534.00 258.10 ZM 415.71 312.60 C401.53,308.72 394.03,292.06 400.35,278.50 C407.15,263.94 424.52,259.38 436.28,269.08 C446.96,277.89 447.96,296.89 438.23,306.21 C431.35,312.80 424.04,314.88 415.71,312.60 ZM 536.92 313.07 C527.40,311.21 520.06,304.09 517.95,294.65 C516.39,287.71 517.31,281.78 520.93,275.45 C525.00,268.32 530.31,264.91 538.32,264.26 C546.59,263.60 551.23,265.18 556.50,270.45 C573.22,287.16 559.31,317.43 536.92,313.07 ZM 413.91 197.69 C403.94,193.96 398.00,185.32 398.00,174.57 C398.00,160.54 407.72,151.00 422.01,151.00 C431.24,151.00 438.02,155.27 442.62,164.00 C445.06,168.64 445.18,181.19 442.82,185.50 C440.64,189.47 435.35,194.77 431.65,196.68 C427.54,198.81 418.29,199.33 413.91,197.69 ZM 288.99 562.47 C283.83,560.88 277.14,554.93 274.68,549.73 C272.30,544.72 272.44,534.03 274.94,529.12 C277.22,524.65 282.99,519.32 287.65,517.37 C292.23,515.46 300.73,515.69 305.50,517.87 C310.64,520.21 316.57,526.80 317.93,531.68 C320.54,541.09 318.63,549.34 312.28,556.13 C308.94,559.71 306.38,561.40 302.68,562.50 C296.65,564.29 294.89,564.29 288.99,562.47 ZM 287.29 443.20 C274.01,437.85 268.66,422.41 275.72,409.80 C279.99,402.17 287.07,398.00 295.75,398.00 C303.36,398.00 308.07,400.12 313.29,405.90 C317.66,410.73 318.51,413.41 318.45,422.00 C318.33,438.85 302.78,449.43 287.29,443.20 ZM 166.76 444.00 C156.65,440.96 151.00,432.84 151.00,421.34 C151.00,414.16 152.51,410.32 157.36,405.16 C162.08,400.14 167.00,398.00 173.71,398.02 C190.89,398.09 201.89,416.53 193.97,432.00 C188.79,442.12 177.31,447.18 166.76,444.00 ZM 240.58 257.75 C262.28,240.99 267.50,236.45 267.50,234.28 C267.50,232.73 262.84,228.72 249.50,218.80 C248.01,217.69 246.63,216.66 245.35,215.71 C231.53,205.42 229.54,203.94 228.17,204.38 C227.81,204.49 227.49,204.74 227.02,204.99 C225.06,206.04 225.00,206.99 225.00,235.37 C225.00,251.48 225.30,264.97 225.67,265.33 C227.39,267.06 230.69,265.38 240.58,257.75 ZM 202.68 428.35 C202.31,427.97 202.00,425.07 202.00,421.89 L 202.00 416.12 L 206.25 415.52 C208.59,415.18 223.26,415.04 238.85,415.20 L 267.20 415.50 L 267.30 422.00 L 267.39 428.50 L 235.38 428.76 C217.77,428.91 203.05,428.72 202.68,428.35 ZM 416.42 258.08 C416.19,257.85 416.00,245.82 416.00,231.33 L 416.00 205.00 L 428.00 205.00 L 428.00 258.50 L 422.42 258.50 C419.35,258.50 416.65,258.31 416.42,258.08 Z" />
      <path d="M 214.50 546.97 C200.10,544.72 186.29,535.98 177.66,523.66 C168.20,510.16 166.00,500.32 166.00,471.41 L 166.00 451.00 L 172.00 451.00 L 178.00 451.00 L 178.00 470.67 C178.00,481.49 178.51,493.30 179.13,496.92 C181.36,509.90 190.12,522.49 201.41,528.95 C210.65,534.24 215.85,535.00 242.62,535.00 L 266.81 535.00 L 267.22 540.75 C267.44,543.91 267.45,546.84 267.25,547.25 C266.77,548.23 221.00,547.99 214.50,546.97 ZM 325.00 541.50 L 325.00 535.00 L 330.09 535.00 C336.05,535.00 333.99,536.83 365.96,503.25 C377.09,491.56 386.60,482.00 387.10,482.00 C388.55,482.00 388.26,545.34 386.80,546.80 C385.92,547.68 377.53,548.00 355.30,548.00 L 325.00 548.00 L 325.00 541.50 ZM 407.72 546.24 C406.11,544.47 406.00,540.70 406.24,496.41 L 406.50 448.50 L 416.19 443.82 C433.65,435.38 443.51,422.05 447.85,401.03 C449.42,393.41 450.32,391.12 452.46,389.28 L 455.11 387.00 L 503.98 387.00 C547.95,387.00 553.02,387.16 554.50,388.64 C555.98,390.12 556.10,394.79 555.77,437.89 C555.35,491.93 555.30,492.42 547.33,509.00 C543.39,517.18 541.49,519.75 533.63,527.53 C526.68,534.41 522.70,537.44 516.95,540.27 C502.17,547.52 504.26,547.28 454.48,547.74 C411.08,548.14 409.39,548.09 407.72,546.24 ZM 494.37 509.93 C497.38,507.56 497.75,504.48 495.35,501.83 C493.82,500.14 491.59,500.00 467.04,500.00 C439.70,500.00 437.53,500.29 436.87,504.00 C436.41,506.59 437.96,509.67 440.27,510.79 C441.66,511.46 451.74,511.89 467.12,511.93 C490.56,512.00 491.86,511.90 494.37,509.93 ZM 515.17 476.35 C517.45,474.29 517.52,471.23 515.35,468.83 C513.81,467.13 511.44,467.00 481.60,467.03 C457.93,467.06 449.09,467.38 447.94,468.28 C445.37,470.28 444.82,473.08 446.50,475.64 L 448.05 478.00 L 480.69 478.00 C509.67,478.00 513.55,477.81 515.17,476.35 ZM 515.17 444.35 C517.42,442.31 517.54,438.68 515.43,436.57 C514.08,435.23 510.22,435.00 488.46,435.00 C464.38,435.00 463.02,435.10 462.04,436.93 C460.55,439.71 460.75,442.07 462.65,444.17 C464.17,445.85 466.35,446.00 488.83,446.00 C510.24,446.00 513.57,445.79 515.17,444.35 ZM 291.42 510.08 C291.19,509.85 291.00,496.47 291.00,480.33 L 291.00 451.00 L 296.50 451.00 L 302.00 451.00 L 302.00 480.76 L 302.00 510.51 L 296.92 510.51 C294.13,510.50 291.66,510.31 291.42,510.08 ZM 325.00 422.50 L 325.00 416.00 L 350.45 416.00 C365.50,416.00 378.07,415.54 381.20,414.87 C394.52,412.05 405.68,403.07 411.78,390.28 L 415.50 382.50 L 416.00 351.03 L 416.50 319.57 L 422.33 319.39 L 428.16 319.21 L 427.76 352.36 L 427.37 385.50 L 424.72 391.86 C420.69,401.52 417.36,406.64 410.95,413.05 C403.95,420.05 391.82,426.26 381.92,427.90 C378.30,428.51 364.01,429.00 350.17,429.00 L 325.00 429.00 L 325.00 422.50 ZM 506.47 367.96 C505.64,366.61 506.13,366.00 521.20,349.94 L 533.91 336.38 L 534.21 327.94 L 534.50 319.50 L 540.75 319.32 L 547.00 319.14 L 547.00 341.85 C547.00,360.78 546.74,364.92 545.44,366.78 C543.93,368.94 543.37,369.00 525.50,369.00 C513.81,369.00 506.88,368.62 506.47,367.96 ZM 451.00 289.51 L 451.00 283.00 L 481.55 283.00 L 512.10 283.00 L 511.80 289.25 L 511.50 295.50 L 481.25 295.76 L 451.00 296.03 L 451.00 289.51 Z" />
    </g>
  </svg>
);

export function ViewPlatformPreview() {
  const [input, setInput] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState("");
  // Same as the app: the sidebar toggle at the top left of the chat hides and shows the sidebar
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
          aria-label="Ask Classgrid AI a question"
          className="w-full resize-none bg-transparent pt-4 pb-12 pl-4 pr-4 sm:pl-24 sm:pr-60 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none overflow-y-auto min-h-[56px] max-h-[180px] leading-relaxed"
        />

        {/* Bottom Left actions */}
        <div className="absolute bottom-3 left-4 flex items-center gap-1">
          <button type="button" aria-label="Attach a file" onClick={handleSubmit} className="h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all cursor-pointer">
            <Paperclip className="h-4 w-4 -rotate-45" />
          </button>
          <button type="button" aria-label="Plugins and settings" onClick={handleSubmit} className="h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all cursor-pointer">
            <CustomSlidersIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Bottom Right actions */}
        <div className="absolute bottom-3 right-3 flex items-center gap-0.5">
          <button type="button" aria-label="Choose a model" onClick={handleSubmit} className="h-8 shrink-0 rounded-full flex items-center gap-1.5 px-2.5 text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all cursor-pointer">
            <span className="hidden sm:inline">Auto</span>
            <span className="sm:hidden">Auto</span>
            <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-60" />
          </button>
          <button type="button" aria-label="Dictate" onClick={handleSubmit} className="h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all cursor-pointer">
            <Mic className="h-4 w-4" />
          </button>
          <button 
            type="submit" aria-label="Send" 
            disabled={!input.trim()}
            className="h-8 w-8 shrink-0 rounded-full bg-foreground text-background hover:bg-zinc-700 dark:hover:bg-zinc-300 disabled:opacity-50 transition-all shadow-sm flex items-center justify-center ml-1"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <div className="bg-background text-foreground pb-20 overflow-x-hidden">
      {/* ─── Main Interactive Preview ─── */}
      <section className="relative pt-8 pb-12 md:pb-16">
        <div className="relative z-10 mx-auto max-w-[1400px] px-6">
          <div className="mx-auto w-full max-w-5xl">
            <div className="flex flex-col overflow-hidden bg-background dark:bg-black rounded-2xl border border-border shadow-2xl h-[480px] md:h-[600px] transition-all relative">
                {/* Agent App Layout */}
                <div className="flex flex-1 min-h-0 overflow-hidden relative">
                  
                  {/* Sidebar */}
                  <aside className={cn("w-[220px] shrink-0 border-r border-border bg-muted/20 dark:bg-black hidden flex-col text-foreground min-h-0 overflow-hidden", sidebarOpen && "md:flex")}>
                    <div className="flex items-center gap-2 p-3 font-semibold text-[13px]">
                      <img src="/logo.png" alt="" className="w-5 h-5 object-contain" />
                      Classgrid
                    </div>

                    <div className="mx-3 mt-1 mb-3 flex items-center gap-2 rounded-lg border border-border bg-muted/40 dark:bg-[#0f0f0f] px-2.5 py-1.5 text-muted-foreground cursor-pointer hover:bg-muted/60 transition-colors">
                      <Search className="w-3.5 h-3.5" />
                      <span className="text-xs flex-1">Search chat</span>
                      <kbd className="text-[9px] border border-border rounded px-1 bg-background/50">⌘K</kbd>
                    </div>

                    <nav className="px-2 mt-1 space-y-0.5">
                      <a href="https://chat.classgrid.in" onClick={handleSubmit} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-muted/60 text-foreground text-[13px] font-medium transition-colors">
                        <SquarePen className="w-4 h-4" />
                        New Chat
                      </a>
                      <a href="https://chat.classgrid.in" onClick={handleSubmit} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-muted-foreground hover:bg-muted/40 hover:text-foreground text-[13px] font-medium transition-colors">
                        <Calendar className="w-4 h-4" />
                        Schedule
                      </a>
                      <a href="https://chat.classgrid.in" onClick={handleSubmit} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-muted-foreground hover:bg-muted/40 hover:text-foreground text-[13px] font-medium transition-colors">
                        <Library className="w-4 h-4" />
                        Library
                      </a>
                      <a href="https://chat.classgrid.in" onClick={handleSubmit} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-muted-foreground hover:bg-muted/40 hover:text-foreground text-[13px] font-medium transition-colors">
                        <Phone className="w-4 h-4" />
                        Calls
                      </a>
                      <a href="https://chat.classgrid.in" onClick={handleSubmit} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-muted-foreground hover:bg-muted/40 hover:text-foreground text-[13px] font-medium transition-colors">
                        <GridsIcon className="w-4 h-4" />
                        Grids
                      </a>
                      <a href="https://chat.classgrid.in" onClick={handleSubmit} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-muted-foreground hover:bg-muted/40 hover:text-foreground text-[13px] font-medium transition-colors">
                        <Users className="w-4 h-4" />
                        Requests
                      </a>
                      <a href="https://chat.classgrid.in" onClick={handleSubmit} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-muted-foreground hover:bg-muted/40 hover:text-foreground text-[13px] font-medium transition-colors">
                        <Shield className="w-4 h-4" />
                        Audit Logs
                      </a>
                    </nav>

                    <div className="mt-3 px-3 flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                      <CustomPinIcon className="w-3 h-3" /> Pinned
                    </div>
                    <div className="mt-1 px-2 space-y-0.5">
                      <div className="px-2.5 py-1.5 text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-lg cursor-pointer truncate flex items-center gap-2">
                        <CustomChatIcon className="w-[15px] h-[15px] opacity-80 shrink-0" />
                        Weekly sales report
                      </div>
                      <div className="px-2.5 py-1.5 text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-lg cursor-pointer truncate flex items-center gap-2">
                        <CustomChatIcon className="w-[15px] h-[15px] opacity-80 shrink-0" />
                        Launch email draft
                      </div>
                    </div>

                    <div className="mt-3 px-3 flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                      <Clock className="w-3 h-3" /> Today
                    </div>
                    <div className="mt-1 px-2 space-y-0.5">
                      <div className="px-2.5 py-1.5 text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-lg cursor-pointer truncate">Competitor research</div>
                    </div>

                    <div className="mt-auto border-t border-border p-3 flex items-center gap-2">
                      <img src="https://cdn.classgrid.in/android-chrome-512x512.png" alt="Classgrid" className="w-7 h-7 rounded-full object-cover" />
                      <div className="text-[13px] font-medium text-foreground truncate flex-1">Classgrid</div>
                      <Bell className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer" />
                    </div>
                  </aside>

                  {/* Main Chat Area */}
                  <div className="flex-1 flex flex-col relative bg-background dark:bg-black">
                    {/* Sidebar toggle (same icon, size and place as the app's SidebarTrigger) */}
                    <div className="shrink-0 hidden md:flex items-center px-3 pt-3 h-14">
                      <button
                        type="button"
                        onClick={() => setSidebarOpen((open) => !open)}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                        aria-label={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
                        title={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
                      >
                        <PanelLeft className="h-4 w-4" />
                      </button>
                    </div>

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
                                 
                                 <a href="https://chat.classgrid.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-[14px] hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors shadow-sm">
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
    </div>
  );
}
