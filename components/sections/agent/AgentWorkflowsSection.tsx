import { Reveal } from "@/components/sections/Reveal";
import { cn } from "@/lib/utils";

// Same logo files the app's plugin panel uses (AskAiPanel INTEGRATIONS_LIST in the Classgrid app).
const CDN = "https://cdn.classgrid.in/classgrid_intgration";

const WORKFLOW_LOGOS = [
  { name: "Gmail", src: `${CDN}/Gmail_icon_(2026).svg` },
  { name: "Google Drive", src: `${CDN}/Google_Drive_icon_(2026).svg` },
  { name: "Notion", src: `${CDN}/Notion-logo.svg` },
  // Black mark: shown white in dark mode
  { name: "GitHub", src: `${CDN}/github-icon.svg`, invertInDark: true },
  { name: "Slack", src: `${CDN}/slack-new-logo-logo-svgrepo-com.svg` },
];

const CHAT_APP_URL = "https://chat.classgrid.in";

export function AgentWorkflowsSection() {
  return (
    <section className="bg-background text-[#0d0d0d] dark:bg-black dark:text-white">
      <div className="mx-auto max-w-[1728px] px-5 py-24 md:px-10 md:py-32 lg:py-40">
        <Reveal className="mx-auto max-w-[68rem] text-center">
          <h2 className="text-balance text-4xl font-medium leading-[1.08] tracking-[-0.035em] md:text-5xl lg:text-[64px]">
            Bring Classgrid AI into your workflows
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg leading-8 text-black/80 md:mt-8 md:text-[21px] md:leading-[1.65] dark:text-white/75">
            Connect Gmail, Google Drive, Notion, GitHub, Slack and 20+ apps. Give the agent the context and access
            it needs to take action across your tools, and do more of the work for you.
          </p>

          <a
            href={CHAT_APP_URL}
            className="mt-10 inline-block border-b border-current pb-1 text-lg font-medium transition-opacity hover:opacity-70 md:text-xl"
          >
            Browse integrations
          </a>
        </Reveal>

        <Reveal delay={0.1} className="mt-20 md:mt-28 lg:mt-36">
          <ul className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-center gap-x-16 gap-y-12 sm:gap-x-24 lg:flex-nowrap lg:justify-between lg:gap-x-0 lg:px-10">
            {WORKFLOW_LOGOS.map((logo) => (
              <li key={logo.name} className="flex basis-[28%] justify-center sm:basis-auto">
                <img
                  src={logo.src}
                  alt={logo.name}
                  title={logo.name}
                  loading="lazy"
                  className={cn(
                    "h-14 w-14 object-contain transition-transform duration-300 hover:-translate-y-1 md:h-20 md:w-20 lg:h-[92px] lg:w-[92px]",
                    logo.invertInDark && "dark:invert",
                  )}
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
