import { LOCAL_USE_CASES, type UseCase, type UseCaseAudience, type UseCaseCapability } from "@/content/useCases";
import { getAiUseCase, getAiUseCases } from "@/sanity/lib/marketing";

type SanityUseCase = Partial<Omit<UseCase, "capabilities" | "audiences">> & {
  capabilities?: string[] | null;
  audiences?: string[] | null;
};

function toUseCase(raw: SanityUseCase | null | undefined): UseCase | null {
  if (!raw?.slug || !raw.title) return null;
  return {
    slug: raw.slug,
    title: raw.title,
    summary: raw.summary ?? "",
    capabilities: (raw.capabilities ?? []) as UseCaseCapability[],
    audiences: (raw.audiences ?? []) as UseCaseAudience[],
    icon: raw.icon ?? "Sparkles",
    challenge: raw.challenge ?? "",
    solution: raw.solution ?? "",
    result: raw.result ?? "",
    steps: raw.steps ?? [],
    tryPrompt: raw.tryPrompt ?? "",
    relatedSolution: raw.relatedSolution?.href ? raw.relatedSolution : undefined,
    order: raw.order ?? 999,
  };
}

/** All use cases from Sanity, or the local copy when Sanity has none */
export async function getUseCases(): Promise<UseCase[]> {
  const rows = ((await getAiUseCases()) as SanityUseCase[] | null) ?? [];
  const fromSanity = rows.map(toUseCase).filter((item): item is UseCase => Boolean(item));
  return fromSanity.length ? fromSanity : LOCAL_USE_CASES;
}

export async function getUseCase(slug: string): Promise<UseCase | null> {
  const fromSanity = toUseCase((await getAiUseCase(slug)) as SanityUseCase | null);
  return fromSanity ?? LOCAL_USE_CASES.find((item) => item.slug === slug) ?? null;
}
