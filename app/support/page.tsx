import { parseLang } from "@/lib/locale";
import SupportPageClient from "./SupportPageClient";

export const metadata = {
  title: "Support | Classgrid",
  description: "Get help with Classgrid AI at chat.classgrid.in. Open a support ticket and our team will reply.",
};

type SupportPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SupportPage({ searchParams }: SupportPageProps) {
  const lang = parseLang((await searchParams) ?? undefined);
  return <SupportPageClient lang={lang} />;
}
