// Uploads the Studio Mode docs (documentation/ai/studio-*.md) and help articles
// (documentation/help-center, category studio-mode) to Sanity, plus the "Studio Mode" help category.
// Run: node scripts/upload-studio-mode-docs.mjs
import fs from "fs";
import path from "path";
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

function readMd(file) {
  const raw = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`No frontmatter in ${file}`);
  const meta = {};
  for (const line of match[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body: match[2].trim() + "\n" };
}

const now = new Date().toISOString();
const tx = client.transaction();

// Docs pages
const docsDir = "documentation/ai";
const docFiles = fs.readdirSync(docsDir).filter((f) => /^studio-.*\.md$/.test(f));
for (const f of docFiles) {
  const { meta, body } = readMd(path.join(docsDir, f));
  tx.createIfNotExists({ _id: `doc-ai-${meta.slug}`, _type: "apiDoc" });
  tx.patch(`doc-ai-${meta.slug}`, (p) =>
    p.set({
      title: meta.title,
      slug: { _type: "slug", current: meta.slug },
      category: meta.category,
      order: Number(meta.order),
      description: meta.description,
      docsVersion: "ai",
      content: body,
      publishedAt: now,
    })
  );
}

// Help category, right after Project Mode
tx.createIfNotExists({ _id: "help-cat-studio-mode", _type: "helpCategory" });
tx.patch("help-cat-studio-mode", (p) =>
  p.set({
    title: "Studio Mode",
    slug: { _type: "slug", current: "studio-mode" },
    description: "Let the agent work in a live browser, check its changes and choose what it may do.",
    icon: "Globe",
    categoryType: "articles",
    order: 3.5,
  })
);

// Help articles
const helpDir = "documentation/help-center";
const helpFiles = fs.readdirSync(helpDir).filter((f) => f.endsWith(".md"));
let helpCount = 0;
for (const f of helpFiles) {
  const { meta, body } = readMd(path.join(helpDir, f));
  if (meta.category !== "studio-mode") continue;
  helpCount++;
  tx.createIfNotExists({ _id: `help-article-${meta.slug}`, _type: "helpArticle" });
  tx.patch(`help-article-${meta.slug}`, (p) =>
    p.set({
      title: { _type: "localeString", en: meta.title },
      slug: { _type: "slug", current: meta.slug },
      summary: { _type: "localeText", en: meta.summary },
      category: { _type: "reference", _ref: "help-cat-studio-mode" },
      markdownBody: body,
      showDates: true,
      publishedAt: now,
      lastUpdatedAt: now,
    })
  );
}

await tx.commit();
console.log(`Uploaded ${docFiles.length} docs pages, 1 help category and ${helpCount} help articles.`);
