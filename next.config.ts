import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));
const requestDemoApiBase =
  (process.env.REQUEST_DEMO_API_BASE_URL || process.env.BACKEND_URL || "")
    .replace(/\/$/, "");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    // Proxy AI requests directly to the EC2 server (bypassing Vercel serverless limits)
    const aiRewrites = [
      {
        source: "/api/ask-ai",
        destination: "https://ai.classgrid.in/api/ask-ai",
      },
      {
        source: "/api/ask-ai/:path*",
        destination: "https://ai.classgrid.in/api/ask-ai/:path*",
      },
    ];

    // Only proxy to external backend when REQUEST_DEMO_API_BASE_URL is set
    // Without it, the local app/api/request-demo/route.ts handles demos via MongoDB directly
    if (!requestDemoApiBase) return aiRewrites;
    
    return [
      ...aiRewrites,
      {
        source: "/api/request-demo",
        destination: `${requestDemoApiBase}/api/public/request-demo`,
      },
      {
        source: "/api/request-demo/:id/meeting-booked",
        destination: `${requestDemoApiBase}/api/public/request-demo/:id/meeting-booked`,
      },
    ];
  },
  async redirects() {
    return [
      // /agent is now the home page
      { source: "/agent", destination: "/", permanent: true },
      // Legacy comparison links
      { source: "/compare/vs-competitors", destination: "/compare", permanent: true },
      { source: "/compare/legacy-platforms", destination: "/compare/ai-agents", permanent: true },
      { source: "/compare/classgrid-vs-dots-grok-muse", destination: "/compare/ai-agents", permanent: true },
      // Old ERP pages → Classgrid AI pages (permanent, so Google moves them over)
      { source: "/solutions", destination: "/solutions/agent-mode", permanent: true },
      { source: "/institutions/:path*", destination: "/solutions/agent-mode", permanent: true },
      { source: "/use-cases/:path*", destination: "/solutions/agent-mode", permanent: true },
      { source: "/solutions/for-schools", destination: "/solutions/agent-mode", permanent: true },
      { source: "/solutions/for-engineering", destination: "/solutions/project-mode", permanent: true },
      { source: "/solutions/for-colleges", destination: "/solutions/grids", permanent: true },
      { source: "/solutions/for-jr-colleges", destination: "/solutions/whatsapp-calls", permanent: true },
      { source: "/solutions/for-coaching", destination: "/solutions/research", permanent: true },
      { source: "/solutions/for-students", destination: "/solutions/documents-and-files", permanent: true },
      { source: "/solutions/for-teachers", destination: "/solutions/reminders-and-automation", permanent: true },
      { source: "/solutions/for-admins", destination: "/solutions/email-and-calendar", permanent: true },
      { source: "/solutions/industries/:path*", destination: "/solutions/agent-mode", permanent: true },
      { source: "/solutions/roles/:path*", destination: "/solutions/agent-mode", permanent: true },
      { source: "/product/:path*", destination: "/", permanent: true },
      { source: "/modules/:path*", destination: "/", permanent: true },
      { source: "/features/:path*", destination: "/", permanent: true },
      // Redirect community/forum to new Discourse forum
      // { source: "/community", destination: "https://forum.classgrid.in", permanent: false },
      // { source: "/forum", destination: "https://forum.classgrid.in", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/reviews/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" },
        ]
      },
      {
        source: "/api/ask-ai/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" },
        ]
      },
      {
        source: "/api/ask-ai",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" },
        ]
      }
    ];
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-icons",
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-navigation-menu",
    ],
  },
  images: {
    minimumCacheTTL: 3600,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      // OAuth provider avatars
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
    ],
  },
};

export default nextConfig;
