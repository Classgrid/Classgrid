import type { Metadata } from "next";
import LegalSlugPage, { generateMetadata as generateLegalMetadata } from "../(legal)/[slug]/page";

// The same as the other legal pages (app/(legal)/[slug]/page.tsx): kept for an hour, because the Sanity webhook
// does not fire for this type.
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return generateLegalMetadata({ params: Promise.resolve({ slug: "cookies" }) });
}

export default function CookiesPage() {
  return LegalSlugPage({ params: Promise.resolve({ slug: "cookies" }) });
}
