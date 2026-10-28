import type { HTMLAttributes } from "react";

type SectionAccentBarProps = HTMLAttributes<HTMLDivElement> & {
  align?: "left" | "center" | "right";
};

// The orange accent bar is no longer shown anywhere on the site
export function SectionAccentBar(_props: SectionAccentBarProps) {
  return null;
}
