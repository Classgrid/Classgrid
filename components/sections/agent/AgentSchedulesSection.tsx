import { CalendarClock, CheckCheck, Ellipsis, Repeat, Send } from "lucide-react";
import { Reveal } from "@/components/sections/Reveal";

// Scheduled tasks (Schedule page + schedule worker) delivered on WhatsApp — features the agent has today.
const WHATSAPP_LOGO = "https://cdn.classgrid.in/classgrid_intgration/whatsapp-svgrepo-com_(1).svg";

const SCHEDULE_ROWS = [
  { icon: Repeat, label: "Repeats", value: "Every Monday, 8:00 AM" },
  { icon: Send, label: "Send to", value: "WhatsApp" },
  { icon: CalendarClock, label: "Next run", value: "Monday · 8:00 AM" },
];

export function AgentSchedulesSection() {
  return (
    <section className="bg-background text-[#0d0d0d] dark:bg-black dark:text-white">
      <div className="mx-auto max-w-[1728px] px-5 pb-24 md:px-10 md:pb-32 lg:pb-40">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          {/* Text: right on desktop (mirrors the "real work" block), first on phones */}
          <Reveal className="lg:order-2 lg:col-span-4 lg:pb-8">
            <h3 className="text-balance text-3xl font-medium leading-[1.12] tracking-[-0.03em] md:text-[44px]">
              Works while you&apos;re away
            </h3>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-black/75 md:text-[21px] md:leading-[1.65] dark:text-white/70">
              Ask once and the agent keeps going. Schedule daily briefs, weekly reports and reminders, and get
              the results straight on WhatsApp.
            </p>
          </Reveal>

          {/* Visual */}
          <Reveal delay={0.1} className="lg:order-1 lg:col-span-8">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-bl from-[#4fc1b0] via-[#5e9fe0] to-[#93a9f6] p-4 sm:p-6 md:aspect-[16/10] md:p-0 lg:aspect-[16/9] dark:from-[#0d4f49] dark:via-[#1b3d78] dark:to-[#363d8c]">
              {/* Soft light blobs */}
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full bg-white/35 blur-3xl dark:bg-white/10" />
              <div aria-hidden className="pointer-events-none absolute -bottom-28 left-10 h-96 w-96 rounded-full bg-[#c7d2fe]/50 blur-3xl dark:bg-[#6366f1]/20" />

              {/* Schedule card */}
              <div className="relative rounded-2xl bg-white/60 p-5 shadow-sm ring-1 ring-white/60 backdrop-blur-xl md:absolute md:right-[7%] md:top-[9%] md:w-[60%] md:p-7 dark:bg-black/45 dark:ring-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-[15px] font-medium">Weekly attendance summary</span>
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[12px] font-medium text-emerald-700 dark:text-emerald-300">
                    Active
                  </span>
                  <Ellipsis className="ml-auto h-4 w-4 text-black/40 dark:text-white/40" />
                </div>

                <p className="mt-4 text-[14px] leading-6 text-black/60 md:text-[15px] dark:text-white/60">
                  Summarise last week&apos;s attendance and list students who missed 3 or more days.
                </p>

                <ul className="mt-5 divide-y divide-black/5 dark:divide-white/10">
                  {SCHEDULE_ROWS.map((row) => (
                    <li key={row.label} className="flex items-center gap-3 py-2.5 text-[14px] md:text-[15px]">
                      <row.icon className="h-4 w-4 shrink-0 text-black/40 dark:text-white/40" />
                      <span className="w-24 shrink-0 text-black/45 dark:text-white/45">{row.label}</span>
                      <span className="min-w-0 truncate">{row.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Floating WhatsApp message */}
              <Reveal
                delay={0.35}
                distance={24}
                className="relative mt-4 md:absolute md:bottom-[9%] md:left-[4%] md:mt-0 md:w-[50%]"
              >
                <div className="rounded-2xl bg-white p-5 shadow-xl ring-1 ring-black/5 md:p-6 dark:bg-[#0f0f0f] dark:ring-white/10">
                  <div className="flex items-center gap-3">
                    <img src={WHATSAPP_LOGO} alt="WhatsApp" className="h-9 w-9 shrink-0 object-contain" />
                    <div className="min-w-0">
                      <p className="text-[16px] font-medium md:text-[17px]">Classgrid AI</p>
                      <p className="text-[13px] text-black/45 dark:text-white/45">WhatsApp</p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl rounded-tl-md bg-[#e7f8ee] px-4 py-3 text-[14px] leading-6 md:text-[15px] dark:bg-[#12291c]">
                    <p>
                      Good morning! Last week&apos;s attendance was 94.2%. 3 students missed 3 or more days: Aarav
                      (Class 8B), Meera (Class 9A), Kabir (Class 10C).
                    </p>
                    <p className="mt-1.5 flex items-center justify-end gap-1 text-[12px] text-black/45 dark:text-white/45">
                      8:00 AM
                      <CheckCheck className="h-3.5 w-3.5 text-sky-500" />
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
