import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { changelogMetadata, ChangelogView } from "@/app/changelog/ChangelogView";
import { translatedLang } from "@/lib/locale";

// /changelog?lang=hi and ?lang=mr (middleware.ts sends them here). Built on the first visit and then kept.
export function generateStaticParams() {
  return [];
}

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return changelogMetadata(translatedLang((await params).lang) ?? "en");
}

export default async function Page({ params }: Props) {
  const lang = translatedLang((await params).lang);
  if (!lang) notFound();
  return <ChangelogView lang={lang} />;
}
