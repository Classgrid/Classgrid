import { AgentHeroSection } from "@/components/sections/agent/AgentHeroSection";
import { AgentFaqSection } from "@/components/sections/agent/AgentFaqSection";
import { AgentFinalCtaSection } from "@/components/sections/agent/AgentFinalCtaSection";
import { SolutionDemo } from "@/components/sections/solution-page/SolutionDemo";
import {
  SolutionFeatures,
  SolutionPlainEnglish,
  SolutionPlugins,
  SolutionTasks,
  type PluginLogo,
} from "@/components/sections/solution-page/SolutionSections";
import type { SolutionPageContent } from "@/content/solutions/types";

export function SolutionPageView({ page, logos }: { page: SolutionPageContent; logos: Record<string, PluginLogo> }) {
  return (
    <div className="bg-background dark:bg-black">
      <AgentHeroSection
        eyebrow={page.eyebrow}
        headline={page.headline}
        subheadline={page.subheadline}
        primaryCta={page.primaryCta}
        showModelStrip={false}
      />
      <SolutionDemo heading={page.demoHeading} tabs={page.demoTabs} />
      <SolutionFeatures features={page.features} />
      <SolutionPlugins heading={page.pluginsHeading} plugins={page.plugins} logos={logos} />
      <SolutionTasks heading={page.tasksHeading} tasks={page.exampleTasks} />
      <SolutionPlainEnglish heading={page.plainEnglishHeading} paragraphs={page.plainEnglish} />
      {page.faqs.length ? <AgentFaqSection faqs={page.faqs} /> : null}
      <AgentFinalCtaSection />
    </div>
  );
}
