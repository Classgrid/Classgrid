import SupportPageClient from "./SupportPageClient";

export const metadata = {
  title: "Support | Classgrid",
  description: "Get help with Classgrid AI at chat.classgrid.in. Open a support ticket and our team will reply.",
};

// The English support page: a kept page. ?lang=hi and ?lang=mr are served by app/i18n/[lang]/support/page.tsx
// (middleware.ts sends them there): see lib/locale.ts for why the page does not read ?lang= itself.
export default function SupportPage() {
  return <SupportPageClient lang="en" />;
}
