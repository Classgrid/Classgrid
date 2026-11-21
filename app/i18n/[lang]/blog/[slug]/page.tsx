import { Metadata } from "next";
import { notFound } from "next/navigation";

import { blogPostMetadata, BlogPostView } from "@/app/blog/[slug]/BlogPostView";
import { translatedLang } from "@/lib/locale";

export const revalidate = 86400;

// /blog/<post>?lang=hi and ?lang=mr (middleware.ts sends them here). Built on the first visit and then kept.
export function generateStaticParams() {
  return [];
}

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  return blogPostMetadata(slug, translatedLang(lang) ?? "en");
}

export default async function Page({ params }: Props) {
  const { lang: rawLang, slug } = await params;
  const lang = translatedLang(rawLang);
  if (!lang) notFound();
  return <BlogPostView slug={slug} lang={lang} />;
}
