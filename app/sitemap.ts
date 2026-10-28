import type { MetadataRoute } from "next";

import { siteMeta } from "@/content/siteMeta";
import { getChangelogEntries, getComparisonPages, getDocPageDates, getLegalPageDates, getPosts } from "@/sanity/lib/marketing";
import { SOLUTION_SLUGS } from "@/lib/solutions";
import { LOCAL_USE_CASES } from "@/content/useCases";

const staticRoutes = [
  "/",
  "/about",
  "/blog",
  "/changelog",
  "/compare",
  "/contact",
  "/pricing",
  "/plugins",
  "/docs",
  "/reviews",
  "/support",
  "/help-center",
  "/team",
  "/careers",
  "/brand",
  "/acknowledgement",
  "/ip-protection",
  "/privacy",
  "/terms",
  "/security",
  "/cookies",
  "/disclaimer",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cmsComparisons = ((await getComparisonPages()) as Array<{ slug?: string }> | null) ?? [];
  const cmsChangelogEntries = ((await getChangelogEntries()) as Array<{ slug?: string }> | null) ?? [];
  const cmsDocPages = ((await getDocPageDates()) as Array<{ slug?: string; _updatedAt?: string }> | null) ?? [];
  const cmsPosts = ((await getPosts()) as Array<{ slug?: string }> | null) ?? [];
  const cmsLegalPages = ((await getLegalPageDates()) as Array<{ slug?: string; lastUpdated?: string; _updatedAt?: string }> | null) ?? [];

  // Legal pages show their "last updated" date from Sanity (/cookies is stored as slug "cookies" or "cookie")
  const legalLastModified = new Map<string, Date>();
  for (const page of cmsLegalPages) {
    const date = page.lastUpdated || page._updatedAt;
    if (!page.slug || !date) continue;
    const route = page.slug === "cookie" ? "/cookies" : `/${page.slug}`;
    legalLastModified.set(route, new Date(date));
  }

  const unique = (values: Array<string | undefined>) =>
    Array.from(new Set(values.filter((value): value is string => Boolean(value))));

  const dynamicCompareSlugs = unique(cmsComparisons.map((entry) => entry.slug));
  const dynamicChangelogSlugs = unique(cmsChangelogEntries.map((entry) => entry.slug));
  const dynamicPostSlugs = unique(cmsPosts.map((entry) => entry.slug));
  const solutionSlugs = unique(SOLUTION_SLUGS);

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteMeta.domain}${route}`,
      ...(legalLastModified.has(route) ? { lastModified: legalLastModified.get(route) } : {}),
      changeFrequency: (route === "/compare" || route === "/changelog" || route === "/blog" ? "weekly" : "monthly") as
        | "weekly"
        | "monthly",
      priority: route === "/" ? 1 : route === "/compare" || route === "/pricing" ? 0.9 : 0.7,
    })),
    ...solutionSlugs.map((slug) => ({
      url: `${siteMeta.domain}/solutions/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${siteMeta.domain}/use-cases`, changeFrequency: "monthly" as const, priority: 0.8 },
    ...LOCAL_USE_CASES.map((item) => ({
      url: `${siteMeta.domain}/use-cases/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...dynamicPostSlugs.map((slug) => ({
      url: `${siteMeta.domain}/blog/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...dynamicCompareSlugs.map((slug) => ({
      url: `${siteMeta.domain}/compare/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...dynamicChangelogSlugs.map((slug) => ({
      url: `${siteMeta.domain}/changelog/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...cmsDocPages
      .filter((doc) => doc.slug)
      .map((doc) => ({
        url: `${siteMeta.domain}/docs/${doc.slug}`,
        ...(doc._updatedAt ? { lastModified: new Date(doc._updatedAt) } : {}),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  ];
}
