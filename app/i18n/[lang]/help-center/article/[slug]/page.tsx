import { notFound } from "next/navigation";

import ArticlePageClient from "@/app/help-center/article/[slug]/ArticlePageClient";
import { fetchArticleData } from "@/app/help-center/actions";
import { translatedLang } from "@/lib/locale";

export const revalidate = 86400;

// /help-center/article/<article>?lang=hi and ?lang=mr (middleware.ts sends them here). Built on the first visit and
// then kept.
export function generateStaticParams() {
  return [];
}

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

export default async function Page({ params }: Props) {
  const { lang: rawLang, slug } = await params;
  const lang = translatedLang(rawLang);
  if (!lang) notFound();

  const initialData = await fetchArticleData(slug);

  return <ArticlePageClient slug={slug} lang={lang} initialData={initialData} />;
}
