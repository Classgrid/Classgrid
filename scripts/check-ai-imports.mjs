// Checks that the AI server (server-ai) imports nothing outside lib/ and server-ai/.
// deploy-ai.yml copies only those two folders to the server, so an import of app/, content/, sanity/ or components/
// (or of a file that does not exist) makes the server crash-loop at start. That happened on 2026-11-17: live-facts.ts
// imported app/pricing/plans-data and pm2 restarted classgrid-ai thousands of times while the website's Ask AI and
// the WhatsApp bot were down. Run before every AI deploy: node scripts/check-ai-imports.mjs (exit 1 on a problem).
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ALLOWED = new Set(["lib", "server-ai"]);
const EXTENSIONS = ["", ".ts", ".tsx", ".js", ".mjs", ".cjs", ".json", "/index.ts", "/index.tsx", "/index.js"];
const IMPORT = /(?:import|export)[^'"]*?from\s*['"]([^'"]+)['"]|import\(\s*['"]([^'"]+)['"]\s*\)|require\(\s*['"]([^'"]+)['"]\s*\)/g;

const seen = new Set();
const problems = [];

function resolve(spec, from) {
  let base;
  if (spec.startsWith("@/")) base = spec.slice(2);
  else if (spec.startsWith(".")) base = path.posix.normalize(path.posix.join(path.posix.dirname(from), spec));
  else return null; // a package from node_modules
  for (const ext of EXTENSIONS) {
    const p = base + ext;
    if (fs.existsSync(path.join(ROOT, p)) && fs.statSync(path.join(ROOT, p)).isFile()) return p;
  }
  return { missing: base };
}

function walk(file, chain) {
  if (seen.has(file)) return;
  seen.add(file);
  const text = fs.readFileSync(path.join(ROOT, file), "utf8");
  for (const m of text.matchAll(IMPORT)) {
    const spec = m[1] || m[2] || m[3];
    const target = resolve(spec, file);
    if (target === null) continue;
    const via = [...chain, file].slice(-3).join(" <- ");
    if (typeof target === "object") {
      problems.push(`missing file: "${spec}" in ${via}`);
      continue;
    }
    if (!ALLOWED.has(target.split("/")[0])) {
      problems.push(`outside lib/ and server-ai/: ${target} ("${spec}") in ${via}`);
      continue;
    }
    walk(target, [...chain, file]);
  }
}

for (const name of fs.readdirSync(path.join(ROOT, "server-ai"))) {
  if (/\.(ts|js|mjs)$/.test(name)) walk(`server-ai/${name}`, []);
}

if (problems.length) {
  console.error(`The AI server imports files it will not have on the server (deploy-ai.yml copies only lib/ and server-ai/):\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
console.log(`AI server imports are fine (${seen.size} files, all inside lib/ and server-ai/).`);
