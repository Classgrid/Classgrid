type PageMeta = {
  title: string;
  description: string;
  path: string;
};

export const pageMeta: Record<string, PageMeta> = {
  about: {
    title: "About",
    description: "Classgrid journey and mission: building the agentic platform for everyday work.",
    path: "/about",
  },
  blog: {
    title: "Blog",
    description: "Classgrid insights on AI agents, AI workflows, and getting everyday work done with Classgrid AI.",
    path: "/blog",
  },
  campaigns: {
    title: "Campaigns",
    description: "Classgrid AI campaigns and offers.",
    path: "/campaigns",
  },
  contact: {
    title: "Contact",
    description: "Contact the Classgrid team for sales, partnerships, and support for Classgrid AI.",
    path: "/contact",
  },
  cookie: {
    title: "Cookie Policy",
    description: "Classgrid cookie policy covering authentication, storage, and tracking practices.",
    path: "/cookies",
  },
  disclaimer: {
    title: "Disclaimer",
    description: "Classgrid disclaimer covering platform limitations, responsibility boundaries, and liability scope.",
    path: "/disclaimer",
  },
  privacy: {
    title: "Privacy Policy",
    description:
      "Classgrid data processing, user privacy protections, encryption standards, and retention policy.",
    path: "/privacy",
  },
  security: {
    title: "Security",
    description:
      "Classgrid infrastructure, application, and data isolation controls for Classgrid AI.",
    path: "/security",
  },
  terms: {
    title: "Terms of Service",
    description: "Classgrid terms of service, licensing terms, acceptable use, and liability framework.",
    path: "/terms",
  },
};
