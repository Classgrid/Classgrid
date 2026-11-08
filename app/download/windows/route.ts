import { NextResponse } from "next/server";
import { getDesktopRelease } from "@/lib/desktopRelease";

// classgrid.in/download/windows: always the newest Windows installer (the address stays the same across releases)
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const release = await getDesktopRelease();
  if (!release) return NextResponse.redirect(new URL("/download?unavailable=1", request.url), 302);
  return NextResponse.redirect(release.url, 302);
}
