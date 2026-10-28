"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Headphones,
  Terminal,
  CreditCard,
  ShieldCheck,
  Plug,
  Bot,
  MessageSquare,
  Ticket,
  Clock,
  CheckCircle2,
  ExternalLink,
  CalendarDays,
  Key,
  UserCog,
  FileUp,
  MessageCircle,
  Globe
} from "lucide-react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { SectionAccentBar } from "@/components/ui/section-accent-bar";
import { buildLangHref, type SupportedLang } from "@/lib/locale";

const CATEGORIES = [
  {
    title: "Agent Mode",
    value: "ai",
    description: "Answers, tool steps, research, or a task that stopped midway.",
    icon: Bot,
    delay: 0.1,
  },
  {
    title: "Project Mode",
    value: "project-mode",
    description: "Your repo, the code editor, pull requests, and deploys.",
    icon: Terminal,
    delay: 0.15,
  },
  {
    title: "Billing & Credits",
    value: "billing",
    description: "Plans, top-ups, invoices, and payments.",
    icon: CreditCard,
    delay: 0.2,
  },
  {
    title: "WhatsApp & Calls",
    value: "whatsapp",
    description: "Messaging or calling the agent on WhatsApp.",
    icon: MessageCircle,
    delay: 0.25,
  },
  {
    title: "Connected Apps",
    value: "connected-apps",
    description: "Gmail, Drive, Calendar, Notion, Slack, GitHub, Vercel and more.",
    icon: Plug,
    delay: 0.3,
  },
  {
    title: "Schedules & Background Tasks",
    value: "schedules",
    description: "Daily briefs, reminders, and long tasks that report back.",
    icon: CalendarDays,
    delay: 0.35,
  },
  {
    title: "Files & Uploads",
    value: "documents",
    description: "PDFs, spreadsheets, images, and files the agent made.",
    icon: FileUp,
    delay: 0.4,
  },
  {
    title: "Account & Login",
    value: "login",
    description: "Sign-in codes, passwords, and login errors.",
    icon: Key,
    delay: 0.45,
  },
  {
    title: "Profile & Settings",
    value: "profile",
    description: "Personal info, notification preferences, and display issues.",
    icon: UserCog,
    delay: 0.5,
  },
  {
    title: "Privacy & Security",
    value: "privacy",
    description: "Your data, connected access, and account safety.",
    icon: ShieldCheck,
    delay: 0.55,
  },
  {
    title: "Mobile & Browser",
    value: "mobile-browser",
    description: "Slow loading, phone layout, and browser issues.",
    icon: Globe,
    delay: 0.6,
  },
];

export default function SupportPageClient({ lang }: { lang: SupportedLang }) {
  const { status } = useSession();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const ticketUrl = buildLangHref("/support/ticket", lang);

  return (
    <main className="relative min-h-screen bg-background text-foreground pt-24 pb-16 overflow-hidden selection:bg-foreground/20 transition-colors duration-300 font-sans">
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-0 w-full h-[800px] overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[100vw] h-[60vw] rounded-full bg-foreground/5 blur-[120px] opacity-70" />
        <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-foreground/5 blur-[100px] opacity-50" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
        {/* Subtle grid pattern for light and dark */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Hero Section */}
      <section className="px-6 max-w-5xl mx-auto text-center mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <SectionAccentBar />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
            Get the answers, guidance and <br className="hidden md:block" />
            <span className="text-muted-foreground">support you need</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
            Answers and help for everything Classgrid AI, from getting started to billing.
          </p>
        </motion.div>
      </section>

      {/* Support Ticket Card */}
      <section className="px-6 max-w-3xl mx-auto mb-16 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="group relative p-[1px] rounded-[32px] overflow-hidden transition-all duration-500 bg-border hover:bg-foreground/20 shadow-xl"
        >
          <div className="relative h-full bg-card border-none rounded-[31px] p-8 md:p-12 flex flex-col backdrop-blur-xl transition-colors z-10 overflow-hidden">
            <div className="flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center mb-8">
                <Ticket className="w-6 h-6 text-foreground" />
              </div>

              <h2 className="text-3xl font-bold mb-4 text-foreground">How can we help?</h2>
              <p className="text-muted-foreground leading-relaxed mb-8 flex-1 text-lg font-light">
                Tell us what&apos;s going on with Classgrid AI, whether it&apos;s a bug, a billing question or anything else. Our team reads every request and replies by email.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-foreground shrink-0" />
                  <span className="text-sm text-muted-foreground">Quick replies from real people</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-foreground shrink-0" />
                  <span className="text-sm text-muted-foreground">Help for every user, on every plan</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-foreground shrink-0" />
                  <span className="text-sm text-muted-foreground">Track your request until it&apos;s resolved</span>
                </div>
              </div>

              <div className="mt-auto">
                <Link href={ticketUrl} className="block w-full">
                  <Button
                    className="w-full h-14 rounded-xl text-base font-bold border-transparent bg-foreground text-background hover:border-transparent hover:bg-zinc-700 hover:text-background dark:bg-foreground dark:text-background dark:hover:bg-zinc-300 dark:hover:text-background transition-colors duration-300"
                  >
                    Submit a Request
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Support Categories Grid */}
      <section className="px-6 max-w-[1400px] mx-auto mb-16 relative z-10">
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-4">Select a Category</h3>
          <p className="text-muted-foreground">Quickly route your ticket to the correct department.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((category) => {
            const IconComp = category.icon;
            return (
              <Link key={category.title} href={`${ticketUrl}?category=${category.value}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: category.delay }}
                  className="group relative flex flex-col items-start p-6 rounded-2xl bg-card border border-border hover:border-foreground/30 hover:shadow-lg transition-all duration-300 text-left overflow-hidden h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-foreground/30 transition-all duration-300 shadow-sm">
                    <IconComp className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  <h4 className="text-base font-bold text-foreground mb-2 group-hover:text-foreground transition-colors">
                    {category.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {category.description}
                  </p>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </section>

    </main>
  );
}
