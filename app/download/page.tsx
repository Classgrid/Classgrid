import { buildPageMetadata } from "@/lib/metadata";
import { formatReleaseDate, getLatestPerPlatform, getReleases } from "@/lib/desktopRelease";
import { AppleIcon, LinuxIcon, WindowsIcon } from "@/components/download/OsIcons";

export const metadata = buildPageMetadata({
  title: "Download Classgrid",
  description:
    "Download the Classgrid desktop app with Classgrid Code, our editor with Classgrid AI inside. Windows now, macOS and Linux coming soon.",
  path: "/download",
});

// Versions, release notes and download addresses come from Sanity (Desktop App Releases, lib/desktopRelease.ts);
// the page refreshes every 5 minutes, so a version added there shows up without a code change
export const revalidate = 300;

const PLATFORM_CARDS = [
  { key: "windows", name: "Windows", Icon: WindowsIcon },
  { key: "macos", name: "macOS", Icon: AppleIcon },
  { key: "linux", name: "Linux", Icon: LinuxIcon },
] as const;

export default async function DownloadPage() {
  const releases = await getReleases();
  const latest = await getLatestPerPlatform(releases);
  const newest = releases[0]?.version;

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
          {PLATFORM_CARDS.map(({ key, name, Icon }, i) => {
            const release = latest[key];
            const border = i > 0 ? "border-t border-border sm:border-l sm:border-t-0" : "";
            const body = (
              <>
                <Icon className="h-7 w-7 shrink-0" />
                <span>
                  <span className="block font-medium">{name}</span>
                  <span className="block text-sm text-muted-foreground">
                    {release ? `Download version ${release.version}` : "Coming soon"}
                  </span>
                </span>
              </>
            );
            return release ? (
              <a
                key={key}
                href={`/download/${key}`}
                className={`flex items-center gap-4 px-6 py-8 transition-colors hover:bg-muted/60 md:px-8 ${border}`}
              >
                {body}
              </a>
            ) : (
              <div key={key} className={`flex items-center gap-4 px-6 py-8 md:px-8 ${border}`}>
                {body}
              </div>
            );
          })}
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
          <h2 className="text-2xl font-medium tracking-[-0.02em]">Release notes</h2>
          <p className="mt-2 text-[15px] text-muted-foreground">The app updates itself when a new version is out.</p>
          {releases.length > 0 ? (
          <ol className="mt-8 divide-y divide-border border-y border-border">
            {releases.map((r) => (
              <li key={r.version} className="grid gap-2 py-5 sm:grid-cols-[140px_minmax(0,1fr)]">
                <div>
                  <span className="font-medium">{r.version}</span>
                  {r.version === newest ? <span className="ml-2 text-sm text-muted-foreground">Latest</span> : null}
                  <span className="block text-sm text-muted-foreground">{formatReleaseDate(r.releaseDate)}</span>
                </div>
                <ul className="space-y-1 text-[15px] leading-7 text-muted-foreground">
                  {r.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          ) : null}
        </div>
      </section>
    </div>
  );
}
