import { Reveal } from "@/components/sections/Reveal";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { StatsStrip } from "./StatsStrip";
import { TrustedInstitutionsShowcase } from "./TrustedInstitutionsShowcase";

type LegacyTrustSectionProps = {
  trustedBy?: string;
  trustSectionDescription?: string;
  stats: any[];
  trustedInstitutionsEnabled?: boolean;
  trustedLogos: any[];
};

export function LegacyTrustSection({
  trustedBy,
  trustSectionDescription,
  stats,
  trustedInstitutionsEnabled,
  trustedLogos,
}: LegacyTrustSectionProps) {
  return (
    <Reveal>
      <section className="px-6 py-16 md:px-12 md:py-24 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          {(trustedBy || trustSectionDescription) && (
            <SectionHeader title={trustedBy} description={trustSectionDescription} />
          )}

          {stats.length > 0 ? <StatsStrip stats={stats} /> : null}
          {trustedInstitutionsEnabled ? (
            <TrustedInstitutionsShowcase title="Our Prestigious Clients" institutions={trustedLogos} />
          ) : null}
        </div>
      </section>
    </Reveal>
  );
}
