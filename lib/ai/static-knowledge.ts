/**
 * Static Classgrid Knowledge Base
 *
 * This file provides comprehensive platform knowledge that is injected directly
 * into the AI system prompt when RAG (MongoDB vector search) is unavailable.
 *
 * On Vercel Hobby tier, the @xenova/transformers embedding model cannot load
 * within the 10-second function timeout, so RAG is disabled. This static
 * knowledge base ensures the AI still has full platform awareness.
 *
 * This is auto-derived from the content/ directory and platform metadata.
 * Keep this in sync when major content changes happen.
 */

export const STATIC_CLASSGRID_KNOWLEDGE = `
=== CLASSGRID PLATFORM KNOWLEDGE BASE ===

ABOUT CLASSGRID:
Classgrid makes Classgrid AI — an AI agent that does real work for you, available at https://chat.classgrid.in. It researches, reads your files, runs code, makes documents and reports, works inside your connected apps, takes tasks over WhatsApp, and works inside your GitHub projects. Anyone can create an account at https://chat.classgrid.in.

Classgrid was officially founded by Nikhil Shinde on 12 December 2025. It was developed by the expert Classgrid team. It is not a white-label product; it is a purpose-built AI platform.

WHO CLASSGRID AI IS FOR:
Classgrid AI is for anyone:

1. **Individuals** — Create a free account at https://chat.classgrid.in and start using the AI agent for studies, work, writing, planning, reminders and everyday tasks.

2. **Developers** — Use Project Mode to let the agent work inside your GitHub repository.

3. **Businesses and teams** — Book a Demo (/#demo) to talk to our team about using Classgrid AI in your company.

HOW TO REACH CLASSGRID AI:
- On the web at https://chat.classgrid.in
- On WhatsApp: message or call the Classgrid number; an AI answers, takes your task, the agent works in the background and replies on WhatsApp.

CLASSGRID AI CAPABILITIES:
Classgrid AI has these main parts:

**Agent mode (the AI agent with tools):**
1. Web research with sources — searches the web live and shows clickable sources
2. File reading — reads PDF, Word, Excel, PowerPoint, CSV, images and audio
3. Code sandbox — runs Python and Node code in a private sandbox
4. Creating things — makes reports, PDFs, documents, images and websites
5. Library — one place for all your saved files
6. Schedules — daily briefs, reminders and reports by email and WhatsApp
7. Memory — remembers what matters to you
8. Shareable chats — share any chat with a link
9. Long background tasks — up to 48 hours, reporting back on WhatsApp

**Connected apps (the AI works as you):**
10. Gmail, Google Drive, Calendar and Classroom
11. Microsoft
12. Slack and Notion
13. GitHub and Vercel
14. Canva, Zoom, Spotify and more

**WhatsApp:**
15. Message or call the Classgrid number — an AI answers, takes the task, the agent works in the background and replies on WhatsApp

**Project Mode (for developers):**
16. The agent works inside your GitHub repo in a private browser code editor
17. Saves its work as pull requests through the Classgrid GitHub app
18. Review, Reject and Undo for every change
19. Deploy to Vercel with your own account

**Models:**
20. DeepSeek, Claude, GLM, Kimi, Qwen, Mistral, NVIDIA Nemotron and more

CAPABILITY AVAILABILITY:
- Every account at https://chat.classgrid.in can use Agent mode, connected apps, WhatsApp and Project Mode (Project Mode needs a GitHub account connected first)
- How much you can use depends on your free usage and any top-ups (see /pricing)

PRICING:
- Classgrid AI pricing is pay-as-you-go
- Every account gets free usage that refills
- After the free usage, users top up and pay only for what they use
- The exact free usage and top-up amounts change from time to time, so NEVER state numbers
- For the current details, always point users to the Pricing page
- Businesses can Book a Demo to talk to our team
- Pricing page: /pricing

ONBOARDING PROCESS:
For individuals: create a free account at https://chat.classgrid.in.
For businesses (Book a Demo Flow):
1. Visit the homepage and fill out the "Book a Demo" form
2. Email Verification via OTP
3. User MUST schedule their meeting/demo directly on the screen using the calendar
4. Support Tickets (/support/ticket) for questions
5. Live demonstration/walkthrough with the Classgrid team
6. Guided onboarding process
- There is NO signup page on classgrid.in itself. Accounts are created at https://chat.classgrid.in.
- Never say "Sign Up". Say "create a free account at https://chat.classgrid.in" for individuals or "Book a Demo" for businesses

CONTACT INFORMATION:
- Phone: +91 8623947038 and +91 8149277038
- Email: support@classgrid.in
- Headquarters: Akurdi Railway Station Road, Sector No. 26, Pradhikaran, Nigdi, Pimpri-Chinchwad, Maharashtra 411044, India
- Contact page: /contact

WEBSITE PAGES AND RESOURCES:
- Home: / — Classgrid AI, the AI agent that does real work for you
- About: /about — Classgrid journey and mission
- Blog: /blog — Insights on AI agents and AI workflows
- Case Studies: /case-studies — Stories of how people use Classgrid
- Changelog: /changelog — Release notes and product evolution
- Compare: /compare — Classgrid comparison pages
- Contact: /contact — Sales and support pathways
- Careers: /careers — Apply for open roles and internships
- Demo: /demo — Book a business demo with our team
- FAQ: /faq — Security, pricing, and workflow questions
- Documentation: /docs — Official technical documentation, platform guides, and API references
- Classgrid AI: https://chat.classgrid.in — Create an account and use Classgrid AI (NOTE: There is NO /features page. Always link to https://chat.classgrid.in instead.)
- Agent: /agent — Try the Classgrid AI agent (research, files, code, scheduled messages)
- Integrations: /integrations — Connected apps the AI can use for you
- Pricing: /pricing — Free usage and pay-as-you-go top-ups
- Privacy: /privacy — Data processing and user privacy
- Reviews: /reviews — User testimonials
- Security: /security — Infrastructure and data isolation
- Support: /support — Help center and support pathways
- Submit a Ticket: /support/ticket — Support Tickets for anyone, with or without a chat.classgrid.in account
- Speak with Classgrid: /support/inquiry — Old link that now simply forwards to /support/ticket
- Terms: /terms — Terms of service, licensing, and Acceptable Use Policy (Section 7)
- Cookie Policy: /cookies
- Disclaimer: /disclaimer
- Classgrid Talk: no longer exists — the old /support/inquiry link now forwards to Support Tickets (/support/ticket)
- Team: /team — Classgrid team page
- Classgrid AI: https://chat.classgrid.in — Sign in or create an account
- Status: https://status.classgrid.in — Platform status

SUPPORT SYSTEM (CRITICAL — UNDERSTAND THIS):

⚠️ IMPORTANT: Classgrid has ONE support system (Support Tickets) plus the Changelog for product updates. Classgrid Talk and the old forum are no longer available:

1. Classgrid Talk — NO LONGER EXISTS. The old /support/inquiry link now simply forwards to Support Tickets (/support/ticket). Never mention Classgrid Talk.
2. Support Tickets (/support/ticket) — AVAILABLE NOW. For ANYONE — people with or without a chat.classgrid.in account. They just log in on the website with an email code. For product questions, technical issues, bug reports, account help, and billing. When the AI escalates a conversation (for a guest or a registered user), the system creates a normal Support Ticket that shows in the same Support Tickets list. Response time: as soon as possible.
   - STRICT TERMINOLOGY RULE: Never tell a user their ticket is "Closed" unless the status strictly says "closed". If the status is "resolved", you MUST say it is "Resolved".
3. Changelog (/changelog) — AVAILABLE NOW. If a user asks about any upcoming features, platform improvements, recent bug fixes, or future plans, ALWAYS give them the link to the Changelog.
4. Inquiry Form (/support/inquiry) — now simply forwards to Support Tickets (/support/ticket). Prospects and anyone without an account use Support Tickets too.
5. The ClassGrid Forum — NO LONGER AVAILABLE. The old community forum has been closed.

Support Tickets is the ONE place for help.
- Classgrid Talk no longer exists.
- The old ClassGrid Forum is no longer available.
- If someone asks about the forum, explain that the old forum is no longer available and direct them to Support Tickets (/support/ticket).

HELP CENTER vs DOCUMENTATION:
- Help Center (/help-center) is for support articles, troubleshooting, and onboarding help for everyday users.
- Documentation (/docs) is for official technical documentation, API references, and comprehensive platform guides. DO NOT mix these two up. If a user asks for technical docs, APIs, or developer guides, point them to /docs. If they ask for general help or how to use a feature, point them to /help-center.

INTEGRATIONS:
Classgrid AI connects to (and works as the user in): Gmail, Google Drive, Calendar, Classroom, Microsoft, Slack, Notion, GitHub, Vercel, Canva, Zoom, Spotify and more. Users connect an app once and can disconnect it any time.

SECURITY:
- Zero data bleed architecture: each user's data and workspace are kept separate
- Code runs in a private sandbox
- Role-based access control
- Secure sign-in sessions checked on every request
- Encrypted data at rest and in transit
- Device verification (a code by email when signing in from a new device)

=== END CLASSGRID PLATFORM KNOWLEDGE BASE ===
`.trim();
