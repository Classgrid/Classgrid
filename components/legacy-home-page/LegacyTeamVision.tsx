import { TeamVisionSection } from "./TeamVisionSection";

export function LegacyTeamVision({ cmsClassgridTeamVision }: { cmsClassgridTeamVision: any }) {
  return (
    <TeamVisionSection
      quotes={
        Array.isArray(cmsClassgridTeamVision?.quotes) && cmsClassgridTeamVision.quotes.length > 0
          ? cmsClassgridTeamVision.quotes
          : [
              {
                name: "David T.",
                role: "Operations Director",
                quote: "Classgrid completely transformed how our multi-campus administration works. We went from fighting data silos to having one unified operating layer.",
              },
              {
                name: "Sarah M.",
                role: "Academic Dean",
                quote: "Finally, a platform that understands real academic workflows. The level of visibility we have into both student progress and faculty delivery is unprecedented.",
              },
            ]
      }
    />
  );
}
