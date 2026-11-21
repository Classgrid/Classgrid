import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Outfit } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/next";

import { AppChrome } from "@/components/layout/AppChrome";
import { fetchLiveStatus } from "@/lib/footer-status";
import { changelogFallbackEntries } from "@/content/changelog";
import { resolveChromeContent } from "@/content/homePlaceholders";
import { getHomeChrome, getLatestChangelogEntry } from "@/sanity/lib/marketing";

import { NextAuthProvider } from "@/app/providers";
import { PostHogProvider } from "@/components/providers/PostHogProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-heading",
});

const interBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});



export async function generateMetadata(): Promise<Metadata> {

  const homeChrome = resolveChromeContent((await getHomeChrome()) as any);
  const siteUrl = typeof homeChrome?.siteUrl === "string" ? homeChrome.siteUrl : undefined;
  const siteName = typeof homeChrome?.brandName === "string" ? homeChrome.brandName : undefined;
  const description =
    typeof homeChrome?.seo?.metaDescription === "string"
      ? homeChrome.seo.metaDescription
      : undefined;
  const defaultTitle =
    typeof homeChrome?.seo?.metaTitle === "string" && homeChrome.seo.metaTitle.trim()
      ? homeChrome.seo.metaTitle
      : siteName;

  return {
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    title: siteName
      ? {
          default: defaultTitle,
          template: `%s | ${siteName}`,
        }
      : defaultTitle,
    description,
    icons: {
      // app/favicon.ico is already added by Next.js, so it is not listed again here
      icon: [
        { url: "/favicon-32x32.png?v=2", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png?v=2", sizes: "16x16", type: "image/png" },
      ],
      apple: [
        { url: "/android-chrome-512x512.png?v=2", sizes: "512x512", type: "image/png" },
      ],
    },
    openGraph: siteName || description || siteUrl
      ? {
          title: defaultTitle,
          description,
          url: siteUrl,
          siteName,
          type: "website",
          locale: "en_IN",
          images: [
            {
              url: "/og-image.png",
              width: 1200,
              height: 630,
              alt: "Do anything with Classgrid AI",
            },
          ],
        }
      : undefined,
    twitter: defaultTitle || description
      ? {
          card: "summary_large_image",
          title: defaultTitle,
          description,
          images: ["/og-image.png"],
        }
      : undefined,
    alternates: {
      canonical: siteUrl || "https://classgrid.in",
    },
  };
}

// Every page of the site is kept for a day and built again at once when something is published in Sanity (the
// webhook in app/api/sync-embeddings/route.ts). This layout wraps every page, so the shortest time used anywhere in
// it becomes the time of the whole site: nothing in this file may ask for less than a day. Until 2026-11-21 it said
// 5 minutes and the status read below said 1 minute, so every page of the site was built again every minute it had
// a visitor (Vercel CPU: 8 h 38 min in a month against the plan's 4 h).
export const revalidate = 86400;

export default async function RootLayout({ children }: { children: ReactNode }) {
  const homeChrome = resolveChromeContent((await getHomeChrome()) as any);
  const latestChangelogEntry = (await getLatestChangelogEntry()) as { releaseDate?: string } | null;
  const latestReleaseDate =
    latestChangelogEntry?.releaseDate ?? changelogFallbackEntries[0]?.releaseDate;
  // We now pass latestReleaseDate to AppChrome to handle client-side 10-day NEW badge logic
  // Footer status comes only from incident.io (status.classgrid.in); read here too so the first HTML already shows it.
  // The footer reads it again itself the moment the page opens and every 30 s after (components/layout/Footer.tsx),
  // so this copy only fills the first instant. Only "all fine" is put into the kept page: an incident written into
  // a page that is kept for a day would flash on every visit long after the incident is over. With no copy the
  // footer shows its loading state until its own read answers.
  const statusAtBuild = await fetchLiveStatus("status.classgrid.in", { next: { revalidate: 86400 } });
  const initialStatus = statusAtBuild?.state === "operational" ? statusAtBuild : null;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data for Google Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://classgrid.in/#organization",
                  "name": "Classgrid",
                  "url": "https://classgrid.in",
                  "logo": "https://classgrid.in/android-chrome-512x512.png",
                  "description": "Classgrid builds Classgrid AI, an AI agent that answers questions, researches the web, works with your files and runs tasks for you, with results on WhatsApp.",
                  "sameAs": [
                    "https://linkedin.com/company/classgrid",
                    "https://www.instagram.com/classgridedu/",
                    "https://www.youtube.com/@classgrid-y7f",
                    "https://www.facebook.com/profile.php?id=61588646851017"
                  ],
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+91-8623947038",
                    "contactType": "sales",
                    "availableLanguage": ["English", "Hindi", "Marathi"]
                  },
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Akurdi Railway Station Road, Sector No. 26, Pradhikaran, Nigdi",
                    "addressLocality": "Pimpri-Chinchwad",
                    "addressRegion": "Maharashtra",
                    "postalCode": "411044",
                    "addressCountry": "IN"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://classgrid.in/#website",
                  "name": "Classgrid",
                  "url": "https://classgrid.in"
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": "https://classgrid.in/#software",
                  "name": "Classgrid AI",
                  "applicationCategory": "BusinessApplication",
                  "operatingSystem": "Web",
                  "url": "https://chat.classgrid.in",
                  "publisher": {
                    "@id": "https://classgrid.in/#organization"
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${interBody.variable} font-sans min-h-screen bg-background text-foreground antialiased selection:bg-neutral-300/60 selection:text-neutral-900 dark:selection:bg-neutral-500/40 dark:selection:text-neutral-50`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PostHogProvider>
            <NextAuthProvider>
              <AppChrome
                // The Sanity footer status text is not used (status is incident.io only), so it is not sent to the page
                chromeContent={{ ...homeChrome, footerStatusLabel: undefined, footerStatusState: undefined, footerStatusHref: undefined }}
                latestReleaseDate={latestReleaseDate}
                initialStatus={initialStatus}
              >
                {children}
              </AppChrome>
            </NextAuthProvider>
          </PostHogProvider>
        </ThemeProvider>
        <Analytics />

        <Toaster position="bottom-right" offset={140} closeButton />
      </body>
    </html>
  );
}

// force reload
