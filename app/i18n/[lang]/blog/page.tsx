import { notFound } from "next/navigation";

import { BlogIndexView } from "@/app/blog/BlogIndexView";
import { pageMeta } from "@/content/siteContent";
import { translatedLang } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata(pageMeta.blog);

// /blog?lang=hi and /blog?lang=mr (middleware.ts sends them here). Built on the first visit and then kept.
export function generateStaticParams() {
  return [];
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = translatedLang((await params).lang);
  if (!lang) notFound();
  return <BlogIndexView lang={lang} />;
}
