import { LOCAL_SOLUTIONS } from "@/content/solutions";
import { PLUGINS } from "@/content/plugins";
import type { PanelVisual, SolutionPageContent } from "@/content/solutions/types";
import { getAiSolutionPage, getPluginsPage } from "@/sanity/lib/marketing";
import type { PluginLogo } from "@/components/sections/solution-page/SolutionSections";

export { LOCAL_SOLUTIONS };

export const SOLUTION_SLUGS = LOCAL_SOLUTIONS.map((page) => page.slug);

export function getLocalSolution(slug: string) {
  return LOCAL_SOLUTIONS.find((page) => page.slug === slug) ?? null;
}

type SanitySolution = {
  slug?: string;
  order?: number;
  menuGroup?: SolutionPageContent["menuGroup"];
  menuLabel?: string;
  menuDescription?: string;
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  primaryCta?: { label?: string; href?: string };
  demoHeading?: string;
  demoTabs?: { label?: string; visualJson?: string }[];
  features?: { title?: string; text?: string; visualJson?: string }[];
  pluginsHeading?: string;
  plugins?: { name?: string; line?: string }[];
  tasksHeading?: string;
  exampleTasks?: string[];
  faqs?: { question?: string; answer?: string }[];
  plainEnglishHeading?: string;
  plainEnglish?: string[];
  seo?: { title?: string; description?: string };
};

function parseVisual(json?: string): PanelVisual | null {
  if (!json) return null;
  try {
    const parsed = JSON.parse(json);
    return parsed && typeof parsed === "object" && parsed.main ? (parsed as PanelVisual) : null;
  } catch {
    return null;
  }
}

const text = (value: string | undefined, fallback: string) => (value?.trim() ? value.trim() : fallback);

function fromSanity(doc: SanitySolution, local: SolutionPageContent | null): SolutionPageContent | null {
  const slug = doc.slug ?? local?.slug;
  if (!slug) return null;

  const demoTabs = (doc.demoTabs ?? [])
    .map((tab) => ({ label: tab.label?.trim() ?? "", visual: parseVisual(tab.visualJson) }))
    .filter((tab): tab is { label: string; visual: PanelVisual } => Boolean(tab.label && tab.visual));
  const features = (doc.features ?? [])
    .map((feature) => ({ title: feature.title?.trim() ?? "", text: feature.text?.trim() ?? "", visual: parseVisual(feature.visualJson) }))
    .filter((feature): feature is { title: string; text: string; visual: PanelVisual } => Boolean(feature.title && feature.visual));
  const plugins = (doc.plugins ?? [])
    .filter((plugin) => plugin.name?.trim())
    .map((plugin) => ({ name: plugin.name!.trim(), line: plugin.line?.trim() ?? "" }));
  const faqs = (doc.faqs ?? [])
    .filter((faq) => faq.question?.trim() && faq.answer?.trim())
    .map((faq) => ({ question: faq.question!.trim(), answer: faq.answer!.trim() }));
  const tasks = (doc.exampleTasks ?? []).filter((task) => task?.trim());
  const plain = (doc.plainEnglish ?? []).filter((paragraph) => paragraph?.trim());

  if (!doc.headline?.trim() && !local) return null;

  return {
    slug,
    order: doc.order ?? local?.order ?? 99,
    menuGroup: doc.menuGroup ?? local?.menuGroup ?? "useCase",
    menuLabel: text(doc.menuLabel, local?.menuLabel ?? slug),
    menuDescription: text(doc.menuDescription, local?.menuDescription ?? ""),
    eyebrow: text(doc.eyebrow, local?.eyebrow ?? ""),
    headline: text(doc.headline, local?.headline ?? ""),
    subheadline: text(doc.subheadline, local?.subheadline ?? ""),
    primaryCta: {
      label: text(doc.primaryCta?.label, local?.primaryCta.label ?? "Use Agent"),
      href: text(doc.primaryCta?.href, local?.primaryCta.href ?? "https://chat.classgrid.in"),
    },
    demoHeading: text(doc.demoHeading, local?.demoHeading ?? ""),
    demoTabs: demoTabs.length ? demoTabs : local?.demoTabs ?? [],
    features: features.length ? features : local?.features ?? [],
    pluginsHeading: text(doc.pluginsHeading, local?.pluginsHeading ?? "Works with your apps"),
    plugins: plugins.length ? plugins : local?.plugins ?? [],
    tasksHeading: text(doc.tasksHeading, local?.tasksHeading ?? "Things to try"),
    exampleTasks: tasks.length ? tasks : local?.exampleTasks ?? [],
    faqs: faqs.length ? faqs : local?.faqs ?? [],
    plainEnglishHeading: text(doc.plainEnglishHeading, local?.plainEnglishHeading ?? "What it can do, in plain English"),
    plainEnglish: plain.length ? plain : local?.plainEnglish ?? [],
    seo: {
      title: text(doc.seo?.title, local?.seo.title ?? doc.headline ?? slug),
      description: text(doc.seo?.description, local?.seo.description ?? doc.subheadline ?? ""),
    },
  };
}

export async function getSolution(slug: string): Promise<SolutionPageContent | null> {
  const local = getLocalSolution(slug);
  const doc = (await getAiSolutionPage(slug)) as SanitySolution | null;
  if (doc) return fromSanity(doc, local) ?? local;
  return local;
}

type SanityPluginsPage = {
  plugins?: { name?: string | null; logoUrl?: string | null; invertInDark?: boolean | null }[] | null;
};

// Plugin logos by lower-case name: the Sanity Plugins Page wins, the AI Hub list fills the gaps
export async function getPluginLogos(): Promise<Record<string, PluginLogo>> {
  const logos: Record<string, PluginLogo> = {};
  for (const plugin of PLUGINS) {
    logos[plugin.name.toLowerCase()] = { logoUrl: plugin.logo, invertInDark: plugin.invertInDark };
  }
  const page = (await getPluginsPage()) as SanityPluginsPage | null;
  for (const plugin of page?.plugins ?? []) {
    if (plugin?.name?.trim() && plugin.logoUrl) {
      logos[plugin.name.trim().toLowerCase()] = { logoUrl: plugin.logoUrl, invertInDark: plugin.invertInDark };
    }
  }
  return logos;
}
