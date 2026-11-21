import CategoryPageClient from "./CategoryPageClient";
import { getCategoryArticles } from "./actions";

// Kept for a day, and built again at once when a help article or category is published in Sanity
// (app/api/sync-embeddings/route.ts)
export const revalidate = 86400;

// No category is built ahead: each is built on its first visit and then kept. (Without this function the server
// would build the page again on every visit.)
export function generateStaticParams() {
  return [];
}

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

// The English page. ?lang=hi and ?lang=mr are served by app/i18n/[lang]/help-center/category/[slug]/page.tsx.
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  // Fetch data on the server
  const initialData = await getCategoryArticles(slug);

  return <CategoryPageClient slug={slug} lang="en" initialData={initialData} />;
}
