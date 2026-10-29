import type { Metadata } from "next";

import { siteMeta } from "@/content/siteContent";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  type = "website",
  canonical,
  ogImage,
  noIndex = false,
}: MetadataInput): Metadata {
  const url = `${siteMeta.domain}${path}`;
  const fullTitle = `${title} | ${siteMeta.siteName}`;
  // Every page has a share image (WhatsApp, LinkedIn, X previews); the logo when the page has none of its own
  const image = ogImage || "/android-chrome-512x512.png";
  const imageUrl = image.startsWith("http") ? image : `${siteMeta.domain}${image}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonical ?? path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteMeta.siteName,
      type,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}
