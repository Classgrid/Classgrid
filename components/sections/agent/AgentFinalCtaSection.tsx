import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/sections/Reveal";

const CHAT_APP_URL = "https://chat.classgrid.in";

// Closing band: echoes the Codex hero (icon tile, big centred headline, two pill buttons) so the page ends
// where it started.
export function AgentFinalCtaSection() {
  return (
    <section className="bg-background text-[#0d0d0d] dark:bg-black dark:text-white">
      <div className="mx-auto max-w-[1728px] px-5 pb-24 md:px-10 md:pb-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4fc1b0] via-[#5e9fe0] to-[#93a9f6] px-6 py-20 text-center md:py-28 lg:py-36 dark:from-[#0d4f49] dark:via-[#1b3d78] dark:to-[#363d8c]">
            <div aria-hidden className="pointer-events-none absolute -left-24 -top-32 h-[26rem] w-[26rem] rounded-full bg-white/40 blur-3xl dark:bg-white/10" />
            <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-16 h-[30rem] w-[30rem] rounded-full bg-[#c7d2fe]/55 blur-3xl dark:bg-[#6366f1]/20" />

            <div className="relative">
              <img
                src="/logo.png"
                alt="Classgrid"
                className="mx-auto h-[72px] w-[72px] object-contain drop-shadow-[0_10px_24px_rgba(30,27,75,0.28)] md:h-[88px] md:w-[88px]"
              />

              <h2 className="mx-auto mt-10 max-w-4xl text-balance text-4xl font-medium leading-[1.06] tracking-[-0.035em] md:text-6xl lg:text-[72px]">
                Start working with Classgrid AI
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-black/80 md:text-[21px] dark:text-white/80">
                Sign up with your email and give the agent its first task.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={CHAT_APP_URL}
                  className="inline-flex h-12 items-center gap-1.5 rounded-full bg-[#0d0d0d] px-7 text-[16px] font-medium text-white transition-opacity hover:opacity-85 md:h-14 md:text-[17px] dark:bg-white dark:text-black"
                >
                  Use Agent
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <Link
                  href="/demo"
                  className="inline-flex h-12 items-center rounded-full bg-white/60 px-7 text-[16px] font-medium backdrop-blur transition-colors hover:bg-white/80 md:h-14 md:text-[17px] dark:bg-white/10 dark:hover:bg-white/15"
                >
                  Book a demo
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
