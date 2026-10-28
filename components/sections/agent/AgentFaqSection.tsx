"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/sections/Reveal";

// Every answer matches what the Classgrid app does today (models, plugins, file types, credits).
const FAQS: { question: string; answer: ReactNode }[] = [
  {
    question: "What is Classgrid AI?",
    answer:
      "An AI agent at chat.classgrid.in. It can chat, search the web, read your files, run Python, make charts and documents, and send scheduled messages on WhatsApp.",
  },
  {
    question: "Do I need a school or college account?",
    answer:
      "No. Anyone can sign up with an email. Institutions on Classgrid ERP can also use the agent inside their ERP.",
  },
  {
    question: "Why do you ask for my WhatsApp number?",
    answer:
      "To keep every account real, with one number per account, and so the agent can send you reminders and scheduled messages. It's verified with a one-time code.",
  },
  {
    question: "How does pricing work?",
    answer: "There's no fixed plan. Top up AI credits with any amount from ₹299 to ₹10,000 from Upgrade in the app.",
  },
  {
    question: "Which AI models can I use?",
    answer:
      "Auto picks a model for each message, or you can choose from 19 models, including Claude Haiku, Sonnet, Opus and Fable, DeepSeek V4, and open models like Kimi, GLM, Qwen and Llama.",
  },
  {
    question: "Which apps can it connect to?",
    answer:
      "20+ apps, including Gmail, Google Drive, Google Calendar, Notion, Slack, GitHub, Microsoft Outlook, Teams and Zoom. Connect them from Plugins in the app.",
  },
  {
    question: "What files can it read?",
    answer: "PDF, Word (.docx), PowerPoint (.pptx), Excel (.xlsx and .xls), CSV and text files, plus images.",
  },
  {
    question: "Can I delete my chats or disconnect apps?",
    answer: (
      <>
        Yes. You can delete any chat, and disconnect any connected app at any time from Plugins. Read our{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:opacity-70">
          Privacy Policy
        </Link>
        .
      </>
    ),
  },
];

function FaqItem({ question, answer, index }: { question: string; answer: ReactNode; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `agent-faq-${index}`;

  return (
    <li className="border-b border-black/10 dark:border-white/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium leading-snug transition-opacity hover:opacity-70 md:text-[21px]"
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
          className="shrink-0 text-black/50 dark:text-white/50"
        >
          <Plus className="h-5 w-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.35, ease: [0.33, 1, 0.68, 1] }, opacity: { duration: 0.2 } }}
            style={{ overflow: "hidden" }}
          >
            <p className="max-w-3xl pb-7 pr-10 text-base leading-7 text-black/70 md:text-lg md:leading-8 dark:text-white/65">
              {answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}

type AgentFaqSectionProps = {
  title?: string;
  faqs?: { question: string; answer: ReactNode }[];
};

export function AgentFaqSection({ title = "Frequently asked questions", faqs = FAQS }: AgentFaqSectionProps = {}) {
  return (
    <section className="bg-background text-[#0d0d0d] dark:bg-black dark:text-white">
      <div className="mx-auto max-w-[1520px] px-5 pb-24 md:px-10 md:pb-32 lg:pb-40">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <h2 className="text-balance text-4xl font-medium leading-[1.08] tracking-[-0.035em] md:text-5xl lg:sticky lg:top-28 lg:text-[56px]">
              {title}
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-8">
            <ul className="border-t border-black/10 dark:border-white/10">
              {faqs.map((faq, i) => (
                <FaqItem key={faq.question} question={faq.question} answer={faq.answer} index={i} />
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
