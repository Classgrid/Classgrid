import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";
import { getDesktopRelease } from "@/lib/desktopRelease";
import { AppleIcon, LinuxIcon, WindowsIcon } from "@/components/download/OsIcons";

export const metadata = buildPageMetadata({
  title: "Download Classgrid",
  description:
    "Download the Classgrid desktop app with Classgrid Code, our editor with Classgrid AI inside. Windows now, macOS and Linux coming soon.",
  path: "/download",
});

// The page shows the newest version from R2 (lib/desktopRelease.ts); refreshed every 5 minutes
export const revalidate = 300;

const WINDOWS_DOWNLOAD = "/download/windows";

// The public release notes (newest first). For the public the first release is the first version, so it starts
// with one entry; add the next version at the top when it is released.
const RELEASES: { version: string; date: string; notes: string[] }[] = [
  {
    version: "1.0.3",
    date: "8 November 2026",
    notes: ["First public version: the Classgrid app with Studio mode, and Classgrid Code."],
  },
];

export default async function DownloadPage() {
  const release = await getDesktopRelease();
  const version = release?.version ?? RELEASES[0].version;

  return (
    <div className="bg-background text-foreground">
      {/* Heading */}
      <section className="border-b border-border">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 pb-16 pt-32 text-center md:pb-20 md:pt-44">
          <div className="flex items-center gap-5">
            <img src="/download/classgrid-app.png" alt="Classgrid" className="h-20 w-20 md:h-24 md:w-24" />
            <img src="/download/classgrid-code.png" alt="Classgrid Code" className="h-20 w-20 md:h-24 md:w-24" />
          </div>

          <h1 className="mt-10 text-balance text-5xl font-medium tracking-[-0.035em] md:text-7xl">
            Download Classgrid
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-8 text-muted-foreground">
            The Classgrid app and Classgrid Code, in one install.
          </p>

        </div>
      </section>

      {/* Platforms */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-5xl grid-cols-1 sm:grid-cols-3">
          <a
            href={WINDOWS_DOWNLOAD}
            className="flex items-center gap-4 px-6 py-8 transition-colors hover:bg-muted/60 md:px-8"
          >
            <WindowsIcon className="h-7 w-7 shrink-0" />
            <span>
              <span className="block font-medium">Windows</span>
              <span className="block text-sm text-muted-foreground">Download version {version}</span>
            </span>
          </a>
          <div className="flex items-center gap-4 border-t border-border px-6 py-8 sm:border-l sm:border-t-0 md:px-8">
            <AppleIcon className="h-7 w-7 shrink-0" />
            <span>
              <span className="block font-medium">macOS</span>
              <span className="block text-sm text-muted-foreground">Coming soon</span>
            </span>
          </div>
          <div className="flex items-center gap-4 border-t border-border px-6 py-8 sm:border-l sm:border-t-0 md:px-8">
            <LinuxIcon className="h-7 w-7 shrink-0" />
            <span>
              <span className="block font-medium">Linux</span>
              <span className="block text-sm text-muted-foreground">Coming soon</span>
            </span>
          </div>
        </div>
      </section>

      {/* The two apps */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-5xl md:grid-cols-2">
          <div className="px-6 py-14 md:px-10 md:py-20">
            <img src="/download/classgrid-app.png" alt="" className="h-12 w-12" />
            <h2 className="mt-6 text-2xl font-medium tracking-[-0.02em]">Classgrid</h2>
            <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
              Studio mode on your computer. Chats, projects and helpers in one window, working on your own folders with
              a terminal and a browser. Your chats stay on your computer, and Mastero keeps a project in sync with
              GitHub.
            </p>
          </div>
          <div className="border-t border-border px-6 py-14 md:border-l md:border-t-0 md:px-10 md:py-20">
            <img src="/download/classgrid-code.png" alt="" className="h-12 w-12" />
            <h2 className="mt-6 text-2xl font-medium tracking-[-0.02em]">Classgrid Code</h2>
            <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
              A code editor built on VS Code, with the Agent next to your code. Open any project from the Classgrid app
              with one click. It signs in with the Classgrid app, so there is one login for both.
            </p>
          </div>
        </div>
      </section>

      {/* Release notes */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-14 md:py-20">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-2xl font-medium tracking-[-0.02em]">Release notes</h2>
            <Link href="/changelog" className="text-sm text-muted-foreground hover:text-foreground">
              Changelog
            </Link>
          </div>
          <p className="mt-2 text-[15px] text-muted-foreground">The app updates itself when a new version is out.</p>
          <ol className="mt-8 divide-y divide-border border-y border-border">
            {RELEASES.map((r) => (
              <li key={r.version} className="grid gap-2 py-5 sm:grid-cols-[140px_minmax(0,1fr)]">
                <div>
                  <span className="font-medium">{r.version}</span>
                  {r.version === version ? <span className="ml-2 text-sm text-muted-foreground">Latest</span> : null}
                  <span className="block text-sm text-muted-foreground">{r.date}</span>
                </div>
                <ul className="space-y-1 text-[15px] leading-7 text-muted-foreground">
                  {r.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
