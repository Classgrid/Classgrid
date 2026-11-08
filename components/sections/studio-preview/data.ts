// Static demo data for the Studio mode preview. A made-up project and chats, never real user data.

export const PROJECT = "classgrid-hero";
export const CHAT_TITLE = "Add a pricing section";

export type SidebarChat = { title: string; time: string; active?: boolean };
export type SidebarFolder = { name: string; open: boolean; chats: SidebarChat[]; more?: number };

export const MASTERO_FOLDERS: SidebarFolder[] = [
  {
    name: PROJECT,
    open: true,
    chats: [
      { title: CHAT_TITLE, time: "32m", active: true },
      { title: "Fix the navbar on mobile", time: "4h" },
      { title: "Write tests for the API", time: "16h" },
    ],
    more: 1,
  },
  { name: "landing-page", open: false, chats: [{ title: "Hero copy ideas", time: "2d" }] },
];

export const PROJECT_FOLDERS: SidebarFolder[] = [
  { name: "docs-site", open: false, chats: [{ title: "Search for the docs", time: "3d" }] },
];

export type Step = { verb: string; target: string; add?: number; del?: number; tab: "files" | "terminal" | "browser" };

export const STEPS: Step[] = [
  { verb: "Read", target: "app/page.tsx", tab: "files" },
  { verb: "Created", target: "components/Pricing.tsx", add: 42, tab: "files" },
  { verb: "Edited", target: "app/page.tsx", add: 2, del: 0, tab: "files" },
  { verb: "Ran", target: "npm run build", tab: "terminal" },
  { verb: "Opened", target: "localhost:3000", tab: "browser" },
];

// File tree for the Files tab
export type TreeRow = { name: string; depth: number; dir?: boolean; open?: boolean; active?: boolean; badge?: "A" | "M" };
export const TREE: TreeRow[] = [
  { name: "app", depth: 0, dir: true, open: true },
  { name: "layout.tsx", depth: 1 },
  { name: "page.tsx", depth: 1, badge: "M" },
  { name: "globals.css", depth: 1 },
  { name: "components", depth: 0, dir: true, open: true },
  { name: "Hero.tsx", depth: 1 },
  { name: "Nav.tsx", depth: 1 },
  { name: "Pricing.tsx", depth: 1, active: true, badge: "A" },
  { name: "public", depth: 0, dir: true },
  { name: "package.json", depth: 0 },
  { name: "README.md", depth: 0 },
];

// Code shown in the Files tab: each line is a list of [text, colour class] pieces
type Tok = [string, string?];
// Light-mode colours first, dark-mode colours after (the preview follows the site theme)
const K = "text-[#a626a4] dark:text-[#c678dd]"; // keyword
const S = "text-[#50a14f] dark:text-[#98c379]"; // string
const F = "text-[#4078f2] dark:text-[#61afef]"; // function / component
const T = "text-[#c18401] dark:text-[#e5c07b]"; // type / tag
const A = "text-[#986801] dark:text-[#d19a66]"; // attribute / number
const C = "text-black/40 dark:text-white/35"; // comment

export const CODE: Tok[][] = [
  [["const ", K], ["plans", F], [" = ["]],
  [["  { name: "], ['"Starter"', S], [", price: "], ['"Free"', S], [" },"]],
  [["  { name: "], ['"Pro"', S], [", price: "], ['"₹499"', S], [", featured: "], ["true", A], [" },"]],
  [["  { name: "], ['"Team"', S], [", price: "], ['"₹1,999"', S], [" },"]],
  [["];"]],
  [[""]],
  [["// Three plans, the middle one highlighted", C]],
  [["export function ", K], ["Pricing", F], ["() {"]],
  [["  return ("]],
  [["    <", ""], ["section", T], [" ", ""], ["className", A], ["=", ""], ['"grid gap-6 md:grid-cols-3"', S], [">"]],
  [["      {plans.", ""], ["map", F], ["((p) => ("]],
  [["        <", ""], ["PlanCard", T], [" ", ""], ["key", A], ["={p.name} {...p} />"]],
  [["      ))}"]],
  [["    </", ""], ["section", T], [">"]],
  [["  );"]],
  [["}"]],
];

export const TERMINAL: { text: string; tone?: "cmd" | "ok" | "dim" }[] = [
  { text: "PS C:\\projects\\classgrid-hero> npm run build", tone: "cmd" },
  { text: "" },
  { text: "> classgrid-hero@0.1.0 build", tone: "dim" },
  { text: "> next build", tone: "dim" },
  { text: "" },
  { text: "   ▲ Next.js 15.2.0" },
  { text: "   Creating an optimized production build ..." },
  { text: " ✓ Compiled successfully in 6.4s", tone: "ok" },
  { text: " ✓ Linting and checking validity of types", tone: "ok" },
  { text: " ✓ Generating static pages (5/5)", tone: "ok" },
  { text: "" },
  { text: "Route (app)                    Size     First Load JS", tone: "dim" },
  { text: "┌ ○ /                          4.1 kB         109 kB" },
  { text: "└ ○ /_not-found                 977 B         102 kB" },
  { text: "" },
  { text: "[exit code 0]", tone: "dim" },
];
