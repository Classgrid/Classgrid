import { notFound } from "next/navigation";

import { HelpCenterView } from "@/app/help-center/HelpCenterView";
import { translatedLang } from "@/lib/locale";

// /help-center?lang=hi and ?lang=mr (middleware.ts sends them here). Built on the first visit and then kept.
export function generateStaticParams() {
  return [];
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = translatedLang((await params).lang);
  if (!lang) notFound();
  return <HelpCenterView lang={lang} />;
}
