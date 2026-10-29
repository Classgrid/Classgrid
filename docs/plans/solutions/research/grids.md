# Research: Grids (messaging, Share Grid, share links)

Source: read-only code research of `C:\CLASSGRIDPLATFORM\classgrid_platoform-desktop-`, 2026-10-27.

## 1. Capabilities

### How users get there
- Main nav item **"Grids"** → `/agent/chat` (`client/src/config/sidebar.ts:745`). AI menu: "Agent", "Grids", "Requests", "Audit Logs".
- Catch: on any `/agent…` page the sidebar opens the nested "Agent" menu (chat history); users press Back to see "Grids" (`client/src/components/layout/AppSidebar.tsx:220`).
- "Grids" shows an unread badge; new Grid messages pop up as toasts on every page (`client/src/components/layout/ChatMessageToasts.tsx`); bell notifications open `/agent/chat` (`SidebarNotifications.tsx:280`); bell setting "Grid messages" — "New messages in DMs and groups".
- Page: `client/src/features/chat/pages/ChatPage.tsx`.

### The Grid — messaging
(`client/src/features/chat/components/*`; server `server/src/routes/thread_chat.routes.js`, `group_chat.routes.js`, `org_chat.routes.js`)
- **1:1 chats with anyone on Classgrid AI** — "New chat", "Contacts on Classgrid", "Start Chat". All public sign-ups share one org, so the directory covers every Classgrid AI account (`org_chat.routes.js:147`).
- **Groups** — "New group", "Group name *", "Group subject (optional)". Types: "General", "Class", "Department", "Team / Staff", "Official / Announcement". Privacy: "Private (Hidden, Invite Only)", "Approval Required (Visible, Request to Join)", "Public / Open (Visible, Instant Join)". Discovery: "Explore Groups"; Requests page ("My Requests", "All caught up").
- **Group permissions** (`GroupSettingsModal.tsx`) — "Who can send messages?", "Who can edit group info?", "Who can add members?", "Who can send attachments (Images, PDFs, etc)?" (options incl. "Only Admins"); "Auto-Grant Admin by Role", "Promote", "Add member".
- **Polls** (`CreatePollModal.tsx`) — "Create a Poll", "Question", "Options", "Add Option" (2–10), "Allow Multiple Answers"; results in "Poll Results".
- **Message options** (`ChatInput.tsx`) — "Message Options": "Priority" (Normal / High / Urgent, shown as "Urgent" / "High Priority" badges), "Auto-Delete At (Optional)", "Schedule For (Optional)" (managed under "Scheduled Messages").
- **Rich messaging** — voice notes, GIFs, "Photos & Videos", "Document"; @mentions incl. "Mention all members in this chat"; reactions, reply, "Forward message to", "Pin message" (24 h / 7 d / 30 d); "Starred messages", "Search in chat", "Disappearing messages" (24 h / 7 d / 90 d); "Blocked contacts", "Mark all as read"; filters "All / Unread / Groups / Archived".
- **Live presence and read receipts** — "Online", typing/recording/uploading indicators; "Message Info": "Read by", "Delivered to", "Sent".
- **Group audit log** (`/audit`, `GroupAuditLogsPage.tsx`) — member, settings and message changes; "Export CSV".

### Share Grid
(`client/src/components/ai/components/share-grid/ShareGridPanel.tsx`, `GridJoinPage.tsx`; server `server/src/routes/ai-grid.routes.js`, `server/src/services/ai-chat-grid.service.js`)
- Icon-only button, aria-label "Share Grid", in the AI chat header (`AskAiPanel.tsx:4605/6293`).
- Panel: "Invite people", "Copy invite link", "Turn off invite link"; "Add from Grids" → "Pick people from your Grids" + "Search people"; email box ("name@gmail.com, friend@gmail.com") + "Invite"; "People · N of 4" with each person's message count; "History" (Pending / Accepted / Declined / Turned off); "Leave chat".
- **Max 4 people** (`GRID_MAX_PEOPLE = 4`).
- Invite email subject "… invited you to a chat on Classgrid AI"; body "You can read the chat, send messages and ask the AI together"; button "Accept invite".
- Invitee page `/grid/join/:token`: "You're invited to a Classgrid AI chat", "Log in to join", "Join chat", "Invite declined", "Open chat".
- Inside the shared chat: messages tagged with sender; "X joined the chat via the invite link"; while the AI answers someone else: "Agent is responding to X. You can send when it's done." (one person at a time); the AI knows who asked what; shared chats show a star in history; if the owner leaves, ownership passes to the next member.

### Share links
(`client/src/components/ai/components/AgentSidebar.tsx:954–1096`)
- Chat menu "Share" → modal "Copy link", "WhatsApp", "LinkedIn", "Email".
- Public read-only snapshot at `share.classgrid.in/shared/<id>`; viewer shows "Shared by" (`client/src/features/shared/pages/SharedChatPage.tsx`).
- WhatsApp/LinkedIn pre-fill: "Read the chat that I recently had on my Classgrid agent…"

### MCP scopes (`server/src/mcp/mcp-scopes.js`)
- "Read your Grid chats and groups" (`grid:read`); "Send messages in Grid and chats" (`grid:write`, sensitive, unticked by default).
- Over MCP the user must be a member of the chat; announcements admin-only (`mcp-guards.js`).

## 2. How the AI fits in

Tools in `server/src/mcp/tools.js:1400–1493`, wired into the in-app agent in `server/src/controllers/ai-chat.controller.js:4271+`; load automatically when the user mentions grid/chat/group/poll/announce, incl. Hindi/Hinglish (`server/src/services/ai-tool-groups.js:85–94`).

- **Read:** `list_grids`, `list_chat_threads`, `read_chat_messages`, `list_group_chats`, `read_group_chat_details`, `read_group_chat_messages`, `list_group_members`, `count_group_members`, `list_group_polls`, `read_group_poll_details`, `get_chat_attachment_url`, `get_group_chat_attachment_url`, `search_users_for_chat`.
- **Write:** `send_chat_message`, `send_group_chat_message`, `send_group_announcement`, `create_group_poll` (multiple choice + `closesAt`), `upload_file_to_chat`, `upload_file_to_group_chat`.

| Can the agent… | Answer |
|---|---|
| Post in a group | Yes |
| Summarise a group | Yes, by reading recent messages |
| Create a poll and read results | Yes |
| Send an announcement | Yes |
| Act on a schedule into a Grid | **No** |

Prompt rules: "Read my Grid" = groups only; must ask before reading 1:1 DMs; reads only the last 1–2 hours, max 50 messages; must show a draft and ask "Should I send this to the group?" before sending. `create_schedule` only emails/WhatsApps the user; only humans can schedule Grid messages ("Schedule For").

## 3. Solutions

**Students — study groups**
- "Approval Required" study group; the agent reads tonight's messages and summarises what everyone agreed. [group read, privacy]
- "Which day for the mock test?" — the agent creates a poll and later reports the vote. [create_group_poll, read_group_poll_details]
- Share one AI chat with up to 3 classmates to work through a problem set. [Share Grid, Add from Grids]
- Send revision notes as files to the group. [upload_file_to_group_chat]

**Teachers — class group**
- A "Class" group with "Who can send messages?" = "Only Admins" as a notice board. [permissions]
- Draft an announcement with the agent; post after approval. [send_group_announcement]
- Schedule tomorrow's reminder as an "Urgent" message. [Schedule For, Priority]
- "Read by" shows who has seen the notice. [read receipts]

**Small teams and founders**
- "Team / Staff" group + a shared AI chat to draft the pitch together. [Share Grid]
- "Catch me up on the team group" summary. [read_group_chat_messages]
- Quick decision poll created and reported by the agent. [polls]
- Audit log with "Export CSV". [Audit Logs]
- Use Grid from Claude, Cursor or ChatGPT via MCP. [grid:read / grid:write]

**Families and friends — planning**
- Group trip: the agent makes a destination poll and posts the winner. [create_group_poll, send_group_chat_message]
- Plan in one shared AI chat with up to 4 people, joined via a WhatsApp invite link. [Share Grid, Copy invite link]
- "Disappearing messages" for casual chats.

**Creators with collaborators**
- Share an AI brainstorm; each person's messages tagged. [Share Grid]
- Publish a finished chat as a public link on LinkedIn. [Share → LinkedIn]
- The agent sends the latest draft file to the collaborators' group. [upload_file_to_group_chat]

## 4. Best visuals
- Share Grid panel "People · 3 of 4" + "Pick people from your Grids" list.
- Invitee card "You're invited to a Classgrid AI chat".
- Shared chat with sender tags and "Agent is responding to Priya…".
- Group poll card next to the agent chat that created it.
- Share modal's four round buttons (Copy link / WhatsApp / LinkedIn / Email).
- MCP consent screen with the two Grid scopes.

## 5. Limits / do not claim
- Share Grid: hard cap 4 people; Incognito and Project Mode chats can't be shared; emailed invites only work for that email; the AI answers one person at a time; button is icon-only.
- The share "Email" button emails the transcript to yourself only (`shareChatSession`), not to a recipient.
- **No scheduled agent actions into Grid** — don't claim "the AI posts every Monday".
- **No AI bot inside Grid group chats** (no @AI reply). AI-together = Share Grid.
- Unused/partial server features — don't claim: `/summarize`, `/suggest-replies`, `/notes` (unused, read a different table); message approval and "Acknowledge" (no settings UI); silent-send flag (no toggle); Chat Analytics (`/analytics` redirects away).
- Agent announcements are stored as plain messages (no special styling).
- In-app agent sender identity comes from the model's tool arguments; falls back to the Classgrid support account if missing. Only MCP forces "posts as you" — don't promise "always posts as you" in-app.
- Agent reads only recent history (1–2 h, max 50 messages) — don't claim "summarise the whole group history".
- Group membership is limited to the same org (for public users: the single shared Classgrid AI org) — not cross-platform.
- File limits: 12 MB images, 150 MB other files.
- Discoverability: Grids is one Back tap away while in the Agent view.
