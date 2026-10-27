<div align="center">
  <img src="https://raw.githubusercontent.com/Classgrid/Classgrid_marketting/main/public/logo.png" alt="Classgrid Logo" width="140" height="140" />

  <h1 align="center">Classgrid | Website</h1>

  <p align="center">
    <strong>The website for Classgrid AI: an AI agent that can actually do the work.</strong>
  </p>

  <p align="center">
    <a href="https://chat.classgrid.in">Open Classgrid AI</a>
    ·
    <a href="https://classgrid.in">Website</a>
    ·
    <a href="https://classgrid.in/blog">Blog</a>
    ·
    <a href="https://classgrid.in/case-studies">Case Studies</a>
    ·
    <a href="https://classgrid.in/changelog">Changelog</a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-App_Router-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-Strict-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Framer_Motion-Dynamic-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
    <br/>
    <img src="https://img.shields.io/badge/Sanity_CMS-GROQ-F03E2F?style=for-the-badge&logo=sanity&logoColor=white" alt="Sanity" />
    <img src="https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
    <img src="https://img.shields.io/badge/Vercel-Edge_Network-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  </p>
</div>

---

<br/>

> **Proprietary Software**
> This repository is the proprietary website for Classgrid (classgrid.in). It is **NOT** open-source software. This is a private organization repository.

## What is Classgrid?

Classgrid builds **Classgrid AI** at **[chat.classgrid.in](https://chat.classgrid.in)**: one place to talk to an AI agent that can actually do the work, build inside your own code, and work with the apps you already use.

| | What it is |
|---|---|
| **Agent Mode** | An AI agent that thinks, uses tools, runs code and shows every step live |
| **Project Mode** | The agent working inside your GitHub repository, with a private browser code editor; every change comes as a pull request |
| **WhatsApp** | Message or call the agent on WhatsApp; it takes the task and works on it in the background |
| **Connected apps** | Gmail, Google Drive, Calendar, Classroom, Notion, Slack, GitHub, Vercel and more |

This website explains Classgrid AI, hosts the blog, case studies, changelog, docs, help center and legal pages, and links people to chat.classgrid.in.

<br/>

## Design

- **Vercel design system:** the whole site follows the Vercel look (Geist type, dark and light mode, subtle borders). New pages reuse the existing components and styles.
- **Micro-interactions:** Framer Motion animations and a cursor-following glow on buttons.
- **Sanity CMS:** blog posts, case studies and legal pages are written in Sanity and published without a code change.

<br/>

## Technical Architecture

<details>
  <summary><strong>1. Design System & Animations</strong></summary>
  <br/>
  <ul>
    <li><strong>Vercel Aesthetic:</strong> Deep dark mode, subtle borders, clean typography (Geist/Inter).</li>
    <li><strong>Tailwind:</strong> Utility-first styling, including <code>conic-gradient</code> and <code>radial-gradient</code> effects in the Tailwind configuration.</li>
    <li><strong>Micro-Interactions:</strong> Custom <code>Button</code> components using <code>useMotionTemplate</code> and <code>useMotionValue</code> for a glow that follows the cursor.</li>
  </ul>
</details>

<details>
  <summary><strong>2. The Blog Engine</strong></summary>
  <br/>
  <ul>
    <li><strong>Sticky Table of Contents:</strong> highlights the section being read.</li>
    <li><strong>GROQ Queries:</strong> typed queries in the <code>sanity/lib</code> directory fetch only what each page needs.</li>
    <li><strong>Open Graph:</strong> 1200x630 share images for WhatsApp, Telegram and social sharing.</li>
  </ul>
</details>

<details>
  <summary><strong>3. Hosting & Infrastructure</strong></summary>
  <br/>
  <ul>
    <li><strong>Vercel Edge Network:</strong> this Next.js site is hosted on Vercel.</li>
    <li><strong>Supabase (PostgreSQL):</strong> leads, blog metrics and scheduled jobs.</li>
    <li><strong>Sanity Webhooks:</strong> refresh pages as soon as a post is published.</li>
    <li><strong><code>server-ai/</code>:</strong> the WhatsApp webhook service, running on AWS EC2 next to the Classgrid AI backend (api.classgrid.in).</li>
  </ul>
</details>

<br/>

## Folder Structure Map

```text
Classgrid_marketting/
├── app/
│   ├── agent/             # Classgrid AI agent page
│   ├── pricing/           # Pricing
│   ├── blog/              # Blog engine
│   ├── case-studies/      # Customer stories
│   ├── changelog/         # Product updates
│   ├── (legal)/           # Legal pages (text in Sanity)
│   ├── api/               # Serverless webhooks & crons
│   └── layout.tsx         # Global providers & SEO base
├── components/
│   ├── ui/                # shadcn / Framer Motion components
│   ├── blog/              # PortableText and CMS renderers
│   └── layout/            # Navbar, footer
├── sanity/                # CMS schemas & GROQ queries
├── server-ai/             # WhatsApp webhook service (EC2)
└── lib/                   # Utilities, Supabase clients
```

<br/>

## Running Locally

1. **Clone the source code**
   ```bash
   git clone https://github.com/Classgrid/Classgrid_marketting.git
   cd Classgrid_marketting
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure the environment**
   Duplicate `.env.example` to `.env.local` and add your keys.
   ```env
   # Sanity Configuration
   NEXT_PUBLIC_SANITY_PROJECT_ID="your_sanity_id"
   NEXT_PUBLIC_SANITY_DATASET="production"

   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL="https://your_db.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your_anon_key"

   # Environment URL
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Start the site**
   ```bash
   npm run dev
   ```
   > The site runs on `http://localhost:3000`

---

## Legal & Licensing (Strictly Enforced)

**Copyright © 2026 Classgrid. All Rights Reserved.**

This repository and all source code, design assets, and UI components within it are the exclusive intellectual property of Classgrid.

🚫 **Strictly Prohibited:**
- You may **NOT** copy, clone, distribute, or host this website (or parts of it) for any personal, commercial, or agency use.
- You may **NOT** rip the design, CSS, or custom animations for other projects.
- This is a proprietary repository. It is **not** MIT or GPL licensed.

🤝 **Contribution & Access:**
- Access to this code is strictly limited to authorized members of the **[Classgrid GitHub Organization](https://github.com/Classgrid)**.
- Only official organization members are authorized to branch, commit, or open Pull Requests (PRs).
- Unauthorized PRs or forks will be reported and removed.

---
<div align="center">
  <img src="https://raw.githubusercontent.com/Classgrid/Classgrid_marketting/main/public/logo.png" alt="Classgrid Logo" width="50" />
  <p><b>Classgrid AI: an AI agent that can actually do the work.</b></p>
</div>
