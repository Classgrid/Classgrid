// The Classgrid desktop app's versions for classgrid.in/download. They are kept in Sanity (Desktop App Releases):
// each version has its date, what changed and the download address of every platform it came out on, so a new
// version is added there, never in the code. Until a Windows version is entered in Sanity, Windows is read from the
// latest.yml the installed apps update from (R2), and people get that version's public copy on the CDN
// (cdn.classgrid.in/desktop/Classgrid-Setup-x.y.z.exe), or the R2 file while the CDN copy isn't up yet.
import { getDesktopReleases, type DesktopReleaseDoc } from "@/sanity/lib/marketing";

export const DESKTOP_RELEASE_BASE = "https://pub-96a564393c0440f2bab37ad8bbe92398.r2.dev/desktop";
export const DESKTOP_CDN_BASE = "https://cdn.classgrid.in/desktop";

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
    const cdn = `${DESKTOP_CDN_BASE}/Classgrid-Setup-${version}.exe`;
    const cdnUp = await fetch(cdn, { method: "HEAD", next: { revalidate: 300 } }).then((r) => r.ok).catch(() => false);
    const url = cdnUp ? cdn : `${DESKTOP_RELEASE_BASE}/${encodeURIComponent(file)}`;
    return { version, releaseDate: date, urls: { windows: url }, notes: [] };
  } catch {
    return null;
  }
}

// All versions from Sanity, newest first. Sorted here by the version's numbers (1.0.10 is newer than 1.0.9), then by
// date: Sanity's own order compares versions as text, which put 1.0.9 above 1.0.10 and showed the older one as Latest
const versionParts = (v: string) => v.split(".").map((n) => parseInt(n, 10) || 0);
function compareVersionDesc(a: Release, b: Release) {
  const pa = versionParts(a.version);
  const pb = versionParts(b.version);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pb[i] ?? 0) - (pa[i] ?? 0);
    if (d) return d;
  }
  return (b.releaseDate || "").localeCompare(a.releaseDate || "");
}
export async function getReleases(): Promise<Release[]> {
  const docs = await getDesktopReleases();
  return (docs || []).map(fromSanity).sort(compareVersionDesc);
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
