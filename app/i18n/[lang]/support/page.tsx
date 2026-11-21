import { notFound } from "next/navigation";

import SupportPageClient from "@/app/support/SupportPageClient";
import { translatedLang } from "@/lib/locale";

export const metadata = {
  title: "Support | Classgrid",
  description: "Get help with Classgrid AI at chat.classgrid.in. Open a support ticket and our team will reply.",
};

// /support?lang=hi and ?lang=mr (middleware.ts sends them here). Built on the first visit and then kept.
export function generateStaticParams() {
  return [];
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = translatedLang((await params).lang);
  if (!lang) notFound();
  return <SupportPageClient lang={lang} />;
}
