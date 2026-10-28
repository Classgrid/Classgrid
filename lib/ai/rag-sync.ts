import { createClient } from "next-sanity";

import { embedText, RAG_EMBEDDING_DIMENSIONS, RAG_EMBEDDING_MODEL } from "@/lib/ai/embedding";
import {
  chunkRagDocument,
  extractRagDocument,
  INDEXABLE_SANITY_TYPES,
  isIndexableSanityType,
} from "@/lib/ai/rag-content";
import { liveTokens, normalizeLivePricing } from "@/app/pricing/pricing-format";
import { LOCAL_SOLUTIONS } from "@/content/solutions";
import { connectMongo } from "@/lib/mongodb";
import { RagChunk } from "@/lib/models/RagChunk";
import { apiVersion, dataset, projectId } from "@/sanity/env";

let sanityReadClient: ReturnType<typeof createClient> | null = null;

function getSanityReadClient() {
  if (!sanityReadClient) {
    sanityReadClient = createClient({
      projectId,
      dataset,
      apiVersion,
      perspective: "published",
      useCdn: false,
      token: process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN,
    });
  }

  return sanityReadClient;
}

export type RagSyncResult = {
  ok: boolean;
  action: "ignored" | "deleted" | "synced";
  documentId?: string;
  documentType?: string;
  chunks?: number;
  reason?: string;
};

export async function fetchSanityDocumentById(documentId: string): Promise<Record<string, unknown> | null> {
  const cleanId = documentId.replace(/^drafts\./, "");
  return getSanityReadClient().fetch<Record<string, unknown> | null>(
    `*[_id == $id || _id == $draftId][0]{...}`,
    { id: cleanId, draftId: `drafts.${cleanId}` },
    { cache: "no-store" }
  );
}

export async function fetchAllIndexableSanityDocuments(): Promise<Record<string, unknown>[]> {
  return getSanityReadClient().fetch<Record<string, unknown>[]>(
    `*[_type in $types && !(_id in path("drafts.**"))]{...}`,
    { types: INDEXABLE_SANITY_TYPES },
    { cache: "no-store" }
  );
}

export async function deleteRagChunksForDocument(documentId: string): Promise<RagSyncResult> {
  const cleanId = documentId.replace(/^drafts\./, "");
  await connectMongo();
  await RagChunk.deleteMany({ documentId: { $in: [documentId, cleanId, `drafts.${cleanId}`] } });
  return {
    ok: true,
    action: "deleted",
    documentId: cleanId,
  };
}

// The pricing page text has blanks like {topupMin}; the site fills them live from the super admin settings.
// Fill them the same way before saving, so the Ask AI memory has the real amounts.
async function fillLivePricingTokens(doc: Record<string, unknown>): Promise<Record<string, unknown>> {
  try {
    const api = process.env.NEXT_PUBLIC_PLATFORM_API_URL || "https://api.classgrid.in";
    const res = await fetch(`${api}/api/public/ai-pricing`, { cache: "no-store", signal: AbortSignal.timeout(8000) });
    if (!res.ok) return doc;
    const tokens = liveTokens(normalizeLivePricing(await res.json()));
    const fill = (value: unknown): unknown => {
      if (typeof value === "string") return value.replace(/\{(\w+)\}/g, (match, key: string) => tokens[key] ?? match);
      if (Array.isArray(value)) return value.map(fill);
      if (value && typeof value === "object") {
        return Object.fromEntries(Object.entries(value).map(([key, inner]) => [key, fill(inner)]));
      }
      return value;
    };
    return fill(doc) as Record<string, unknown>;
  } catch {
    return doc;
  }
}

export async function syncSanityDocumentToRag(
  documentOrId: string | Record<string, unknown>
): Promise<RagSyncResult> {
  let doc =
    typeof documentOrId === "string" ? await fetchSanityDocumentById(documentOrId) : documentOrId;
  if (doc && doc._type === "aiPricingPage") doc = await fillLivePricingTokens(doc);

  if (!doc) {
    return {
      ok: false,
      action: "ignored",
      reason: "Document not found in Sanity.",
    };
  }

  const documentType = typeof doc._type === "string" ? doc._type : "";
  const documentId = typeof doc._id === "string" ? doc._id : "";

  if (!isIndexableSanityType(documentType)) {
    return {
      ok: true,
      action: "ignored",
      documentId,
      documentType,
      reason: "Unsupported Sanity document type.",
    };
  }

  const extracted = extractRagDocument(doc);
  if (!extracted) {
    await deleteRagChunksForDocument(documentId);
    return {
      ok: true,
      action: "ignored",
      documentId,
      documentType,
      reason: "No indexable text found.",
    };
  }

  const chunks = chunkRagDocument(extracted);
  if (!chunks.length) {
    await deleteRagChunksForDocument(extracted.documentId);
    return {
      ok: true,
      action: "ignored",
      documentId: extracted.documentId,
      documentType: extracted.documentType,
      reason: "No chunks generated.",
    };
  }

  await connectMongo();
  await RagChunk.deleteMany({ documentId: extracted.documentId });

  const rows = [];
  for (const chunk of chunks) {
    const embedding = await embedText(chunk.chunkText);
    rows.push({
      ...chunk,
      embedding,
      source: "sanity",
      metadata: {
        ...chunk.metadata,
        embeddingModel: RAG_EMBEDDING_MODEL,
        embeddingDimensions: RAG_EMBEDDING_DIMENSIONS,
      },
    });
  }

  await RagChunk.insertMany(rows, { ordered: false });

  return {
    ok: true,
    action: "synced",
    documentId: extracted.documentId,
    documentType: extracted.documentType,
    chunks: rows.length,
  };
}

// The Solutions pages (content/solutions/*.json) are in the code, not Sanity, so they are synced from here
export async function reindexLocalSolutionPages(): Promise<RagSyncResult[]> {
  const results: RagSyncResult[] = [];
  for (const page of LOCAL_SOLUTIONS) {
    results.push(
      await syncSanityDocumentToRag({
        ...page,
        _id: `local-solution-${page.slug}`,
        _type: "aiSolutionPage",
        slug: { current: page.slug },
      })
    );
  }
  return results;
}

export async function reindexAllSanityDocuments(): Promise<{
  ok: true;
  totalDocuments: number;
  synced: number;
  ignored: number;
  chunks: number;
  results: RagSyncResult[];
}> {
  const docs = await fetchAllIndexableSanityDocuments();
  const results: RagSyncResult[] = [];
  let synced = 0;
  let ignored = 0;
  let chunks = 0;

  for (const doc of docs) {
    const result = await syncSanityDocumentToRag(doc);
    results.push(result);
    if (result.action === "synced") {
      synced += 1;
      chunks += result.chunks ?? 0;
    } else {
      ignored += 1;
    }
  }

  return {
    ok: true,
    totalDocuments: docs.length,
    synced,
    ignored,
    chunks,
    results,
  };
}
