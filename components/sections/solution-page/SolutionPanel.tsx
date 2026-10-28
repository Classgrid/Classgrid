import { cn } from "@/lib/utils";
import type { PanelVisual } from "@/content/solutions/types";
import { MockCardView } from "@/components/sections/solution-page/MockCards";

// The gradient panel from the agent sections: a glass card with a solid card overlapping its corner
export function SolutionPanel({ visual, flip = false }: { visual: PanelVisual; flip?: boolean }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-4 sm:p-6 md:p-10",
        flip ? "bg-gradient-to-bl" : "bg-gradient-to-br",
        "from-[#4fc1b0] via-[#5e9fe0] to-[#93a9f6] dark:from-[#0d4f49] dark:via-[#1b3d78] dark:to-[#363d8c]"
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-24 h-80 w-80 rounded-full bg-white/35 blur-3xl dark:bg-white/10",
          flip ? "-right-16" : "-left-16"
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -bottom-28 h-96 w-96 rounded-full bg-[#c7d2fe]/50 blur-3xl dark:bg-[#6366f1]/20",
          flip ? "left-10" : "right-10"
        )}
      />

      <div className={cn("relative md:w-[70%]", flip && "md:ml-auto")}>
        <MockCardView card={visual.main} variant="main" />
      </div>

      {visual.floating ? (
        <div className={cn("relative z-10 mt-4 md:-mt-14 md:w-[52%]", flip ? "md:mr-auto" : "md:ml-auto")}>
          <MockCardView card={visual.floating} variant="floating" />
        </div>
      ) : null}
    </div>
  );
}
