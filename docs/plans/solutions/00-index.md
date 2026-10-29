# Solutions pages: the full plan

Status: **plan only, nothing built yet.** Work locally only. No push before 2026-11-11.

Classgrid is the AI agent at **chat.classgrid.in**. The school ERP is **stopped for good**. Never call it "paused", and never sell admissions, fees, attendance or timetables. Each Solutions page sells the real product (Agent mode, Project Mode, Grids, WhatsApp calls, plugins, models) to one kind of user, or explains one product part. Every claim must come from the research files in `research/`.

Research these pages are built on (read-only code study of the platform repo, 2026-10-27):
- [research/agent-mode.md](research/agent-mode.md)
- [research/project-mode.md](research/project-mode.md)
- [research/grids.md](research/grids.md)
- [research/whatsapp-calls.md](research/whatsapp-calls.md)

---

## 1. The pages

| # | File | URL | Who it is for | Old URL it replaces |
|---|------|-----|---------------|---------------------|
| 1 | [01-for-students.md](01-for-students.md) | `/solutions/for-students` | School and college students | `/solutions/for-students` (same URL, new content) · `/solutions/for-colleges` (301 to here) |
| 2 | [02-for-teachers.md](02-for-teachers.md) | `/solutions/for-teachers` | Teachers, tutors, coaching teachers | `/solutions/for-teachers` (same URL, new content) · `/solutions/for-schools`, `/solutions/for-jr-colleges`, `/solutions/for-coaching` (301 to here) |
| 3 | [03-for-developers.md](03-for-developers.md) | `/solutions/for-developers` | Developers, students who code, founders who build (Project Mode) | `/solutions/for-engineering` (301 to here) |
| 4 | [04-for-teams.md](04-for-teams.md) | `/solutions/for-teams` | Founders, small teams, office work | `/solutions/for-admins` (301 to here) |
| 5 | [05-for-creators.md](05-for-creators.md) | `/solutions/for-creators` | Creators, social media, small brands | new |
| 6 | [06-for-research-and-data.md](06-for-research-and-data.md) | `/solutions/for-research` | Anyone researching, or working with spreadsheets and PDFs | new |
| 7 | [07-grids.md](07-grids.md) | `/solutions/grids` | Anyone who chats, plans and decides with other people | new |
| 8 | [08-whatsapp-calls.md](08-whatsapp-calls.md) | `/solutions/whatsapp-calls` | Anyone who wants to call the agent on WhatsApp | new |
| 9 | [09-agent-mode.md](09-agent-mode.md) | `/solutions/agent-mode` | Everyone: the full tour of Agent mode | new |

Plus the hub page **`/solutions`** (today `SolutionsPortal`): rebuild it as a grid of the 9 cards above, in two groups "By role" and "By product", same order as the header menu.

### What happens to the old URLs (nothing is deleted)

| Old URL | What happens |
|---|---|
| `/solutions/for-students` | Same URL, new page (01) |
| `/solutions/for-teachers` | Same URL, new page (02) |
| `/solutions/for-colleges` | Permanent redirect (301) to `/solutions/for-students` |
| `/solutions/for-schools` | 301 to `/solutions/for-teachers` |
| `/solutions/for-jr-colleges` | 301 to `/solutions/for-teachers` |
| `/solutions/for-coaching` | 301 to `/solutions/for-teachers` |
| `/solutions/for-engineering` | 301 to `/solutions/for-developers` |
| `/solutions/for-admins` | 301 to `/solutions/for-teams` |

How:
- Add the redirects to `redirects()` in `next.config.ts` (`permanent: true`).
- Keep the old slugs in `generateStaticParams` in `app/solutions/[slug]/page.tsx`, and add the new ones.
- **Do not delete** the old Sanity `solutionPage` documents or the old page components (`StructuredContentPage`, `lib/solution-content.ts`, `components/solutions/roles/TeachersRolePage.tsx`). Following the owner's "replace, never delete" rule, copy anything we replace into a legacy folder first.
- `next.config.ts` also has old redirects that point to `/solutions/industries/*` and `/solutions/roles/*`. No route matches those paths (only `/solutions/[slug]` exists), so re-point them:
  - `/solutions/roles/students` → `/solutions/for-students`
  - `/solutions/roles/teachers` → `/solutions/for-teachers`
  - `/solutions/roles/institutes` → `/solutions/for-teams`
  - `/solutions/industries/school`, `/college`, `/junior-college`, `/coaching` → `/solutions/for-teachers` (except `college` → `/solutions/for-students`)
  - `/solutions/industries/engineering` → `/solutions/for-developers`
- `components/layout/Navbar.tsx` line ~129 maps "For Institutes" to `/solutions/for-admins`. Point it to `/solutions/for-teams`.

---

## 2. Header "Solutions" menu (proposed)

This replaces the two ERP columns in `components/layout/Navbar.tsx` (~lines 222–239). Use the same mega-menu component and icons from `lucide-react`.

**By role**
| Label | Link | One line |
|---|---|---|
| For Students | `/solutions/for-students` | Notes, flashcards and exam plans |
| For Teachers | `/solutions/for-teachers` | Lesson plans, worksheets, Google Classroom |
| For Developers | `/solutions/for-developers` | Code in your browser, ship by pull request |
| For Teams | `/solutions/for-teams` | Email, calendar, proposals and team chats |
| For Creators | `/solutions/for-creators` | Content plans, captions and posts |
| Research & Data | `/solutions/for-research` | Cited answers, clean data, charts |

**By product**
| Label | Link | One line |
|---|---|---|
| Agent mode | `/solutions/agent-mode` | One agent for your everyday work |
| Project Mode | `/solutions/for-developers` | AI code editor with GitHub pull requests |
| Grids | `/solutions/grids` | Chats, groups, polls and shared AI chats |
| Call on WhatsApp | `/solutions/whatsapp-calls` | Call the agent, get results on WhatsApp |
| Plugins | `/plugins` | 21 apps the agent can work in |

Menu footer link: "All solutions" → `/solutions`.

---

## 3. Shared page layout (same for every page)

Built only from the existing agent sections. Pure white background in light mode (`bg-background`), pure black in dark mode (`dark:bg-black`). Big medium-weight headings (`font-medium tracking-[-0.03em]`, 44–78px). **No breadcrumb** on any Solutions page (same as `/plugins`). Don't add `RouteBreadcrumb` and don't add a BreadcrumbList JSON-LD trail.

| # | Section | Built from | Notes |
|---|---|---|---|
| 1 | **Hero** | `AgentHeroSection` (silk periwinkle background, logo, H1, one line, 2 pill buttons) | New `SolutionHero` that takes props: small eyebrow label (e.g. "For students"), headline, one line, buttons. Drop the "Powered by leading AI models" logo strip, except on 09 Agent mode. |
| 2 | **Interactive demo** | `AgentRealWorkSection` layout (gradient panel + glass chat card + floating white card) and `ViewPlatformPreview` (app frame) | New `SolutionDemo`. Row of 2–4 task chips above the panel. Clicking a chip plays a **scripted** demo: the user message types in, step lines appear one by one ("Worked for 48s ›"), the result fades in, then the floating card pops in. No real AI call. Respect `prefers-reduced-motion` (show the end state). Each page file says exactly what plays. |
| 3 | **Feature blocks (3–4)** | Text on one side (4 cols), gradient panel with a glass mock card plus a floating white card (8 cols). Sides alternate like `AgentRealWorkSection` (text left), `AgentSchedulesSection` (text right) and `AgentPluginsSection` (text left, teal panel). | New `SolutionFeatureBlock` with a `mock` key that picks a coded mock card. Panel gradients: grey `from-[#d4d4d8] via-[#5e9fe0] to-[#93a9f6]` (dark `from-[#27272a] via-[#1b3d78] to-[#363d8c]`) and teal `from-[#4fc1b0] via-[#5e9fe0] to-[#93a9f6]` (dark `from-[#0d4f49] via-[#1b3d78] to-[#363d8c]`). Alternate them. A real screenshot can replace the mock when one is uploaded in Sanity. |
| 4 | **Grids block** (role pages only) | Same as a feature block, using the shared `ShareGridMock` / `GroupPollMock` | Shows how Grids fits this user (study group, class group, team group, collaborators). |
| 5 | **Plugins strip** | `AgentPluginsSection` look (white rounded tiles with logo + name) | Only the plugins named in the page file. Each tile shows a one-line "what it can do" taken from the real operations (see section 6). Link "See all plugins" → `/plugins`. |
| 6 | **Example tasks grid** | Small rounded cards, 2 columns on phone, 4 on desktop | 6–8 prompts. Use the app's exact wording where it exists. Click opens `https://chat.classgrid.in`, and a copy icon copies the prompt. Don't promise the prompt is pre-filled (no pre-fill link exists). |
| 7 | **FAQ** | `AgentFaqSection` (same accordion) | New `SolutionFaqSection` that takes a `faqs` prop. **Don't copy the home FAQ answers**: they contain a price line and an ERP line. |
| 8 | **Closing CTA** | `AgentFinalCtaSection` | Takes heading, text and buttons as props. Default: "Start working with Classgrid AI" / "Sign up with your email and give the agent its first task." |

Rules for the coded mocks:
- Copy the glass card classes exactly: `bg-white/60 ring-1 ring-white/60 backdrop-blur-xl dark:bg-black/45 dark:ring-white/10`. Floating cards: `bg-white shadow-xl ring-1 ring-black/5 dark:bg-[#0f0f0f] dark:ring-white/10`.
- Use `Reveal` for the entrance, as the agent sections do.
- Use real labels from the app (quoted in each page file) and plugin logos from `content/plugins.ts` / Sanity.
- No stock photos, no new fonts, no new colours.
- **Don't reuse the `AgentSchedulesSection` mock text** ("Weekly attendance summary", the attendance numbers). It is ERP-era, and it shows a computed summary, which schedules cannot make (see limits).

Shared mock cards (build once, used on several pages), in `components/sections/solutions/mocks/`:
`ChatCardMock` (user bubble + "Worked for …" + step lines + result), `CreatedFilesCard` (from AgentRealWorkSection), `WhatsAppBubbleCard` (from AgentSchedulesSection), `ScheduleCardMock`, `ShareGridMock`, `GroupPollMock`, `GroupChatMock`, `PlannerMock`, `CountdownMock`, `FlashcardMock`, `QuizCardMock`, `ChartMock`, `CitedAnswerMock`, `LiveCardsMock`, `EditorMock`, `ReviewChangesMock`, `PullRequestCard`, `PhoneCallMock`, `ComparisonTable`.

---

## 4. Where the content lives

### Sanity: extend the existing `solutionPage` type

`sanity/schemaTypes/solutionPageType.ts` already has `slug`, `category`, `label`, `headline`, `subtitle`, `heroImage`, `faqs` and `seo`. Keep every old field so the old documents still open. Add:

| New field | Type | Used for |
|---|---|---|
| `layoutVersion` | string `v1` / `v2` (default `v1`) | The new template reads Sanity only when this is `v2`. Until then it shows the code fallback, so the old ERP text in `for-students` / `for-teachers` never appears on the new design. |
| `category` | add the value `product` to the list (keep `industry`, `role`) | menu grouping |
| `heroButtons[]` | `{ label: localeString, href: string, style: 'primary' \| 'secondary' }` | hero |
| `demo` | `{ heading: localeString, tabs[]: { chip, userMessage, attachment, workedFor, steps[], resultLines[], card: { kind, title, subtitle, lines[] } } }` | interactive demo script |
| `featureBlocks[]` | `{ heading: localeString, text: localeText, mock: string (mock key), gradient: 'grey' \| 'teal', side: 'left' \| 'right', imageLight: image, imageDark: image, imageAlt: string }` | feature blocks |
| `gridsBlock` | same shape as one feature block | the Grids block on role pages |
| `pluginNames[]` | string (must match a plugin `name` in the Sanity Plugins Page) | plugins strip |
| `pluginNotes[]` | `{ pluginName: string, line: localeString }` | the one-line "what it can do" |
| `exampleTasks[]` | `{ prompt: localeString, tag: string }` | example tasks grid |
| `comparison` | `{ heading, asOf: date, columns[]: string, rows[]: { label, cells[]: { text, verify: boolean } }, sources[]: { label, url, thirdParty: boolean } }` | only on `whatsapp-calls` |
| `cta` | `{ heading: localeString, text: localeText }` | closing CTA |

Text fields use the same `localeString` / `localeText` types as today, so `scripts/translate-solutions.mjs` keeps working. Read `.en` first, then fall back, as `generateMetadata` already does.

### GROQ query (one per slug)

Add `solutionLandingBySlugQuery` to `sanity/lib/queries.ts` and `getSolutionLanding(slug)` to `sanity/lib/marketing.ts` (same `safeFetch` + `disableInMemoryCache` as `getSolutionPage`):

```groq
*[_type == "solutionPage" && slug.current == $slug][0]{
  "slug": slug.current,
  layoutVersion,
  category,
  label,
  headline,
  subtitle,
  heroButtons[]{ label, href, style },
  demo{ heading, tabs[]{ _key, chip, userMessage, attachment, workedFor, steps, resultLines, card } },
  featureBlocks[]{
    _key, heading, text, mock, gradient, side, imageAlt,
    "imageLight": imageLight.asset->url,
    "imageDark": imageDark.asset->url
  },
  gridsBlock{
    heading, text, mock, gradient, side, imageAlt,
    "imageLight": imageLight.asset->url,
    "imageDark": imageDark.asset->url
  },
  pluginNames,
  pluginNotes[]{ pluginName, line },
  exampleTasks[]{ _key, prompt, tag },
  comparison{ heading, asOf, columns, rows[]{ label, cells[]{ text, verify } }, sources[]{ label, url, thirdParty } },
  faqs[]{ question, answer },
  cta{ heading, text },
  seo{ metaTitle, metaDescription }
}
```

Plugin logos: call the existing `getPluginsPage()` (`pluginsPageQuery`) and keep only the plugins whose `name` is in `pluginNames`, in that order. If the Plugins Page has no plugins, fall back to `content/plugins.ts` (`PLUGINS`), matched by name.

### Fallback text in code

- `content/solutions/<slug>.ts` (one file per page) holds the full page in the same shape as the query result: the text written in each plan file.
- `content/solutions/index.ts` exports `SOLUTION_PAGES: Record<slug, SolutionLandingContent>`.
- Merge rule: when `layoutVersion === 'v2'`, each Sanity field wins **if it is not empty**. Otherwise the code fallback is used for that field.
- `app/solutions/[slug]/page.tsx`: if the slug is in `SOLUTION_PAGES`, render the new `SolutionLandingPage` template. Old slugs are redirected before they reach it.

---

## 5. Rules for every page

1. Only claim what the research verified. Each page has its own "Do not claim" list, plus the master list in section 6.
2. **No pricing numbers at all**: no free-token amounts, top-up amounts, credits per ₹, token limits, Fable unlock amounts, or image/WhatsApp/call counts. "Free to start, top up when you need" is the most we say.
3. Never mention internal staff dashboards or any staff-only tool.
4. ERP is stopped for good. No admissions, fees, attendance, timetables, "Classgrid Classroom", WhatsApp broadcasts to parents, or "for institutions" selling. Don't show the `attendance` or `timetable` answer blocks.
5. **AI WhatsApp number: +91 81492 77038** (owner confirmed). It's a **WhatsApp** number for WhatsApp calls and chat, not a phone line. Never show any other number as the AI number.
6. Easy, everyday English. Short, punchy headlines. No hard words.
7. Show full email addresses in mocks (e.g. `riya@example.com`), never shortened names. Use made-up names and `example.com` addresses only.
8. Buttons: primary "Use Agent" → `https://chat.classgrid.in`, secondary "Book a demo" → `/demo` (page files list any changes).
9. Competitor names appear only on 08 WhatsApp calls, as text (no logos), with a date ("As of October 2026") and sources.

### Images: rules for every screenshot

- Capture from the real chat.classgrid.in on a **test account**. Use made-up names and `example.com` emails wherever we can type them.
- Capture **both light and dark mode**, 16:10, at 2x (2880×1800 or larger), browser frame cropped off.
- Always blur: real people's emails, phone numbers, avatars and names; WhatsApp numbers; API keys and env values; GitHub usernames other than the test one; the sidebar chat history if it shows real chats.
- Never screenshot: schedule "Recommended" / "Integrations" cards (ERP wording), staff-only screens, any price or credit number (Upgrade page, token counters, "Call N of 50").
- Upload to Sanity on the feature block (`imageLight`, `imageDark`). The coded mock shows until both are uploaded.

---

## 6. Known limits: master "do not claim" list

Merged from all 4 research files. Page files repeat the ones that matter for them.

### Agent mode
- **Schedules do not re-run the AI.** At the set time they send the email subject/body (and optional WhatsApp text) that was written when the schedule was made. Don't say "fresh daily summaries", "daily briefs", "weekly reports" or "monitor for updates" (the app's own line "Schedule a daily summary for you." and the Schedule page subtitle overstate this).
- Schedules go only to **you** (your email, your WhatsApp). They can't message other people or post into Grids.
- Schedules: once, daily, weekly or chosen weekdays, for up to 90 days. Don't say "forever".
- Schedule "Recommended" / "Integrations" cards are ERP-era. Don't use or screenshot them.
- `@` menu: **"Deep research" and "Sketch" have no backend.** There is no deep research mode and no drawing canvas. "Web search" works only because search is always on.
- Starter cards and the capability strip are not shown in the app. Don't screenshot or quote them as on-screen.
- Tools with no handler: `update_skill`, `update_ai_preferences`, `search_syllabus_vectors`, `read_local_file`. `edit_image` is switched off. **No image editing.**
- "Default AI Skills" toggles are only prompt text, and some are ERP-era. Don't claim they change behaviour.
- `agent@classgrid.in` is **one shared mailbox**, not a personal address per user. Only email from your **registered** address starts or updates a task. Email-started tasks are created as Project Mode projects.
- Publishing to `<name>.sites.classgrid.in` works in **Agent mode only** (not Project Mode, not WhatsApp tasks). A site name belongs to whoever publishes it first.
- Long tasks stop after **48 hours**. After 5 runs with no progress they wait for the user.
- Internal tools (database queries, server logs, tickets, CRM, knowledge base) are staff-only. ERP stats tools are ERP. Never mention them.
- Upload size: the app's text disagrees with itself. **Don't state a size.** "Up to 6 files per message" is fine.
- Never quote limits for images, WhatsApp messages per week, Fable access or calls.

### Plugins (what they really do; the AI Hub's own demo prompts overclaim)
| Plugin | Real operations | Don't claim |
|---|---|---|
| Gmail | list, search and read emails, read attachments, list sent, mark as read, send | inbox organising, auto-replies, labels, delete, drafts folder |
| Google Calendar | list events, create events (optionally with a Meet link) | move, cancel or edit events |
| Google Drive | list/search files, read a file, upload a file, create a folder | edit Docs/Sheets in place, sharing permissions |
| Google Classroom | list courses, assignments, coursework, submissions, teachers, announcements, topics, materials; read class files; create assignments; create announcements | grading, returning work, editing or deleting posts |
| Google Forms | read a form, list responses, create a form (text and multiple-choice questions) | quiz grading settings, editing an existing form |
| Google Meet | create a Calendar event with a Meet link | transcripts, summaries, recordings |
| Microsoft Outlook | list, read and send emails, mark as read, list and create meetings | delete, move, rules |
| Microsoft Teams | list teams and channels, read/send channel messages, create a channel, read chats, send direct messages, read a meeting transcript | recordings |
| Zoom | list meetings, create a meeting | recordings, summaries, transcripts |
| Slack | list/search channels, read messages and threads, send messages, create/archive channels, search messages, list/search users, invite to channel, create/read/update canvases | — |
| Notion | search, read a page, create a page, update a page, add/read comments | databases as a full app |
| GitHub | list repos, read files, create/update files, push sandbox files, create repos, issues and comments, pull requests, code search, commits, branches | merging PRs, Actions/CI status |
| Vercel | list projects and deployments, read a deployment, create a project, add env variables, deploy a branch (preview or production) | **rollback, build logs**, domains |
| Supabase | list projects, run a SQL query, list storage buckets | creating projects, auth settings |
| Sanity CMS | query, create and update documents | publishing workflows |
| Canva | find, read and create (blank) designs, export (PDF, PNG, JPG, MP4, PPTX…), upload images, folders, comments, fill brand templates, resize, import | **editing or adding content inside a design** |
| YouTube | search videos, channel stats, read comments | uploading, editing videos |
| Spotify | search, playback control (needs Premium and an open device), playlists, library, top tracks | — |
| Facebook Pages | publish posts, list posts, messages, send a message, comments, reply, insights | scheduled posting, ads |
| Instagram Business | same as Facebook; **publishing needs an image** | Reels/stories, scheduled posting |
| WhatsApp Business | send a text from **the user's own** WhatsApp Business account (needs their Meta credentials) | — |
- Facebook and Instagram are not in the MCP scopes.
- "Automate inbox organization" and "Automate customer support replies" have nothing behind them.

### Project Mode
- **No live preview URL** for dev servers. Only Vercel previews (through the Vercel plugin).
- **No deploy button** in Project Mode, and no Classgrid Cloud (`sites.classgrid.in`) hosting there.
- Needs a GitHub account. The Classgrid GitHub app must be installed on each repo.
- Opens the **latest commit of the default branch** only. You can't pick a branch.
- The push modal shows a "main" badge, but it always pushes to a `classgrid/…` branch and opens a PR. Don't use the badge as proof of anything.
- "Accept all" only marks the answer as kept in the browser. It commits nothing.
- Review/Undo is lost after a fresh download (the code is removed 5 minutes after the editor closes).
- Limited capacity: shared boxes, so "Project Mode is busy right now" can happen. Background jobs and helpers have time limits, and files over 2 MB can't be opened by the agent. Don't promise "unlimited" or "always available", and don't quote machine sizes.
- Languages confirmed: **Python 3.13 and Node 20 / TypeScript** only (plus Chromium/Playwright). Don't claim Go, Rust or Java.
- Packages: npm auto-install only (scripts skipped).
- No extension marketplace.
- CI results (Actions/check runs) are not shown in the UI.
- "Never on our servers" really means: kept only on GitHub, with a temporary copy in your editor box while you work, removed after. Say it that way.
- The agent runs commands through `run_code`, not a raw terminal.

### Grids
- **No AI bot inside Grid groups** (no "@AI" reply). AI together = **Share Grid**.
- **No scheduled agent posts into Grids.** Only people can schedule Grid messages ("Schedule For").
- The agent reads only **recent** group history (last 1–2 hours, up to 50 messages). Don't say "summarise the whole group history".
- The agent must ask before reading 1:1 chats, and must show a draft and ask "Should I send this to the group?" before posting.
- Don't promise "always posts as you" in the app. Only MCP forces that.
- **Share Grid: max 4 people.** Incognito and Project Mode chats can't be shared. Emailed invites only work for that email. The AI answers one person at a time.
- Share "Email" button emails the transcript **to yourself only**.
- Not real: `/summarize`, suggested replies, notes, message approval, "Acknowledge", silent send, Chat Analytics. Agent announcements look like plain messages.
- Grid members must have Classgrid AI accounts. Grids don't connect to WhatsApp or other apps.
- File limits exist. Don't quote them.
- While in Agent view, Grids is one "Back" tap away in the sidebar.

### WhatsApp
- **Texting the WhatsApp number does not start a task.** New tasks start only from a **WhatsApp call** or an **email to agent@classgrid.in**. Texts reach the agent only while a task is open. Otherwise the help bot answers.
- Calls are **WhatsApp voice calls**, not phone calls. A normal phone call will not reach the AI. There is no call button inside chat.classgrid.in.
- The AI only answers calls you start. It never calls you or anyone else.
- **English only** (English voice). Don't claim Hindi or other languages.
- **Up to 15 minutes per call.** Don't quote the daily call count.
- Only a WhatsApp number verified on **exactly one** Classgrid account can call.
- During a call, if a live answer takes over ~90 seconds it is sent on WhatsApp instead.
- Calls and tasks use the user's AI credits. Never quote amounts.
- **Platform risk (for the owner, not for the page):** since 15 Jan 2026, WhatsApp Business terms ban "AI Providers" whose AI is the main function. EU/Italy got exceptions, but no India exception was found. Check this before heavy promotion of WhatsApp AI.
- Whether WhatsApp texts get AI replies or only the fixed help-bot reply depends on a server switch whose live value is unknown. Test before publishing the chat claims.

### MCP
- The MCP server is **off unless a server flag is on**. Over MCP, code running, image making and WhatsApp are blocked. ChatGPT is only an MCP client (no ChatGPT app UI). **Don't put MCP on any page until the owner confirms it is switched on in production.** Each page that could mention it marks it "hold".

### Accounts
- No team workspaces, seats, admin roles or SSO. Each person has their own account. Sharing = Share Grid, Grids groups and share links.

---

## 7. Open questions for the owner (before publishing)

1. MCP: is it switched on in production? (If yes, add the "Use Classgrid from Claude, Cursor or ChatGPT" blocks marked "hold".)
2. WhatsApp terms risk (section 6). OK to promote WhatsApp calls heavily?
3. Comparison table on 08: OK to name Grok, ChatGPT, Meta and Perplexity? All third-party facts must be checked on official pages first.
4. YouTube video summaries use a downloader inside the sandbox. Test that it works from our servers before showing it (05, 01).

---

## 8. Source files

Platform repo `C:\CLASSGRIDPLATFORM\classgrid_platoform-desktop-` (read only):
- Chat UI, `@` menu, answer blocks, plugin list: `client/src/components/ai/components/AskAiPanel.tsx` (`INTEGRATIONS_LIST`)
- Plugin demo prompts: `client/src/components/ai/components/AiHubModal.tsx` (`getDemoMessages`)
- Home greeting lines (example prompts): `client/src/components/ai/components/AgentHomeExtras.tsx`
- Answer blocks: `AiChartRenderer.tsx`, `MermaidViewer.tsx`, `ApprovalCard.tsx`, `StudyBlocks.tsx`, `LiveCards.tsx`, `ClockBlock.tsx`, `ReviewBlocks.tsx`, `PointsBlocks.tsx`, `WidgetBlock.tsx`
- Models: `client/src/components/ai/components/ModelPicker.tsx`
- Incognito: `IncognitoMode.tsx` · Library: `LibraryPage.tsx` · Skills: `skills/AiSkillsPanel.tsx`
- Schedules: `client/src/components/ai/components/SchedulePage.tsx`, `server/src/workers/ai-schedule.worker.js`
- Agent tools: `server/src/services/ai-tool-groups.js`, `server/src/mcp/tools.js`, `server/src/controllers/ai-chat.controller.js`
- Sandbox: `server/agent-sandbox-env/Dockerfile`
- Long tasks and email agent: `server/src/services/agent-task.service.js`, `server/src/services/agent-mail.service.js`
- WhatsApp calls: `server/src/services/whatsapp-call.service.js`, `server/src/routes/whatsapp.routes.js`
- Project Mode: `client/src/features/superadmin/pages/ProjectModePage.tsx` (route `/c/project`), `server/src/services/ide-project.service.js`, `server/src/routes/ide.routes.js`, `server/src/services/github-app.service.js`, `client/src/components/ai/components/stepper/ProjectToolSteps.tsx`, `infra/ide/`
- Grids: `client/src/features/chat/pages/ChatPage.tsx`, `client/src/features/chat/components/*`, `server/src/routes/thread_chat.routes.js`, `group_chat.routes.js`, `org_chat.routes.js`
- Share Grid: `client/src/components/ai/components/share-grid/ShareGridPanel.tsx`, `GridJoinPage.tsx`, `server/src/routes/ai-grid.routes.js`, `server/src/services/ai-chat-grid.service.js`
- Share links: `client/src/components/ai/components/AgentSidebar.tsx`, `client/src/features/shared/pages/SharedChatPage.tsx`
- MCP: `server/src/mcp/mcp-server.js`, `server/src/mcp/mcp-scopes.js`, `mcp-guards.js`

Marketing repo (this repo):
- Design: `components/sections/agent/*.tsx`, `components/sections/ViewPlatformPreview.tsx`, `components/sections/Reveal.tsx`
- Plugins: `content/plugins.ts`, `sanity/schemaTypes/pluginsPageType.ts`, `pluginsPageQuery` in `sanity/lib/queries.ts`
- Solutions today: `app/solutions/page.tsx`, `app/solutions/[slug]/page.tsx`, `components/solutions/SolutionsPortal.tsx`, `sanity/schemaTypes/solutionPageType.ts`, `solutionPageBySlugQuery`, `next.config.ts` (redirects), `components/layout/Navbar.tsx` (menu)
- WhatsApp link helper: `lib/contact/whatsapp-click.ts`
