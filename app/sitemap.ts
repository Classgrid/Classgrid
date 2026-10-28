import type { MetadataRoute } from "next";

import { siteMeta } from "@/content/siteMeta";
import { getChangelogEntries, getComparisonPages, getCaseStudies, getLegalPageDates, getPosts } from "@/sanity/lib/marketing";
import { SOLUTION_SLUGS } from "@/lib/solutions";

const staticRoutes = [
  "/",
  "/about",
  "/blog",
  "/case-studies",
  "/changelog",
  "/compare",
  "/contact",
  "/pricing",
  "/plugins",
  "/solutions",
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
  const cmsCaseStudies = ((await getCaseStudies()) as Array<{ slug?: { current?: string } }> | null) ?? [];
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
  const dynamicCaseStudySlugs = unique(cmsCaseStudies.map((entry) => entry.slug?.current));
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
    ...dynamicCaseStudySlugs.map((slug) => ({
      url: `${siteMeta.domain}/case-studies/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
