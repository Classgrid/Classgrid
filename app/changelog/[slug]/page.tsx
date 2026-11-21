import type { Metadata } from "next";

import { changelogEntryMetadata, changelogEntrySlugs, ChangelogEntryView } from "./ChangelogEntryView";

// Kept for a day, and built again at once when an entry is published in Sanity (app/api/sync-embeddings/route.ts)
export const revalidate = 86400;

// The entries known at build time are built ahead; a newer one is built on its first visit and then kept
export function generateStaticParams() {
  return changelogEntrySlugs();
}

type ChangelogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ChangelogDetailPageProps): Promise<Metadata> {
  return changelogEntryMetadata((await params).slug, "en");
}

// The English entry. ?lang=hi and ?lang=mr are served by app/i18n/[lang]/changelog/[slug]/page.tsx.
export default async function ChangelogDetailPage({ params }: ChangelogDetailPageProps) {
  return <ChangelogEntryView slug={(await params).slug} lang="en" />;
}
