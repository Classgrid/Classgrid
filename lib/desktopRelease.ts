// The Classgrid desktop app's versions for classgrid.in/download, read through the website's Sanity client. The
// rules (sorting, the newest version per platform, the R2 fallback for Windows) are in lib/desktopReleaseCore.ts,
// which the AI server uses too.
import { getDesktopReleases } from "@/sanity/lib/marketing";
import { latestPerPlatform, releasesFromDocs, type Platform, type Release } from "@/lib/desktopReleaseCore";

export {
  DESKTOP_CDN_BASE,
  DESKTOP_RELEASE_BASE,
  PLATFORMS,
  formatReleaseDate,
  type Platform,
  type Release,
} from "@/lib/desktopReleaseCore";

// All versions from Sanity, newest first
export async function getReleases(): Promise<Release[]> {
  return releasesFromDocs(await getDesktopReleases());
}

// For each platform: the newest version that has a download address for it (or nothing: "Coming soon")
export async function getLatestPerPlatform(releases?: Release[]): Promise<Partial<Record<Platform, Release>>> {
  return latestPerPlatform(releases ?? (await getReleases()));
}
