// Adds one desktop app version to the download page (Sanity "Desktop App Releases", desktopRelease documents, which
// lib/desktopRelease.ts reads). Run after the GitHub build put the installer on R2 and the CDN:
//   node scripts/add-desktop-release.mjs <version> <YYYY-MM-DD> "<note 1>" "<note 2>" ...
// Uses NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET and SANITY_API_WRITE_TOKEN from
// .env.local; prints no secret. Checks the CDN installer answers before writing.
import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local", quiet: true });
const [version, releaseDate, ...notes] = process.argv.slice(2);
if (!/^\d+\.\d+\.\d+$/.test(version || "") || !/^\d{4}-\d{2}-\d{2}$/.test(releaseDate || "")) {
  console.error("usage: node scripts/add-desktop-release.mjs <version> <YYYY-MM-DD> <notes...>");
  process.exit(1);
}
const windowsUrl = `https://cdn.classgrid.in/desktop/Classgrid-Setup-${version}.exe`;
const head = await fetch(windowsUrl, { method: "HEAD" });
if (!head.ok) {
  console.error(`The installer isn't on the CDN yet (${head.status}): ${windowsUrl}`);
  process.exit(1);
}
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("No Sanity write token in .env.local");
  process.exit(1);
}
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "a4wk6kp5",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  token,
  useCdn: false,
});
const doc = {
  _id: `desktopRelease-${version.replace(/\./g, "-")}`,
  _type: "desktopRelease",
  version,
  releaseDate,
  windowsUrl,
  notes: notes.filter(Boolean),
};
const saved = await client.createOrReplace(doc);
console.log(`Saved ${saved._id}: ${saved.version} (${saved.releaseDate}), ${saved.notes.length} notes`);
