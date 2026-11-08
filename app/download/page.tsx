import Link from "next/link";
import { ArrowUpRight, Check, Download, RefreshCw, ShieldCheck, LogIn } from "lucide-react";
import { buildPageMetadata } from "@/lib/metadata";
import { formatReleaseDate, formatSize, getDesktopRelease } from "@/lib/desktopRelease";
import { AppleIcon, LinuxIcon, WindowsIcon } from "@/components/download/OsIcons";

export const metadata = buildPageMetadata({
  title: "Download Classgrid for Windows",
  description:
    "Download the Classgrid desktop app for Windows: Classgrid AI with Studio mode, plus Classgrid Code, our editor with the AI inside. One install, one login. macOS and Linux coming soon.",
  path: "/download",
});

// The page shows the newest version from R2 (lib/desktopRelease.ts); refreshed every 5 minutes
export const revalidate = 300;

const CHAT_URL = "https://chat.classgrid.in";
const WINDOWS_DOWNLOAD = "/download/windows";

// What changed in each version, newest first (add the next version at the top when it is released)
const RELEASES: { version: string; date: string; notes: string[] }[] = [
  {
    version: "1.0.3",
    date: "8 November 2026",
    notes: [
      "The Agent map shows each helper with its own steps and thinking, green while it works and grey when done.",
      "The sidebar's top row shows only the name.",
    ],
  },
  {
    version: "1.0.2",
    date: "8 November 2026",
    notes: ["Back and forward arrows in the sidebar work on every page, including chats opened from the chat menu."],
  },
  {
    version: "1.0.1",
    date: "8 November 2026",
    notes: [
      "Classgrid Code gets its own desktop and Start menu icon, and opens with the Classgrid app's login.",
      "The installer carries every file the app needs.",
    ],
  },
  {
    version: "1.0.0",
    date: "8 November 2026",
    notes: ["The first public version of the Classgrid desktop app."],
  },
];

const PLATFORMS = [
  { name: "Windows", detail: "Windows 10 and 11, 64-bit", Icon: WindowsIcon, available: true },
  { name: "macOS", detail: "Apple silicon and Intel", Icon: AppleIcon, available: false },
  { name: "Linux", detail: "Ubuntu, Debian, Fedora and more", Icon: LinuxIcon, available: false },
];

const APPS = [
  {
    logo: "/download/classgrid-app.png",
    name: "Classgrid",
    tagline: "Your AI agent, on your computer.",
    points: [
      "Studio mode: chats, projects and helpers that work side by side",
      "Works on folders on your computer, with its own terminal and browser",
      "Your chats are kept on your computer",
      "Mastero: put a project on GitHub and keep it in sync",
      "Schedules, Library, Grids and Requests, all in one window",
    ],
  },
  {
    logo: "/download/classgrid-code.png",
    name: "Classgrid Code",
    tagline: "A full code editor with Classgrid AI inside.",
    points: [
      "Built on the open-source VS Code editor, so your extensions and shortcuts feel at home",
      "The Agent panel sits next to your code and edits it with you",
      "Opens any project from the Classgrid app with one click on Open",
      "Signs in with the Classgrid app: one login and one logout for both",
      "Its own icon on the desktop and in the Start menu",
    ],
  },
];

const STEPS = [
  {
    Icon: Download,
    title: "Download",
    body: "Get the installer for Windows. Both apps come in this one file.",
  },
  {
    Icon: ShieldCheck,
    title: "Install",
    body: "Run it and pick where to install. If Windows shows \"Windows protected your PC\", click More info, then Run anyway. That box shows for new apps while our signing certificate is being set up.",
  },
  {
    Icon: LogIn,
    title: "Sign in",
    body: "Sign in with your Classgrid account. Classgrid Code uses the same login on its own.",
  },
];

const FAQ = [
  {
    q: "Is the desktop app free?",
    a: "Yes, it is free to download. AI use works the same as on the web: a free weekly limit, and AI credits when you need more.",
  },
  {
    q: "Does it update itself?",
    a: "Yes. The app downloads new versions in the background and installs them the next time you open it.",
  },
  {
    q: "What do I get in one install?",
    a: "Two apps: Classgrid, with Studio mode, and Classgrid Code, the editor. Each has its own icon, and they share one login.",
  },
  {
    q: "When are macOS and Linux coming?",
    a: "Soon. Until then, everything in Classgrid also works in your browser at chat.classgrid.in.",
  },
];

export default async function DownloadPage() {
  const release = await getDesktopRelease();
  const version = release?.version ?? RELEASES[0].version;
  const size = formatSize(release?.sizeBytes ?? null);
  const released = formatReleaseDate(release?.releaseDate ?? null);
  const meta = [`Version ${version}`, size, "Windows 10 and 11, 64-bit"].filter(Boolean).join(" · ");

  return (
    <div className="bg-background text-foreground">
      {/* Heading */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(16,185,129,0.14),transparent_70%)] dark:bg-[radial-gradient(60%_60%_at_50%_0%,rgba(16,185,129,0.18),transparent_70%)]"
        />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pb-16 pt-28 text-center md:px-10 md:pb-24 md:pt-40">
          <div className="flex items-center gap-4 md:gap-6">
            <img
              src="/download/classgrid-app.png"
              alt="Classgrid app"
              className="h-20 w-20 drop-shadow-[0_14px_28px_rgba(0,0,0,0.28)] md:h-28 md:w-28"
            />
            <span className="text-2xl font-light text-muted-foreground md:text-3xl" aria-hidden="true">
              +
            </span>
            <img
              src="/download/classgrid-code.png"
              alt="Classgrid Code"
              className="h-20 w-20 drop-shadow-[0_14px_28px_rgba(0,0,0,0.18)] md:h-28 md:w-28"
            />
          </div>

          <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Download</p>
          <h1 className="mt-4 text-balance text-5xl font-medium tracking-[-0.035em] md:text-7xl">
            Classgrid for your desktop
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground md:text-xl">
            One download, two apps: Classgrid, your AI agent with Studio mode, and Classgrid Code, our editor with the
            AI inside. One login for both.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={WINDOWS_DOWNLOAD}
              className="inline-flex h-14 items-center gap-3 rounded-full bg-foreground px-8 text-[17px] font-medium text-background transition-opacity hover:opacity-85"
            >
              <WindowsIcon className="h-[18px] w-[18px]" />
              Download for Windows
            </a>
            <a
              href={CHAT_URL}
              className="inline-flex h-14 items-center gap-1.5 rounded-full border border-border px-7 text-[17px] font-medium transition-colors hover:bg-muted"
            >
              Open in browser
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">{meta}</p>
          {released ? <p className="mt-1 text-sm text-muted-foreground">Released {released}</p> : null}
        </div>
      </section>

      {/* Platforms */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl md:grid-cols-3">
          {PLATFORMS.map(({ name, detail, Icon, available }, i) => (
            <div
              key={name}
              className={`flex flex-col gap-6 px-6 py-10 md:px-10 md:py-12 ${i > 0 ? "border-t border-border md:border-l md:border-t-0" : ""}`}
            >
              <div className="flex items-center justify-between">
                <Icon className="h-8 w-8" />
                {available ? (
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    Available
                  </span>
                ) : (
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    Coming soon
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-medium tracking-[-0.02em]">{name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
              </div>
              {available ? (
                <a
                  href={WINDOWS_DOWNLOAD}
                  className="mt-auto inline-flex h-11 w-fit items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-85"
                >
                  <Download className="h-4 w-4" />
                  Download {size ? `(${size})` : ""}
                </a>
              ) : (
                <span className="mt-auto inline-flex h-11 w-fit items-center rounded-full border border-border px-5 text-sm font-medium text-muted-foreground">
                  Launching soon
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Two apps */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 pt-16 md:px-10 md:pt-24">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">What you get</p>
          <h2 className="mt-4 max-w-3xl text-balance text-4xl font-medium tracking-[-0.03em] md:text-5xl">
            Two apps, one install
          </h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-7xl border-t border-border md:grid-cols-2">
          {APPS.map((app, i) => (
            <div key={app.name} className={`px-6 py-12 md:px-10 md:py-16 ${i > 0 ? "border-t border-border md:border-l md:border-t-0" : ""}`}>
              <img src={app.logo} alt="" className="h-16 w-16" />
              <h3 className="mt-6 text-3xl font-medium tracking-[-0.025em]">{app.name}</h3>
              <p className="mt-2 text-lg text-muted-foreground">{app.tagline}</p>
              <ul className="mt-8 space-y-4">
                {app.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[15px] leading-6">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Install steps */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 pt-16 md:px-10 md:pt-24">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Install</p>
          <h2 className="mt-4 text-balance text-4xl font-medium tracking-[-0.03em] md:text-5xl">Ready in three steps</h2>
        </div>
        <ol className="mx-auto mt-12 grid max-w-7xl border-t border-border md:grid-cols-3">
          {STEPS.map(({ Icon, title, body }, i) => (
            <li key={title} className={`px-6 py-10 md:px-10 md:py-12 ${i > 0 ? "border-t border-border md:border-l md:border-t-0" : ""}`}>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-muted-foreground">0{i + 1}</span>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-xl font-medium">{title}</h3>
              <p className="mt-3 text-[15px] leading-7 text-muted-foreground">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Versions */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
          <div className="px-6 py-16 md:px-10 md:py-24 lg:border-r lg:border-border">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Versions</p>
            <h2 className="mt-4 text-4xl font-medium tracking-[-0.03em]">What&apos;s new</h2>
            <p className="mt-4 flex items-start gap-2 text-[15px] leading-7 text-muted-foreground">
              <RefreshCw className="mt-1.5 h-4 w-4 shrink-0" />
              The app updates itself, so you always have the newest version. The download button always gives the
              newest one too.
            </p>
            <Link href="/changelog" className="mt-6 inline-flex items-center gap-1 text-[15px] font-medium hover:underline">
              Full changelog <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <ol className="divide-y divide-border border-t border-border lg:border-t-0">
            {RELEASES.map((r) => (
              <li key={r.version} className="px-6 py-8 md:px-10">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-mono text-lg font-medium">{r.version}</h3>
                  {r.version === version ? (
                    <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                      Latest
                    </span>
                  ) : null}
                  <span className="text-sm text-muted-foreground">{r.date}</span>
                </div>
                <ul className="mt-3 space-y-2">
                  {r.notes.map((n) => (
                    <li key={n} className="text-[15px] leading-7 text-muted-foreground">
                      {n}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Requirements and questions */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
          <div className="px-6 py-16 md:px-10 md:py-24 lg:border-r lg:border-border">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Requirements</p>
            <ul className="mt-6 space-y-3 text-[15px] leading-6">
              <li>Windows 10 or Windows 11, 64-bit</li>
              <li>About 1 GB of free disk space</li>
              <li>An internet connection for AI answers</li>
              <li>A Classgrid account (free)</li>
            </ul>
          </div>
          <dl className="divide-y divide-border border-t border-border lg:border-t-0">
            {FAQ.map((f) => (
              <div key={f.q} className="px-6 py-8 md:px-10">
                <dt className="text-lg font-medium">{f.q}</dt>
                <dd className="mt-2 text-[15px] leading-7 text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Final call */}
      <section>
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-20 text-center md:py-28">
          <h2 className="text-balance text-4xl font-medium tracking-[-0.03em] md:text-6xl">Get Classgrid on Windows</h2>
          <p className="mt-5 text-lg text-muted-foreground">Free to download. macOS and Linux are coming soon.</p>
          <a
            href={WINDOWS_DOWNLOAD}
            className="mt-10 inline-flex h-14 items-center gap-3 rounded-full bg-foreground px-8 text-[17px] font-medium text-background transition-opacity hover:opacity-85"
          >
            <WindowsIcon className="h-[18px] w-[18px]" />
            Download for Windows
          </a>
          <p className="mt-4 text-sm text-muted-foreground">{meta}</p>
        </div>
      </section>
    </div>
  );
}
