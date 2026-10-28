export type ChangelogSettingsContent = {
  seoTitle: string;
  metaDescription: string;
  ogImage?: string;
  heroHeadline: string;
  heroSubheadline: string;
};

export type ChangelogEntryContent = {
  title: string;
  slug: string;
  seoTitle: string;
  metaDescription: string;
  ogImage?: string;
  releaseDate: string;
  updateType: "feature" | "improvement" | "bugfix";
  versionLabel?: string;
  modules: string[];
  summary: string;
  content: Array<Record<string, unknown>>;
  relatedTourLabel?: string;
  relatedTourHref?: string;
};

export const changelogSettingsFallback: ChangelogSettingsContent = {
  seoTitle: "Classgrid Changelog",
  metaDescription:
    "Track new features, improvements, and bug fixes shipped across the Classgrid platform.",
  ogImage: "/logo.png",
  heroHeadline: "Classgrid changelog",
  heroSubheadline:
    "A public log of product improvements, new releases, and operational fixes across the platform.",
};

// The old ERP release notes were removed; the real changelog lives in Sanity
export const changelogFallbackEntries: ChangelogEntryContent[] = [];

export const changelogFallbackBySlug = Object.fromEntries(
  changelogFallbackEntries.map((entry) => [entry.slug, entry])
) as Record<string, ChangelogEntryContent>;
