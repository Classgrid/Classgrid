

import { buildPageMetadata } from "@/lib/metadata";
// trigger rebuild
import { CareersForm } from "@/components/careers/CareersForm";

export const metadata = buildPageMetadata({ title: "Careers", description: "Join the Classgrid team. Apply for internships and full-time roles.", path: "/careers" });

type SalesMetric = {
  label: string;
  value: string;
};

type SalesRole = {
  label: string;
  value: string;
};

export default async function Page() {
  const title = "Join the team building Classgrid AI";
  const body = "We're building an agentic platform for everyday work. If you love building, designing or telling great stories, we'd love to hear from you. Apply for an open role or internship.";

  const metrics: SalesMetric[] = [
    { label: "Workplace", value: "Remote and flexible" },
    { label: "Environment", value: "Learn and grow fast" },
  ];

  const hiringSteps = [
    "Apply with the form. It takes about 10 minutes.",
    "Our team reviews your application and your GitHub work.",
    "If it's a fit, we invite you to a short call.",
  ];
  
  const formTitle = "Apply to Classgrid";
  const formSubtitle = "We'll review your application and get back to you.";
  const submitLabel = "Submit Application";
  
  const fieldName = "Full Name";
  const fieldEmail = "Email Address";
  const fieldInstitution = "LinkedIn / Portfolio URL";
  const fieldRole = "Interested Role";
  const rolePlaceholder = "Select a role";
  
  const roles: SalesRole[] = [
    // ── Engineering ──
    { label: "Full Stack Web Developer", value: "fullstack_web" },
    { label: "Frontend Web Developer", value: "frontend_web" },
    { label: "Backend Web Developer", value: "backend_web" },
    { label: "Software Engineer", value: "software_eng" },
    { label: "Mobile App Developer", value: "mobile_eng" },
    { label: "AI / Machine Learning Engineer", value: "ai_eng" },
    { label: "Data Scientist", value: "data_scientist" },
    { label: "Database Administrator", value: "db_admin" },
    { label: "DevOps & Cloud Engineer", value: "devops_eng" },
    { label: "QA & Testing Engineer", value: "qa_eng" },
    // ── Product & Design ──
    { label: "Product Manager", value: "pm" },
    { label: "UI/UX Designer", value: "designer" },
    { label: "Graphic Designer", value: "graphic_designer" },
    // ── Marketing & Sales ──
    { label: "Growth & Marketing Lead", value: "growth_lead" },
    { label: "SEO & Content Specialist", value: "seo" },
    { label: "Technical Content Writer", value: "tech_writer" },
    { label: "Sales Executive", value: "sales" },
    { label: "Customer Success Manager", value: "customer_success" },
    // ── Internships ──
    { label: "Internship — Full Stack Development", value: "intern_fullstack" },
    { label: "Internship — Frontend Development", value: "intern_frontend" },
    { label: "Internship — Backend Development", value: "intern_backend" },
    { label: "Internship — UI/UX Design", value: "intern_design" },
    { label: "Internship — Marketing & Growth", value: "intern_mktg" },
  ];

  const techStackGroups: Record<string, string[]> = {
    "Languages": [
      "JavaScript", "TypeScript", "Python", "Go", "Rust", "Java", "C++", "C", "C#",
      "Ruby", "PHP", "Swift", "Kotlin", "Dart", "Zig", "Elixir", "Haskell",
      "Scala", "Clojure", "Solidity", "Shell / Bash", "SQL", "HTML", "CSS"
    ],
    "Frontend & UI Styling": [
      "React", "Next.js", "Vue.js", "Nuxt.js", "Angular", "Svelte", "SvelteKit",
      "Astro", "Remix", "SolidJS", "Qwik", "HTMX", "Alpine.js", "Tailwind CSS",
      "shadcn/ui", "Material UI (MUI)", "Chakra UI", "Radix UI", "Headless UI",
      "Sass / SCSS", "CSS Modules", "Styled Components", "Emotion", "Vanilla Extract",
      "Framer Motion", "GSAP", "Three.js", "Vite", "Webpack", "esbuild"
    ],
    "State Management & Fetching": [
      "Zustand", "Redux Toolkit", "React Query / TanStack Query", "SWR",
      "Jotai", "Recoil", "MobX", "React Context API", "Apollo Client", "URQL"
    ],
    "Backend & API Protocols": [
      "Node.js", "Bun", "Deno", "Express.js", "Fastify", "NestJS", "Hono", "Elysia",
      "Django", "Flask", "FastAPI", "Laravel", "Spring Boot", "Ruby on Rails",
      "GraphQL", "REST API", "gRPC", "WebSockets", "Socket.IO", "tRPC", "WebRTC"
    ],
    "Databases & Caching": [
      "MongoDB", "PostgreSQL", "MySQL", "SQLite", "Redis", "Upstash", "Neon",
      "Turso", "Firebase Firestore", "DynamoDB", "Cassandra", "Neo4j",
      "Elasticsearch", "ClickHouse", "Snowflake", "Prisma ORM", "Drizzle ORM",
      "Mongoose", "MariaDB", "Oracle DB", "SQL Server"
    ],
    "Vector & AI Databases": [
      "Pinecone", "Qdrant", "Chroma DB", "Weaviate", "Milvus", "LanceDB",
      "Supabase pgvector", "Neon pgvector", "Faiss"
    ],
    "Auth & Security Identity": [
      "Clerk", "NextAuth / Auth.js", "Firebase Auth", "Supabase Auth", "Kinde",
      "Auth0", "Better Auth", "Lucia Auth", "Passport.js", "JWT / OAuth 2.0"
    ],
    "Cloud & Serverless Computing": [
      "AWS (EC2, S3, RDS)", "Google Cloud (GCP)", "Microsoft Azure", "Vercel",
      "Netlify", "Railway", "Render", "Fly.io", "Cloudflare Workers / Pages",
      "DigitalOcean", "Heroku", "AWS Lambda", "Google Cloud Run", "SST"
    ],
    "DevOps, CI/CD & Monorepos": [
      "Docker", "Kubernetes", "Nginx", "Apache", "PM2", "GitHub Actions",
      "GitLab CI/CD", "CircleCI", "Terraform", "Ansible", "Helm", "Prometheus",
      "Grafana", "Turborepo", "Nx (Monorepo)", "Linux Administration"
    ],
    "Mobile & Game Development": [
      "React Native", "Expo", "Flutter", "Swift (iOS)", "Kotlin (Android)",
      "SwiftUI", "Jetpack Compose", "Unity", "Unreal Engine", "PWA"
    ],
    "AI, ML & Data Science": [
      "OpenAI API", "Google Gemini API", "Anthropic Claude API", "Groq",
      "Vercel AI SDK", "LangChain", "LangGraph", "LlamaIndex", "Hugging Face",
      "TensorFlow", "PyTorch", "scikit-learn", "Pandas", "NumPy", "Polars",
      "Ollama", "Replicate", "RAG (Retrieval-Augmented Generation)", "NLP", "Computer Vision"
    ],
    "CMS & E-Commerce": [
      "Sanity CMS", "WordPress", "Shopify", "Webflow", "Payload CMS", "Strapi",
      "Contentful", "Ghost", "KeystoneJS", "Hugo", "Docusaurus"
    ],
    "Web3 & Blockchain": [
      "Solidity", "Web3.js", "Ethers.js", "Hardhat", "Foundry", "Rust (Solana)",
      "IPFS", "Arweave"
    ],
    "Testing & Quality Assurance": [
      "Jest", "Vitest", "Cypress", "Playwright", "Selenium", "Mocha / Chai",
      "Testing Library", "MSW (Mock Service Worker)", "Puppeteer", "Postman",
      "JUnit", "PyTest", "Storybook"
    ],
    "Other SaaS & Payment APIs": [
      "Git / GitHub", "Jira", "Linear", "Notion", "Slack", "Stripe", "Razorpay",
      "Lemon Squeezy", "PayPal", "Twilio", "Agora (Video/Voice)", "SendGrid",
      "Brevo", "Cloudinary", "Uploadthing", "PostHog", "Mixpanel", "Sentry"
    ]
  };
  

  
  return (
    <div className="bg-background text-foreground">
      {/* Heading */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="px-6 pb-10 pt-28 md:px-10 md:pb-14 md:pt-36 lg:border-r lg:border-border">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Careers</p>
            <h1 className="mt-5 text-balance text-5xl font-medium tracking-[-0.035em] md:text-7xl">{title}</h1>
          </div>
          <div className="flex items-end px-6 pb-10 md:px-10 md:pb-14">
            <p className="text-lg leading-relaxed text-muted-foreground">{body}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="bg-muted/40 px-6 py-12 md:px-10 lg:border-r lg:border-border lg:py-16">
            <div className="divide-y divide-border border border-border bg-background">
              {metrics.map((metric) => (
                <div key={metric.label} className="p-7 md:p-8">
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">{metric.label}</p>
                  <p className="mt-2 text-2xl font-medium tracking-[-0.02em]">{metric.value}</p>
                </div>
              ))}
              <div className="p-7 md:p-8">
                <h2 className="text-2xl font-medium tracking-[-0.02em]">How hiring works</h2>
                <ol className="mt-4 space-y-3">
                  {hiringSteps.map((text, i) => (
                    <li key={text} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                      <span className="font-mono text-sm text-foreground">0{i + 1}</span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="p-7 md:p-8">
                <h2 className="text-2xl font-medium tracking-[-0.02em]">Questions</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  Email{" "}
                  <a href="mailto:support@classgrid.in" className="font-medium text-foreground hover:underline">support@classgrid.in</a>
                  {" "}and we&apos;ll get back to you.
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-12 md:px-10 lg:py-16">
            <div className="mx-auto w-full max-w-xl">
            <CareersForm
              formTitle={formTitle}
              formSubtitle={formSubtitle}
              submitLabel={submitLabel}
              fieldName={fieldName}
              fieldEmail={fieldEmail}
              fieldInstitution={fieldInstitution}
              fieldRole={fieldRole}
              rolePlaceholder={rolePlaceholder}
              roles={roles}
              techStackGroups={techStackGroups}
            />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
