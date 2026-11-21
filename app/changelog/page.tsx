import type { Metadata } from "next";

import { changelogMetadata, ChangelogView } from "./ChangelogView";

// The English changelog list: a kept page, built again when an entry is published in Sanity
// (app/api/sync-embeddings/route.ts). ?lang=hi and ?lang=mr are served by app/i18n/[lang]/changelog/page.tsx
// (middleware.ts sends them there).

export function generateMetadata(): Promise<Metadata> {
  return changelogMetadata("en");
}

export default function ChangelogPage() {
  return <ChangelogView lang="en" />;
}
