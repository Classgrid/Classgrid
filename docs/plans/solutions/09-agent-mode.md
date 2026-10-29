# Product page: Agent mode

- **URL:** `/solutions/agent-mode` (new)
- **Replaces:** nothing (new page). The home page is already a short Agent page; this page is the **full tour**. Don't copy the home hero headline ("Do anything with Classgrid AI").
- **Who it's for:** everyone. People who want to see everything the agent can do before signing up.
- **Goal:** sign up and give the first task
- **Sanity:** `solutionPage` slug `agent-mode`, `category: product`, label "Agent mode"

---

## Hero

- **Eyebrow:** Agent mode
- **Headline:** One agent. Real work done.
- **One line:** Search the web, read your files, run code, make documents and websites, and keep working in the background, all from one chat.
- **Buttons:** "Use Agent" → `https://chat.classgrid.in` · "Book a demo" → `/demo`
- **Keep** the "Powered by leading AI models" logo strip from `AgentHeroSection` on this page only.

---

## Interactive demo (custom design)

Use the **`ViewPlatformPreview` app frame** (sidebar with "New Chat", "Schedule", "Library", "Pinned", "Today"; composer with paperclip, AI Hub sliders, "Auto" model, mic, send). Change the composer placeholder to the app's real text: **"Ask anything, analyse a file, or schedule a task…"**. Empty state uses a real greeting line ("Good evening, Aditi" + "What should we work on today?").

Four chips above the frame: **Analyse a file** · **Build a website** · **Set a reminder** · **Research**.

**Chip 1: Analyse a file** (plays first)
- A file chip `sales-q3.xlsx` drops into the composer. User: "Analyse this and send me a PDF report with charts"
- "Worked for 2m 14s ›" → expandable step trail: "Read sales-q3.xlsx" · "Ran Python" · "Drew 2 charts" · "Built report.pdf"
- Answer: 2 lines + `ChartMock` (bar) + `CreatedFilesCard` "Created 3 files" (`report.pdf`, `charts/by_month.png`, `data/clean.csv`)

**Chip 2: Build a website**
- User (app starter text): "Build me a simple, modern one-page personal portfolio website."
- Steps: "Wrote index.html" · "Generated 1 image" · "Published"
- Answer ends with: "Live at https://aditi.sites.classgrid.in" + a mini browser frame

**Chip 3: Set a reminder**
- User (app starter text): "Help me set up a daily WhatsApp reminder. Ask me what time and what it should say."
- The agent asks with an `approval` questions card: "What time?" (7:00 AM / 8:00 AM / 9:00 PM / "Something else") → **click 9:00 PM** → "What should it say?" → user: "Drink water and plan tomorrow"
- Result: `ScheduleCardMock` "Daily reminder · Every day, 9:00 PM · WhatsApp and email · Active"

**Chip 4: Research**
- User: "Search the web with sources: what's new in Python 3.13?" (no prices or ₹ in any demo)
- Steps: "Searched the web" · "Opened 5 pages"
- Answer: `CitedAnswerMock` with [1]–[5] chips + `followups` block (3 clickable next questions)

---

## Feature blocks

### 1. Tools that actually do the work
- **Text:** The agent searches the web with sources, reads any file, writes and runs code, makes images and PDFs, publishes websites and sends email. It picks the right tool for each step and shows you what it did.
- **Facts:** `search_web` ([n] citations), `open_url`, `parse_document` (PDF, Word, PowerPoint, Excel, CSV, text), `analyze_image`, `transcribe_audio`, `run_code` (Python / JavaScript / bash sandbox with pandas, matplotlib, ffmpeg, LibreOffice, Playwright and more), `generate_image`, `generate_pdf`, `deploy_to_classgrid_cloud` (`<site>.sites.classgrid.in`), `send_email` (from agent@classgrid.in, with attachments); "Dictate" (speak instead of typing).
- **Mock:** text left, grey panel (`AgentRealWorkSection` pattern). Glass chat card with an expanded step trail of 5 tools, each with an icon. Floating `CreatedFilesCard`.

### 2. Answers you can use, not just read
- **Text:** Answers come as real cards: charts, diagrams, flashcards, quizzes you can tap, day planners, live weather, stock prices, maps, countdowns, and even small interactive tools the agent builds for you.
- **Facts:** answer blocks `chart`, `mermaid`, `carousel` (slides, flashcards), `copy`/`email`/`message`, `approval` (clickable questions, plan card), `planner`, `actions`, `followups`, `weather`, `market`, `map`, `countdown`, `clock`, `review`/`scores`/`rating`, `points`/`cards`, `widget` (polls, sliders, mini games, calculators); maths with LaTeX.
- **Mock:** text right, teal panel. A **mosaic** of 4 small glass cards: chart, flashcard, weather (5 days), countdown. Floating `widget` card: a small tip calculator with a working slider (interactive).
- Don't show `attendance`, `timetable` or `reportcard` blocks here.

### 3. Works while you're away
- **Text:** Give it a long job and close the tab. The agent keeps going for up to 48 hours, asks you on WhatsApp if it needs something, and sends the result when it's done. Hand off work by email to agent@classgrid.in or by a WhatsApp call. Set reminders that arrive by email and WhatsApp at the time you choose.
- **Facts:** long background tasks (`sleep_until`, wakes on time or on your WhatsApp reply, max 48 h, "✅ *Task completed.*" + chat link); email from your sign-up address starts a task; WhatsApp calls (see 08); `create_schedule` (once, daily, weekly, chosen weekdays, up to 90 days) **sends the message written when you made it**, so it doesn't re-run the AI.
- **Mock:** text left, grey panel (`AgentSchedulesSection` layout, **new text**). Glass `ScheduleCardMock` "Daily reminder · Every day, 9:00 PM · WhatsApp and email". Floating `WhatsAppBubbleCard`: "✅ *Task completed.* Your competitor comparison is ready: chat.classgrid.in/…" + PDF bubble.
- Link: "Call the agent on WhatsApp" → `/solutions/whatsapp-calls`.

### 4. Your apps and your choice of model
- **Text:** Connect 21 apps from the AI Hub and the agent works inside them as you. Let Auto pick the model for each message, or choose from Claude, DeepSeek and more.
- **Reuse as-is:** `AgentPluginsSection` (plugins panel + "Gmail connected") and `AgentModelsSection` (model picker: Auto; Claude Haiku 5.5, Sonnet 5.5, Opus 5.5, Fable 5.1; DeepSeek V4 Pro / Flash; +13 more). Their text is already correct.

### Extra row: three small cards (under the blocks)
Use 3 equal glass cards on a grey panel, each with an icon, title and 1 line:
- **Library**: "Manage your uploaded and AI-generated files." Search, filter by date, sort.
- **Incognito**: "Incognito chats are not saved to your history or search." Close it and the chat is deleted.
- **Skills**: Tell Classgrid AI about you and how to answer (tone, length, format), or add your own skill like "Math Socratic Tutor". Say "remember…" or "from now on…" and it saves a skill for you.

---

## Plugins strip

Full strip (all 21 from the Sanity Plugins Page), link "See all plugins" → `/plugins`. Tiles show name only here (block 4 already explains them). Only use the one-line notes from the index plugin table if adding hover text.

---

## Example tasks grid

Exact wording from the app (home lines):
- "Analyse a file in seconds."
- "Search the web with sources."
- "Draw a chart from your data."
- "Create a PDF report in minutes."
- "Build and host a website."
- "Get reminders on WhatsApp."
- "Turn a voice note into text."
- "Write Python and run it for you."

---

## FAQ

1. **What can the agent do?** Search the web with sources, read your files, run Python, make charts, images, PDFs and websites, work in your connected apps, and keep working in the background on long tasks.
2. **Which models can I use?** Auto picks one for each message. Or choose Claude Haiku, Sonnet, Opus or Fable, DeepSeek V4, or open models like Kimi, GLM, Qwen and Llama.
3. **How do reminders work?** You set the time and the message. At that time it's sent to your email, and to WhatsApp if you verified your number. Once, daily, weekly or on chosen days.
4. **Can it keep working after I close the tab?** Yes. Long tasks run for up to 48 hours and send the result to WhatsApp and the chat.
5. **Can I keep a chat private?** Yes. Incognito chats aren't saved to your history, and they're deleted when you close them.
6. **Is it free to start?** Yes. Sign up with your email. Top up only when you need more.
- *Hold (add only when MCP is switched on):* "Can I use Classgrid from Claude, Cursor or ChatGPT?"

---

## Images to capture (real app, light + dark)

1. **Home screen** with the greeting + "Ask anything, analyse a file, or schedule a task…".
2. **`@` menu** open. **Crop out "Sketch" and "Deep research"** (no backend), or don't use this shot.
3. **Model picker** open.
4. **A file analysis answer** with step trail, chart and created files.
5. **"Live at https://….sites.classgrid.in"** answer.
6. **Answer blocks**: weather / market / map, flashcard carousel, quiz card, planner + countdown (one shot each).
7. **Scheduled page** with 2 personal reminders. No "Recommended" cards.
8. **Library page**, **Incognito** ("You're incognito"), **AI Hub → Skills** (Custom Instructions).
- Blur: real names, emails, sidebar chat titles, storage numbers if they show usage.

## Custom design needed (coded mocks)

- `ViewPlatformPreview` copy with scripted chips (keep the original component unchanged), step trail, `ChartMock`, `CreatedFilesCard`, mini browser frame, `approval` question card, `ScheduleCardMock`, `CitedAnswerMock` + `followups`, block mosaic, working `widget` slider card, 3 small cards (Library / Incognito / Skills).

## SEO

- **Title:** Agent mode: an AI agent that does real work | Classgrid AI
- **Description:** Search with sources, read files, run code, make charts, PDFs and websites, use your apps and keep working for up to 48 hours. Free to start.

## Do not claim (this page)

- "Deep research" mode or "Sketch" drawing (no backend). Image editing (switched off).
- Schedules that re-run the AI, send fresh summaries, "daily briefs", "weekly reports" or "monitor for updates".
- Starter cards shown in the app (they aren't).
- A personal agent email address (agent@classgrid.in is shared; only your sign-up email works).
- `sites.classgrid.in` from Project Mode or WhatsApp tasks. Owning a site name you didn't publish first.
- "Default AI Skills" toggles changing behaviour. Hidden tools (`update_skill`, `update_ai_preferences`, syllabus search).
- Any staff tool or ERP block (attendance, timetable). Upload size. Any price, credit, image or WhatsApp limit, or Fable unlock condition.
- MCP (hold).

---

## What Agent mode can do, in plain English

Agent mode is the main chat in Classgrid AI at chat.classgrid.in. You open it, type what you want
in normal words, and the agent does the work for you. It is not only a chatbot that answers
questions. It can search, read, write, make files, build small websites, send emails and keep
working on a job in the background, and it comes back to you when the job is done.

It can look things up on the internet for you. When it answers from the web, it puts small
numbers next to its sentences, and each number links to the page it read, so you can check
where every fact came from. If you give it a link, it can open that page and read the whole
thing, even a long one, and then explain it, summarise it or pull out what you need.

It can read your files. You can drop in a PDF, a Word file, a PowerPoint (it also reads the
speaker notes), an Excel sheet, a CSV, a plain text file, a photo or a voice recording, up to six
files in one message. It understands what is inside, so you can ask it to turn a chapter into
notes, find the important numbers in a report, explain a chart in a photo, or turn a voice note
into written text.

It can make things for you, not just talk about them. It can draw an image from your idea, like
a poster or a thumbnail. It can write and run real Python or JavaScript code on its own safe
computer, so it can clean a messy spreadsheet, do the maths, draw charts and build files. It can
hand you back finished files you can download: a PDF report, a Word document, a PowerPoint deck,
an Excel sheet, or even a trimmed video or an audio clip.

It can build a simple website and put it live for you. You describe the site, the agent writes
it, and it publishes it at your own address like yourname.sites.classgrid.in, all inside one
chat. This is great for a portfolio, a landing page for an idea, or a small event page.

Its answers are not only plain text. When it helps, it shows proper cards inside the chat: charts
and diagrams, flashcards you can flip, quizzes you can tap to answer, a day-by-day study planner
with tick-boxes, a countdown to a date, live weather, a live stock price, a map with a pin, star
ratings and score bars, and even small interactive cards it builds itself, like a poll, a
calculator or a quick game. Maths is shown with proper symbols, the way it looks in a textbook.

It can work for you in the background, for a long time. If a job needs waiting, like waiting for
your reply or for a later time, the agent can pause, wake up later and carry on, for up to two
days. When it finishes, it tells you "Task completed" and gives you the link to the chat. You can
also email your work to its own address, agent@classgrid.in, and it will pick it up and work on it.

It can send you reminders. You can ask it to remind you once, every day, every week or on the
days you pick. At that time you get the reminder by email, and on WhatsApp too if you have
verified your number. The reminder text is written when you set it up, so it is perfect for
"study chapter 6 tonight" or "call the client at 4", not for fresh news every morning.

It can work inside the apps you already use, once you connect them from the AI Hub. With Gmail
it can read and send your emails. With Google Drive it can find and read your files. With Google
Calendar it can tell you your day and add events. It also connects to Notion, Slack, GitHub,
Google Classroom, Google Meet, Google Forms, Outlook, Microsoft Teams, Zoom, Canva, Spotify,
YouTube, Supabase, Sanity, Facebook Pages, Instagram Business, Vercel and WhatsApp Business.
You can see all of them on the Plugins page.

You choose how smart or how fast it should be. "Auto" picks the best model for each message by
itself, or you can pick one yourself: Claude (Haiku, Sonnet, Opus and the most powerful one,
Fable), DeepSeek, and more than ten other well-known models. You can switch any time, even in the
middle of a chat.

It keeps your work tidy and private. Every file you upload or the agent makes is saved in your
Library, where you can search and sort them. You can teach the agent about yourself, like your
name, your job and how you like answers, and it will remember that in every chat. If you want a
chat that is not saved at all, you can open an Incognito chat, and it disappears when you close
it. You can delete any chat and disconnect any app whenever you want.

You can also reach the agent on WhatsApp. After you verify your number, you can call the
Classgrid number on WhatsApp, tell it what you need, hang up, and get the result back on WhatsApp.
You can share any chat as a read-only link, or invite up to three other people into the same chat
so you all work with the agent together.

In short: Agent mode is like having a smart helper who can research, read, write, calculate,
design, build and remind, all from one chat box, and who keeps going even after you close the tab.
It is free to start, and you top up only when you need more.
