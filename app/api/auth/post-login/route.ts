import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const base = process.env.NEXTAUTH_URL || "https://classgrid.in";

  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", base));
  }

  const user = session.user as any;

  // No chat.classgrid.in account yet: accounts are created there, so send them to make one
  if (!user.isPlatformUser) {
    return NextResponse.redirect("https://chat.classgrid.in/login");
  }

  // Back to the page that asked for the login (only paths on this site)
  const next = request.nextUrl.searchParams.get("next") || "";
  if (next.startsWith("/") && !next.startsWith("//")) {
    return NextResponse.redirect(new URL(next, base));
  }

  return NextResponse.redirect(new URL("/support/ticket", base));
}
