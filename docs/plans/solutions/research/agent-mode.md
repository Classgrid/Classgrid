# Research: Agent mode (the main chat agent)

Source: read-only code research of `C:\CLASSGRIDPLATFORM\classgrid_platoform-desktop-`, 2026-10-27.

Abbreviations: ATG = `server/src/services/ai-tool-groups.js`, TOOLS = `server/src/mcp/tools.js`, CTRL = `server/src/controllers/ai-chat.controller.js`, PANEL = `client/src/components/ai/components/AskAiPanel.tsx`.

## 1. Capabilities (each checked in code)

- **Web search with numbered [n] citations** — `search_web`, always loaded; `@` menu "Web search · Find real-time news and info" (CTRL:2563, ATG CORE_TOOL_NAMES).
- **Open and read any URL** — `open_url`, reads long pages in parts; page becomes a citable source (CTRL:2580).
- **Read files** — `parse_document`: PDF, Word (.docx), PowerPoint (.pptx incl. speaker notes), Excel (.xlsx/.xls), CSV, text; `analyze_image` for images; `transcribe_audio` for mp3/wav/webm (video via ffmpeg). Picker accepts `image/*,audio/*,video/*,.pdf,.md,.txt,.csv,.doc,.docx,.xlsx,.pptx`, up to 6 files per message (CTRL:2595-2620, TOOLS:1103, PANEL:2625).
- **Image generation** — `generate_image` (Flux-1-schnell on Cloudflare). "Create image · Visualize anything" (TOOLS:316, CTRL:6138, PANEL:3995).
- **Code sandbox** — `run_code` runs Python/JavaScript/bash in a Docker sandbox, files under `/data`. Python: pandas, numpy, matplotlib, seaborn, scipy, sympy, scikit-learn, statsmodels, yfinance, pymupdf, pdfplumber, python-docx, python-pptx, openpyxl, moviepy, opencv, spacy, nltk, qrcode, yt-dlp, playwright…; tools: ffmpeg, LibreOffice, Tesseract, ImageMagick, Chromium; Node 20: typescript, playwright, xlsx… Files can be uploaded to cdn.classgrid.in (`upload_sandbox_file_to_cdn`). (`server/agent-sandbox-env/Dockerfile`, CTRL:1780-1801, TOOLS:341)
- **PDF generation** — `generate_pdf` (HTML → PDF with Puppeteer, download link) (CTRL:2655).
- **Publish a website** — `deploy_to_classgrid_cloud` → `https://<site>.sites.classgrid.in`; a site name belongs to whoever publishes it first. Agent mode only (not Project Mode, not WhatsApp tasks) (TOOLS:549/4177, CTRL:4478).
- **Email** — `send_email` (AWS SES) from agent@classgrid.in, with attachments (CTRL:2685). `read_agent_email` reads the agent's own inbox agent@classgrid.in (Zoho): search by sender/date/subject/words, mark read, attachments become links (`server/src/services/agent-mail.service.js`). Email from a registered user's address starts/updates a task; short auto-reply; inbox checked every 45 s (`agent-task.service.js:685-751`).
- **Long background tasks** (`server/src/services/agent-task.service.js`) — `sleep_until` ends the run and wakes later (time and/or the user's WhatsApp reply); alarm checks every 5 min; max 48 h then ended and the user told; failed run retried after 5 min; after 5 runs with no progress it waits for the user; `end_task` closes with "✅ *Task completed.*" + chat link.
- **WhatsApp tools** — `send_whatsapp_message` (text or real files: PDF, image, audio, video) from Classgrid's business number; `read_whatsapp_messages`, `wait_for_whatsapp_reply` read the user's replies from their verified number; weekly limit (TOOLS:1029-1061, CTRL:3594-3703).
- **WhatsApp voice calls** — user calls the Classgrid WhatsApp number; Claude Haiku answers by voice (Whisper speech-to-text, Aura text-to-speech). Up to 15 min per call, max 50 calls per number per day. During the call: `ask_classgrid` (live answer from the agent), `start_task` (queue work), `list_projects` / `make_project`. After the call the agent does the tasks in a new chat and sends results on WhatsApp. Only works if the number is the verified WhatsApp of exactly one account (`server/src/services/whatsapp-call.service.js:1-12,154,238-280,320`).
- **`@` composer menu** (no "+" menu): "Add photos & files · Upload from computer", "Add from library · Browse and search your files", "Create image", "Sketch · Draw and attach an image", "Web search", "Deep research · Get a detailed report", then every plugin (PANEL:6640-6646).
- **Composer controls** — paperclip "Attach file", sliders icon "AI Hub", "Dictate" (mic → Whisper large-v3-turbo via `/api/voice/transcribe`), placeholder "Ask anything, analyse a file, or schedule a task…" (PANEL:6804-6855, `server/src/routes/voice.routes.js:238`).
- **Model picker** (`ModelPicker.tsx`) — "Auto · Picks the best model for each message"; Claude Haiku/Sonnet/Opus 5.5 and Fable 5.1; DeepSeek V4 Pro/Flash; "More models": GPT-OSS 120B/20B, Kimi K2.6 / K2.7 Code, GLM 5.3 / 5.3 Flash / 5.2 / 4.7 Flash, Qwen 3.8 27B, Gemma 4 26B, Nemotron 3 120B, Llama 4 Scout, Mistral Small 3.1.
- **Incognito** — "Incognito chat", "You're incognito", "Incognito chats are not saved to your history or search. They stay in this browser until you close them." Closing deletes the chat on the server (`IncognitoMode.tsx`, PANEL:6399,6873).
- **Library** — "Library · Manage your uploaded and AI-generated files." Search, date filter, sorting, storage meter (`LibraryPage.tsx`).
- **Skills / Custom Instructions** (AI Hub → "Skills") — Behavior Defaults (Base Tone, Verbosity, Format, Emoji, Explanation Level); Custom Instructions (Nickname, Occupation, "What would you like Classgrid AI to know about you?", "How would you like Classgrid AI to respond?"); "Add Custom Skill" (example "Math Socratic Tutor"); all injected into the prompt (`skills/AiSkillsPanel.tsx`, CTRL:1910-1960). The agent can create skills itself (`create_skill`) on "remember…" / "from now on…".
- **Schedules** — "Scheduled · Ask Classgrid AI to schedule tasks, set reminders, or monitor for updates." `create_schedule`: one-time, daily, weekly or chosen weekdays, up to 90 days. At run time (`server/src/workers/ai-schedule.worker.js`, cron every minute) the email subject/body written when the schedule was created is sent to the user's email via SES; the pre-written WhatsApp text too if set (weekly limit). The AI does NOT run again.
- **Plugins** (`INTEGRATIONS_LIST`, PANEL:1948): Notion, Gmail, Google Calendar, Drive, Classroom, Meet, Forms, Outlook, Teams, Zoom, WhatsApp Business, Vercel, Slack, GitHub, Canva, Spotify, YouTube, Supabase, Sanity, Facebook Pages, Instagram Business. Each shows "Try asking the AI" prompts (`getDemoMessages`, `AiHubModal.tsx:361`).
- **MCP server** — POST `/mcp` with OAuth, for Claude, Cursor or ChatGPT. Scopes: Read your profile; Read/write your schedules; Read your Grid chats; Send messages; Use your connected apps. AI Hub "Connected apps": "Apps like Claude, Cursor or ChatGPT that you allowed to use your Classgrid account." (`server/src/mcp/mcp-server.js`, `mcp-scopes.js`)

## 2. Answer blocks (PANEL:1599-1818 + helper files)

| Block | Shows | Renderer |
|---|---|---|
| `chart` | bar, line, pie, doughnut, radar | AiChartRenderer.tsx |
| `mermaid` | diagrams | MermaidViewer.tsx |
| `carousel` | slides; flashcards with hidden "**Answer:**" | PANEL:1363 |
| `copy` / `email` / `message` / `prompt` | one-click copy | PANEL:1369 |
| `approval` | "questions" = clickable MCQs/quizzes (Next / Skip / "Something else"); "plan" = plan card | ApprovalCard.tsx |
| `planner` | ticks, days left, "Set reminders" | StudyBlocks.tsx |
| `reportcard`, `timetable`, `attendance` | marks, weekly grid, month calendar | StudyBlocks.tsx |
| `actions` | cards with buttons / answer reveals | StudyBlocks.tsx |
| `followups` | 3 clickable next questions | StudyBlocks.tsx |
| `weather` | Open-Meteo, live + 5 days | LiveCards.tsx |
| `market` | stock/forex price + chart | LiveCards.tsx, `/api/ai/market` |
| `map` | OSM place pin or route | LiveCards.tsx |
| `countdown` | to a date, or a timer | LiveCards.tsx |
| `clock` | live time for a place | ClockBlock.tsx |
| `review`, `scores`, `rating` | report header, score bars, star card | ReviewBlocks.tsx |
| `points`, `cards` | icon rows, picture rows | PointsBlocks.tsx |
| `widget` | the AI's own HTML card in a sandboxed iframe (polls, sliders, mini games, calculators) | WidgetBlock.tsx |
| `skill` | skill card | PANEL:1701 |

Maths rendered with LaTeX; web answers show linked [n] citations.

## 3. Example text shown to users (exact)

**Home greeting** (`AgentHomeExtras.tsx`): "Good morning/afternoon/evening, {first}" / "Working late, {first}?", then ~105 rotating lines, e.g. "What should we work on today?", "Analyse a file in seconds.", "Plan your exams, day by day.", "Get reminders on WhatsApp.", "Build and host a website.", "Turn a PDF into clear notes.", "Make flashcards for your next test.", "Write Python and run it for you.", "Draw a chart from your data.", "Create a PDF report in minutes.", "Search the web with sources.", "Summarise a YouTube video for you.", "Turn a voice note into text.", "Clean up messy spreadsheet data.", "Turn marks into a progress report.", "Write a lesson plan for tomorrow.", "Create a worksheet with answers.", "Create a quiz from a PDF.", "Build a landing page for your idea.", "Make a portfolio site in one chat.", "Research a topic with real sources.", "Outline a literature review.", "Write captions for your posts.", "Plan content for the whole week.", "Write SQL queries from plain English.", "Debug an error in your code."

**Starter cards** (defined but NOT rendered): "Analyse a file"; "Exam planner" ("Make me a 2-week exam study planner with daily topics, revision days and short breaks."); "WhatsApp reminder" ("Help me set up a daily WhatsApp reminder. Ask me what time and what it should say."); "Build a website" ("Build me a simple, modern one-page personal portfolio website.").

**Schedule "Recommended"** (`SchedulePage.tsx:51-138`): "Exam prep reminders", "Assignment deadline reminder", "Daily summary email", "Weekly progress report", "Fee payment reminder", "Class schedule briefing" — ERP-era, don't use.

**Plugin demo prompts** (examples): "Read my unread emails from today", "What's on my calendar for tomorrow?", "Summarize the product roadmap presentation", "Which students haven't submitted the homework?", "Post 'Happy Diwali' to my Facebook Page", "Search my Notion for recent strategy docs", "List all my Supabase projects".

## 4. Solutions by audience

**Students**
- Turn a 40-page PDF into notes + flashcards (parse_document, carousel, approval quiz) — "Turn a PDF into clear notes." / "Create a quiz from a PDF."
- Exam countdown + day-by-day plan with reminders (planner, countdown, create_schedule) — "Make me a 2-week exam study planner with daily topics, revision days and short breaks."
- Get quizzed before the test (approval questions with scoring) — "Quiz you before your exam."
- Maths with working shown + graphs (LaTeX, run_code sympy/matplotlib) — "Solve a maths problem with working."
- Lecture voice note or slides → notes (Dictate, transcribe_audio, pptx parsing).

**Teachers** (personal tools, not ERP)
- Worksheet or MCQ paper as a PDF (generate_pdf, approval) — "Create a worksheet with answers."
- Marks spreadsheet → report cards + charts (xlsx, reportcard, chart) — "Turn marks into a progress report."
- Lesson plan for tomorrow — "Write a lesson plan for tomorrow."
- Interactive class activity (widget: matching pairs, polls; mermaid).
- Google Classroom announcement or assignment (if connected) — "Create a new announcement for tomorrow's quiz."

**Developers**
- Run and debug Python/JS/bash in a real sandbox — "Debug an error in your code."
- Idea → live site at name.sites.classgrid.in in one chat — "Build me a simple, modern one-page personal portfolio website."
- Push sandbox files to GitHub, trigger a Vercel deploy (connectors).
- Use Classgrid from Claude, Cursor or ChatGPT via MCP.
- Pick the model per message.

**Small teams / founders**
- Landing page for an idea, live in minutes — "Build a landing page for your idea."
- Inbox and calendar help (Gmail/Outlook/Calendar) — "Read my unread emails from today", "When am I free next week?"
- Hand off work by email to agent@classgrid.in; the agent replies and works in the background.
- Meeting notes → Notion page or Slack message — "Write meeting notes and action items."
- Polished PDF proposal emailed to a client (generate_pdf + send_email) — "Draft a project proposal."

**Creators**
- Thumbnails/posters from a prompt (generate_image).
- A week of captions and a content calendar — "Plan content for the whole week." / "Write captions for your posts."
- Summarise a YouTube video (yt-dlp + ffmpeg + transcription) — "Summarise a YouTube video for you."
- Trim, convert or extract audio from video (ffmpeg).
- Post to a Facebook Page / Instagram Business, check insights (if connected).

**Researchers / analysts**
- Cited research brief (search_web, open_url, review/points blocks) — "Research a topic with real sources."
- Messy CSV/Excel → clean data + charts + PDF report — "Clean up messy spreadsheet data."
- Live stock/FX card + yfinance analysis (market block, sandbox).
- Survey results → patterns.
- Literature review outline and citations — "Outline a literature review."

**Anyone on WhatsApp**
- Call the Classgrid number, say what you need, get the result on WhatsApp after you hang up.
- Daily/weekly reminders on WhatsApp and email (create_schedule).
- Get a PDF on WhatsApp as a real file (generate_pdf + send_whatsapp_message).
- The agent keeps working for up to 48 h, waits for your WhatsApp reply, then carries on.

## 5. Best visuals
1. Empty home screen with the serif typing greeting and the "Ask anything, analyse a file, or schedule a task…" box.
2. `planner` card next to a `countdown` card.
3. `carousel` flashcard with "Show answer" reveal + `approval` quiz card with score.
4. Cited web answer: `review` + `scores` + `points` with [n] chips.
5. Live `weather` / `market` / `map` trio.
6. `chart` from an uploaded spreadsheet with the sandbox step trail.
7. Chat ending in "Live at https://name.sites.classgrid.in".
8. Scheduled page list with "Repeat" labels.
9. AI Hub plugin detail view with "Try asking the AI" prompts.
10. WhatsApp mock: a call, then "✅ *Task completed.*" + chat link.
11. Model picker dropdown.
12. Incognito "You're incognito" screen.

## 6. Limits / do not claim
- **Schedules don't re-run the AI**: they send fixed email/WhatsApp text written at creation. Don't claim "fresh daily summaries" or "monitor for updates" (the home line "Schedule a daily summary for you." and the page subtitle overstate this).
- Schedule "Recommended"/"Integrations" lists are ERP-era (attendance, fees, payment link, timetable, "Classgrid Classroom", WhatsApp broadcasts to parents) — don't use.
- `@` items with no backend: "Deep research" and "Web search" only insert text (web search still works because it's always loaded); "Sketch · Draw and attach an image" has no drawing canvas.
- `StarterCards` and `CapabilityStrip` are not rendered; `suggestedQuestionsForPage` returns nothing.
- **Texting the WhatsApp number does not start a task.** New tasks start only from a call or an email to agent@classgrid.in (`agent-task.service.js:596`); texts reach the agent only while a task is open. Email-started tasks are created as Project Mode projects.
- agent@classgrid.in is one shared mailbox, not per user.
- Plugin bullets/demo prompts overclaim vs real operations: Zoom only list/create meetings (no recordings/summaries); Calendar only list/create events (no cancel/move); Vercel no rollback or build logs; Outlook no delete; Meet no transcript summary; "Automate inbox organization" / "Automate customer support replies" have nothing behind them; WhatsApp Business plugin needs the user's own Meta credentials; Facebook/Instagram not in MCP scopes.
- "Default AI Skills" toggles are prompt instructions only; some are ERP/staff-era.
- Tools with no handler: `update_skill`, `update_ai_preferences`, `search_syllabus_vectors`, `read_local_file` (ATG:62); `edit_image` commented out.
- MCP is off unless `MCP_ENABLED=true`; over MCP, run_code, image generation and WhatsApp are blocked.
- Voice calls are English only (English TTS voice).
- Limits exist for images, WhatsApp per week, Fable access — never quote numbers or ₹ amounts.
- Internal tools (DB queries, server logs, tickets, CRM, `search_knowledge_base`) are staff-only; ERP stats tools are ERP.
- Upload size text is inconsistent (tooltip 35 MB, code 150 MB) — don't state a size.
