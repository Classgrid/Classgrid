# Product page: Call Classgrid AI on WhatsApp

- **URL:** `/solutions/whatsapp-calls` (new)
- **Replaces:** nothing (new page). Linked from 04 (teams) and 09 (agent mode).
- **Who it's for:** anyone in India who wants to give the agent work by voice: on the move, while driving (hands-free), or when typing is slow
- **Goal:** sign up, verify a WhatsApp number, and make the first call
- **Sanity:** `solutionPage` slug `whatsapp-calls`, `category: product`, label "WhatsApp calls"
- **The number: +91 81492 77038** (owner confirmed). It's a **WhatsApp** number. Show it as "+91 81492 77038" and link it with `https://wa.me/918149277038` (reuse `lib/contact/whatsapp-click.ts`). Never show any other number as the AI number.

---

## Hero

- **Eyebrow:** WhatsApp calls
- **Headline:** Call your AI agent on WhatsApp
- **One line:** Say what you need, hang up, and get the result on WhatsApp.
- **Number line under the text:** "WhatsApp call **+91 81492 77038**" (with the WhatsApp logo)
- **Buttons:** "Open in WhatsApp" → `https://wa.me/918149277038` · "Set up first" → `https://chat.classgrid.in`
- **Small print under the buttons:** "WhatsApp voice calls only. A normal phone call won't reach the AI."

---

## How to start (3 steps strip, right under the hero)

1. **Sign up** at chat.classgrid.in with your email.
2. **Verify your WhatsApp number.** The 6-digit code comes to you on WhatsApp (valid for 10 minutes).
3. **Save +91 81492 77038** and tap the **WhatsApp call** button.

Under it: "Your WhatsApp number must be verified on one Classgrid account."

---

## Interactive demo (custom design)

A `PhoneCallMock` (phone frame) on the teal panel, next to a `WhatsAppBubbleCard` thread. Four chips: **Call to PDF** · **Morning plan** · **Send an email** · **Fix my website**.

Each chip plays 3 stages: **On the call** → **Hang up** → **On WhatsApp**.

**Chip 1: Call to PDF** (plays first)
- Stage 1, call screen: "Classgrid AI · WhatsApp voice call · 01:42", a moving voice wave, captions:
  - AI (exact greeting): "Hi Aditi, this is Classgrid AI. What can I do for you?"
  - User: "Make a one-page PDF plan for a 3-day trip to Goa and send it to me here."
- Stage 2: red hang-up button pressed, screen fades.
- Stage 3, WhatsApp thread (Classgrid AI):
  - "Got it. Classgrid AI is working on it now. I'll send you the result here when it's done."
  - (a few seconds later) a PDF file bubble `goa-3-day-plan.pdf · 1 page`
  - "✅ *Task completed.*" + link `chat.classgrid.in/…`
- **Don't show** the "(Call N of 50 …)" line. No counts on the page.

**Chip 2: Morning plan**
- User on the call: "What's on my calendar today?"
- AI answers live (caption): "You have 3 things today: stand-up at 10, lunch with Arjun at 1, and a client call at 4."
- After hang-up, WhatsApp: "📞 *Your call with Classgrid AI*" + a 2–3 line recap.

**Chip 3: Send an email** (research idea 1)
- User: "Email Mr. Rao that the quote is approved."
- Stage 3, WhatsApp: "Got it…" then "✅ *Task completed.* Sent from your Gmail to rao@example.com." Floating Gmail card "Sent".

**Chip 4: Fix my website**
- User: "Fix the contact form on my site."
- Stage 3: "Got it. Classgrid AI is working on it now in your project "my-site". I'll send you the result here when it's done." → "✅ *Task completed.*" + "Pull request opened" card (links to Project Mode, see 03).

---

## Feature blocks

### 1. Talk, don't type
- **Text:** Call the number on WhatsApp and just say what you need. You can interrupt any time. Ask a quick question and get the answer on the call, using your connected apps.
- **Facts:** WhatsApp voice call (Meta WhatsApp Business Calling API); speech-to-text + spoken voice; caller can interrupt; `ask_classgrid` runs the full agent live with your connected apps; if an answer takes over ~90 seconds it comes on WhatsApp instead; **English only**; **up to 15 minutes per call**.
- **Mock:** text left, grey panel. `PhoneCallMock` with live captions. Floating card "Answered on the call · Google Calendar" with 3 events.

### 2. Hang up. It keeps working.
- **Text:** Everything you asked for becomes one job. The agent does it in a new chat and sends the result to your WhatsApp: text, links and real files like PDFs. Coding work goes to your Project Mode project.
- **Facts:** `start_task` saves jobs during the call; after the call one background job runs as you in a new Agent chat (coding → Project Mode); "Got it…" then result + chat link; PDFs as real files; survives server restarts; stops after 48 hours.
- **Mock:** text right, teal panel. `WhatsAppBubbleCard` thread with "Got it…", PDF bubble and "✅ *Task completed.*". Floating card: the chat on chat.classgrid.in with the same task.

### 3. Add more after the call
- **Text:** Forgot something? Send a photo, a PDF or a few more details on WhatsApp while the task is running, and the agent adds it to the job. You can also email agent@classgrid.in.
- **Facts:** texts and files sent during/after the call go to the running task (a quick "got it" reply); email from your sign-up address also works. **A plain text with no open task does not start a new task.**
- **Mock:** text left, grey panel. WhatsApp thread: user sends a photo of a receipt + "Add this too" → "Got it, added to your task."

### 4. Works with your apps
- **Text:** Connect Gmail, Calendar, Drive, Notion, GitHub or Vercel once, and use them by voice: send an email, check your day, find a file or fix your site.
- **Facts:** during the call the agent has your connected apps (Gmail, Calendar, Drive, Notion, GitHub, Vercel are named in the call code).
- **Mock:** teal panel. Glass card with 6 plugin tiles. Floating "Sent from your Gmail" card.

---

## Comparison section: "How it compares" (as of October 2026)

Heading: **Other AI agents vs Classgrid AI on WhatsApp**
Sub-line: "Based on public information as of October 2026. Features change often."

Build with `ComparisonTable` (Sanity `comparison` field). Text names only, **no competitor logos**. Each cell marked ⚠ is from a third-party source or is not verified: **verify on the official page before publishing**, or drop the cell to "Not verified".

| | **Classgrid AI** | **Grok Bot (xAI)** | **ChatGPT (1-800-ChatGPT, Dots)** | **Meta AI / Muse** | **Perplexity** |
|---|---|---|---|---|---|
| **Can you call the AI?** | Yes, a WhatsApp call to +91 81492 77038 | No. It can place calls *to* people and businesses for you [G2] | 1-800-ChatGPT phone line, US/Canada only [O1]; current status ⚠ not verified. Dots: no calling ⚠ [O5] | Meta AI has an in-app voice chat in WhatsApp (beta) [M5]; you can't phone Muse | No phone line found |
| **Chat on WhatsApp** | Yes, for verified users (adds to a running task) | No official Grok WhatsApp number ⚠ [G3] | Cut off 15 Jan 2026 [O2]; back in Europe (EEA) only since Jul 2026 [O3]; Dots: no ⚠ [O5] | Meta AI: yes. Muse inside WhatsApp in US/Canada ⚠ (third-party, not verified) | Ended 15 Jan 2026 [P1] |
| **Keeps working after you hang up / close the app** | Yes, results sent to WhatsApp | Yes, agent on a cloud computer ⚠ [G1] | Dots: yes, always-on background agents [O4] (not started by a call) | Muse: yes, US only [M3] | No |
| **Results back on WhatsApp** | Yes, including PDFs as files | No | No | Not verified | No |
| **Connected apps** | Gmail, Drive, Calendar, Notion, GitHub, Vercel and more | Gmail, Google Calendar, Drive, Outlook, Teams ⚠ [G1] | Dots: 4,000+ apps [O6] | Email, calendar [M2] | Not verified |
| **Available in India** | Yes | Not verified | Phone line: no. WhatsApp: no. Dots: not verified | Meta AI: yes. Muse: no (India excluded) [M3] | No (WhatsApp bot ended) |

Footnote under the table (small text):
- "Classgrid AI calls are WhatsApp voice calls in English, up to 15 minutes each."
- "Grok, ChatGPT, Dots, Meta AI, Muse and Perplexity are trademarks of their owners. We are not connected to them."

### Sources (show as a "Sources" list under the table; keep the codes)

| Code | Fact | Source | Type |
|---|---|---|---|
| G1 | Grok Bot agent beta (Aug 2026), cloud computer, Gmail/Calendar/Drive/Outlook/Teams, schedules | https://www.vellum.ai/blog/official-grok-bot-breakdown | ⚠ third-party, verify |
| G2 | Grok Bot places phone calls to businesses/people (25 Oct 2026) | https://x.com/elonmusk/status/2114365361068138990 · https://teslanorth.com/2026/10/25/grok-bot-phone-calls-elon-musk/ | X post + news; plans/countries not disclosed |
| G3 | No official Grok WhatsApp number (27 Sep 2026) | https://blueticks.co/blog/grok-whatsapp | ⚠ third-party, verify |
| — | Grok Telegram bot for Telegram Premium | https://www.layer3labs.io/guides/what-is-grok-bot | ⚠ third-party, **not verified: don't use** |
| O1 | 1-800-ChatGPT phone line, US/Canada, launched 18 Dec 2024 | https://www.axios.com/2024/12/18/chatgpt-phone-call-whatsapp-message | News; current status ⚠ not verified |
| O2 | ChatGPT on WhatsApp stopped 15 Jan 2026 | https://engadget.com/ai/chatgpt-in-whatsapp-will-stop-working-in-january-161335173.html | News |
| O3 | ChatGPT back on WhatsApp in Europe (EEA) only, 13 Jul 2026 | https://the-decoder.com/chatgpt-returns-to-whatsapp-in-europe-after-eu-forces-meta-to-open-the-door-to-rival-ai-bots/ | News |
| O4 | OpenAI Dots launched 29 Sep 2026, always-on background agents | https://techcrunch.com/2026/09/29/openai-launches-dots-its-bubbly-agentic-avatar/ | News |
| O5 | Dots: no WhatsApp, no calling | https://www.tryagentsonic.com/articles/openai-dots-whatsapp | ⚠ third-party, verify |
| O6 | Dots: own cloud computer, 4,000+ apps | https://thenextweb.com/news/openai-dots-always-on-ai-agents-cloud-computers-devday | News |
| O7 | Dots channels: ChatGPT, Slack, Teams; iMessage/RCS waitlist | https://www.techmeme.com/260929/p35 | ⚠ aggregator, verify |
| M1 | Muse Spark model (8 Apr 2026) | https://about.fb.com/news/2026/04/introducing-muse-spark/ | Official |
| M2 | Muse Spark 1.1 adds email, calendar, recurring tasks to Meta AI app (28 Jul 2026) | https://techeconomy.ng/meta-ai-grows-hands-muse-spark-1-1-turns-chatbot-into-an-agent | ⚠ third-party, verify |
| M3 | Muse agent app (8 Sep 2026), US only, India excluded | https://www.medianama.com/2026/09/223-meta-muse-personal-ai-agent-india/ | News |
| M4 | Muse places calls to US businesses (16 Sep 2026); some made by human contractors, rolled back | https://techcrunch.com/2026/09/17/rival-ai-agents-instinct-and-metas-muse-both-add-the-ability-to-make-calls/ · https://www.technology.org/2026/09/23/meta-muse-human-concierge-ai-phone-calls/ | News |
| M5 | Meta AI voice chats inside WhatsApp (beta, Feb 2026), in-app, not a phone call | https://green-api.com/en/blog/2026/whatsapp-is-rolling-out-voice-chats-powered-by-meta-ai/ | ⚠ third-party, verify |
| P1 | Perplexity (and ChatGPT) WhatsApp bots cut off 15 Jan 2026 | https://gulfnews.com/technology/no-more-chatgpt-and-perplexity-on-whatsapp-meta-bans-major-ai-chatbots-from-2026-1.500316016 | News |
| — | Classgrid call facts | Platform code: `server/src/services/whatsapp-call.service.js`, `agent-task.service.js` | Our code |
| — | WhatsApp Business Calling API | https://developers.facebook.com/docs/whatsapp/cloud-api/calling/ | Official (Meta) |

Rules for this section:
- **Don't put competitor prices on the page** (even though the research has them). Keep the page price-free.
- Don't say anything negative beyond the facts in the table. No "better than" headline. The heading only says "How it compares".
- Re-check every cell on the day of publishing and update `asOf`.

---

## Plugins strip

| Plugin | One line (by voice) |
|---|---|
| Gmail | "Email Mr. Rao that the quote is approved." |
| Google Calendar | "What's on my calendar today?" (see and add events) |
| Google Drive | "Find last week's invoice in my Drive." |
| Notion | Save notes from your call to a page |
| GitHub | "Fix the contact form on my site." (opens a pull request) |
| Vercel | Deploy your site's branch as a preview |

Link: "See all plugins" → `/plugins`.

---

## Example tasks grid

From the research ideas for this page (exact wording where quoted):
- "Email Mr. Rao that the quote is approved."
- "What's on my calendar today?"
- "Find last week's invoice in my Drive."
- "Fix the contact form on my site."
- "Make a one-page PDF of what I just told you and send it here." *(new; research idea "turn a call into a document")*
- "Write a short report on our three biggest customers and send me the PDF." *(new; same idea; test it on a real call before publishing)*

---

## FAQ

1. **Is this a normal phone call?** No. It's a WhatsApp voice call to +91 81492 77038. A normal phone call won't reach the AI.
2. **Who can call?** Anyone with a Classgrid AI account whose WhatsApp number is verified. The number must be on only one account.
3. **What language does it speak?** English.
4. **How long can a call be?** Up to 15 minutes. The agent keeps working on your task after you hang up.
5. **Can I just text the number instead?** Texts add details to a task that's already running. To start a new task, call the number or email agent@classgrid.in.
6. **Does it cost extra?** Calls and tasks use your Classgrid AI credits. It's free to start, and you top up when you need.

---

## Images to capture

From a **real phone** (WhatsApp light and dark theme), test account only:
1. **WhatsApp call screen** to Classgrid AI (the number visible is fine; it's ours).
2. **WhatsApp thread** with "Got it. Classgrid AI is working on it now…", a PDF file bubble, and "✅ *Task completed.*" + chat link. Crop out or blur the "(Call N of 50 …)" line.
3. **"📞 *Your call with Classgrid AI*"** recap message.
From chat.classgrid.in (light + dark):
4. **Verify WhatsApp** screen (blur the user's number).
5. **The chat that the call created**, showing the finished task.
- Blur: the caller's own number, name and profile photo, and any email address that isn't `example.com`.

## Custom design needed (coded mocks)

- `PhoneCallMock` (WhatsApp-style call screen, timer, voice wave, live captions, hang-up button), `WhatsAppBubbleCard` thread (copy from `AgentSchedulesSection`, add file bubble and link preview), 3-step setup strip, `ComparisonTable` (sticky first column on phone, horizontal scroll inside the table only, ⚠ markers shown only in Studio/preview, not on the live page) + Sources list, Gmail "Sent" card, "Pull request opened" card.

## SEO

- **Title:** Call Classgrid AI on WhatsApp | AI agent you can call
- **Description:** WhatsApp-call Classgrid AI on +91 81492 77038, say what you need, hang up, and get the result on WhatsApp: emails sent, PDFs made, sites fixed.

## Do not claim (this page)

- A normal phone line, toll-free number or SMS. A call button inside chat.classgrid.in.
- The AI calling you or calling businesses. It only answers calls you make.
- Hindi or any language other than English.
- Calls longer than 15 minutes. How many calls a day (don't quote the count).
- That texting the number starts a task. Only a call or an email to agent@classgrid.in does.
- Unverified numbers, or numbers used on more than one account, being able to call.
- Moving or cancelling calendar events by voice (Calendar can only list and create).
- Publishing a site to `sites.classgrid.in` from a call (WhatsApp tasks can't use it).
- Any price, credit or limit number, for us or for competitors.
- Worldwide availability. Say "made for India".

---

## What WhatsApp calls can do, in plain English

With Classgrid AI you can give work to your AI agent just by talking to it on a WhatsApp call. You
do not need to open the app or type anything. You call the Classgrid number, +91 81492 77038, on
WhatsApp, say what you need in your own words, hang up, and the agent does the work and sends you
the result on WhatsApp. It is like calling a smart assistant who then goes away and gets the job
done for you.

Getting ready takes a minute and you only do it once. You sign up on chat.classgrid.in with your
email, then verify your WhatsApp number in the app with a six-digit code that arrives on WhatsApp.
After that, your number is linked to your account and the AI knows it is you whenever you call.

When you call, the AI picks up and greets you by your first name: "Hi, this is Classgrid AI. What
can I do for you?" You talk normally, like on any phone call. You can interrupt it at any time and
it will stop and listen. It speaks in English. Each call can last up to fifteen minutes, which is
plenty of time to explain a few jobs.

While you are on the call, the AI can answer you live. It can look things up, check your connected
apps like Gmail, Google Calendar, Google Drive, Notion or GitHub, and tell you the answer right
there on the call. If the answer takes a bit longer to find, it does not keep you waiting, it simply
sends the answer to you on WhatsApp a little later.

For bigger jobs, the AI notes down what you asked and starts working as soon as you hang up. It
sends you "Got it" on WhatsApp so you know it has your request. Then your agent does the work in the
background, with all its normal powers: searching the web, writing emails, making reports and
PDFs, building or fixing a website, and using your connected apps. Coding jobs go into Project Mode
by themselves. When it is done, you get the result on WhatsApp with a link to the full chat, and
files like PDFs arrive as real files you can open straight away.

You can add more after you hang up. If you forgot something, just send a WhatsApp message, a photo
or a document while the job is still running, and the agent will use it. You can also email extra
files to agent@classgrid.in. The agent can keep working on a job for up to two days, waiting for
your replies when it needs them.

This is useful in many everyday moments. You can call while driving and ask it to email a client
that the quote is approved. You can call in the morning to hear what is on your calendar today. You
can describe a report out loud, hang up, and get the finished PDF on WhatsApp. You can ask it to
find last week's invoice in your Drive. You can even ask it to fix the contact form on your website
while you are away from your laptop.

It is safe and personal. Only a verified WhatsApp number that belongs to one Classgrid account can
use the calls, so nobody else can talk to your agent. If an unknown number calls, it gets a message
explaining how to sign up and verify first. There is a fair daily limit on calls for each number,
and calls use your normal Classgrid AI credits.

A few things to know. It is a WhatsApp voice call, so a normal phone call to the number will not
reach the AI. It speaks in English. A WhatsApp text on its own does not start a new job; you start
a job by calling or by emailing agent@classgrid.in, and then your messages are added to that job.

How it compares: most big AI assistants cannot be called on WhatsApp in India today. Grok Bot can
make calls to other people for you but you cannot call it. OpenAI's Dots works inside ChatGPT,
Slack and Teams, not on WhatsApp or calls. Meta's Muse is only in the US. Classgrid AI lets you call
it on WhatsApp in India, and it does real work after the call and sends the results back to you.

In short: call +91 81492 77038 on WhatsApp, say what you need, hang up, and your Classgrid AI agent
gets it done and sends you the result on WhatsApp.
- **Owner risk note (not for the page):** WhatsApp Business terms since 15 Jan 2026 ban general-purpose AI chatbots as the main function (https://techcrunch.com/2025/10/18/whatssapp-changes-its-terms-to-bar-general-purpose-chatbots-from-its-platform/). EU/Italy got exceptions (https://storyboard18.com/brand-makers/meta-to-allow-rival-ai-chatbots-on-whatsapp-in-europe-for-12-months-amid-eu-probe-2-91405.htm); no India exception was found. Also test whether texts get AI replies or only the help-bot reply before publishing the "Chat on WhatsApp" row.
