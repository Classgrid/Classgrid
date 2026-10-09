import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const CHAT_APP_URL = "https://chat.classgrid.in";
const ICON_BASE = "https://cdn.classgrid.in/classgrid_intgration";

// Codex shows "Trusted by top teams" + monochrome logos. We show the model makers the agent really runs
// (same logo files as the app's model picker), turned black like a wordmark strip.
const MODEL_MAKERS = [
  { name: "Claude", src: `${ICON_BASE}/Claude_AI_symbol.svg` },
  { name: "Google", src: `${ICON_BASE}/google.svg` },
  { name: "OpenAI", src: `${ICON_BASE}/chatgpt-light_(1).svg` },
  { name: "Meta", src: `${ICON_BASE}/Meta_Platforms_logo.svg` },
  { name: "Mistral", src: `${ICON_BASE}/mistral-ai-icon.svg` },
];

// Fine grain, like the brushed texture on the Codex hero
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

// Brushed streaks, only along the bright ribbon (masked to a diagonal band)
const STREAKS =
  "repeating-linear-gradient(-56deg, rgba(255,255,255,0.65) 0px, rgba(255,255,255,0.65) 1px, transparent 1px, transparent 5px), repeating-linear-gradient(-61deg, rgba(255,255,255,0.35) 0px, rgba(255,255,255,0.35) 1px, transparent 1px, transparent 11px)";
const RIBBON_MASK = "linear-gradient(115deg, transparent 0%, #000 12%, #000 52%, transparent 72%)";

// The Codex hero is a slowly flowing silk: a white-lilac ribbon sweeps from bottom-left to the top, a deep
// cobalt fold drifts on the right. Text and buttons stay still.
const HERO_CSS = `
@keyframes cgh-ribbon  { 0%{transform:translate3d(-4%,3%,0) rotate(-33deg) scaleY(1)} 50%{transform:translate3d(3%,-2%,0) rotate(-28deg) scaleY(1.18)} 100%{transform:translate3d(-1%,-4%,0) rotate(-36deg) scaleY(1.05)} }
@keyframes cgh-ribbon2 { 0%{transform:translate3d(2%,-2%,0) rotate(-35deg)} 50%{transform:translate3d(-3%,3%,0) rotate(-30deg)} 100%{transform:translate3d(1%,1%,0) rotate(-38deg)} }
@keyframes cgh-fold    { 0%{transform:translate3d(0,0,0) rotate(14deg) scale(1)} 50%{transform:translate3d(-6%,4%,0) rotate(6deg) scale(1.12)} 100%{transform:translate3d(-2%,-3%,0) rotate(18deg) scale(1.04)} }
@keyframes cgh-glow    { 0%{transform:translate3d(0,0,0) scale(1);opacity:.7} 50%{transform:translate3d(6%,4%,0) scale(1.15);opacity:1} 100%{transform:translate3d(-3%,-2%,0) scale(1.05);opacity:.8} }
@keyframes cgh-streak  { from{background-position:0 0,0 0} to{background-position:-420px 260px,-300px 180px} }
@keyframes cgh-rise    { from{opacity:0;transform:translate3d(0,20px,0)} to{opacity:1;transform:none} }
@keyframes cgh-pop     { from{opacity:0;transform:scale(.88)} to{opacity:1;transform:none} }
.cgh-ribbon{animation:cgh-ribbon 20s ease-in-out infinite alternate}
.cgh-ribbon2{animation:cgh-ribbon2 16s ease-in-out infinite alternate}
.cgh-fold{animation:cgh-fold 24s ease-in-out infinite alternate}
.cgh-glow{animation:cgh-glow 18s ease-in-out infinite alternate}
.cgh-streak{animation:cgh-streak 36s linear infinite}
.cgh-rise{opacity:0;animation:cgh-rise .9s cubic-bezier(.2,.7,.2,1) forwards}
.cgh-pop{opacity:0;animation:cgh-pop .8s cubic-bezier(.2,.7,.2,1) forwards}
@media (prefers-reduced-motion: reduce){
  .cgh-ribbon,.cgh-ribbon2,.cgh-fold,.cgh-glow,.cgh-streak{animation:none}
  .cgh-rise,.cgh-pop{animation:none;opacity:1}
}
`;

export function AgentHeroSection() {
  return (
    // Same bright Codex-style hero in light and dark mode (black text on the silk); it melts into the page below.
    <section className="relative isolate overflow-hidden text-[#0d0d0d]">
      <style>{HERO_CSS}</style>

      {/* ── Animated silk background ── */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {/* Periwinkle base, deeper cobalt to the right */}
        <div className="absolute inset-0 bg-[linear-gradient(115deg,#9fabf5_0%,#93a0f4_32%,#8c95f3_58%,#8188f1_82%,#7479ef_100%)]" />
        {/* Lilac light near the top */}
        <div className="cgh-glow absolute left-[22%] top-[-35%] h-[85%] w-[55%] rounded-full bg-[#efe4fb]/70 blur-[120px]" />

        {/* Wide white-lilac ribbon, bottom-left to top */}
        <div className="cgh-ribbon absolute left-[-30%] top-[20%] h-[46%] w-[115%] rounded-[50%] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.78)_30%,rgba(244,232,250,0.72)_55%,transparent_92%)] blur-[85px]" />
        {/* Thin bright core of the ribbon */}
        <div className="cgh-ribbon2 absolute left-[-12%] top-[42%] h-[12%] w-[85%] rounded-[50%] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.6)_40%,rgba(255,255,255,0.4)_65%,transparent_100%)] blur-[34px]" />

        {/* Deep cobalt fold on the right */}
        <div className="cgh-fold absolute right-[-22%] top-[-20%] h-[125%] w-[42%] rounded-[46%] bg-[linear-gradient(200deg,rgba(80,86,236,0.75)_0%,rgba(92,99,240,0.55)_55%,rgba(92,99,240,0)_100%)] blur-[70px]" />
        {/* Deep corner, bottom-right */}
        <div className="absolute bottom-[-35%] right-[-12%] h-[70%] w-[48%] rounded-full bg-[#5155e4]/45 blur-[110px]" />

        {/* Brushed streaks along the ribbon + grain */}
        <div
          className="cgh-streak absolute inset-0 opacity-[0.38] mix-blend-soft-light"
          style={{ backgroundImage: STREAKS, maskImage: RIBBON_MASK, WebkitMaskImage: RIBBON_MASK }}
        />
        <div className="absolute inset-0 opacity-[0.16] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />

        {/* Melts into the page / preview below */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-background dark:to-black" />
      </div>

      {/* ── Content ── */}
      <div className="mx-auto flex max-w-[1728px] flex-col items-center px-5 pb-44 pt-24 text-center md:px-10 md:pt-[120px]">
        <img
          src="/logo.png"
          alt="Classgrid"
          className="cgh-pop h-[72px] w-[72px] object-contain drop-shadow-[0_10px_24px_rgba(30,27,75,0.28)] md:h-[92px] md:w-[92px]"
          style={{ animationDelay: "0.05s" }}
        />

        <h1
          className="cgh-rise mt-12 max-w-[72rem] text-balance text-[44px] font-medium leading-[1.05] tracking-[-0.035em] sm:text-6xl md:mt-16 lg:whitespace-nowrap lg:text-[78px]"
          style={{ animationDelay: "0.15s" }}
        >
          Do anything with Classgrid AI
        </h1>

        <p
          className="cgh-rise mt-6 max-w-3xl text-pretty text-lg leading-8 text-black/85 md:mt-8 md:text-[22px]"
          style={{ animationDelay: "0.28s" }}
        >
          Ask, research, analyse your files and automate your everyday work.
        </p>

        <div className="cgh-rise mt-10 flex flex-wrap items-center justify-center gap-3 md:mt-12" style={{ animationDelay: "0.4s" }}>
          <a
            href={CHAT_APP_URL}
            className="inline-flex h-12 items-center gap-1.5 rounded-full bg-[#0d0d0d] px-7 text-[16px] font-medium text-white transition-opacity hover:opacity-85 md:h-14 md:px-8 md:text-[17px]"
          >
            Use Agent
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <Link
            href="/demo"
            className="inline-flex h-12 items-center rounded-full bg-white/40 px-7 text-[16px] font-medium text-[#0d0d0d] backdrop-blur-md transition-colors hover:bg-white/60 md:h-14 md:px-8 md:text-[17px]"
          >
            Book a demo
          </Link>
        </div>

        {/* "Trusted by top teams" strip */}
        <div className="cgh-rise mt-24 w-full md:mt-[110px]" style={{ animationDelay: "0.55s" }}>
          <p className="text-lg text-black/85 md:text-[22px]">Powered by leading AI models</p>
          <ul className="mx-auto mt-10 flex max-w-[1600px] flex-wrap items-center justify-center gap-x-14 gap-y-8 md:mt-14 lg:justify-between lg:px-6">
            {MODEL_MAKERS.map((maker) => (
              <li key={maker.name} className="flex items-center gap-3 text-[26px] font-semibold tracking-[-0.02em] md:text-[32px]">
                <span className="flex h-8 w-8 items-center justify-center overflow-hidden md:h-10 md:w-10">
                  <img
                    src={maker.src}
                    alt=""
                    className={cn("h-full w-full object-contain brightness-0", maker.iconClassName)}
                  />
                </span>
                {maker.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
