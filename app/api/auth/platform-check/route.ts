import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export const dynamic = "force-dynamic";

// Tells the page whether this browser is logged in on chat.classgrid.in (shared "token" cookie), without a database call
export async function GET() {
  const platformToken = (await cookies()).get("token")?.value;
  const secret = process.env.PLATFORM_JWT_SECRET || process.env.JWT_SECRET;
  if (!platformToken || !secret) return NextResponse.json({ loggedIn: false });

  try {
    await jwtVerify(platformToken, new TextEncoder().encode(secret));
    return NextResponse.json({ loggedIn: true });
  } catch {
    return NextResponse.json({ loggedIn: false });
  }
}
