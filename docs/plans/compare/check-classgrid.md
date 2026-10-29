# Check: Classgrid AI claims on the compare page

Read-only check of `current-compare-page.json` against the code, done 2026-10-28.
P = `C:\CLASSGRIDPLATFORM\classgrid_platoform-desktop-\server\src\`. M = marketing repo.

| Claim | Verdict | Evidence | Corrected wording (if needed) |
|---|---|---|---|
| +91 81492 77038 is the AI line | PARTLY TRUE | Every place the code names the number says 81492 77038 (P `controllers/ai-chat.controller.js:202`, client `PublicChatLoginPage.tsx:1241`). The number that actually answers comes from the `WHATSAPP_PHONE_ID` setting (P `services/whatsapp-call.service.js:87`), and its value is not in the code. | Keep it, but the owner must confirm the number. |
| Verified number needed, one account per number | TRUE | `whatsapp-call.service.js:152-163` (the number must match exactly one account; shared test numbers are not answered). Unlinked numbers are rejected and get a WhatsApp message (`:1087-1092`). | — |
| Sign up and verify with a one-time code | TRUE | M `lib/whatsapp/login-help-bot.ts:18-22` (6-digit code, valid for 10 minutes) | Add: "First send 'Hi' to the number on WhatsApp" (`login-help-bot.ts:5-6`). |
| Greets you by name | TRUE | `whatsapp-call.service.js:1018-1019` ("Hi {first name}, this is Classgrid AI…") | — |
| Can interrupt at any time | TRUE | `:1042-1045`. When you talk over it, the AI stops. Your voice has to be clearly louder than the AI's (`:1036`). | — |
| Live answers using Gmail, Calendar, Drive, Notion, GitHub | TRUE, with a limit | During the call, `ask_classgrid` runs the full Agent with all tools (`:251-262`, `:752-794`, `:854`). The Google connector covers Gmail, Calendar and Drive (`ai-chat.controller.js:2180, 2196-2199`). Notion is at `:2151` and GitHub at `:2251`. Outlook/Teams, Zoom and Vercel also work. If a request takes more than 90 seconds, the answer is sent on WhatsApp instead (`:782-790`). Only one live request runs at a time (`:757`). | "…answers live during the call using your connected apps. If something takes longer, the answer comes on WhatsApp." |
| Bigger jobs start as soon as you hang up | TRUE | `start_task` (`:440-450`) and `afterCall` (`:558-611`). If no task was saved, you get a short call recap on WhatsApp instead (`:562-568`). | — |
| Result on WhatsApp with a link to the full chat | TRUE | The finished message has "✅ Task completed." plus the chat link (P `services/agent-task.service.js:59, 456-460`). Messages sent while the job is still going have no link (`:464-466`). | — |
| PDFs arrive as real files | TRUE | `whatsapp-call.service.js:102-130` (PDF links are always sent as files). Other files are sent only when the Agent sends them itself (P `mcp/tools.js:1030`). | — |
| Add more by WhatsApp message or email to agent@classgrid.in while the job runs | TRUE, with a condition | WhatsApp messages from your verified number: `agent-task.service.js:590-612`. Email is only accepted from the email address of your Classgrid account (`:691-695`). | "…or email agent@classgrid.in **from your Classgrid account email**…" |
| A job can run up to 48 hours | TRUE | `agent-task.service.js:31, 48, 423-427, 357` | See the 24-hour risk below. |
| Up to 15 minutes per call | TRUE | `whatsapp-call.service.js:45, 1015` (up to 30 seconds extra to finish a sentence, `:47`) | — |
| The AI speaks English | TRUE | English voice `@cf/deepgram/aura-2-en` (`:217`). The prompt tells it to speak plain English (`:325`). Other spoken languages have not been tested. | — |
| WhatsApp voice call, not a normal phone call | TRUE | Only WhatsApp calls the user starts are handled (`:1074-1078`, M `server-ai/server.ts:1115`). The code has no normal phone line. | — |
| Texting alone doesn't start a job; calling or emailing does | TRUE | A text with no open task goes to the help bot (`agent-task.service.js:596-599`, M `server-ai/server.ts:1133-1138`). An email with no open task starts a new job (`:709-718`). A text during an open or waiting task adds to that task. | — |
| Free to start, top up when you need more | TRUE | Free weekly allowance (P `services/ai-credits.service.js:63-90, 148-182`). With no credits left, the call is rejected with "Top up on chat.classgrid.in" (`whatsapp-call.service.js:1095-1101`). | — |
| "Made for India" | PARTLY TRUE | Times are in India time (`:321`) and the agent mailbox is in Zoho's India data centre (`agent-mail.service.js:1-6`). Nothing in the code is India-only. | "Works in India" is safer. |
| Hand off work "from anywhere in India" | TRUE (says too little) | The number check accepts any country code (P `services/ai-feature-limits.js:247-252`). | Could say "from anywhere". |
| "No app to open" / "without opening an app" | PARTLY TRUE | You still use the WhatsApp app. | "No new app to install, no typing." |
| USP: keeps working "using your connected apps" | TRUE | The job runs the full Agent with all tools (`whatsapp-call.service.js:854`). | — |
| Where you use it: WhatsApp and chat.classgrid.in | TRUE | The job's chat is saved at chat.classgrid.in/agent/… (`agent-task.service.js:59`). | — |
| ratingBadges with scores 4.9 / 4.8 | FALSE / UNVERIFIED | Nothing in the code or the page backs these scores, and they look like user review ratings. | Remove the scores, or keep only the labels. |

## Important things missing from the page

1. **Limit on calls:** each number can have at most 50 answered calls in 24 hours. This is fixed in the code (`whatsapp-call.service.js:50, 1106-1110`), not a pricing value.
2. **Calls and jobs use your AI credits.** When credits run out, the job pauses and carries on by itself when credits come back (`agent-task.service.js:29-30, 419-421`).
3. **Send "Hi" to the number on WhatsApp before verifying.** This is needed so the code can be delivered (`login-help-bot.ts:5-6`).
4. **Coding and website work runs in Project Mode.** You can name one of your projects on the call (`whatsapp-call.service.js:245, 570-585`).
5. **The Agent can ask you a question on WhatsApp and wait for your reply** before it finishes (`agent-task.service.js:463-466`).
6. **The job keeps going if the server restarts** (up to 3 tries, `whatsapp-call.service.js:614-627`).
7. **Risk (for the owner, not for the page):**
   - Results are sent as normal WhatsApp messages, with no template backup (`whatsapp-call.service.js:115-135`). Meta's 24-hour rule may block a result that arrives more than 24 hours after your last call or message. That could affect jobs that run close to 48 hours. This has not been tested.
   - WhatsApp's business terms on AI chatbots (see `research/whatsapp-calls.md` Part A §4) could affect the whole feature.
