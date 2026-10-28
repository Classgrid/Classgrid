import { Reveal } from "@/components/sections/Reveal";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const hasNonEmptyString = (value: unknown): value is string => typeof value === "string" && value.trim().length > 0;

type LegacyOrganizationSectionProps = {
  organizationSectionTitle?: string;
  organizationCards: any[];
  organizationCardCtaLabel?: string;
};

export function LegacyOrganizationSection({
  organizationSectionTitle,
  organizationCards,
  organizationCardCtaLabel,
}: LegacyOrganizationSectionProps) {
  return (
    <Reveal>
      <section className="mx-auto w-full max-w-[1400px] px-6 py-16 md:px-12 md:py-24 lg:px-16">
        <SectionHeader title={organizationSectionTitle} />
        <BentoGrid className="auto-rows-auto gap-6 md:grid-cols-4 lg:grid-cols-4">
          {organizationCards.map((org, index: number) => {
            const colors = [
              { color: "from-zinc-400/20", iconColor: "#a1a1aa", icon: "School" },
              { color: "from-indigo-500/20", iconColor: "#4f46e5", icon: "GraduationCap" },
              { color: "from-cyan-500/20", iconColor: "#0891b2", icon: "Building2" },
              { color: "from-violet-500/20", iconColor: "#8b5cf6", icon: "BookOpen" },
            ];
            const style = colors[index % colors.length];

            return (
              <BentoCard
                key={`${org.title}-${index}`}
                name={org.title}
                cta={organizationCardCtaLabel}
                href={org.href}
                Icon={hasNonEmptyString(org.icon) ? org.icon : style.icon}
                color={hasNonEmptyString(org.color) ? org.color : style.color}
                iconColor={hasNonEmptyString(org.iconColor) ? org.iconColor : style.iconColor}
                className="min-h-[200px]"
              />
            );
          })}
        </BentoGrid>
      </section>
    </Reveal>
  );
}
