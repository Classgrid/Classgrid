# Classgrid AI — Product Guide

*For partners, investors, new team members and press · October 2026*
*Product: **Classgrid AI** at https://chat.classgrid.in · Website: https://classgrid.in*

---

## 1. Summary

Classgrid AI is an AI agent that does real work, not just chat. You ask in plain words, and it searches the web with sources, reads your files, writes and runs code, makes PDFs and images, publishes websites, sends email and keeps working on long tasks in the background for up to 48 hours. It is built in India and works in India. Three things make it different. First, you can **phone it on WhatsApp**: you say what you need, hang up, and the result comes back to your WhatsApp. Second, it has **Project Mode**, a real code editor in the browser where the AI's changes go to GitHub as pull requests that you review. Third, it has **Grids**, built-in group messaging where the AI can read, summarise, run polls and post (always after you approve). It is for students, teachers, developers, founders, creators and anyone who wants work done from their phone. It is free to start, and you top up when you need more.

---

## 2. At a glance

| Part | What it is in one line |
|---|---|
| **Agent mode** | The main AI chat: web search with sources, files, code, images, PDFs, websites, email, plugins and background tasks of up to 48 hours. |
| **Project Mode** (Classgrid Code) | A full code editor in the browser, linked to your GitHub. The AI edits your code and sends every change as a pull request. |
| **Grids** | Chats and groups with other Classgrid AI users, plus a shared AI chat for up to 4 people. The AI can read, summarise, poll and post with your approval. |
| **WhatsApp** (chat + calls) | Call Classgrid AI on WhatsApp, talk to it in English, and get the finished work back on WhatsApp. |

---

## 3. Agent mode

Agent mode is the home screen of chat.classgrid.in. The message box says: *"Ask anything, analyse a file, or schedule a task…"*

### What it can do

| Tool | What it does |
|---|---|
| **Web search** | Finds current news and facts. Answers show numbered **[n] citations** that link to the source. It can also open and read any web page you give it. |
| **Read files** | PDF, Word, PowerPoint (including speaker notes), Excel, CSV and text files; images; audio and video (turned into text). Up to 6 files per message. |
| **Image generation** | Makes an image from a text description. |
| **Code sandbox** | Writes and runs Python, JavaScript or shell code in a safe sandbox. Comes with common data, chart, document, video and web tools (for example pandas, matplotlib, scikit-learn, ffmpeg, LibreOffice, Playwright). |
| **PDF maker** | Turns any write-up into a downloadable PDF. |
| **Publish a website** | Builds a site and puts it live at `yourname.sites.classgrid.in`. A site name belongs to whoever publishes it first. |
| **Email agent** | Sends email (with attachments) from agent@classgrid.in. You can also email agent@classgrid.in from your registered address to hand it a task; it replies and works in the background. |
| **Long background tasks** | Keeps working after you close the tab, for **up to 48 hours**. It can pause, wait for a time or for your WhatsApp reply, then carry on. When done you get "✅ *Task completed.*" with a link to the chat. |
| **WhatsApp delivery** | Sends results to your verified WhatsApp, including real files (PDF, image, audio, video). |
| **Voice typing** | "Dictate" button turns your speech into text in the box. |

### Rich answers

Answers are not just text. The AI can reply with ready-made blocks, for example:

- **Charts** (bar, line, pie, doughnut, radar) and **diagrams**
- **Flashcards and slides** with a hidden answer you reveal
- **Clickable quizzes** (multiple choice, with Next / Skip) and **plan cards** you approve
- **Study planner** with ticks and days left, **countdown** to a date, **timetable**, **report card**
- **Live cards**: weather (now + 5 days), stock/forex price with chart, map pin or route, world clock
- **Review cards**: score bars, star ratings, key points
- **Copy blocks** for emails, messages and prompts (one click to copy)
- **Mini widgets** the AI builds on the spot (polls, sliders, calculators, small games)
- **Follow-up questions** you can tap
- Maths shown with proper formulas (LaTeX)

### Schedules

Ask it to remind you, and it creates a schedule: one time, daily, weekly or on chosen weekdays, for up to 90 days. **How it works:** the message is written when you create the schedule. At the set time, that same pre-written email (and WhatsApp message, if you chose it) is sent to you. The AI does not run again at that time, so a schedule is a reminder, not a fresh daily report.

### Plugins (connected apps)

Notion · Gmail · Google Calendar · Google Drive · Google Classroom · Google Meet · Google Forms · Outlook · Microsoft Teams · Zoom · WhatsApp Business · Vercel · Slack · GitHub · Canva · Spotify · YouTube · Supabase · Sanity · Facebook Pages · Instagram Business

Each plugin shows "Try asking the AI" examples, such as *"Read my unread emails from today"*, *"What's on my calendar for tomorrow?"* or *"Search my Notion for recent strategy docs"*. Full list: https://classgrid.in/plugins

### Models

- **Auto** — *"Picks the best model for each message"* (default)
- **Claude** Haiku 5.5, Sonnet 5.5, Opus 5.5 and Fable 5.1
- **DeepSeek** V4 Pro and V4 Flash
- **More models:** GPT-OSS 120B / 20B, Kimi K2.6 / K2.7 Code, GLM 5.3 / 5.3 Flash / 5.2 / 4.7 Flash, Qwen 3.8 27B, Gemma 4 26B, Nemotron 3 120B, Llama 4 Scout, Mistral Small 3.1

You can switch model for any message.

### Other features

- **Library** — *"Manage your uploaded and AI-generated files."* Search, filter by date, sort, see storage used.
- **Incognito** — *"Incognito chats are not saved to your history or search."* Closing the chat deletes it.
- **Skills and Custom Instructions** — set tone, length, format, emoji use and explanation level; tell the AI your name, job and how you like answers; add your own skills (for example a "Math Socratic Tutor"). Say "remember…" or "from now on…" and the AI saves it as a skill itself.
- **MCP (use Classgrid from other AI apps)** — when switched on, apps like Claude, Cursor or ChatGPT can connect to your Classgrid account with your permission (read profile, schedules and Grid chats, send messages, use connected apps). Code running, image making and WhatsApp are not available through this route.

---

## 4. Project Mode (Classgrid Code)

Project Mode is a full code editor in the browser (VS Code style) with the Classgrid agent built in. Switch to it from the sidebar ("Switch Mode" → "Project").

### Getting started

- **GitHub is required.** *"Project Mode needs your GitHub account. Your code is only kept on GitHub, never on our servers."* (Classgrid keeps a working copy only while you edit, then removes it.)
- Install the **Classgrid GitHub app** on the repos you want to work on.
- Create a project, pick a GitHub repo (private repos work), or start without a repo and ask the agent to make one later: *"Ask Agent to create repo"*.
- Opening a project downloads the latest code fresh from GitHub. Project cards show the last commit, branch and (with Vercel connected) the live domain.
- A chat from Agent mode can be moved into a project with **"Move to project"**.

### The editor

- Built-in terminal, auto-save, code formatting and error checks, and a ▷ Run button.
- npm packages install automatically when you open a project.
- An "Agent" panel on the side, sized as you like.

### What the agent does in a project

- Reads and searches the code, including **search by meaning**.
- Creates and edits files. After each edit it sees the editor's errors and fixes them.
- Runs code and long commands in the background (dev servers, builds, tests) and checks them.
- Sends up to **5 helpers** to explore a large codebase at the same time.
- Knows what you are looking at: open file, cursor, selection, open tabs, errors, and your own edits since its last reply.
- Follows your repo's rule files (AGENTS.md, CLAUDE.md, .cursorrules, Copilot instructions).
- Makes a plan first and waits for your approval when the job is big.
- Creates GitHub repos (private by default, also inside an organisation) and updates repo name, description and visibility.

### Saving: pull requests only

- "Push to GitHub" asks *"What did you change?"* and pushes. The agent can push the same way.
- Every push goes to a new `classgrid/…` branch and opens or updates a **pull request**. *"It is not merged: the repo owner reviews and merges it on GitHub."* Nothing is pushed straight to main.
- Commits are authored by **Classgrid AI** with **you as co-author**, so authorship is clear.
- If a teammate pushed first, Classgrid builds on top of their work. If the same lines changed, it stops: *"Nothing was lost."*

### Review and undo

- Under every answer: **"N files changed +x -y"** with **Review** and **Undo**.
- "Review changes" shows each file's diff with **Reject** per file, **Reject all** and **Accept all**.
- Undo asks: *"Put the project back to how it was before this answer? Changes made after it, by you or the AI, are undone too."*

### Auto-backup

Five minutes after the editor closes, any work not yet pushed is saved to a `classgrid-backup-…` branch on GitHub. A project with no repo is saved to a new private repo.

### Languages and deploy

- **Confirmed:** Python 3.13 and Node 20 / TypeScript (with a browser for testing).
- **Deploy:** there is no deploy button in Project Mode. With the **Vercel plugin** connected, the agent can create a Vercel project, add settings and deploy a branch (including the pull-request branch) as a preview or to production. Classgrid's own `*.sites.classgrid.in` hosting is for Agent mode only.

---

## 5. Grids

Grids is Classgrid AI's built-in messaging. Find it as **"Grids"** in the main menu.

### Messaging

- **1:1 chats** with anyone who has a Classgrid AI account.
- **Rich messages:** voice notes, GIFs, photos, videos, documents, @mentions (including "mention all"), reactions, reply, forward, pin (24 h / 7 d / 30 d), starred messages, search, disappearing messages (24 h / 7 d / 90 d), block, archive.
- **Live presence:** online status and typing / recording / uploading indicators.
- **Read receipts:** "Message Info" shows *Read by*, *Delivered to*, *Sent*.
- **Message options:** Priority (Normal / High / Urgent), auto-delete at a set time, and **schedule a message** for later.

### Groups

| Setting | Options |
|---|---|
| **Type** | General · Class · Department · Team / Staff · Official / Announcement |
| **Privacy** | Private (hidden, invite only) · Approval Required (visible, request to join) · Public / Open (visible, instant join) |
| **Permissions** | Who can send messages · edit group info · add members · send attachments (for example "Only Admins") |

- **Explore Groups** to find public groups; a Requests page for join requests.
- **Polls:** 2–10 options, single or multiple answers, live results.
- **Audit log:** member, settings and message changes, with **Export CSV**.

### Share Grid — one AI chat, up to 4 people

- Tap the **Share Grid** icon in any AI chat to invite people by email, from your Grids contacts, or with an invite link.
- Invite email: *"You can read the chat, send messages and ask the AI together."*
- **Maximum 4 people** per shared chat. Each message is tagged with who sent it, and the AI knows who asked what.
- The AI answers one person at a time: *"Agent is responding to X. You can send when it's done."*

### Share links

Share any chat as a public, read-only page (on share.classgrid.in) by copy link, WhatsApp or LinkedIn. The "Email" option sends the chat to yourself.

### How the AI works with Grids

| Can the agent… | Answer |
|---|---|
| Read and summarise a group | Yes — the recent messages (about the last 1–2 hours) |
| Post a message or announcement | Yes — it shows a draft and asks *"Should I send this to the group?"* first |
| Create a poll and report results | Yes |
| Send files to a chat or group | Yes |
| Read your 1:1 chats | Only after asking you |
| Post into a Grid on a schedule | No |

The AI understands requests about groups in English, Hindi and Hinglish. There is no AI bot sitting inside group chats; for "AI together", use Share Grid.

---

## 6. WhatsApp

### Step 1: verify your number

Sign in at chat.classgrid.in and verify your WhatsApp. If you first message Classgrid on WhatsApp, the help bot replies:

> "Hi! 👋 Thanks for messaging Classgrid. ✅ Done! Your WhatsApp is now ready to receive your login code. *Now:* 1. Go back to the *Verify WhatsApp* screen on chat.classgrid.in 2. Choose your country code (India: +91) and enter your WhatsApp number 3. Tap *Send OTP* 4. Your 6-digit code will arrive in this chat within a few seconds…"

The code is valid for 10 minutes.

### Step 2: call

**WhatsApp-call Classgrid AI on +91 81492 77038.**

This is a **WhatsApp voice call**, not a normal phone call. Calls only work from a WhatsApp number verified on one Classgrid AI account.

### How a call works

1. You call. The AI answers: *"Hi {FirstName}, this is Classgrid AI. What can I do for you?"*
2. You talk in English. You can interrupt it any time.
3. **Quick questions** are answered live. The AI uses the full agent and your connected apps (Gmail, Calendar, Drive, Notion, GitHub, Vercel). If an answer takes more than about 90 seconds, it comes on WhatsApp instead.
4. **Bigger jobs** are saved as tasks. Coding work goes into Project Mode.
5. Each call can last **up to 15 minutes** (you get a warning near the end).

### After you hang up

- You get: *"Got it. Classgrid AI is working on it now. I'll send you the result here when it's done."*
- The agent does the work in a new chat, then sends the result and a chat link on WhatsApp. PDFs come as real files.
- Done: *"✅ *Task completed.*"*
- If you only asked questions, you get a short recap: *"📞 *Your call with Classgrid AI*"*.
- If the call drops: *"Sorry, the call dropped, but your request is saved and Classgrid AI is working on it. You can call again anytime."*
- Tasks keep going through server restarts and stop after 48 hours if not finished.

### Adding more after the call

While a task is running, send extra text, photos or PDFs on WhatsApp (it replies "got it" and passes them to the task), or email agent@classgrid.in.

### Other lines users may see

- Number not linked: *"This WhatsApp number is not linked to a Classgrid account. Sign in on https://chat.classgrid.in and verify this number, then call again."*
- No credits: *"You're out of Classgrid AI credits right now. Top up on https://chat.classgrid.in to use calls."*

### Example calls

- While driving: *"Email Mr. Rao that the quote is approved."* — sent from your Gmail, confirmed on WhatsApp.
- Morning: *"What's on my calendar today?"* — live answer plus a short recap.
- *"Make a one-page report on…"* — hang up, get the PDF on WhatsApp.
- *"Fix the contact form on my site."* — runs in Project Mode, result on WhatsApp.
- *"Find last week's invoice in my Drive."*

---

## 7. Who it's for

**Students**
- Turn a long PDF into notes, flashcards and a quiz — *"Turn a PDF into clear notes."* / *"Create a quiz from a PDF."*
- Exam plan with countdown and reminders — *"Make me a 2-week exam study planner with daily topics, revision days and short breaks."*
- Maths with full working and graphs — *"Solve a maths problem with working."*
- Lecture voice note or slides into notes.
- Study groups in Grids; share one AI chat with up to 3 classmates.

**Teachers**
- Worksheets and MCQ papers as PDFs — *"Create a worksheet with answers."*
- Marks spreadsheet into progress reports and charts — *"Turn marks into a progress report."*
- *"Write a lesson plan for tomorrow."*
- Class activities with interactive widgets.
- A "Class" group where only admins post, with read receipts to see who has seen a notice.

**Developers**
- Run and debug code in a real sandbox — *"Debug an error in your code."*
- Fix a failing build in Project Mode and get a pull request to review.
- *"Explain how auth works in this repo"* — parallel helpers and search by meaning.
- Refactor across files with per-file diffs and one-click Undo.
- Use Classgrid from Claude, Cursor or ChatGPT through MCP (when switched on).

**Teams and founders**
- *"Build a landing page for your idea."* — live in one chat at a sites.classgrid.in address.
- Inbox and calendar help — *"Read my unread emails from today."*
- Email a task to agent@classgrid.in and let it work in the background.
- A polished PDF proposal emailed to a client — *"Draft a project proposal."*
- "Team / Staff" group, quick polls, audit log with CSV export.

**Creators**
- Posters and thumbnails from a prompt.
- *"Plan content for the whole week."* / *"Write captions for your posts."*
- *"Summarise a YouTube video for you."*
- Trim, convert or pull audio from video.
- Post to Facebook Pages or Instagram Business (when connected).

**Researchers and analysts**
- Cited research briefs — *"Research a topic with real sources."*
- *"Clean up messy spreadsheet data."* — then charts and a PDF report.
- Live stock/forex cards plus deeper analysis in the sandbox.
- *"Outline a literature review."*

**People on the go**
- Call on WhatsApp, say what you need, get the result after you hang up.
- Daily or weekly reminders on WhatsApp and email.
- Get PDFs on WhatsApp as real files.
- Long tasks that wait for your WhatsApp reply, then carry on.

---

## 8. How Classgrid compares

*Facts below are from public reports, checked on 27 October 2026. Rows marked † come partly from third-party sites and are not confirmed by the company's own pages. Products change fast; please re-check before quoting.*

| | **Classgrid AI** | **Grok Bot** (xAI) | **ChatGPT / Dots** (OpenAI) | **Muse / Meta AI** (Meta) | **Perplexity** |
|---|---|---|---|---|---|
| Call the AI yourself | Yes, by WhatsApp call | No (it calls others for you) | 1-800-CHATGPT, US/Canada (current status not verified); Dots: no | Meta AI in-app voice chat (beta); you can't phone Muse | No |
| Chat on WhatsApp | Yes, for verified users (replies while a task is running) | No official number | Europe (EEA) only since Jul 2026; Dots: no † | Meta AI: yes; Muse: US/Canada † | Ended Jan 2026 |
| Real tasks in the background | Yes, including after a call | Yes (app/desktop) | Dots: yes (not by call) | Muse: yes (US) | No |
| Connected apps | 21 plugins (Gmail, Drive, Calendar, Notion, GitHub, Vercel…) | Gmail, Calendar, Drive, Outlook, Teams † | Dots: 4,000+ apps | Email, calendar | Not verified |
| Results sent back on WhatsApp | Yes (PDFs as files) | No | No | Not verified | No |
| Schedules / reminders | Yes | Yes | Yes | Yes | Had reminders before cutoff |
| Available in India | Yes | Not verified | Phone: no; WhatsApp: no; Dots: not verified | Meta AI: yes; Muse: no | No |

### Notes and sources

**Grok Bot (xAI)**
- Agent beta since Aug 2026 on a cloud computer; connects Gmail, Google Calendar, Drive, Outlook, Teams; runs on schedules; $200/month standalone or in SuperGrok Heavy. † [Vellum](https://www.vellum.ai/blog/official-grok-bot-breakdown)
- Since 25 Oct 2026 it can place phone calls to businesses and people for you. [X post](https://x.com/elonmusk/status/2114365361068138990), [TeslaNorth, 25 Oct 2026](https://teslanorth.com/2026/10/25/grok-bot-phone-calls-elon-musk/). Plans and countries not disclosed.
- No official Grok WhatsApp number. [Blueticks, 27 Sep 2026](https://blueticks.co/blog/grok-whatsapp). A Telegram bot is reported for Telegram Premium (†, not verified).

**OpenAI**
- 1-800-CHATGPT phone line launched 18 Dec 2024, US/Canada only, with free monthly minutes. [Axios](https://www.axios.com/2024/12/18/chatgpt-phone-call-whatsapp-message). Current status not verified.
- ChatGPT on WhatsApp stopped 15 Jan 2026 ([Engadget](https://engadget.com/ai/chatgpt-in-whatsapp-will-stop-working-in-january-161335173.html)); returned 13 Jul 2026 in the EEA only, for text, images and voice notes ([The Decoder](https://the-decoder.com/chatgpt-returns-to-whatsapp-in-europe-after-eu-forces-meta-to-open-the-door-to-rival-ai-bots/)).
- **Dots** launched 29 Sep 2026: always-on background agents, each with its own cloud computer, 4,000+ apps; ChatGPT Pro ($100/month) and Business Premium in "eligible markets"; reachable in ChatGPT, Slack and Teams, with a waitlist for iMessage/RCS. [TechCrunch](https://techcrunch.com/2026/09/29/openai-launches-dots-its-bubbly-agentic-avatar/), [The Next Web](https://thenextweb.com/news/openai-dots-always-on-ai-agents-cloud-computers-devday), [Techmeme](https://www.techmeme.com/260929/p35). No WhatsApp or calling found († [Agentsonic](https://www.tryagentsonic.com/articles/openai-dots-whatsapp)). Nothing found on India.

**Meta**
- Muse Spark model, 8 Apr 2026 ([Meta](https://about.fb.com/news/2026/04/introducing-muse-spark/)); Muse Spark 1.1 added email, calendar and recurring tasks to the Meta AI app, 28 Jul 2026 ([TechEconomy](https://techeconomy.ng/meta-ai-grows-hands-muse-spark-1-1-turns-chatbot-into-an-agent)).
- **Muse** agent app launched 8 Sep 2026, US only, India excluded; sends emails, fills forms, makes purchases; free plus $20 / $100 plans. [MediaNama](https://www.medianama.com/2026/09/223-meta-muse-personal-ai-agent-india/)
- From 16 Sep 2026 Muse placed calls to US businesses ([TechCrunch](https://techcrunch.com/2026/09/17/rival-ai-agents-instinct-and-metas-muse-both-add-the-ability-to-make-calls/)); reports said some calls were made by human contractors and Meta rolled the feature back ([Technology.org, 23 Sep 2026](https://www.technology.org/2026/09/23/meta-muse-human-concierge-ai-phone-calls/)).
- Meta AI voice chat in WhatsApp is an in-app voice session, not a phone call; beta from Feb 2026. [Green API](https://green-api.com/en/blog/2026/whatsapp-is-rolling-out-voice-chats-powered-by-meta-ai/)

**Perplexity**
- WhatsApp bot from Apr 2025, cut off 15 Jan 2026. [Gulf News](https://gulfnews.com/technology/no-more-chatgpt-and-perplexity-on-whatsapp-meta-bans-major-ai-chatbots-from-2026-1.500316016). No phone line found.

**In short:** larger players lead on scale and number of app connections. Classgrid AI's difference is that it is available in India today, you can call it on WhatsApp, and the finished work comes back to you on WhatsApp.

---

## 9. Good to know (limits)

**Calls and WhatsApp**
- Calls are in **English only** (it may understand other languages, but it replies in English).
- These are **WhatsApp calls, not normal phone calls**. A regular phone call will not reach the AI. There is no call button inside chat.classgrid.in.
- **Up to 15 minutes per call**, and a daily limit on calls per number.
- Calls only work from a WhatsApp number verified on one Classgrid AI account.
- **Texting the WhatsApp number does not start a task.** New tasks start from a call (or an email to agent@classgrid.in). Texts reach the agent only while a task is running.
- Calls and tasks use your AI credits.

**Agent mode**
- **Schedules don't re-run the AI.** They send the email/WhatsApp message written when the schedule was made.
- Background tasks stop after 48 hours.
- Some plugins do a focused set of actions (for example, Calendar can list and create events but not move or cancel them; Zoom can list and create meetings). The WhatsApp Business plugin needs your own Meta business account.
- MCP access is available only when switched on, and does not include code running, image making or WhatsApp.

**Project Mode**
- Needs a GitHub account and the Classgrid GitHub app on the repo.
- **No live preview link** for a running dev server; use a Vercel preview instead. No deploy button inside Project Mode.
- Opens the latest code on the default branch only.
- Confirmed languages: Python and Node / TypeScript. No extension store.
- "Accept all" in Review keeps the changes on screen; it does not push. Use "Push to GitHub" to save to GitHub.
- At busy times it may say *"Project Mode is busy right now. Try again in a few minutes."*

**Grids**
- **Share Grid: maximum 4 people.** Incognito and Project Mode chats can't be shared.
- The AI reads only recent group messages (about the last 1–2 hours), not the whole history.
- No AI bot inside group chats, and the AI can't post into Grids on a schedule.
- Grids connects Classgrid AI users only (not other messaging apps).

**WhatsApp platform policy**
Since 15 January 2026, WhatsApp's Business terms restrict "AI Providers" whose AI is the main purpose of the service ([TechCrunch](https://techcrunch.com/2025/10/18/whatssapp-changes-its-terms-to-bar-general-purpose-chatbots-from-its-platform/)). Europe/Italy received exceptions ([Storyboard18](https://storyboard18.com/brand-makers/meta-to-allow-rival-ai-chatbots-on-whatsapp-in-europe-for-12-months-amid-eu-probe-2-91405.htm)). No India exception has been found. Classgrid AI's WhatsApp features could be affected by how Meta applies this policy. The rest of the product (web app, Project Mode, Grids, email) does not depend on WhatsApp.

---

## 10. Try it

- **Use Classgrid AI:** https://chat.classgrid.in — free to start; top up when you need more.
- **See all plugins:** https://classgrid.in/plugins
- **Book a demo:** https://classgrid.in/demo
- **Call on WhatsApp:** +91 81492 77038 (verify your number on chat.classgrid.in first)
