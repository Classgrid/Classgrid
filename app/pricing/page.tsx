import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/metadata";
import { PRICING_FAQS } from "./faqs";
import { PricingPage } from "./PlansSection";

// The Free, Pro, Max and Enterprise plans (PlansSection.tsx). The old free-tokens and pay-as-you-go page (Sanity
// aiPricingPage: hero, two cards, top-up calculator, token steps and the model price list) is no longer shown.

export function generateMetadata() {
  return buildPageMetadata({
    title: "Pricing",
    description:
      "Classgrid AI plans: Free, Pro at ₹499 a month, Max at ₹1,999 a month and Enterprise for schools and colleges. Student prices, yearly billing and top-up packs from ₹49. Prices include GST.",
    path: "/pricing",
  });
}

export default function PricingRoute() {
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
            mainEntity: PRICING_FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        ]}
      />
      <PricingPage />
    </div>
  );
}
