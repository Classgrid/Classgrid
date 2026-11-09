# YC Application — Classgrid AI

## FOUNDER PROFILE

### Role
**CEO & Sole Technical Founder**

### Equity
**100%**

### Walk us through your thinking around balancing your startup, school, and any other obligations.

I am in my second year of B.Tech at PCCoE, Pune. Classgrid is my primary work. I have no job and no internships. College runs from 9 AM to 5 PM, so I build on Classgrid every weekday evening and do long deep-work days on weekends, when I ship the bigger pieces like Studio mode and the desktop app.

I use Classgrid AI to build Classgrid AI. Most of my own coding, research and planning now runs through the product, so every hour I spend building is also an hour of testing it.

If accepted, I will go full-time on Classgrid. If I don't get in, I will keep building alongside college and grow the user base one real user at a time.

---

### Please tell us about a time you most successfully hacked some (non-computer) system to your advantage.

I needed cloud infrastructure but had zero money and no investors. Most startup credit programs are designed for VC-backed companies, and I didn't qualify. Instead of giving up, I read every eligibility document and found programs that accepted self-funded startups if you could prove a live product and a real architecture.

I prepared detailed evidence (system diagrams, schemas, live URLs and infrastructure requirements) and applied, one program at a time. Total infrastructure credits secured: over $11,000, without raising a single rupee.

The second hack was Razorpay. Their automated review rejected Classgrid 5 times because it couldn't understand pay-as-you-go pricing. I reached their team directly, explained the model, and got live production keys approved on a Sunday (August 2, 2026). That is the payment flow Classgrid AI credits run on today.

---

### Please tell us in one or two sentences about the most impressive thing other than this startup that you have built or achieved.

I built and published two standalone engineering projects: **GridX**, a React component library with over 100 components, and **@gridx/ai**, an AI SDK with multi-provider fallback, RAG and memory. I also built an AI support agent that reads, routes and replies to customer emails on its own.

---

### Tell us about things you've built before.

- **Classgrid (evolution)** — Classgrid started as an AI academic assistant for students. After a long detour into building education software for institutions, I came back to what worked: the AI itself. Today Classgrid AI is a general AI agent for everyone.
- **GridX** — A React component library with over 100 components.
- **@gridx/ai** — An AI SDK for multi-provider model routing, RAG, memory and AI application tooling.

---

### List any competitions/awards you have won, or papers you've published.

No formal awards. Classgrid is registered as an MSME with the Government of India (UDYAM-MH-01-0308803).

---

### List any relevant or impressive test scores.

No standardized test scores to report.

---

### List any entrepreneurship programs, clubs, or hacker houses you have participated in or are currently participating in.

None. Self-taught. No accelerator, no incubator, no program.

---

### Who writes code, or does other technical work on your product? Was any of it done by a non-founder? Please explain.

I am the sole founder and the sole technical architect. I design every system, every flow and every feature. I use AI coding tools, including Classgrid AI itself, as pair-programmers to move faster, but every product and architecture decision is mine.

Zero code was outsourced to agencies, freelancers or contractors.

---

### Are you looking for a cofounder?

Yes. I built everything so far alone, but growing an AI agent company needs a serious partner: either a technical cofounder who can own infrastructure and model costs at scale, or a growth cofounder who can own distribution.

---

## COMPANY

### Company name
**Classgrid**

### Describe what your company does in 50 characters or less.
**An AI agent that works where you do**

### Company URL
**https://classgrid.in**

### Please provide a link to the product, if any.
**https://chat.classgrid.in**

### Login credentials
Enter the review account details directly in the YC form only. Never store them in this file or anywhere in the repo.

### What is your company going to make?

Classgrid AI is an AI agent that lives where you do: it codes, but it also texts you on WhatsApp, reads your inbox, runs your calendar, and keeps working when your laptop is closed.

You ask in plain words and it searches the web, reads your files, runs Python, makes charts, documents and reports, and works inside the apps you already use, then hands you the finished result.

It has three modes:
- **Agent mode** for everyday work: research, files, spreadsheets, PDFs, reports and reminders.
- **Project mode** for code: your project opens in an editor next to the chat, and the agent reads and changes the real files.
- **Studio mode**, where the agent builds while you watch: it writes the code, runs the commands and checks the result, and you see every file and terminal line live beside the chat.

Users can let Auto pick a model for each message or choose from 19 models, including Claude, DeepSeek, Kimi, GLM, Qwen and Llama, and switch any time, even mid-chat. It connects to 20+ apps (Gmail, Google Drive, Google Calendar, Notion, Slack, GitHub, Outlook, Teams, Zoom). It keeps working while you're away: daily briefs, weekly reports and reminders arrive straight on WhatsApp. A desktop app lets the agent work on folders and terminals on the user's own computer.

### Where do you live now, and where would the company be based after YC?
**Pune, India / Pune, India**

### Explain your decision regarding location.

India is where I live and where our first users are. Hundreds of millions of students, developers and professionals here can't justify a $20/month AI subscription, but they will pay for exactly what they use. Classgrid AI is priced for them, with credits starting at ₹299. We start in India and the product works anywhere.

---

## PROGRESS

### How far along are you?

Classgrid AI launched publicly in November 2026. It is live at chat.classgrid.in with:

1. **Agent, Project and Studio modes**, all live.
2. **A desktop app** that lets the agent work on the user's own files, folders and terminal.
3. **19 models** with automatic model selection.
4. **20+ app integrations** through the AI Hub.
5. **Scheduled tasks on WhatsApp** from a verified business number.
6. **Live payments**: users top up credits from ₹299 to ₹10,000, with no fixed plan.

### How long have each of you been working on this? How much of that has been full-time?

I have been building Classgrid since July 2025, alongside college. Classgrid AI in its current form as a general agent launched in November 2026.

### What tech stack are you using?

**Frontend:** React 19 with TypeScript and Vite, Tailwind CSS, Radix UI and shadcn components, Zustand for state, TanStack Query and SWR for data, Socket.IO for live updates, Monaco for the code editor, xterm.js for the terminal, and Chart.js, Recharts and Mermaid for charts and diagrams.

**Backend:** Node.js with Express, Socket.IO for real-time chat and streaming, BullMQ on Redis for background jobs, and JWT and OAuth (Google, GitHub, Facebook) for auth. The server ships in Docker.

**Data:** MongoDB for users, chats, credits and configuration, Supabase (Postgres) for real-time messaging, and Redis for caching and queues.

**AI:** A model router across Claude, OpenAI, Gemini, Mistral, Groq, Hugging Face and more, with automatic model selection, streaming, tool calling, RAG and memory. MCP for third-party app connectors.

**Desktop app:** Electron, with the agent's file, terminal and memory tools running locally on the user's computer.

**Classgrid Code:** our own editor built from VS Code's open-source code (1.143.1) with the Classgrid AI extension built in, extensions from Open VSX.

**Infrastructure:** Cloudflare Workers for the AI sandbox, a separate OCR worker on Cloudflare, Cloudflare R2 for file storage, AWS SES for email, and Razorpay for payments.

### Are people using your product?
**Yes**

### How many active users or customers do you have?

<!-- Nikhil: put the exact number here before submitting. -->
Fewer than 50 users since the public launch in November 2026.

### Do you have revenue?
**No**

### If you are applying with the same idea as a previous batch, did anything change?

We applied to Fall 2026 with a different product: software for running educational institutions. YC rejected it, and the rejection was right. That product needed months of sales cycles and a team I didn't have.

What changed:

1. **New idea.** Classgrid is now a general AI agent for individuals, not institution software. Anyone can sign up and get value in the first minute, with no sales cycle.
2. **Shipped.** The agent is live, with three modes, a desktop app, 19 models, 20+ integrations, WhatsApp schedules and live payments.
3. **Launched publicly** in November 2026.

### If you have already participated or committed to participate in an incubator, "accelerator" or "pre-accelerator" program?

No.

---

## IDEA

### Why did you pick this idea to work on?

Classgrid began as an AI assistant for students, and that was always the part people actually used. When I tried to turn it into large software for institutions, I learned that the value was never in the menus and dashboards. It was in the AI doing the work.

Most AI chat products stop at an answer. I wanted an agent that finishes the job: one that writes the report, builds the file, edits the real code on your computer, and messages you on WhatsApp when the scheduled task is done. I use it every day to build Classgrid itself, which is the strongest reason I believe in it.

### Who are your competitors?

**ChatGPT** and **Claude** for general AI assistants, **Manus** for autonomous agents, and **Lovable** and **Emergent** for building apps from a prompt.

What is different about Classgrid AI:

1. **Any model, one place.** Auto picks the model, or the user chooses from 19, and switches mid-chat. Competitors lock you into their own models.
2. **Works on your real computer and real code.** With the desktop app, the agent reads your folders and runs your terminal. App builders keep your code on their platform.
3. **Works while you're away.** Scheduled briefs, reports and reminders delivered on WhatsApp, where Indian users already live.
4. **Pay for what you use.** Credits from ₹299, no monthly subscription.

### How do or will you make money?

Users buy AI credits from ₹299 to ₹10,000 and spend them as they use the agent. There is no fixed plan. Payments are live.

### If you had any other ideas you considered applying with, please list them.

**GridX Mail** — an AI email agent that reads, classifies and replies to support emails, escalates hard cases to a human and sends follow-ups. It could be a standalone product, but Classgrid AI is my sole focus.

---

## EQUITY

### Have you formed ANY legal entity yet?
**No** — but Classgrid is MSME registered with the Government of India (UDYAM-MH-01-0308803, Classification: Computer Programming Activities - 62011).

### Planned equity ownership
Nikhil Shinde — Sole Founder & CEO — 100% equity. Plan to reserve a 10–15% ESOP pool for early hires.

### Have you taken any investment yet?
**No**

### Are you currently fundraising?
**No**

---

## CURIOUS

### What convinced you to apply to Y Combinator?

The Fall 2026 rejection made me face what wasn't working. Five days after it, I was back building, and I went back to the part of Classgrid that people actually used: the AI. Classgrid AI is the result, and it is live.

I'm applying again because the product now works for anyone who signs up, and the hard part is no longer building it. It is getting it in front of people and paying for model usage while the user base grows. YC would help me with both.

### How did you hear about Y Combinator?

Vercel's startup team mentioned YC as one of their accelerator partners.

---

## BATCH PREFERENCE
<!-- Nikhil: confirm the batch that is open now before submitting. -->
**Winter 2027**

---

## **FOUNDER VIDEO SCRIPT** (Max 1 Minute — Webcam, Face to Camera)

**TIPS:** Sit in a quiet, well-lit room. Look into the camera lens, not the screen. Glance at these points and talk naturally.

---

**[0:00–0:10] WHO YOU ARE:**
> "Hi, I'm Nikhil Shinde. I'm 19, I'm in my second year of B.Tech at Pimpri Chinchwad College of Engineering in Pune, and I'm the solo founder of Classgrid."

**[0:10–0:25] WHAT CLASSGRID IS:**
> "Classgrid AI is an AI agent that does real work for you. You ask in plain words, and it researches, reads your files, runs code, builds reports and apps, and works inside Gmail, Notion, Slack and GitHub. Then it hands you the finished result."

**[0:25–0:40] WHY YOU BUILT IT:**
> "Most AI tools stop at an answer. I wanted one that finishes the job, works on my real computer, lets me pick any model, and messages me on WhatsApp when a scheduled task is done. I use it every day to build Classgrid itself."

**[0:40–0:55] WHERE WE ARE:**
> "We launched publicly in November 2026. Agent, Project and Studio modes, a desktop app, 19 models and more than 20 integrations are all live, and payments work. Credits start at 299 rupees, with no monthly plan."

**[0:55–1:00] CLOSE:**
> "I'm applying to YC to put Classgrid AI in front of millions of people who need an agent that does real work."

---

## **DEMO VIDEO SCRIPT** (1–2 Minutes — Screen Recording + Voice Narration)

**TIPS:** Record the screen with your voice. Keep moving. Only show what works live today.

---

**[0:00–0:10] OPEN chat.classgrid.in**
> "This is Classgrid AI, an AI agent that does real work. Let me give it a real task."

**[0:10–0:30] AGENT MODE: UPLOAD A SPREADSHEET OR PDF → ASK FOR A REPORT**
> "I'll give it this file and ask for a summary with a chart. It reads the file, runs the analysis and hands me the finished result."

**[0:30–0:45] SWITCH MODEL MID-CHAT**
> "Auto picks the model for each message, or I can choose from 19, like Claude or DeepSeek, and switch in the middle of the chat."

**[0:45–1:05] STUDIO MODE → "ADD A PRICING SECTION"**
> "In Studio mode it builds while I watch. It writes the code, runs the commands and checks the result, and every file and terminal line shows up live."

**[1:05–1:15] PLUGINS → ASK SOMETHING ACROSS GMAIL OR NOTION**
> "It connects to the apps I already use and works inside them."

**[1:15–1:25] CREATE A SCHEDULE → SHOW THE WHATSAPP MESSAGE**
> "And it keeps working while I'm away. This daily brief arrives on WhatsApp."

**[1:25–1:30] END**
> "This is Classgrid AI. Live today at chat.classgrid.in. Thank you."

---

## **[PENDING — Remove this section before submission]**

- [ ] Change the password of the old review account that was stored in this file earlier
- [ ] Create a review account and put its login only in the YC form
- [x] Fill in the tech stack
- [ ] Put the exact user count
- [ ] Confirm the batch that is open now
- [ ] Record Founder Video (1 min, webcam, face to camera)
- [ ] Record Demo Video (1–2 min, screen recording + voice narration)
- [ ] Remove both video script sections before final submission
- [ ] Final proofread before pasting into YC form
