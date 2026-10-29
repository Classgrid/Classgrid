"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type SocialLink = {
  platform?: string;
  href?: string;
};

type StructuredDataProps = {
  siteName?: string;
  siteUrl?: string;
  contactEmail?: string;
  socialLinks?: SocialLink[];
};

export function StructuredData({
  siteName,
  siteUrl,
  contactEmail,
  socialLinks,
}: StructuredDataProps) {
  const pathname = usePathname();
  const normalizedSiteUrl = siteUrl?.replace(/\/$/, "");
  const pageUrl = normalizedSiteUrl ? `${normalizedSiteUrl}${pathname}` : undefined;
  const [pageTitle, setPageTitle] = useState(siteName || "");
  const [pageDescription, setPageDescription] = useState("");

  useEffect(() => {
    const title = document.title || siteName || "";
    const description = document
      .querySelector('meta[name="description"]')
      ?.getAttribute("content")
      ?.trim();

    setPageTitle(title);
    setPageDescription(description ?? "");
  }, [pathname, siteName]);

  // The Organization and WebSite data are already in the root layout's JSON-LD (@graph), so only this
  // page's WebPage entry is added here, and only once its description is known (never an empty one).
  if (!siteName?.trim() || !normalizedSiteUrl || !pageDescription) {
    return null;
  }

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: pageUrl,
    name: pageTitle,
    description: pageDescription,
    isPartOf: { "@id": `${normalizedSiteUrl}/#website` },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpage) }} />;
}
