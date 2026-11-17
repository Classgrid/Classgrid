import { CmsFallback } from "@/components/ui/CmsErrorBoundary";
import { StructuredContentPage } from "@/components/templates/StructuredContentPage";
import { buildPageMetadata } from "@/lib/metadata";
import { getSolutionPage } from "@/sanity/lib/marketing";
import { JsonLd } from "@/components/seo/JsonLd";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** The Solutions pages (their content lives in Sanity) */
const SOLUTION_SLUGS = [
  "agent-mode",
  "project-mode",
  "grids",
  "whatsapp-calls",
  "research",
  "documents-and-files",
  "reminders-and-automation",
  "email-and-calendar",
];

export async function generateStaticParams() {
  return SOLUTION_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = (await getSolutionPage(slug)) as any;

  if (!page) {
    return buildPageMetadata({
      title: "Solution Not Found",
      description: "The requested solution page could not be found.",
      path: `/solutions/${slug}`,
      noIndex: true,
    });
  }

  const title =
    page?.seo?.metaTitle?.en ||
    page?.seo?.metaTitle ||
    page?.headline?.en ||
    page?.headline ||
    "Classgrid Solution";

  const description =
    page?.seo?.metaDescription?.en ||
    page?.seo?.metaDescription ||
    page?.subtitle?.en ||
    page?.subtitle ||
    "Explore how Classgrid supports this audience.";

  return buildPageMetadata({
    title,
    description,
    path: `/solutions/${slug}`,
  });
}

export default async function SolutionPage({ params }: PageProps) {
  const { slug } = await params;
  const page = (await getSolutionPage(slug)) as any;

  if (!page) {
    return (
      <CmsFallback
        type="solution page"
        backHref="/solutions"
        backLabel="Back to Solutions"
      />
    );
  }

  const heroImageUrl = page?.heroImage?.asset?.url ?? null;

  const capabilities = Array.isArray(page?.capabilities)
    ? page.capabilities
    : Array.isArray(page?.benefits)
    ? page.benefits.map((item: any) => ({
        feature: item?.title,
        description: item?.description,
      }))
    : [];

  const displayTitle = page?.headline?.en || page?.headline || "Solution";

  const jsonLdData = [
    {
      "@type": "WebPage",
      "@id": `https://classgrid.in/solutions/${slug}/#webpage`,
      "name": displayTitle,
      "url": `https://classgrid.in/solutions/${slug}`,
      "about": {
        "@id": "https://classgrid.in/#software"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://classgrid.in/" },
        { "@type": "ListItem", "position": 2, "name": "Solutions", "item": "https://classgrid.in/solutions" },
        { "@type": "ListItem", "position": 3, "name": displayTitle, "item": `https://classgrid.in/solutions/${slug}` }
      ]
    }
  ];

  return (
    <>
      <JsonLd data={jsonLdData} />
      <StructuredContentPage
        mode="solution"
        eyebrow={
          page?.label?.en || page?.label || "Solution"
        }
        title={displayTitle}
        subtitle={page?.subtitle?.en || page?.subtitle}
        heroImageUrl={heroImageUrl}
        heroImageAlt={page?.headline?.en || page?.headline}
        body={page?.body}
        markdownBody={page?.markdownBody}
        markdownSections={Array.isArray(page?.markdownSections) ? page.markdownSections : []}
        structuredSections={Array.isArray(page?.structuredSections) ? page.structuredSections : []}
        updatedAt={page?.lastUpdatedAt || page?._updatedAt}
        capabilities={capabilities}
        roleExperiences={
          Array.isArray(page?.roleExperiences) ? page.roleExperiences : []
        }
        faqs={Array.isArray(page?.faqs) ? page.faqs : []}
        primaryCtaLabel="Use Agent"
        primaryCtaHref="https://chat.classgrid.in"
      />
    </>
  );
}
