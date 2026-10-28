import { Reveal } from "@/components/sections/Reveal";
import { PluginsGrid, type PluginCardData } from "@/components/sections/plugins/PluginsGrid";
import { AgentFinalCtaSection } from "@/components/sections/agent/AgentFinalCtaSection";
import { PLUGINS } from "@/content/plugins";
import { buildPageMetadata } from "@/lib/metadata";
import { getPluginsPage } from "@/sanity/lib/marketing";

type PluginsPageData = {
  heading?: string | null;
  subheading?: string | null;
  plugins?: { _key: string; name?: string | null; logoUrl?: string | null; brandColor?: string | null; invertInDark?: boolean | null }[] | null;
};

const DEFAULT_HEADING = "Plugins";
const DEFAULT_SUBHEADING =
  "Connect the apps you use to Classgrid AI. The agent works as you inside them: it reads, searches, writes and takes action.";

export const metadata = buildPageMetadata({
  title: "Plugins",
  description: "Connect Classgrid AI to Gmail, Google Drive, Notion, Slack, GitHub, WhatsApp Business and more.",
  path: "/plugins",
});

export default async function PluginsPage() {
  const page = (await getPluginsPage()) as PluginsPageData | null;

  const sanityPlugins: PluginCardData[] = (page?.plugins ?? [])
    .filter((plugin) => plugin?.name?.trim() && plugin?.logoUrl)
    .map((plugin) => ({
      key: plugin._key,
      name: plugin.name!.trim(),
      logoUrl: plugin.logoUrl!,
      brandColor: plugin.brandColor,
      invertInDark: plugin.invertInDark,
    }));

  const plugins: PluginCardData[] = sanityPlugins.length
    ? sanityPlugins
    : PLUGINS.map((plugin) => ({
        key: plugin.id,
        name: plugin.name,
        logoUrl: plugin.logo,
        brandColor: plugin.brandColor,
        invertInDark: plugin.invertInDark,
      }));

  return (
    <div className="relative overflow-x-clip bg-background text-foreground dark:bg-black">
      <section className="relative text-[#0d0d0d] dark:text-white">
        <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-20 md:px-10 md:pb-20 md:pt-28">
          <Reveal className="mx-auto max-w-[68rem] text-center">
            <h1 className="text-balance text-[44px] font-medium leading-[1.05] tracking-[-0.035em] sm:text-6xl lg:text-[72px]">
              {page?.heading?.trim() || DEFAULT_HEADING}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg leading-8 text-black/80 md:mt-8 md:text-[21px] md:leading-[1.65] dark:text-white/75">
              {page?.subheading?.trim() || DEFAULT_SUBHEADING}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-14 md:mt-20">
            <PluginsGrid plugins={plugins} />
          </Reveal>
        </div>
      </section>

      <AgentFinalCtaSection />
    </div>
  );
}
