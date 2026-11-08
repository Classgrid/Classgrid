import { Reveal } from "@/components/sections/Reveal";
import { StudioModePreview } from "@/components/sections/StudioModePreview";

// Studio mode preview with its heading and line under it, in the same type as the other home page sections
export function AgentStudioSection() {
  return (
    <section className="bg-background text-[#0d0d0d] dark:bg-black dark:text-white">
      {/* No top padding: the section above already ends with its own bottom space */}
      <StudioModePreview flush />
      <div className="mx-auto max-w-[1728px] px-5 pb-24 md:px-10 md:pb-32 lg:pb-40">
        <Reveal className="mx-auto max-w-[68rem] text-center">
          <h2 className="text-balance text-4xl font-medium leading-[1.08] tracking-[-0.035em] md:text-5xl lg:text-[64px]">
            Studio mode builds while you watch
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg leading-8 text-black/80 md:text-[21px] md:leading-[1.65] dark:text-white/75">
            Ask in plain words. Classgrid AI writes the code, runs the commands and checks the result, and you see every
            file and terminal line live beside the chat.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
