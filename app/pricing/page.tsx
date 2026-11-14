import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/metadata";
import { PricingPage } from "./PlansSection";
import { buildPricingView, plansFromFeed, topupFromFeed } from "./plans-data";

// The plans page. Plans, prices, limits and top-ups come from the live feed the super admin sets
// (GET /api/public/ai-pricing, cached 5 minutes); plans-data.ts keeps a fallback for when the feed has no plans yet.

const PLATFORM_API = process.env.NEXT_PUBLIC_PLATFORM_API_URL || "https://api.classgrid.in";

async function getFeed(): Promise<unknown> {
  try {
    const res = await fetch(`${PLATFORM_API}/api/public/ai-pricing`, { next: { revalidate: 300 }, signal: AbortSignal.timeout(8000) });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

export function generateMetadata() {
  return buildPageMetadata({
    title: "Pricing",
    description: "Classgrid AI plans: start free, then Pro or Max, with student prices and yearly billing. Prices include GST.",
    path: "/pricing",
  });
}

export default async function PricingRoute() {
  const feed = await getFeed();
  const view = buildPricingView(plansFromFeed(feed), topupFromFeed(feed));

  return (
    <div className="relative overflow-x-clip bg-background text-foreground">
      <JsonLd
        data={[
          {
            "@type": "WebPage",
            "@id": "https://classgrid.in/pricing/#webpage",
            name: "Classgrid AI Pricing",
            url: "https://classgrid.in/pricing",
            about: { "@id": "https://classgrid.in/#software" },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://classgrid.in/" },
              { "@type": "ListItem", position: 2, name: "Pricing", item: "https://classgrid.in/pricing" },
            ],
          },
          {
            "@type": "FAQPage",
            mainEntity: view.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        ]}
      />
      <PricingPage view={view} />
    </div>
  );
}
