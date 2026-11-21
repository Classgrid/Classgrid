import type { SupportedLang } from "@/lib/locale";

import { getInitialSupportData } from "./actions";
import HelpCenterClient from "./HelpCenterClient";
import { JsonLd } from "@/components/seo/JsonLd";

// The help center's first page, in one language. Drawn by app/help-center/page.tsx (English) and
// app/i18n/[lang]/help-center/page.tsx (Hindi, Marathi): see lib/locale.ts for why the page does not read ?lang= itself.
export async function HelpCenterView({ lang }: { lang: SupportedLang }) {
  const initialData = await getInitialSupportData();
  
  const jsonLdData = [
    {
      "@type": "CollectionPage",
      "@id": "https://classgrid.in/help-center/#webpage",
      "name": "Classgrid Help Center",
      "url": "https://classgrid.in/help-center",
      "about": { "@id": "https://classgrid.in/#software" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://classgrid.in/" },
        { "@type": "ListItem", "position": 2, "name": "Help Center", "item": "https://classgrid.in/help-center" }
      ]
    }
  ];

  return (
    <>
      <JsonLd data={jsonLdData} />
      <HelpCenterClient lang={lang} initialData={initialData} />
    </>
  );
}
