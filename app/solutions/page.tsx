import { SolutionsPortal } from "@/components/solutions/SolutionsPortal";
import { buildPageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = buildPageMetadata({
  title: "Solutions",
  description: "See how Classgrid AI helps individuals, developers and teams with research, files, code and everyday tasks.",
  path: "/solutions",
});

export default function SolutionsPage() {
  const jsonLdData = [
    {
      "@type": "CollectionPage",
      "@id": "https://classgrid.in/solutions/#webpage",
      "name": "Solutions",
      "url": "https://classgrid.in/solutions",
      "about": { "@id": "https://classgrid.in/#software" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://classgrid.in/" },
        { "@type": "ListItem", "position": 2, "name": "Solutions", "item": "https://classgrid.in/solutions" }
      ]
    }
  ];

  return (
    <>
      <JsonLd data={jsonLdData} />
      <SolutionsPortal />
    </>
  );
}
