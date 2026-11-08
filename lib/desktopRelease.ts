// The Classgrid desktop app's versions for classgrid.in/download. They are kept in Sanity (Desktop App Releases):
// each version has its date, what changed and the download address of every platform it came out on, so a new
// version is added there, never in the code. Windows can also be read from the latest.yml the installed apps update
// from (R2), which keeps the Windows download working before its version is entered in Sanity.
import { getDesktopReleases, type DesktopReleaseDoc } from "@/sanity/lib/marketing";

export const DESKTOP_RELEASE_BASE = "https://pub-96a564393c0440f2bab37ad8bbe92398.r2.dev/desktop";

export type Platform = "windows" | "macos" | "linux";
export const PLATFORMS: Platform[] = ["windows", "macos", "linux"];

export type Release = {
  version: string;
  releaseDate: string; // YYYY-MM-DD
  urls: Partial<Record<Platform, string>>;
  notes: string[];
};

function fromSanity(doc: DesktopReleaseDoc): Release {
  const urls: Partial<Record<Platform, string>> = {};
  if (doc.windowsUrl) urls.windows = doc.windowsUrl;
  if (doc.macosUrl) urls.macos = doc.macosUrl;
  if (doc.linuxUrl) urls.linux = doc.linuxUrl;
  return { version: doc.version, releaseDate: doc.releaseDate, urls, notes: (doc.notes || []).filter(Boolean) };
}

// The newest Windows installer on R2 (latest.yml), for when Sanity has no Windows version yet
async function windowsFromR2(): Promise<Release | null> {
  try {
    const res = await fetch(`${DESKTOP_RELEASE_BASE}/latest.yml`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const yml = await res.text();
    const pick = (re: RegExp) => yml.match(re)?.[1]?.trim().replace(/^['"]|['"]$/g, "") || null;
    const version = pick(/^version:\s*(.+)$/m);
    const file = pick(/^path:\s*(.+)$/m);
    if (!version || !file) return null;
    const date = (pick(/^releaseDate:\s*(.+)$/m) || "").slice(0, 10);
    return { version, releaseDate: date, urls: { windows: `${DESKTOP_RELEASE_BASE}/${encodeURIComponent(file)}` }, notes: [] };
  } catch {
    return null;
  }
}

// All versions from Sanity, newest first
export async function getReleases(): Promise<Release[]> {
  const docs = await getDesktopReleases();
  return (docs || []).map(fromSanity);
}

// For each platform: the newest version that has a download address for it (or nothing: "Coming soon")
export async function getLatestPerPlatform(releases?: Release[]): Promise<Partial<Record<Platform, Release>>> {
  const list = releases ?? (await getReleases());
  const latest: Partial<Record<Platform, Release>> = {};
  for (const p of PLATFORMS) {
    const found = list.find((r) => r.urls[p]);
    if (found) latest[p] = found;
  }
  if (!latest.windows) {
    const r2 = await windowsFromR2();
    if (r2) latest.windows = r2;
  }
  return latest;
}

export function formatReleaseDate(date: string | null | undefined) {
  if (!date) return null;
  const d = new Date(`${date.slice(0, 10)}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
