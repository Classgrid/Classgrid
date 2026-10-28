import { Reveal } from "@/components/sections/Reveal";
import { AgentFinalCtaSection } from "@/components/sections/agent/AgentFinalCtaSection";
import { UseCasesHub } from "@/components/use-cases/UseCasesHub";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/metadata";
import { getUseCases } from "@/lib/use-cases";

export const metadata = buildPageMetadata({
  title: "Use cases",
  description:
    "Real ways to use Classgrid AI: research with sources, summarise documents, build charts, fix code, publish websites, hand off tasks on WhatsApp and more.",
  path: "/use-cases",
});

export default async function UseCasesPage() {
  const useCases = await getUseCases();

  const jsonLdData = [
    {
      "@type": "CollectionPage",
      "@id": "https://classgrid.in/use-cases/#webpage",
      name: "Use cases",
      url: "https://classgrid.in/use-cases",
      about: { "@id": "https://classgrid.in/#software" },
    },
  ];

  return (
    <div className="relative overflow-x-clip bg-background text-foreground dark:bg-black">
      <JsonLd data={jsonLdData} />
      <section className="text-[#0d0d0d] dark:text-white">
        <div className="mx-auto grid max-w-[1400px] lg:grid-cols-[1fr_minmax(320px,420px)]">
          <Reveal className="px-5 pb-12 pt-20 md:px-10 md:pb-16 md:pt-28 lg:border-r lg:border-black/10 lg:dark:border-white/10">
            <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-black/55 dark:text-white/55">Use cases</p>
            <h1 className="mt-5 text-balance text-[44px] font-medium leading-[1.05] tracking-[-0.035em] sm:text-6xl lg:text-[72px]">
              Put your AI agent to work.
            </h1>
          </Reveal>
          <Reveal delay={0.05} className="flex items-end px-5 pb-12 md:px-10 md:pb-16 lg:pt-28">
            <p className="text-pretty text-lg leading-8 text-black/75 md:text-[20px] md:leading-[1.6] dark:text-white/75">
              Explore real ways to use Classgrid AI for research, files, code, email and everyday tasks.
            </p>
          </Reveal>
        </div>
        <div className="mx-auto max-w-[1400px] pb-16 md:pb-24">
          <UseCasesHub useCases={useCases} />
        </div>
      </section>

      <AgentFinalCtaSection />
    </div>
  );
}
