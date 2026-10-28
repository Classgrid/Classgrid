import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, ChevronLeft } from "lucide-react";
import { Reveal } from "@/components/sections/Reveal";
import { AgentFinalCtaSection } from "@/components/sections/agent/AgentFinalCtaSection";
import { UseCaseIcon } from "@/components/use-cases/UseCaseIcon";
import { JsonLd } from "@/components/seo/JsonLd";
import { LOCAL_USE_CASES } from "@/content/useCases";
import { buildPageMetadata } from "@/lib/metadata";
import { getUseCase, getUseCases } from "@/lib/use-cases";

const CHAT_APP_URL = "https://chat.classgrid.in";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return LOCAL_USE_CASES.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const useCase = await getUseCase(slug);
  if (!useCase) {
    return buildPageMetadata({ title: "Use case not found", description: "This use case could not be found.", path: `/use-cases/${slug}`, noIndex: true });
  }
  return buildPageMetadata({ title: useCase.title, description: useCase.summary, path: `/use-cases/${slug}` });
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-black/10 bg-black/[0.03] px-2.5 py-1.5 font-mono text-[11.5px] uppercase tracking-[0.04em] text-black/75 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/75">
      {children}
    </span>
  );
}

export default async function UseCasePage({ params }: PageProps) {
  const { slug } = await params;
  const useCase = await getUseCase(slug);
  if (!useCase) notFound();

  const all = await getUseCases();
  const more = all
    .filter((item) => item.slug !== useCase.slug)
    .sort((a, b) => {
      const shared = (x: typeof a) => x.capabilities.filter((cap) => useCase.capabilities.includes(cap)).length;
      return shared(b) - shared(a) || a.order - b.order;
    })
    .slice(0, 3);

  const jsonLdData = [
    {
      "@type": "WebPage",
      "@id": `https://classgrid.in/use-cases/${useCase.slug}/#webpage`,
      name: useCase.title,
      url: `https://classgrid.in/use-cases/${useCase.slug}`,
      about: { "@id": "https://classgrid.in/#software" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://classgrid.in/" },
        { "@type": "ListItem", position: 2, name: "Use cases", item: "https://classgrid.in/use-cases" },
        { "@type": "ListItem", position: 3, name: useCase.title, item: `https://classgrid.in/use-cases/${useCase.slug}` },
      ],
    },
  ];

  const border = "border-black/10 dark:border-white/10";

  return (
    <div className="relative overflow-x-clip bg-background text-foreground dark:bg-black">
      <JsonLd data={jsonLdData} />

      <section className="text-[#0d0d0d] dark:text-white">
        <div className={`mx-auto grid max-w-[1400px] border-b lg:grid-cols-[1fr_minmax(360px,520px)] ${border}`}>
          <Reveal className={`px-5 pb-12 pt-10 md:px-10 md:pb-16 lg:border-r ${border}`}>
            <Link
              href="/use-cases"
              className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-black/[0.03] px-3.5 py-2 text-[14px] font-medium text-black transition-colors hover:border-black/25 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:border-white/25"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
              All use cases
            </Link>
            <span className={`mt-12 flex h-16 w-16 items-center justify-center rounded-2xl border bg-white text-black dark:bg-black dark:text-white ${border}`}>
              <UseCaseIcon name={useCase.icon} className="h-8 w-8" />
            </span>
            <h1 className="mt-6 text-balance text-[40px] font-medium leading-[1.06] tracking-[-0.035em] sm:text-5xl lg:text-[64px]">
              {useCase.title}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-black/75 md:text-[20px] md:leading-[1.6] dark:text-white/75">
              {useCase.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {useCase.capabilities.map((cap) => (
                <Tag key={cap}>{cap}</Tag>
              ))}
            </div>
          </Reveal>

          {/* Try it: the prompt as it would look in the chat */}
          <Reveal delay={0.05} className="flex items-center bg-black/[0.03] px-5 py-12 md:px-10 dark:bg-white/[0.03]">
            <div className={`w-full rounded-2xl border bg-white p-5 shadow-sm dark:bg-[#0a0a0a] ${border}`}>
              <p className="font-mono text-[11.5px] uppercase tracking-[0.06em] text-black/50 dark:text-white/50">Try asking</p>
              <div className="mt-4 flex justify-end">
                <p className="max-w-[90%] rounded-2xl rounded-br-md bg-black/[0.06] px-4 py-3 text-[15px] leading-relaxed text-black dark:bg-white/[0.08] dark:text-white">
                  {useCase.tryPrompt || useCase.summary}
                </p>
              </div>
              <a
                href={CHAT_APP_URL}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-black/15 bg-white px-4 py-3 text-[15px] font-medium text-black transition-colors hover:bg-black/[0.04] dark:border-white/15 dark:bg-black dark:text-white dark:hover:bg-white/[0.06]"
              >
                Try it in Classgrid AI
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>

        <div className={`mx-auto grid max-w-[1400px] border-b md:grid-cols-2 ${border}`}>
          <Reveal className={`px-5 py-12 md:border-r md:px-10 md:py-16 ${border}`}>
            <h2 className="text-[32px] font-medium tracking-[-0.03em] md:text-[40px]">Challenge</h2>
            <p className="mt-6 text-pretty text-[17px] leading-8 text-black/75 md:text-[19px] dark:text-white/75">{useCase.challenge}</p>
          </Reveal>
          <Reveal delay={0.05} className={`border-t px-5 py-12 md:border-t-0 md:px-10 md:py-16 ${border}`}>
            <h2 className="text-[32px] font-medium tracking-[-0.03em] md:text-[40px]">Solution</h2>
            <p className="mt-6 text-pretty text-[17px] leading-8 text-black/75 md:text-[19px] dark:text-white/75">{useCase.solution}</p>
          </Reveal>
        </div>

        <div className={`mx-auto grid max-w-[1400px] border-b md:grid-cols-2 ${border}`}>
          <Reveal className={`px-5 py-12 md:border-r md:px-10 md:py-16 ${border}`}>
            <h2 className="text-[32px] font-medium tracking-[-0.03em] md:text-[40px]">Result</h2>
            <p className="mt-6 text-pretty text-[17px] leading-8 text-black/75 md:text-[19px] dark:text-white/75">{useCase.result}</p>
          </Reveal>
          {useCase.steps.length > 0 && (
            <Reveal delay={0.05} className={`border-t px-5 py-12 md:border-t-0 md:px-10 md:py-16 ${border}`}>
              <h2 className="text-[32px] font-medium tracking-[-0.03em] md:text-[40px]">How to do it</h2>
              <ol className="mt-6 space-y-4">
                {useCase.steps.map((step, index) => (
                  <li key={step} className="flex gap-4 text-[17px] leading-7 text-black/75 dark:text-white/75">
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-[13px] text-black dark:text-white ${border}`}>
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              {useCase.relatedSolution && (
                <Link
                  href={useCase.relatedSolution.href}
                  className="mt-8 inline-flex items-center gap-1.5 text-[15px] font-medium text-black underline-offset-4 hover:underline dark:text-white"
                >
                  Learn more about {useCase.relatedSolution.label}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              )}
            </Reveal>
          )}
        </div>

        {more.length > 0 && (
          <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-[28px] font-medium tracking-[-0.03em] md:text-[36px]">More use cases</h2>
              <Link href="/use-cases" className="text-[15px] font-medium text-black underline-offset-4 hover:underline dark:text-white">
                See all
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((item) => (
                <Link
                  key={item.slug}
                  href={`/use-cases/${item.slug}`}
                  className={`group flex items-start gap-4 rounded-xl border bg-white p-5 transition-colors hover:border-black/30 dark:bg-[#0a0a0a] dark:hover:border-white/30 ${border}`}
                >
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-black dark:text-white ${border}`}>
                    <UseCaseIcon name={item.icon} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[16px] font-semibold leading-snug text-black dark:text-white">{item.title}</span>
                    <span className="mt-1 block text-[14px] leading-relaxed text-black/60 dark:text-white/60">{item.summary}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <AgentFinalCtaSection />
    </div>
  );
}
