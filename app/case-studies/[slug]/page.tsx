import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { caseStudyBySlugQuery } from "@/sanity/lib/queries";
import { CaseStudyDetailClient } from "@/components/case-studies/CaseStudyDetailClient";
import { buildPageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";

// Kept for a day, and built again at once when a case study is published in Sanity (app/api/sync-embeddings/route.ts)
export const revalidate = 86400;

// No case study is built ahead: each is built on its first visit and then kept. (Without this function the server
// would build the page again on every visit, whatever the time above says.)
export function generateStaticParams() {
  return [];
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await client.fetch(caseStudyBySlugQuery, { slug });
  
  if (!caseStudy) {
    return { title: "Case Study | ClassGrid" };
  }

  return buildPageMetadata({
    title: `${caseStudy.title} | ClassGrid Case Study`,
    description: caseStudy.summary || `Read how ${caseStudy.clientName} achieved success with Classgrid.`,
    path: `/case-studies/${slug}`,
    ogImage: caseStudy.heroImageUrl,
  });
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const caseStudy = await client.fetch(caseStudyBySlugQuery, {
    slug,
  });

  const data = caseStudy;

  if (!data) {
    notFound();
  }

  const jsonLdData = {
    "@type": "Article",
    "@id": `https://classgrid.in/case-studies/${slug}/#article`,
    "headline": data.title,
    "description": data.summary || data.title,
    "image": data.heroImageUrl,
    "publisher": { "@id": "https://classgrid.in/#organization" }
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      <CaseStudyDetailClient data={data as any} />
    </>
  );
}
