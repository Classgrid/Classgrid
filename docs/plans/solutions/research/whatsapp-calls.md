# Research: WhatsApp calls to Classgrid AI + competitor comparison

Source: read-only code research (platform repo + marketing repo `server-ai/server.ts`, read only) and web search, 2026-10-27.

## ⚠ Which number is the AI on? (owner must confirm)

- **Code says the AI answers on +91 81492 77038.** The answering line is set by `WHATSAPP_PHONE_ID` (value not in repo). Every place that names the business number gives 81492 77038:
  - `server/src/controllers/ai-chat.controller.js:202` — "…comes FROM Classgrid's official Meta-verified business number +91 81492 77038"
  - `client/src/features/public-chat/pages/PublicChatLoginPage.tsx:1241` — `wa.me/918149277038`
  - marketing repo `lib/contact/whatsapp-click.ts:7` — `FALLBACK_IN = "918149277038"`
- **8623947038 in code is the owner's own/test number**, not the AI line: `server/src/services/whatsapp-call.service.js:147-148` `OWNER_NUMBER = "918623947038"` (calls *from* it use the owner's account); `server/src/utils/chat-onboarding.js:52` `SHARED_TEST_WHATSAPP`; test scripts send to it; it is also the normal `tel:` support number on contact pages and legal docs.
- Unless the WhatsApp line was moved, marketing should say "WhatsApp-call +91 81492 77038". **Confirm with the owner before publishing any number.**

## Part A — How our call support works

Files: `server/src/services/whatsapp-call.service.js`, `server/src/routes/whatsapp.routes.js` (`/calls-internal`, `/messages-internal`), `server/src/services/agent-task.service.js`, marketing repo `server-ai/server.ts:1079-1125`.

### 1. A call end to end
- Meta sends the call to `server-ai/server.ts`, which forwards it (signed) to `/api/whatsapp/calls-internal` on the main server.
- **Who can call:** only a number that is the verified WhatsApp of exactly one Classgrid account (`findCaller`). Numbers on several accounts or shared test numbers are not answered; unlinked numbers are rejected with a WhatsApp message. Open to all users by default (`WHATSAPP_CALLS_FOR_ALL=false` limits to the owner).
- Server checks credits, then the call limit, then answers.
- Speech-to-text: Cloudflare `@cf/openai/whisper-large-v3-turbo`. Model: `claude-haiku-5-5`. Voice: Cloudflare `@cf/deepgram/aura-2-en` (English only). Caller can interrupt.
- **15 minutes per call** (warning at 14:45, up to 30 s extra to finish a sentence). **50 answered calls per number per 24 h** (`MAX_CALLS_PER_DAY`).
- Language: the AI speaks plain English; Whisper may understand Hindi etc. but replies are English (not tested).
- During the call: `ask_classgrid` runs the full Agent live with all tools and connected apps (Gmail, Calendar, Drive, Notion, GitHub, Vercel); if it takes over 90 s the answer comes on WhatsApp instead. `start_task` saves a job for after the call. It can also create/list projects and hang up.
- After the call: all saved tasks become one background job run as the user in a new Agent chat (coding work → Project Mode). User gets "Got it…" on WhatsApp, then the result + chat link; PDFs as real files. Survives server restarts (up to 3 tries), stops after 48 h. If no task was saved, a 2–3 line recap is sent.
- Messages during/after: users can send extra text or files on WhatsApp; a small model (`@cf/zai-org/glm-4.7-flash`) replies "got it" and passes them to the running task. Callers are told they can email agent@classgrid.in. **A new task starts only from a call**; a plain WhatsApp text with no open task goes to the help bot (`agent-task.service.js:597`).

### 2. What kind of call
- A **WhatsApp voice call** via Meta's WhatsApp Business Calling API (WebRTC, `@roamhq/wrtc`, UDP 10000–60000). Only user-started calls (`direction === "USER_INITIATED"`).
- **A regular phone call will not reach the AI** — no phone line exists in code (Meta docs: https://developers.facebook.com/docs/whatsapp/cloud-api/calling/).
- No "call" button inside chat.classgrid.in.

### 3. Exact text users see or hear
- Greeting (spoken): "Hi {FirstName}, this is Classgrid AI. What can I do for you?"
- Unlinked number: "This WhatsApp number is not linked to a Classgrid account. Sign in on https://chat.classgrid.in and verify this number, then call again."
- Out of credits: "You're out of Classgrid AI credits right now. Top up on https://chat.classgrid.in to use calls." Other failures: "Classgrid AI can't take calls for your account right now. Please try again later."
- Over the limit: "You've used all 50 Classgrid AI calls for the last 24 hours. You can call again after {time} (India time)."
- Task started: "Got it. Classgrid AI is working on it now[ in your project "X"]. I'll send you the result here when it's done.\n(Call N of 50 you can make in 24 hours.)"
- Call dropped: "Sorry, the call dropped[, but your request is saved and Classgrid AI is working on it]. You can call again anytime."
- Mid-call error (spoken): "Sorry, I had a problem there. Could you say that again?"
- Recap header "📞 *Your call with Classgrid AI*"; done: "✅ *Task completed.*" + chat link.
- 48 h: "Sorry, Classgrid AI could not finish your task in 48 hours, so it has stopped." Tokens: "⏸️ Your AI tokens ran out, so I paused your task…" Retries: "…could not finish your task after 3 tries."
- Verification (help bot, marketing repo `lib/whatsapp/login-help-bot.ts`): "Hi! 👋 Thanks for messaging Classgrid. ✅ Done! Your WhatsApp is now ready to receive your login code. *Now:* 1. Go back to the *Verify WhatsApp* screen on chat.classgrid.in 2. Choose your country code (India: +91) and enter your WhatsApp number 3. Tap *Send OTP* 4. Your 6-digit code will arrive in this chat within a few seconds… The code is valid for 10 minutes. You can ask for a new one after 60 seconds."

### 4. Switches and limits
- `WHATSAPP_CALLS_DISABLED=true` → calls unanswered.
- `WHATSAPP_AI_ENABLED` (in `server-ai/server.ts`): when not "true", WhatsApp texts get the fixed help-bot reply. Production value unknown.
- Help bot: 34 messages per number per day; stops at 990 messages a month (kill switch).
- Calls and tasks use the user's AI credits (never quote amounts).
- `/api/whatsapp/webhook` in `whatsapp.routes.js` is an unused stub.
- **Platform risk:** since 15 Jan 2026 WhatsApp Business terms ban "AI Providers" whose AI is the "primary functionality" (https://techcrunch.com/2025/10/18/whatssapp-changes-its-terms-to-bar-general-purpose-chatbots-from-its-platform/). EU/Italy got exceptions (https://storyboard18.com/brand-makers/meta-to-allow-rival-ai-chatbots-on-whatsapp-in-europe-for-12-months-amid-eu-probe-2-91405.htm). No India exception found — Classgrid's WhatsApp AI could be affected.

## Part B — Competitors (October 2026)

**Grok Bot (xAI)**
- Agent beta since Aug 2026 on a cloud computer (macOS, Windows, iPhone); connects Gmail, Google Calendar, Drive, Outlook, Teams; runs on schedules; $200/month standalone or in SuperGrok Heavy (https://www.vellum.ai/blog/official-grok-bot-breakdown — third-party).
- Since 25 Oct 2026 it can place phone calls *to* businesses/people for you and send a summary (https://x.com/elonmusk/status/2114365361068138990, https://teslanorth.com/2026/10/25/grok-bot-phone-calls-elon-musk/). Plans/countries not disclosed.
- No official Grok WhatsApp number (https://blueticks.co/blog/grok-whatsapp, 27 Sep 2026). Telegram bot @GrokAI for Telegram Premium (third-party, not verified: https://www.layer3labs.io/guides/what-is-grok-bot).
- You cannot phone Grok itself.

**OpenAI — 1-800-CHATGPT, WhatsApp, Dots**
- Phone line launched 18 Dec 2024 (https://www.axios.com/2024/12/18/chatgpt-phone-call-whatsapp-message): US/Canada only, free monthly minutes (started at 15). Reportedly still works; current status not verified.
- WhatsApp cut off 15 Jan 2026 (https://engadget.com/ai/chatgpt-in-whatsapp-will-stop-working-in-january-161335173.html); back 13 Jul 2026 in Europe (EEA) only, text/images/voice notes (https://the-decoder.com/chatgpt-returns-to-whatsapp-in-europe-after-eu-forces-meta-to-open-the-door-to-rival-ai-bots/). Not in India.
- **Dots** launched 29 Sep 2026 at DevDay (https://techcrunch.com/2026/09/29/openai-launches-dots-its-bubbly-agentic-avatar/): always-on background agents, each with its own cloud computer, 4,000+ apps (https://thenextweb.com/news/openai-dots-always-on-ai-agents-cloud-computers-devday). ChatGPT Pro ($100/month) and Business Premium in "eligible markets"; nothing found on India. Reachable in ChatGPT, Slack, Teams; waitlist for iMessage/RCS (https://www.techmeme.com/260929/p35). No WhatsApp, no calling (https://www.tryagentsonic.com/articles/openai-dots-whatsapp — third-party).

**Meta — Muse / Meta AI**
- Muse Spark model 8 Apr 2026 (https://about.fb.com/news/2026/04/introducing-muse-spark/). Muse Spark 1.1 added email, calendar, recurring tasks to the Meta AI app (28 Jul 2026, https://techeconomy.ng/meta-ai-grows-hands-muse-spark-1-1-turns-chatbot-into-an-agent).
- **Muse** agent app launched 8 Sep 2026, **US only, India excluded**: sends emails, fills forms, makes purchases, keeps working after the app closes; free + $20 / $100 plans (https://www.medianama.com/2026/09/223-meta-muse-personal-ai-agent-india/). Inside WhatsApp in US/Canada (third-party, not verified).
- Since 16 Sep 2026 Muse places calls to US businesses (https://techcrunch.com/2026/09/17/rival-ai-agents-instinct-and-metas-muse-both-add-the-ability-to-make-calls/); some were secretly made by human contractors and Meta rolled it back (https://www.technology.org/2026/09/23/meta-muse-human-concierge-ai-phone-calls/).
- Meta AI voice chat inside WhatsApp is an in-app voice session, not a phone call; beta Feb 2026 (https://green-api.com/en/blog/2026/whatsapp-is-rolling-out-voice-chats-powered-by-meta-ai/).

**Perplexity** — WhatsApp bot (+1 833 436 3285) from Apr 2025, cut off 15 Jan 2026 (https://gulfnews.com/technology/no-more-chatgpt-and-perplexity-on-whatsapp-meta-bans-major-ai-chatbots-from-2026-1.500316016). No phone line found.

## Part C — Comparison

| | Classgrid AI | Grok Bot | ChatGPT / Dots | Meta Muse / Meta AI | Perplexity |
|---|---|---|---|---|---|
| Call the AI | Yes, WhatsApp call | No (it calls others) | 1-800 number US/Canada (status not verified); Dots no | Meta AI in-app voice (beta); can't phone Muse | No |
| Chat on WhatsApp | Yes (verified users; answers only during a task) | No | EEA only since Jul 2026; Dots no | Meta AI yes; Muse US/Canada | Ended Jan 2026 |
| Real tasks in background after the call | Yes | Yes (app/desktop) | Dots yes (not by call) | Muse yes (US) | No |
| Connected apps | Gmail, Drive, Calendar, Notion, GitHub, Vercel | Gmail, Calendar, Drive, Outlook… | Dots 4,000+ | Email, calendar | Not verified |
| Results back on WhatsApp | Yes (PDFs as files) | No | No | Not verified | No |
| Schedules / reminders | Yes (tasks can wait/wake) | Yes | Yes | Yes | Had reminders before cutoff |
| In India | Yes | Not verified | Phone no; WhatsApp no; Dots not verified | Meta AI yes; Muse no | No |

Newest competitor facts (Grok Bot, Muse in WhatsApp, Dots channels) partly come from third-party sites — check official pages before putting them on the site.

## Part D — Solution ideas for a Calls page
1. **Call while driving:** "Email Mr. Rao that the quote is approved." Sent from your Gmail, confirmed on WhatsApp.
2. **Morning planning call:** "What's on my calendar today?" Live answer + short recap. (Note: Calendar can list/create events but not move/cancel — don't promise "move my 3 pm".)
3. **Turn a call into a document:** describe a report out loud, hang up, get the PDF on WhatsApp.
4. **Build or fix a website by voice:** "Fix the contact form on my site." Runs in Project Mode; result on WhatsApp.
5. **Add more after you hang up:** send photos, PDFs or details on WhatsApp, or email agent@classgrid.in; the running task picks them up.
6. **Find something fast:** "Find last week's invoice in my Drive." Searches while you're on the line, replies on WhatsApp if it takes longer.

Only claim: works in India, in English, by **WhatsApp call** (not a normal phone call), up to 15 minutes per call. No Classgrid prices.
