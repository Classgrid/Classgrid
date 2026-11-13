import { NextResponse, after } from "next/server";
import { PLATFORMS, getLatestPerPlatform, type Platform } from "@/lib/desktopRelease";
import { countDownload, isPersonDownload } from "@/lib/downloadCount";

// classgrid.in/download/windows, /download/macos, /download/linux: always the newest installer for that platform
// (from Sanity's Desktop App Releases); the address stays the same across releases. A platform that is not out yet
// goes back to the download page. Each download is counted in Sanity after the answer is sent (lib/downloadCount.ts:
// one per person by their address, and every click), so the count never slows the download.
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ platform: string }> }) {
  const { platform } = await params;
  if (!PLATFORMS.includes(platform as Platform)) return NextResponse.redirect(new URL("/download", request.url), 302);
  const latest = await getLatestPerPlatform();
  const release = latest[platform as Platform];
  const url = release?.urls[platform as Platform];
  if (!url) return NextResponse.redirect(new URL("/download", request.url), 302);
  if (isPersonDownload(request)) after(() => countDownload(request, platform as Platform, release?.version || null));
  return NextResponse.redirect(url, 302);
}
