import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
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

  return NextResponse.redirect(new URL("/support/ticket", base));
}
