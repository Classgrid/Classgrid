import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { compareHubPageQuery, comparisonPagesQuery } from "@/sanity/lib/queries";
import { ComparisonHubClient } from "@/components/compare/ComparisonHubClient";
import { JsonLd } from "@/components/seo/JsonLd";

// Kept for an hour, and built again at once when the compare page is published in Sanity (the webhook in
// app/api/sync-embeddings/route.ts). An hour, not the site's day, because the comparisons listed here are a type the
// webhook does not fire for. Until 2026-11-21 this said 0: the page was built again on every single visit.
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const hubData = await client.fetch(compareHubPageQuery);
  
  return {
    title: hubData?.seoTitle || "Compare Classgrid",
    description: hubData?.metaDescription || "Compare Classgrid against other platforms.",
  };
}

export default async function CompareHubPage() {
  const hubData = await client.fetch(compareHubPageQuery);
  const comparisons = await client.fetch(comparisonPagesQuery);

  // Hardcode the neutral headline as the main text
  const heroHeadline = "Every team works differently. Compare AI agents on what they can do, how easy they are to use, and what they cost";
  const heroSubheadline = "";

  // The old ERP mock comparison (vmedulife) is no longer shown
  const finalComparisons = comparisons || [];

  const jsonLdData = [
    {
      "@type": "CollectionPage",
      "@id": "https://classgrid.in/compare/#webpage",
      "name": hubData?.seoTitle || "Compare Classgrid",
      "url": "https://classgrid.in/compare",
      "about": { "@id": "https://classgrid.in/#software" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://classgrid.in/" },
        { "@type": "ListItem", "position": 2, "name": "Compare", "item": "https://classgrid.in/compare" }
      ]
    }
  ];

  return (
    <>
      <JsonLd data={jsonLdData} />
      <ComparisonHubClient 
        hubData={{
          heroHeadline,
          heroSubheadline,
        }} 
        comparisons={finalComparisons} 
      />
    </>
  );
}
