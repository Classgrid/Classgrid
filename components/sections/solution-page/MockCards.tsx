"use client";

import { useState } from "react";
import {
  CalendarClock,
  Check,
  CheckCheck,
  ChevronRight,
  Circle,
  Download,
  Ellipsis,
  FileText,
  Files,
  GitPullRequest,
  Info,
  Paperclip,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMock, MockCard } from "@/content/solutions/types";

const WHATSAPP_LOGO = "https://cdn.classgrid.in/classgrid_intgration/whatsapp-svgrepo-com_(1).svg";
const GITHUB_LOGO = "https://cdn.classgrid.in/classgrid_intgration/github-icon.svg";

// Same two card looks as the agent sections: a glass card on the gradient, and a solid floating card
const MAIN_SHELL =
  "rounded-2xl bg-white/60 p-5 shadow-sm ring-1 ring-white/60 backdrop-blur-xl md:p-7 dark:bg-black/45 dark:ring-white/10";
const FLOATING_SHELL =
  "rounded-2xl bg-white p-5 shadow-xl ring-1 ring-black/5 md:p-6 dark:bg-[#0f0f0f] dark:ring-white/10";

const MUTED = "text-black/45 dark:text-white/45";
const SOFT = "text-black/70 dark:text-white/70";

function CardTitle({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <p className="min-w-0 flex-1 truncate text-[15px] font-medium md:text-[16px]">{children}</p>
      <Ellipsis className={cn("h-4 w-4 shrink-0", MUTED)} />
    </div>
  );
}

function ChatMockView({ card }: { card: ChatMock }) {
  return (
    <div>
      <CardTitle>{card.title}</CardTitle>

      <div className="mt-5 flex flex-col items-end gap-2">
        {card.fileChips?.length ? (
          <div className="flex flex-wrap justify-end gap-2">
            {card.fileChips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-1.5 rounded-lg bg-black/[0.05] px-2.5 py-1 text-[12px] font-medium dark:bg-white/10"
              >
                <Paperclip className="h-3.5 w-3.5" />
                {chip}
              </span>
            ))}
          </div>
        ) : null}
        <p className="max-w-[92%] rounded-2xl bg-black/[0.06] px-4 py-2.5 text-[14px] leading-6 md:text-[15px] dark:bg-white/10">
          {card.userMessage}
        </p>
      </div>

      {card.workedFor ? (
        <div className={cn("mt-5 flex items-center gap-1 text-[14px]", MUTED)}>
          {card.workedFor}
          <ChevronRight className="h-4 w-4" />
        </div>
      ) : null}

      {card.steps?.length ? (
        <ul className="mt-3 space-y-1.5">
          {card.steps.map((step) => (
            <li key={step} className={cn("flex items-start gap-2 text-[13px] leading-5 md:text-[14px]", SOFT)}>
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span className="min-w-0">{step}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {card.resultLines?.length ? (
        <div
          className={cn(
            "mt-4 space-y-2 text-[14px] leading-6 [mask-image:linear-gradient(to_bottom,black_60%,transparent)] md:text-[15px]",
            SOFT
          )}
        >
          {card.resultLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function FlashcardView({ card }: { card: Extract<MockCard, { kind: "flashcard" }> }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div>
      <p className={cn("text-[13px] font-medium", MUTED)}>{card.counter}</p>
      <p className="mt-3 text-[16px] font-medium leading-6 md:text-[17px]">{flipped ? card.answer : card.question}</p>
      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        className="mt-4 inline-flex items-center rounded-full border border-black/10 px-4 py-1.5 text-[13px] font-medium transition-colors hover:bg-black/[0.04] dark:border-white/15 dark:hover:bg-white/10"
      >
        {flipped ? "Show question" : "Show answer"}
      </button>
    </div>
  );
}

function PollView({ card }: { card: Extract<MockCard, { kind: "poll" }> }) {
  const total = Math.max(1, card.options.reduce((sum, option) => sum + option.votes, 0));
  return (
    <div>
      <p className="text-[15px] font-medium leading-6 md:text-[16px]">{card.question}</p>
      <ul className="mt-4 space-y-2.5">
        {card.options.map((option) => {
          const share = Math.round((option.votes / total) * 100);
          return (
            <li key={option.label}>
              <div className="flex items-center justify-between text-[13px] md:text-[14px]">
                <span>{option.label}</span>
                <span className={MUTED}>{option.votes}</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/10">
                <div className="h-full rounded-full bg-emerald-500/80" style={{ width: `${share}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ChartView({ card }: { card: Extract<MockCard, { kind: "chart" }> }) {
  const max = Math.max(1, ...card.bars.map((bar) => bar.value));
  return (
    <div>
      <p className="text-[15px] font-medium md:text-[16px]">{card.title}</p>
      <div className="mt-5 flex h-36 items-end gap-3">
        {card.bars.map((bar) => (
          <div key={bar.label} className="flex min-w-0 flex-1 flex-col items-center gap-2">
            <div
              className="w-full rounded-t-lg bg-gradient-to-t from-[#5e9fe0] to-[#93a9f6] dark:from-[#1b3d78] dark:to-[#5e6fd6]"
              style={{ height: `${Math.max(8, (bar.value / max) * 100)}%` }}
            />
            <span className={cn("w-full truncate text-center text-[11px] md:text-[12px]", MUTED)}>{bar.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockCardBody({ card }: { card: ChatMock | MockCard }) {
  switch (card.kind) {
    case "chat":
      return <ChatMockView card={card} />;

    case "files":
      return (
        <div>
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black/[0.05] dark:bg-white/10">
              <Files className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[16px] font-medium md:text-[17px]">{card.title}</p>
              {card.subtitle ? <p className="text-[14px] text-emerald-600 dark:text-emerald-400">{card.subtitle}</p> : null}
            </div>
            <span
              aria-label="Download"
              className="inline-flex shrink-0 items-center rounded-full border border-black/10 p-2.5 dark:border-white/15"
            >
              <Download className="h-4 w-4" />
            </span>
          </div>
          <ul className="mt-4 divide-y divide-black/5 dark:divide-white/10">
            {card.files.map((file) => (
              <li key={file.name} className="flex items-center gap-3 py-2.5 text-[14px] md:text-[15px]">
                <FileText className={cn("h-4 w-4 shrink-0", MUTED)} />
                <span className="min-w-0 flex-1 truncate">{file.name}</span>
                {file.size ? <span className={cn("shrink-0 tabular-nums", MUTED)}>{file.size}</span> : null}
              </li>
            ))}
          </ul>
        </div>
      );

    case "whatsapp":
      return (
        <div>
          <div className="flex items-center gap-3">
            <img src={WHATSAPP_LOGO} alt="WhatsApp" className="h-9 w-9 shrink-0 object-contain" />
            <div className="min-w-0">
              <p className="text-[16px] font-medium md:text-[17px]">{card.sender}</p>
              <p className={cn("text-[13px]", MUTED)}>WhatsApp</p>
            </div>
          </div>
          <div className="mt-4 rounded-2xl rounded-tl-md bg-[#e7f8ee] px-4 py-3 text-[14px] leading-6 md:text-[15px] dark:bg-[#12291c]">
            <p className="whitespace-pre-line">{card.text}</p>
            <p className={cn("mt-1.5 flex items-center justify-end gap-1 text-[12px]", MUTED)}>
              {card.time ?? ""}
              <CheckCheck className="h-3.5 w-3.5 text-sky-500" />
            </p>
          </div>
        </div>
      );

    case "pullRequest":
      return (
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/[0.05] dark:bg-white/10">
              <img src={GITHUB_LOGO} alt="GitHub" className="h-5 w-5 object-contain dark:invert" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-[16px] font-medium md:text-[17px]">
                <GitPullRequest className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                {card.title}
              </p>
              <p className={cn("truncate font-mono text-[12px] md:text-[13px]", MUTED)}>{card.branch}</p>
            </div>
          </div>
          <p className="mt-4 rounded-xl bg-black/[0.04] px-3 py-2 text-[13px] md:text-[14px] dark:bg-white/[0.06]">{card.status}</p>
        </div>
      );

    case "poll":
      return <PollView card={card} />;

    case "people":
      return (
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <p className="text-[15px] font-medium md:text-[16px]">{card.title}</p>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {card.people.map((person) => (
              <li
                key={person}
                className="inline-flex items-center gap-2 rounded-full bg-black/[0.05] py-1 pl-1 pr-3 text-[13px] dark:bg-white/10"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#4fc1b0] to-[#93a9f6] text-[11px] font-semibold text-white">
                  {person.charAt(0).toUpperCase()}
                </span>
                {person}
              </li>
            ))}
          </ul>
          {card.note ? <p className={cn("mt-3 text-[13px]", MUTED)}>{card.note}</p> : null}
        </div>
      );

    case "flashcard":
      return <FlashcardView card={card} />;

    case "planner":
      return (
        <div>
          <div className="flex items-center gap-3">
            <p className="min-w-0 flex-1 truncate text-[15px] font-medium md:text-[16px]">{card.title}</p>
            {card.chip ? (
              <span className="shrink-0 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[12px] font-medium text-emerald-700 dark:text-emerald-300">
                {card.chip}
              </span>
            ) : null}
          </div>
          <ul className="mt-4 space-y-2">
            {card.items.map((item) => (
              <li key={item.label} className="flex items-center gap-2.5 text-[14px] md:text-[15px]">
                {item.done ? (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Check className="h-3 w-3" />
                  </span>
                ) : (
                  <Circle className={cn("h-4 w-4", MUTED)} />
                )}
                <span className={cn(item.done && "text-black/50 line-through dark:text-white/50")}>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "status":
      return (
        <div className="flex items-center gap-4">
          <span
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
              card.tone === "info"
                ? "bg-sky-500/15 text-sky-600 dark:text-sky-400"
                : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
            )}
          >
            {card.tone === "info" ? <Info className="h-5 w-5" /> : <Check className="h-5 w-5" />}
          </span>
          <div className="min-w-0">
            <p className="text-[16px] font-medium md:text-[17px]">{card.title}</p>
            <p className={cn("text-[14px]", SOFT)}>{card.subtitle}</p>
          </div>
        </div>
      );

    case "chart":
      return <ChartView card={card} />;

    case "list":
      return (
        <div>
          <p className="text-[15px] font-medium md:text-[16px]">{card.title}</p>
          <ul className="mt-3 divide-y divide-black/5 dark:divide-white/10">
            {card.rows.map((row) => (
              <li key={row.label} className="flex items-center gap-3 py-2.5 text-[14px] md:text-[15px]">
                <span className="min-w-0 flex-1 truncate">{row.label}</span>
                {row.value ? <span className={cn("shrink-0", MUTED)}>{row.value}</span> : null}
              </li>
            ))}
          </ul>
        </div>
      );

    case "schedule":
      return (
        <div>
          <div className="flex items-center gap-3">
            <CalendarClock className="h-4 w-4 shrink-0" />
            <p className="min-w-0 flex-1 truncate text-[15px] font-medium md:text-[16px]">{card.title}</p>
            {card.badge ? (
              <span className="shrink-0 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[12px] font-medium text-emerald-700 dark:text-emerald-300">
                {card.badge}
              </span>
            ) : null}
          </div>
          <ul className="mt-4 divide-y divide-black/5 dark:divide-white/10">
            {card.rows.map((row) => (
              <li key={row.label} className="flex items-center gap-3 py-2.5 text-[14px] md:text-[15px]">
                <span className={cn("w-24 shrink-0", MUTED)}>{row.label}</span>
                <span className="min-w-0 truncate">{row.value}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    default:
      return null;
  }
}

export function MockCardView({ card, variant }: { card: ChatMock | MockCard; variant: "main" | "floating" }) {
  return (
    <div className={variant === "main" ? MAIN_SHELL : FLOATING_SHELL}>
      <MockCardBody card={card} />
    </div>
  );
}
