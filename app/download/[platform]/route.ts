import { NextResponse } from "next/server";
import { PLATFORMS, getLatestPerPlatform, type Platform } from "@/lib/desktopRelease";

// classgrid.in/download/windows, /download/macos, /download/linux: always the newest installer for that platform
// (from Sanity's Desktop App Releases); the address stays the same across releases. A platform that is not out yet
// goes back to the download page.
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ platform: string }> }) {
  const { platform } = await params;
  if (!PLATFORMS.includes(platform as Platform)) return NextResponse.redirect(new URL("/download", request.url), 302);
  const latest = await getLatestPerPlatform();
  const url = latest[platform as Platform]?.urls[platform as Platform];
  if (!url) return NextResponse.redirect(new URL("/download", request.url), 302);
  return NextResponse.redirect(url, 302);
}
