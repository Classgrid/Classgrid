import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// The file never changes between deploys: the answer is made once at build time and kept (before 2026-11-21 the
// server read the file and answered again on every request, mostly for crawlers)
export const dynamic = "force-static";

export async function GET() {
  const filePath = path.join(process.cwd(), "docs", "PUBLIC_SYSTEM.md");
  const markdownContent = fs.readFileSync(filePath, "utf-8");

  // Pure, raw text file. Exactly like Vercel. No HTML, no CSS, no scrollbars.
  return new NextResponse(markdownContent, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
