import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// Rebuilds classgrid.in/reviews from Sanity. Called by Sanity Studio's Publish button on a review (with or without
// the thank-you email), so a published review shows on the page at once (Nikhil, 2026-11-26: a review published at
// 23:18 still showed "No reviews yet", because the page is built at deploy time and nothing told it to rebuild).
// It only refreshes that one public page, so it needs no key.
export const dynamic = "force-dynamic";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST() {
  revalidatePath("/reviews");
  return NextResponse.json({ refreshed: "/reviews" }, { headers: corsHeaders });
}
