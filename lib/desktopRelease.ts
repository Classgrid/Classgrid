// The newest Classgrid desktop app for Windows, read from the same latest.yml the installed apps update from (R2).
// Every release replaces the installer (the old version is deleted), so the site never links to a version number:
// /download/windows reads this and sends people to whatever is newest.
export const DESKTOP_RELEASE_BASE = "https://pub-96a564393c0440f2bab37ad8bbe92398.r2.dev/desktop";

export type DesktopRelease = {
  version: string;
  file: string; // e.g. "Classgrid Setup 1.0.3.exe"
  url: string; // full download address
  sizeBytes: number | null;
  releaseDate: string | null; // ISO
};

export async function getDesktopRelease(): Promise<DesktopRelease | null> {
  try {
    const res = await fetch(`${DESKTOP_RELEASE_BASE}/latest.yml`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const yml = await res.text();
    const pick = (re: RegExp) => yml.match(re)?.[1]?.trim().replace(/^['"]|['"]$/g, "") || null;
    const version = pick(/^version:\s*(.+)$/m);
    const file = pick(/^path:\s*(.+)$/m);
    if (!version || !file) return null;
    const size = Number(pick(/^\s+size:\s*(\d+)/m));
    return {
      version,
      file,
      url: `${DESKTOP_RELEASE_BASE}/${encodeURIComponent(file)}`,
      sizeBytes: Number.isFinite(size) && size > 0 ? size : null,
      releaseDate: pick(/^releaseDate:\s*(.+)$/m),
    };
  } catch {
    return null;
  }
}

export function formatSize(bytes: number | null) {
  if (!bytes) return null;
  return `${Math.round(bytes / (1024 * 1024))} MB`;
}

export function formatReleaseDate(iso: string | null) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });
}
