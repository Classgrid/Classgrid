// Checks the Project Mode docs order and that the Mastero note is in the projects page.
// Run: node scripts/check-mastero-doc.mjs
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

const docs = await client.fetch(
  `*[_type == "apiDoc" && docsVersion == "ai" && category == "project-mode"] | order(coalesce(order, 999) asc, title asc) { title, "slug": slug.current, order }`
);
console.log(JSON.stringify(docs, null, 1));

const mastero = await client.fetch(`*[_type == "apiDoc" && slug.current == "mastero"][0]{ title, description, content }`);
console.log("title:", mastero.title);
console.log("description:", mastero.description);
console.log("has Mastero note:", mastero.content.includes("Except a Mastero project"));
console.log("has FAQ details:", mastero.content.includes("<details>"));
console.log("links kept:", ["/docs/connect-github", "/docs/pull-requests-and-backups", "/docs/review-and-undo", "/docs/deploy-with-vercel", "/docs/projects-cloud-and-computer"].every((l) => mastero.content.includes(l)));
