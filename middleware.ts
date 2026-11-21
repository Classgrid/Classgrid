import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// The pages that have a Hindi or Marathi version, chosen with ?lang=hi or ?lang=mr (lib/locale.ts). Their English
// version is a cached page; a request that names another language is sent, by the rewrite below, to the same page
// under app/i18n/[lang]/…, which is cached too. Before 2026-11-21 these pages read ?lang= themselves, which made the
// server build them again on every single visit, in every language.
const LOCALIZED_PAGE =
  /^\/(?:blog(?:\/[^/]+)?|changelog(?:\/[^/]+)?|help-center|help-center\/(?:category|article)\/[^/]+|support)\/?$/;

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;

  /* ------------------------------------------------------------------ */
  /*  studio.classgrid.in → rewrite to /studio routes                    */
  /* ------------------------------------------------------------------ */
  const isStudioSubdomain =
    hostname === "studio.classgrid.in" ||
    hostname.startsWith("studio.classgrid.in:");

  if (isStudioSubdomain) {
    // Do not rewrite API routes so NextAuth and webhooks continue to work natively
    if (pathname.startsWith("/api/")) {
      return NextResponse.next();
    }

    // studio.classgrid.in/         → /studio
    // studio.classgrid.in/vision   → /studio/vision
    const studioPath = pathname === "/" ? "/studio" : `/studio${pathname}`;
    const url = request.nextUrl.clone();
    url.pathname = studioPath;
    return NextResponse.rewrite(url);
  }

  /* ------------------------------------------------------------------ */
  /*  Redirect classgrid.in/studio → studio.classgrid.in                 */
  /* ------------------------------------------------------------------ */
  if (pathname.startsWith("/studio")) {
    const subPath = pathname.replace(/^\/studio\/?/, "");
    const redirectUrl = new URL(
      `https://studio.classgrid.in${subPath ? `/${subPath}` : ""}`
    );
    redirectUrl.search = request.nextUrl.search;
    return NextResponse.redirect(redirectUrl, 301);
  }

  /* ------------------------------------------------------------------ */
  /*  ?lang=hi / ?lang=mr → the cached page of that language              */
  /* ------------------------------------------------------------------ */
  const lang = request.nextUrl.searchParams.get("lang");
  if ((lang === "hi" || lang === "mr") && LOCALIZED_PAGE.test(pathname)) {
    // The address in the browser stays the same (…?lang=hi), so the links and the header keep the language
    const url = request.nextUrl.clone();
    url.pathname = `/i18n/${lang}${pathname.replace(/\/$/, "")}`;
    return NextResponse.rewrite(url);
  }

  /* ------------------------------------------------------------------ */
  /*  /onboarding — skip instantly if user already has a username         */
  /* ------------------------------------------------------------------ */
  if (pathname === "/onboarding") {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (token?.forumUsername) {
      // User already has a username — no need for onboarding
      const sso = request.nextUrl.searchParams.get("sso");
      const sig = request.nextUrl.searchParams.get("sig");
      const nextUrl = request.nextUrl.searchParams.get("next");

      if (sso && sig) {
        // Discourse SSO flow — go straight to the SSO handshake
        const url = new URL("/api/sso/discourse", request.url);
        url.searchParams.set("sso", sso);
        url.searchParams.set("sig", sig);
        return NextResponse.redirect(url);
      } else if (nextUrl) {
        return NextResponse.redirect(new URL(nextUrl, request.url));
      } else {
        return NextResponse.redirect(new URL("/support/inquiry", request.url));
      }
    }
  }

  return NextResponse.next();
}

// This code runs only where it has something to do. Until 2026-11-21 it ran on every request of the site (every
// page, picture and API call: about 475,000 runs a month, nearly one for each request Vercel served), although it
// acts only in the cases below. Each run is counted by Vercel as a function call and as CPU time.
export const config = {
  matcher: [
    // classgrid.in/studio → studio.classgrid.in
    "/studio",
    "/studio/:path*",
    // Skip onboarding for someone who already has a username
    "/onboarding",
    // studio.classgrid.in: every path of that address is served from /studio (not static files)
    {
      source: "/((?!_next/static|_next/image|favicon\\.ico).*)",
      has: [{ type: "host", value: "studio.classgrid.in" }],
    },
    // A page asked for in Hindi or Marathi
    {
      source: "/((?!api/|_next/static|_next/image|favicon\\.ico).*)",
      has: [{ type: "query", key: "lang", value: "(hi|mr)" }],
    },
  ],
};
