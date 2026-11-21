import { HelpCenterView } from "./HelpCenterView";

// The English help center: a kept page, built again when a help article or category is published in Sanity
// (app/api/sync-embeddings/route.ts). ?lang=hi and ?lang=mr are served by app/i18n/[lang]/help-center/page.tsx
// (middleware.ts sends them there).
export default function HelpCenterPage() {
  return <HelpCenterView lang="en" />;
}
