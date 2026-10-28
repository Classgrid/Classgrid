export type PlatformResource = {
  label: string;
  href: string;
  description: string;
  category: string;
  keywords: string[];
};

export const PLATFORM_RESOURCES: PlatformResource[] = [
  {
    label: "Help Center",
    href: "/help-center",
    description: "Support articles, onboarding help, troubleshooting, and operational guidance.",
    category: "support",
    keywords: ["help", "support", "article", "guide", "documentation"],
  },
  {
    label: "Documentation",
    href: "/docs",
    description: "Official technical documentation, API references, and comprehensive platform guides.",
    category: "support",
    keywords: ["docs", "documentation", "api", "guide", "developer"],
  },
  {
    label: "Support",
    href: "/support",
    description: "Support overview for guided onboarding, training, and technical help.",
    category: "support",
    keywords: ["support", "technical help", "contact support", "issue"],
  },
  {
    label: "Submit a Ticket",
    href: "/support/ticket",
    description: "Raise a support ticket for product questions, technical assistance, or bug reports. Anyone can use it, with or without a chat.classgrid.in account; just log in on the website with an email code. Ticket goes to the Classgrid support team and you get email updates when they reply.",
    category: "support",
    keywords: ["ticket", "issue", "request", "bug", "raise ticket", "submit ticket", "report"],
  },
  {
    label: "Speak with Classgrid",
    href: "/support/ticket",
    description: "Speak directly with the Classgrid team through Support Tickets. Anyone can use it; just log in on the website with an email code. Use this for pre-sales questions, consultations, or detailed support requests.",
    category: "support",
    keywords: ["inquiry", "speak", "talk", "consultation", "get in touch", "chat", "support chat", "help"],
  },
  {
    label: "Ask the Classgrid Team",
    href: "/support/ticket",
    description: "Classgrid Talk no longer exists; questions, product inquiries, and general Classgrid discussion now go through Support Tickets.",
    category: "community",
    keywords: ["community", "classgrid talk", "discussion", "inquiry"],
  },
  {
    label: "Pricing",
    href: "/pricing",
    description: "Classgrid AI pricing: free usage that refills, then pay-as-you-go top-ups.",
    category: "sales",
    keywords: ["pricing", "plans", "billing", "quote", "cost"],
  },
  {
    label: "Book a Demo",
    href: "/#demo",
    description: "Business demo for companies: talk to our team about Classgrid AI and guided onboarding.",
    category: "sales",
    keywords: ["demo", "book demo", "trial", "onboarding"],
  },
  {
    label: "Careers",
    href: "/careers",
    description: "Apply for open roles and internships",
    category: "company",
    keywords: ["careers", "jobs", "hiring", "work"],
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Classgrid contact page for sales, support, and coordination.",
    category: "company",
    keywords: ["contact", "email", "support"],
  },
  {
    label: "Classgrid AI",
    href: "https://chat.classgrid.in",
    description: "Sign in or create an account to use Classgrid AI: Agent mode, connected apps, WhatsApp tasks, and Project Mode.",
    category: "product",
    keywords: ["modules", "features", "product", "capabilities"],
  },
  {
    label: "Classgrid AI Agent",
    href: "/agent",
    description: "Try the Classgrid AI agent: research, files, code, reports and scheduled WhatsApp messages.",
    category: "product",
    keywords: ["agent", "ai", "assistant", "platform", "preview"],
  },
  {
    label: "Solutions",
    href: "/solutions",
    description: "Solution pages showing how different people and teams use Classgrid AI.",
    category: "product",
    keywords: ["solutions", "use case", "role"],
  },
  {
    label: "Blog",
    href: "/blog",
    description: "Classgrid articles and insights on AI agents and AI workflows.",
    category: "content",
    keywords: ["blog", "article", "insight"],
  },
  {
    label: "Changelog",
    href: "/changelog",
    description: "Product release notes and platform updates.",
    category: "content",
    keywords: ["changelog", "release", "updates"],
  },
  {
    label: "Case Studies",
    href: "/case-studies",
    description: "Stories of how people and teams use Classgrid.",
    category: "content",
    keywords: ["case study", "customer story"],
  },
  {
    label: "Reviews",
    href: "/reviews",
    description: "User reviews and testimonials.",
    category: "content",
    keywords: ["reviews", "testimonials"],
  },
  {
    label: "Terms of Service",
    href: "/terms",
    description: "Classgrid legal terms for usage, billing, licensing, and responsibilities.",
    category: "legal",
    keywords: ["terms", "legal", "billing", "subscription"],
  },
  {
    label: "Privacy Policy",
    href: "/privacy",
    description: "Data processing, user privacy, retention, and security policy.",
    category: "legal",
    keywords: ["privacy", "data", "user data"],
  },
  {
    label: "Cookie Policy",
    href: "/cookies",
    description: "Cookie and local-storage usage policy.",
    category: "legal",
    keywords: ["cookies", "local storage"],
  },

  {
    label: "Security",
    href: "/security",
    description: "Security controls, data isolation, and infrastructure posture.",
    category: "legal",
    keywords: ["security", "data isolation", "zero data bleed"],
  },
  {
    label: "Status",
    href: "https://status.classgrid.in",
    description: "Public Classgrid service status.",
    category: "operations",
    keywords: ["status", "uptime", "incident"],
  },
  {
    label: "Team",
    href: "/team",
    description: "Classgrid team page.",
    category: "company",
    keywords: ["team", "people"],
  },
  {
    label: "Acknowledgement",
    href: "/acknowledgement",
    description: "Acknowledgements and credits.",
    category: "company",
    keywords: ["acknowledgement", "credits"],
  },
];

export function getSiteBaseUrl() {
  return (process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || "https://classgrid.in").replace(/\/+$/g, "");
}

export function toAbsoluteResourceUrl(href: string) {
  if (/^https?:\/\//i.test(href)) return href;
  return `${getSiteBaseUrl()}${href.startsWith("/") ? href : `/${href}`}`;
}

export function formatPlatformResourceDirectory(channel: "web" | "whatsapp") {
  return PLATFORM_RESOURCES.map((resource) => {
    const url = toAbsoluteResourceUrl(resource.href);
    const link = channel === "web" ? `[${resource.label}](${resource.href})` : `${resource.label}: ${url}`;
    return `- ${link} - ${resource.description}`;
  }).join("\n");
}
