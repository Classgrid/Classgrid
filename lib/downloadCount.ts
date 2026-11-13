// Download counts for classgrid.in/download, kept in Sanity (Desktop App Downloads): every person counts once, by the
// address they download from (their IP), not by clicks. Clicks are counted too, separately.
// - One private document per person: _id "downloader.<hash>" (an id with a dot is never readable without a token, so
//   it never shows on the site). The IP itself is never stored: only an HMAC of it, keyed with the Sanity write token,
//   so the address cannot be read back from the hash.
// - The totals: "desktopDownloadStats" (people, clicks, and both per platform), and on each version's release document
//   the people who downloaded that version and its clicks.
// Bots, link previews and prefetches are not counted. A failed count never stops the download.
import { createHmac } from "node:crypto";
import { createClient, type SanityClient } from "@sanity/client";
import type { Platform } from "@/lib/desktopRelease";

const STATS_ID = "desktopDownloadStats";
const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|telegram|discord|slack|curl|wget|python|headless|lighthouse|monitor|uptime/i;

let client: SanityClient | null = null;
function writeClient(): SanityClient | null {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!token || !projectId) return null;
  client ??= createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    token,
    useCdn: false,
  });
  return client;
}

// The visitor's address as Vercel sees it (the first one in x-forwarded-for is the visitor's own)
function visitorIp(request: Request): string | null {
  const h = request.headers;
  const ip = (h.get("x-forwarded-for") || "").split(",")[0]?.trim() || h.get("x-real-ip")?.trim() || "";
  return ip || null;
}

/** Whether this request is a person downloading (not a bot, a link preview or a prefetch) */
export function isPersonDownload(request: Request): boolean {
  const h = request.headers;
  if (request.method !== "GET") return false;
  if (h.get("next-router-prefetch") || h.get("purpose") === "prefetch" || h.get("sec-purpose")?.includes("prefetch")) return false;
  const ua = h.get("user-agent") || "";
  return !!ua && !BOT.test(ua);
}

/** Counts one download of `version` for `platform`: a new person adds one person, every download adds one click */
export async function countDownload(request: Request, platform: Platform, version: string | null): Promise<void> {
  try {
    const sanity = writeClient();
    const ip = visitorIp(request);
    const token = process.env.SANITY_API_WRITE_TOKEN;
    if (!sanity || !ip || !token) return;
    const hash = createHmac("sha256", token).update(ip).digest("hex").slice(0, 40);
    const id = `downloader.${hash}`;
    const now = new Date().toISOString();
    const v = version && /^\d+\.\d+\.\d+$/.test(version) ? version : null;

    const known = await sanity.getDocument<{ _rev: string; versions?: string[]; platforms?: string[] }>(id);
    const newPerson = !known;
    const newForVersion = !!v && !(known?.versions || []).includes(v);
    const newForPlatform = !(known?.platforms || []).includes(platform);

    const tx = sanity.transaction();
    if (newPerson) {
      // (create fails if another download of the same person just made it: the whole count is then tried again below)
      tx.create({ _id: id, _type: "desktopDownloader", firstAt: now, lastAt: now, clicks: 1, versions: v ? [v] : [], platforms: [platform] });
    } else {
      tx.patch(id, (p) => {
        let q = p.ifRevisionId(known._rev).set({ lastAt: now }).inc({ clicks: 1 });
        if (newForVersion && v) q = q.setIfMissing({ versions: [] }).append("versions", [v]);
        if (newForPlatform) q = q.setIfMissing({ platforms: [] }).append("platforms", [platform]);
        return q;
      });
    }
    tx.createIfNotExists({ _id: STATS_ID, _type: "desktopDownloadStats", people: 0, clicks: 0 });
    tx.patch(STATS_ID, (p) =>
      p
        .setIfMissing({ people: 0, clicks: 0, [`${platform}People`]: 0, [`${platform}Clicks`]: 0 })
        .inc({ clicks: 1, [`${platform}Clicks`]: 1, ...(newPerson ? { people: 1 } : {}), ...(newForPlatform ? { [`${platform}People`]: 1 } : {}) })
        .set({ updatedAt: now }),
    );
    if (v) {
      const releaseId = await sanity.fetch<string | null>(`*[_type == "desktopRelease" && version == $v && !(_id in path("drafts.**"))][0]._id`, { v });
      if (releaseId) tx.patch(releaseId, (p) => p.setIfMissing({ downloads: 0, clicks: 0 }).inc({ clicks: 1, ...(newForVersion ? { downloads: 1 } : {}) }));
    }
    await tx.commit({ visibility: "async" });
  } catch (err) {
    // (two downloads of one person at the same moment: the second one's create or revision check fails; it is not
    // counted again, so a person still counts once)
    console.error("[download count]", (err as Error)?.message || err);
  }
}
