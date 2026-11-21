import { Metadata } from "next";

import { blogPostMetadata, BlogPostView } from "./BlogPostView";

// Kept for a day, and built again at once when a post is published in Sanity (app/api/sync-embeddings/route.ts)
export const revalidate = 86400;

// No post is built ahead: each is built on its first visit and then kept. (Without this function the server would
// build the post again on every visit.)
export function generateStaticParams() {
  return [];
}

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  return blogPostMetadata((await params).slug, "en");
}

// The English post. ?lang=hi and ?lang=mr are served by app/i18n/[lang]/blog/[slug]/page.tsx.
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  return <BlogPostView slug={(await params).slug} lang="en" />;
}
