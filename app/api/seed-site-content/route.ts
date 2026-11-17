import { NextResponse } from "next/server";

import { reindexPlatformKnowledge } from "@/lib/ai/platform-knowledge";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// The platform reindex deletes and re-embeds every platform:: and static:: chunk of the website AI, so it runs
// only with the same secret as POST /api/sync-embeddings (header x-classgrid-rag-secret or a Bearer token).
// Before 2026-11-17 anyone could start it with a plain GET.
function isAuthorized(req: Request) {
  const secret = process.env.RAG_SYNC_SECRET || process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) return false;
  const auth = req.headers.get("authorization") || "";
  const given =
    req.headers.get("x-classgrid-rag-secret") ||
    req.headers.get("x-rag-sync-secret") ||
    (auth.toLowerCase().startsWith("bearer ") ? auth.slice(7).trim() : "");
  return Boolean(given) && given === secret;
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const platform = await reindexPlatformKnowledge();

    return NextResponse.json({
      ok: true,
      message:
        "Reindexed platform knowledge from Sanity/indexed website and codebase content. Legacy manual static facts were removed and no manual facts were seeded.",
      platform,
    });
  } catch (err) {
    console.error("Platform knowledge reindex error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
