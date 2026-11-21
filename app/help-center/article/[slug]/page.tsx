import ArticlePageClient from "./ArticlePageClient";
import { fetchArticleData } from "../../actions";

// Kept for a day, and built again at once when a help article is published in Sanity
// (app/api/sync-embeddings/route.ts)
export const revalidate = 86400;

// No article is built ahead: each is built on its first visit and then kept. (Without this function the server
// would build the page again on every visit.)
export function generateStaticParams() {
  return [];
}

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

// The English page. ?lang=hi and ?lang=mr are served by app/i18n/[lang]/help-center/article/[slug]/page.tsx.
export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  // Fetch data on the server
  const initialData = await fetchArticleData(slug);

  return <ArticlePageClient slug={slug} lang="en" initialData={initialData} />;
}
