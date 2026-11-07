// Uploads the "Mastero Projects" doc (documentation/ai/mastero-projects.md) to Sanity,
// in the Project Mode section of the Classgrid AI docs, right after "Projects in the Cloud and on Your Computer".
// Run: node scripts/upload-mastero-doc.mjs
import fs from "fs";
import dotenv from "dotenv";
import { createClient } from "@sanity/client";

dotenv.config({ path: ".env.local", quiet: true });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const raw = fs.readFileSync("documentation/ai/mastero-projects.md", "utf8").replace(/\r\n/g, "\n");
const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
if (!match) throw new Error("No frontmatter");
const meta = {};
for (const line of match[1].split("\n")) {
  const i = line.indexOf(":");
  if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
}
const id = `doc-ai-${meta.slug}`;
await client.transaction()
  .createIfNotExists({ _id: id, _type: "apiDoc" })
  .patch(id, (p) => p.set({
    title: meta.title,
    slug: { _type: "slug", current: meta.slug },
    category: meta.category,
    order: Number(meta.order),
    description: meta.description,
    docsVersion: "ai",
    content: match[2].trim() + "\n",
    publishedAt: new Date().toISOString(),
  }))
  .commit();
const saved = await client.getDocument(id);
console.log(`Published "${saved.title}" (${saved.slug.current}), ${saved.content.length} characters`);
