// Adds the MCP apps from the Classgrid app (AI Hub > Plugins > More apps, server/src/services/custom-mcp-catalog.js in
// the platform repo) to the Plugins page in Sanity. Each logo is uploaded as a Sanity image. Apps already on the page
// (same _key) are skipped, so it can be run again safely.
// Run: node scripts/upload-mcp-plugins.mjs
import dotenv from "dotenv";
import { createClient } from "@sanity/client";
import sharp from "sharp";

dotenv.config({ path: ".env.local", quiet: true });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const DEFAULT_BRAND_COLOR = "#A1A1AA";
const hex = ({ r, g, b }) => "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("").toUpperCase();

/** The logo's brand color as hex: an SVG's fill, or a PNG's main color (white, black and see-through pixels left out) */
export async function brandColor(buf, type) {
  if (type.includes("svg")) return buf.toString("utf8").match(/fill="(#[0-9a-fA-F]{6})"/)?.[1]?.toUpperCase() || DEFAULT_BRAND_COLOR;
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const counts = new Map();
  for (let i = 0; i < data.length; i += info.channels) {
    const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    if (a < 128 || max < 40 || min > 215) continue;
    const k = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
    const c = counts.get(k) || { n: 0, r: 0, g: 0, b: 0 };
    c.n++; c.r += r; c.g += g; c.b += b; counts.set(k, c);
  }
  const top = [...counts.values()].sort((x, y) => y.n - x.n)[0];
  return top ? hex({ r: top.r / top.n, g: top.g / top.n, b: top.b / top.n }) : DEFAULT_BRAND_COLOR;
}

const APPS = [
  { id: "linear", name: "Linear", logo: "https://cdn.simpleicons.org/linear" },
  { id: "atlassian", name: "Jira & Confluence", logo: "https://cdn.simpleicons.org/atlassian" },
  { id: "sentry", name: "Sentry", logo: "https://cdn.simpleicons.org/sentry", invertInDark: true },
  { id: "stripe", name: "Stripe", logo: "https://cdn.simpleicons.org/stripe" },
  { id: "paypal", name: "PayPal", logo: "https://cdn.simpleicons.org/paypal" },
  { id: "square", name: "Square", logo: "https://cdn.simpleicons.org/square", invertInDark: true },
  { id: "intercom", name: "Intercom", logo: "https://cdn.simpleicons.org/intercom" },
  { id: "monday", name: "monday.com", logo: "https://www.google.com/s2/favicons?domain=monday.com&sz=128" },
  { id: "clickup", name: "ClickUp", logo: "https://cdn.simpleicons.org/clickup" },
  { id: "airtable", name: "Airtable", logo: "https://cdn.simpleicons.org/airtable" },
  { id: "miro", name: "Miro", logo: "https://cdn.simpleicons.org/miro", invertInDark: true },
  { id: "dropbox", name: "Dropbox", logo: "https://cdn.simpleicons.org/dropbox" },
  { id: "zapier", name: "Zapier", logo: "https://cdn.simpleicons.org/zapier" },
  { id: "webflow", name: "Webflow", logo: "https://cdn.simpleicons.org/webflow" },
  { id: "wix", name: "Wix", logo: "https://cdn.simpleicons.org/wix", invertInDark: true },
  { id: "netlify", name: "Netlify", logo: "https://cdn.simpleicons.org/netlify" },
  { id: "cloudflare", name: "Cloudflare", logo: "https://cdn.simpleicons.org/cloudflare" },
  { id: "neon", name: "Neon", logo: "https://cdn.simpleicons.org/neon" },
  { id: "prisma", name: "Prisma Postgres", logo: "https://cdn.simpleicons.org/prisma", invertInDark: true },
  { id: "posthog", name: "PostHog", logo: "https://cdn.simpleicons.org/posthog", invertInDark: true },
  { id: "granola", name: "Granola", logo: "https://www.google.com/s2/favicons?domain=granola.ai&sz=128" },
  { id: "close", name: "Close", logo: "https://www.google.com/s2/favicons?domain=close.com&sz=128" },
  { id: "apify", name: "Apify", logo: "https://www.google.com/s2/favicons?domain=apify.com&sz=128" },
  { id: "todoist", name: "Todoist", logo: "https://cdn.simpleicons.org/todoist" },
  { id: "calendly", name: "Calendly", logo: "https://cdn.simpleicons.org/calendly" },
  { id: "gitlab", name: "GitLab", logo: "https://cdn.simpleicons.org/gitlab" },
  { id: "postman", name: "Postman", logo: "https://cdn.simpleicons.org/postman" },
  { id: "razorpay", name: "Razorpay", logo: "https://cdn.simpleicons.org/razorpay", invertInDark: true },
  { id: "attio", name: "Attio", logo: "https://www.google.com/s2/favicons?domain=attio.com&sz=128" },
  { id: "klaviyo", name: "Klaviyo", logo: "https://www.google.com/s2/favicons?domain=klaviyo.com&sz=128" },
  { id: "semrush", name: "Semrush", logo: "https://cdn.simpleicons.org/semrush" },
  { id: "ahrefs", name: "Ahrefs", logo: "https://www.google.com/s2/favicons?domain=ahrefs.com&sz=128" },
  { id: "amplitude", name: "Amplitude", logo: "https://www.google.com/s2/favicons?domain=amplitude.com&sz=128" },
  { id: "datadog", name: "Datadog", logo: "https://cdn.simpleicons.org/datadog" },
  { id: "fireflies", name: "Fireflies", logo: "https://www.google.com/s2/favicons?domain=fireflies.ai&sz=128" },
  { id: "render", name: "Render", logo: "https://cdn.simpleicons.org/render", invertInDark: true },
  { id: "n8n", name: "n8n", logo: "https://cdn.simpleicons.org/n8n" },
  { id: "huggingface", name: "Hugging Face", logo: "https://cdn.simpleicons.org/huggingface" },
  { id: "deepwiki", name: "DeepWiki", logo: "https://www.google.com/s2/favicons?domain=deepwiki.com&sz=128" },
  { id: "exa", name: "Exa", logo: "https://www.google.com/s2/favicons?domain=exa.ai&sz=128" },
  { id: "shopify-dev", name: "Shopify Dev", logo: "https://cdn.simpleicons.org/shopify" },
  { id: "cloudflare-docs", name: "Cloudflare Docs", logo: "https://cdn.simpleicons.org/cloudflare" },
  { id: "microsoft-learn", name: "Microsoft Learn", logo: "https://www.google.com/s2/favicons?domain=learn.microsoft.com&sz=128" },
  { id: "aws-docs", name: "AWS Docs", logo: "https://www.google.com/s2/favicons?domain=aws.amazon.com&sz=128" },
];

const DRY = process.argv.includes("--dry");

async function main() {
  const page = await client.fetch(`*[_id == "pluginsPage"][0]{ "keys": plugins[]._key }`);
  if (!page) throw new Error("No pluginsPage document in Sanity");
  const have = new Set(page.keys || []);
  const items = [];
  for (const app of APPS) {
    const key = `mcp-${app.id}`;
    if (have.has(key)) { console.log("skip (already there):", app.name); continue; }
    const res = await fetch(app.logo);
    if (!res.ok) { console.log("skip (logo failed):", app.name, res.status); continue; }
    const type = (res.headers.get("content-type") || "").split(";")[0] || "image/png";
    const buf = Buffer.from(await res.arrayBuffer());
    const color = await brandColor(buf, type);
    if (DRY) { console.log(app.name.padEnd(20), await brandColor(buf, type), type); continue; }
    // The Plugins page takes SVG logos only: a PNG is wrapped in an SVG so it looks the same
    let svg = buf;
    if (!type.includes("svg")) {
      const { width = 128, height = 128 } = await sharp(buf).metadata();
      svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}"><image width="${width}" height="${height}" href="data:${type};base64,${buf.toString("base64")}"/></svg>`);
    }
    const asset = await client.assets.upload("image", svg, { filename: `${app.id}.svg`, contentType: "image/svg+xml" });
    items.push({
      _key: key,
      _type: "pluginItem",
      name: app.name,
      logo: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
      brandColor: color,
      invertInDark: !!app.invertInDark,
    });
    console.log("ready:", app.name, color);
  }
  if (!items.length) return console.log("Nothing to add.");
  await client.patch("pluginsPage").setIfMissing({ plugins: [] }).append("plugins", items).commit();
  console.log(`Added ${items.length} plugins.`);
}

if (process.argv[1]?.endsWith("upload-mcp-plugins.mjs")) main().catch((err) => { console.error(err); process.exit(1); });
