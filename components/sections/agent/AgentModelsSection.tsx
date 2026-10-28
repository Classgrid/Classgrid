import { Check, Sparkles } from "lucide-react";
import { Reveal } from "@/components/sections/Reveal";
import { cn } from "@/lib/utils";

// Mirrors the model picker in the Classgrid app (client ModelPicker.tsx): same names, descriptions and logos.
const ICON_BASE = "https://cdn.classgrid.in/classgrid_intgration";

type Logo = { src: string; alt: string; className?: string };

const LOGO = {
  claude: { src: `${ICON_BASE}/Claude_AI_symbol.svg`, alt: "Claude" },
  deepseek: { src: `${ICON_BASE}/DeepSeek_logo.svg`, alt: "DeepSeek", className: "scale-[1.7]" },
} satisfies Record<string, Logo>;

const MODEL_GROUPS: { label: string; models: { name: string; description: string; logo: Logo }[] }[] = [
  {
    label: "Claude",
    models: [
      { name: "Claude Haiku 5.5", description: "Fastest, for quick everyday answers", logo: LOGO.claude },
      { name: "Claude Sonnet 5.5", description: "Best mix of speed and intelligence", logo: LOGO.claude },
      { name: "Claude Opus 5.5", description: "Complex projects, coding and agents", logo: LOGO.claude },
      { name: "Claude Fable 5.1", description: "Most capable, for the hardest reasoning", logo: LOGO.claude },
    ],
  },
  {
    label: "DeepSeek",
    models: [
      { name: "DeepSeek V4 Pro", description: "Strong reasoning and tool use", logo: LOGO.deepseek },
      { name: "DeepSeek V4 Flash", description: "Fast and low cost", logo: LOGO.deepseek },
    ],
  },
];

// The "More models" group: GPT-OSS, Kimi, GLM, Qwen, Gemma, Nemotron, Llama, Mistral (13 models)
const MORE_MODELS_COUNT = 13;
const MORE_LOGOS: Logo[] = [
  { src: `${ICON_BASE}/chatgpt-light_(1).svg`, alt: "GPT-OSS" },
  { src: `${ICON_BASE}/kimi-ai-icon.svg`, alt: "Kimi" },
  { src: `${ICON_BASE}/glmv-color.svg`, alt: "GLM" },
  { src: `${ICON_BASE}/Qwen_logo.svg`, alt: "Qwen" },
  { src: `${ICON_BASE}/google.svg`, alt: "Gemma" },
  { src: `${ICON_BASE}/nvidia-nemotron.svg`, alt: "Nemotron" },
  { src: `${ICON_BASE}/Meta_Platforms_logo.svg`, alt: "Llama" },
  { src: `${ICON_BASE}/mistral-ai-icon.svg`, alt: "Mistral" },
];

function ModelLogo({ logo }: { logo: Logo }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-black/5 dark:ring-white/10">
      <img src={logo.src} alt={logo.alt} loading="lazy" className={cn("h-5 w-5 object-contain", logo.className)} />
    </span>
  );
}

export function AgentModelsSection() {
  let rowIndex = 0; // staggers the rows like a menu opening

  return (
    <section className="bg-background text-[#0d0d0d] dark:bg-black dark:text-white">
      <div className="mx-auto max-w-[1728px] px-5 pb-24 md:px-10 md:pb-32 lg:pb-40">
        <Reveal className="mx-auto max-w-[68rem] text-center">
          <h2 className="text-balance text-4xl font-medium leading-[1.08] tracking-[-0.035em] md:text-5xl lg:text-[64px]">
            Pick the right model for every task
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg leading-8 text-black/80 md:mt-8 md:text-[21px] md:leading-[1.65] dark:text-white/75">
            Let Auto choose for you, or pick from Claude, DeepSeek and {MORE_MODELS_COUNT} more models. Switch any
            time, even in the middle of a chat.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 md:mt-20">
          <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#d4d4d8] via-[#5e9fe0] to-[#93a9f6] px-4 py-10 sm:px-8 md:py-16 dark:from-[#27272a] dark:via-[#1b3d78] dark:to-[#363d8c]">
            <div aria-hidden className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-white/35 blur-3xl dark:bg-white/10" />
            <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-10 h-[28rem] w-[28rem] rounded-full bg-[#c7d2fe]/50 blur-3xl dark:bg-[#6366f1]/20" />

            {/* Model picker menu */}
            <div className="relative mx-auto max-w-[560px] rounded-2xl bg-white/75 p-2 shadow-xl ring-1 ring-white/60 backdrop-blur-xl dark:bg-black/55 dark:ring-white/10">
              <Reveal delay={0.15 + rowIndex++ * 0.05} distance={12}>
                <div className="flex items-start gap-3 rounded-xl bg-black/[0.05] px-3 py-2.5 dark:bg-white/10">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0d0d0d] text-white dark:bg-white dark:text-black">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-medium">Auto</span>
                    <span className="block text-[13px] text-black/55 dark:text-white/55">
                      Picks the best model for each message
                    </span>
                  </span>
                  <Check className="mt-1 h-4 w-4 shrink-0" />
                </div>
              </Reveal>

              {MODEL_GROUPS.map((group) => (
                <div key={group.label}>
                  <p className="px-3 pb-1 pt-3 text-[12px] font-medium uppercase tracking-wider text-black/45 dark:text-white/45">
                    {group.label}
                  </p>
                  {group.models.map((model) => (
                    <Reveal key={model.name} delay={0.15 + rowIndex++ * 0.05} distance={12}>
                      <div className="flex items-start gap-3 rounded-xl px-3 py-2.5">
                        <ModelLogo logo={model.logo} />
                        <span className="min-w-0 flex-1">
                          <span className="block text-[15px] font-medium">{model.name}</span>
                          <span className="block text-[13px] text-black/55 dark:text-white/55">{model.description}</span>
                        </span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              ))}

              <Reveal delay={0.15 + rowIndex++ * 0.05} distance={12}>
                <div className="mt-1 flex items-center gap-3 border-t border-black/5 px-3 pb-2 pt-3.5 dark:border-white/10">
                  <span className="flex -space-x-2">
                    {MORE_LOGOS.map((logo) => (
                      <span
                        key={logo.alt}
                        title={logo.alt}
                        className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-white ring-2 ring-white dark:ring-[#1a1a1a]"
                      >
                        <img src={logo.src} alt={logo.alt} loading="lazy" className="h-4 w-4 object-contain" />
                      </span>
                    ))}
                  </span>
                  <span className="text-[14px] font-medium">+{MORE_MODELS_COUNT} more models</span>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
