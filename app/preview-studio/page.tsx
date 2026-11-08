import type { Metadata } from "next";
import { StudioModePreview } from "@/components/sections/StudioModePreview";

// Rough review page for the Studio mode preview (not linked anywhere, not indexed)
export const metadata: Metadata = {
  title: "Studio mode preview",
  robots: { index: false, follow: false },
};

export default function StudioPreviewPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h1 className="text-3xl font-medium tracking-[-0.03em] md:text-5xl">Studio mode</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          The agent writes the code, runs it and checks it in the browser while you watch.
        </p>
      </div>
      <StudioModePreview />
    </main>
  );
}
