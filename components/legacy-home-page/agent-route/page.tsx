import { ViewPlatformPreview } from "@/components/sections/ViewPlatformPreview";
import { AgentHeroSection } from "@/components/sections/agent/AgentHeroSection";
import { AgentWorkflowsSection } from "@/components/sections/agent/AgentWorkflowsSection";
import { AgentRealWorkSection } from "@/components/sections/agent/AgentRealWorkSection";
import { AgentGetStartedSection } from "@/components/sections/agent/AgentGetStartedSection";
import { AgentSchedulesSection } from "@/components/sections/agent/AgentSchedulesSection";
import { AgentModelsSection } from "@/components/sections/agent/AgentModelsSection";
import { AgentFaqSection } from "@/components/sections/agent/AgentFaqSection";
import { AgentFinalCtaSection } from "@/components/sections/agent/AgentFinalCtaSection";
import { pageMeta } from "@/content/siteContent";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata(pageMeta.viewPlatform);

// Search engines only (not shown): Classgrid AI as a free web app, so it can appear for "free AI assistant" searches
const appStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Classgrid AI",
  url: "https://chat.classgrid.in",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  description: pageMeta.viewPlatform.description,
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  publisher: { "@type": "Organization", name: "Classgrid", url: "https://classgrid.in" },
};

export default function ViewPlatformPage() {
  return (
    // Pure black page in dark mode. The preview's own <main> uses bg-background (#0f0f0f in dark), which
    // showed as a charcoal box; `dark:[&>main]:bg-black` turns it black from here without editing it.
    <div className="bg-background dark:bg-black dark:[&>main]:bg-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appStructuredData) }} />
      <AgentHeroSection />
      <ViewPlatformPreview />
      <AgentWorkflowsSection />
      <AgentRealWorkSection />
      <AgentSchedulesSection />
      <AgentGetStartedSection />
      <AgentModelsSection />
      <AgentFaqSection />
      <AgentFinalCtaSection />
    </div>
  );
}
