# Solution page: For Teams (founders and small teams)

- **URL:** `/solutions/for-teams` (new)
- **Replaces:** `/solutions/for-admins` (301 to here). Also the Navbar "For Institutes" mapping and the old `/solutions/roles/institutes` redirect.
- **Who it's for:** founders, small teams, freelancers, anyone doing office work (email, meetings, proposals, notes)
- **Goal:** sign up, connect Gmail or Outlook and Calendar, and hand over the first task
- **Sanity:** `solutionPage` slug `for-teams`, `category: role`, label "For teams"

---

## Hero

- **Eyebrow:** For founders and small teams
- **Headline:** An AI teammate for your small team
- **One line:** Catch up on email, plan your week, write proposals and launch a landing page, all from one chat.
- **Buttons:** "Use Agent" → `https://chat.classgrid.in` · "Book a demo" → `/demo`

---

## Interactive demo (custom design)

Grey panel, `AgentRealWorkSection` layout. Three chips: **Morning catch-up** · **Proposal** · **Landing page**.

**Chip 1: Morning catch-up** (plays first)
- Card title: "Monday catch-up"
- User (plugin demo prompt): "Read my unread emails from today"
- Steps with plugin logo chips: "Gmail · Read 14 unread emails"
- Result: "3 need a reply today: Riya (invoice question), Arjun (contract), Neha (meeting time). The rest are newsletters and receipts."
- Second user line: "What's on my calendar for tomorrow?" → step "Google Calendar · Listed 3 events"
- **Floating card** (Calendar logo): "Tomorrow · 3 events": "10:00 Team stand-up", "13:00 Lunch with Arjun", "16:00 Client call · Meet link"

**Chip 2: Proposal**
- User: "Draft a project proposal for a 6-week website build for riya@example.com, as a PDF, and send it from my Gmail"
- Steps: "Wrote a 2-page proposal" → "Built proposal.pdf" → "Gmail · Sent to riya@example.com"
- Floating `CreatedFilesCard`: "Created 1 file" → `proposal.pdf` + a green line "Sent from your Gmail"

**Chip 3: Landing page**
- User (home line): "Build a landing page for your idea." → "for my meal-prep startup, FreshBox"
- Steps: "Wrote index.html" → "Generated 2 images" → "Published"
- Result: "Live at https://freshbox.sites.classgrid.in" (link style)
- Floating card: small browser frame with the page hero ("FreshBox · Healthy meals, ready in 5 minutes")

---

## Feature blocks

### 1. Email and calendar, handled
- **Text:** Connect Gmail or Outlook and your calendar. Ask what needs a reply, get a draft, and send it from your own account. Check your week and add new meetings with a Meet or Zoom link.
- **Facts:** Gmail: list, read, read attachments, send, mark as read. Outlook: list, read, send, mark as read, list/create meetings. Calendar: list and create events (Meet link option). Zoom: list and create meetings.
- **Mock:** text left, grey panel. Glass chat card with the inbox summary. Floating Calendar card "Created: Client call · Thu 4:00 PM · Meet link".

### 2. Hand off work and walk away
- **Text:** Email the task to agent@classgrid.in from your sign-up email, or call the agent on WhatsApp. It replies, works in the background for up to 48 hours, asks you on WhatsApp if it needs something, and sends the result when it's done.
- **Facts:** email from a registered address starts/updates a task (inbox checked often, short auto-reply); `sleep_until` / `wait_for_whatsapp_reply`; max 48 h; end message "✅ *Task completed.*" + chat link; WhatsApp calls (see 08).
- **Mock:** text right, teal panel. Glass email card: From `arjun@example.com` → To `agent@classgrid.in`, subject "Compare 3 CRM tools for us", body 2 lines. Floating `WhatsAppBubbleCard`: "✅ *Task completed.* Your CRM comparison is ready: chat.classgrid.in/…" + a PDF file bubble `crm-comparison.pdf`.
- Link: "Call the agent on WhatsApp" → `/solutions/whatsapp-calls`.

### 3. Team groups and shared chats on Grids (Grids block)
- **Text:** Make a team group for quick decisions and polls. Ask the agent to catch you up on what the team said today. Draft the pitch together in one shared AI chat with up to 3 teammates.
- **Facts:** group type "Team / Staff"; polls (2–10 options, multiple answers); the agent reads recent group messages (last 1–2 hours) and posts only after "Should I send this to the group?"; Share Grid max 4 people with sender tags; group audit log with "Export CSV".
- **Mock:** grey panel. Glass `GroupChatMock` "FreshBox team" with a poll "Launch date?" (Mon 15 Nov · 3 votes, Mon 22 Nov · 1 vote). Floating `ShareGridMock`: "People · 3 of 4", shared chat line "Agent is responding to Neha. You can send when it's done."
- Link: "More about Grids" → `/solutions/grids`.

### 4. Notes, docs and sites
- **Text:** Turn meeting notes into a Notion page or a Slack message, make a polished PDF, or publish a simple website in one chat.
- **Facts:** Notion: search, create and update pages, comments. Slack: read/send messages, threads, canvases. `generate_pdf`. `deploy_to_classgrid_cloud` → `https://<site>.sites.classgrid.in` (Agent mode only).
- **Mock:** text left, teal panel. Glass chat card: "Write meeting notes and action items." → 3 action items with owners. Floating Notion card: "Page created · Meeting notes, 27 Oct".

---

## Plugins strip

| Plugin | One line |
|---|---|
| Gmail | Read, reply and send from your account |
| Microsoft Outlook | Read and send email, create meetings |
| Google Calendar | See your week, add events |
| Google Drive | Find and read files, save new ones |
| Slack | Read and post messages, create canvases |
| Notion | Search, create and update pages |
| Microsoft Teams | Read and post in channels and chats |
| Zoom | List and create meetings |

Link: "See all plugins" → `/plugins`.

---

## Example tasks grid

Exact wording from the app (home lines, plugin demo prompts):
- "Read my unread emails from today"
- "What's on my calendar for tomorrow?"
- "When am I free next week?"
- "Search my Notion for recent strategy docs"
- "Write meeting notes and action items."
- "Draft a project proposal."
- "Build a landing page for your idea."
- "Create a PDF report in minutes."

---

## FAQ

1. **Is there a team plan?** Each person signs up with their own email. You work together with Grids groups and Share Grid (one AI chat for up to 4 people). Free to start, top up when you need.
2. **Does it send email as me?** Yes, when you connect Gmail or Outlook, it sends from your account. Without them, the agent can still send you email from agent@classgrid.in.
3. **Can it move or cancel my meetings?** Not yet. It can list your events and create new ones.
4. **How do I give it a task by email?** Email agent@classgrid.in from the email you signed up with. It replies, works on it and sends you the result.
5. **Can it keep working when I'm offline?** Yes. Long tasks run in the background for up to 48 hours and send the result to WhatsApp and the chat.
6. **Can I disconnect apps?** Yes. Disconnect any app from Plugins and delete any chat at any time. (Link the Privacy Policy.)
- *Hold (add only when MCP is switched on):* "Can I use it from Claude, Cursor or ChatGPT?"

---

## Images to capture (real app, light + dark)

1. **AI Hub → Gmail** and **Google Calendar** plugin pages with "Try asking the AI" prompts.
2. **A chat** that read emails and created a calendar event (test inbox only; blur every sender email and subject that is real).
3. **A "Live at https://….sites.classgrid.in" answer** + the live page.
4. **Grids team group** with a poll, and the **Share Grid** panel (test accounts, made-up names).
5. **Group audit log** with "Export CSV".
6. **WhatsApp phone shot** of "✅ *Task completed.*" + chat link (blur the user's number).
- Never capture a real inbox. Blur all emails and names that are not made-up.

## Custom design needed (coded mocks)

- Inbox summary chat card with Gmail chip, Calendar events card, email-to-agent card, `WhatsAppBubbleCard` with file bubble, `GroupChatMock` + `GroupPollMock`, `ShareGridMock`, Notion "Page created" card, mini browser frame for the live site.

## SEO

- **Title:** AI assistant for founders and small teams | Classgrid AI
- **Description:** Catch up on email, plan your week, draft proposals, take meeting notes and launch a landing page with one AI agent. Free to start.

## Do not claim (this page)

- Team workspaces, seats, admin roles, SSO or shared billing.
- Moving, cancelling or editing calendar events. "Organise my inbox", labels, deleting email, auto-replies to customers.
- Zoom recordings or summaries. Google Meet transcripts.
- Schedules that send "daily briefs" or "weekly reports" made fresh by the AI. Schedules send fixed text to you only.
- A personal agent email address per user (agent@classgrid.in is shared; only your sign-up email works).
- An AI bot inside the team group, scheduled AI posts to Grids, summaries of the whole group history, "always posts as you".
- `sites.classgrid.in` from Project Mode or WhatsApp tasks. MCP (hold). Any price number.
