import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/sections/Reveal";

// chat.classgrid.in has three plans: Free, Pro and Max. Prices and limits live on classgrid.in/pricing,
// so the cards show the real steps and never type prices or limits.
const CHAT_APP_URL = "https://chat.classgrid.in";

const STEPS = [
  {
    title: "Sign up",
    description: "Create your account with your email and a password.",
    highlight: "01",
    cta: "Create account",
    href: `${CHAT_APP_URL}/login`,
  },
  {
    title: "Verify WhatsApp",
    description: "Link your number so the agent can send reminders and scheduled messages.",
    highlight: "02",
    cta: "Verify number",
    href: `${CHAT_APP_URL}/login`,
  },
  {
    title: "Start on Free",
    description: "Free costs nothing. Move to Pro or Max when you need more.",
    highlight: "Free",
    cta: "Use Agent",
    href: CHAT_APP_URL,
  },
];

export function AgentGetStartedSection() {
  return (
    <section className="bg-background text-[#0d0d0d] dark:bg-black dark:text-white">
      <div className="mx-auto max-w-[1728px] px-5 pb-24 md:px-10 md:pb-32 lg:pb-40">
        <Reveal className="text-center">
          <h2 className="text-balance text-4xl font-medium tracking-[-0.035em] md:text-5xl lg:text-[64px]">
            Get started
          </h2>
          <p className="mt-6 text-lg text-black/80 md:text-[21px] dark:text-white/75">
            Your own AI agent in three steps.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-[1520px] gap-5 md:mt-16 md:grid-cols-3 lg:gap-9">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-black/10 p-6 md:p-7 dark:border-white/10 dark:bg-[#0f0f0f]">
                <h3 className="text-3xl font-medium tracking-[-0.02em] md:text-[40px] md:leading-[1.15]">
                  {step.title}
                </h3>
                <p className="mt-3 text-lg leading-8 text-black/80 md:text-[21px] md:leading-[1.65] dark:text-white/70">
                  {step.description}
                </p>

                <p className="mt-auto pt-12 text-5xl font-medium tabular-nums tracking-[-0.04em] md:pt-16 md:text-[64px] md:leading-none">
                  {step.highlight}
                </p>

                <a
                  href={step.href}
                  className="mt-8 inline-flex h-14 items-center justify-center gap-1.5 rounded-full bg-[#0d0d0d] text-[17px] font-medium text-white transition-opacity hover:opacity-85 dark:bg-white dark:text-black"
                >
                  {step.cta}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
