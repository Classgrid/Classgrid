import { BlogIndexView } from "./BlogIndexView";

import { pageMeta } from "@/content/siteContent";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata(pageMeta.blog);

// The English blog list: a kept page, built again when something is published in Sanity. ?lang=hi and ?lang=mr are
// served by app/i18n/[lang]/blog/page.tsx (middleware.ts sends them there).
export default function Page() {
  return <BlogIndexView lang="en" />;
}
