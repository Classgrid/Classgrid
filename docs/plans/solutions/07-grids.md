# Product page: Grids

- **URL:** `/solutions/grids` (new)
- **Replaces:** nothing (new page). Linked from the Grids block on 01, 02, 04 and 05.
- **Who it's for:** anyone who talks, plans and decides with other people: study groups, classes, small teams, families and friends, creators with collaborators
- **Goal:** sign up, open Grids, start a group or share an AI chat
- **Sanity:** `solutionPage` slug `grids`, `category: product`, label "Grids"

What Grids is, in one breath: messaging inside Classgrid AI (1:1 chats, groups, polls), plus **Share Grid** (one AI chat shared by up to 4 people) and **share links** (a read-only copy of a chat). Your agent can read recent group messages, make polls and post for you, always after you say yes.

---

## Hero

- **Eyebrow:** Grids
- **Headline:** Chat, plan and decide together
- **One line:** Chats, groups and polls inside Classgrid AI, plus shared AI chats for up to 4 people.
- **Buttons:** "Open Grids" → `https://chat.classgrid.in` · "Book a demo" → `/demo`

---

## Interactive demo (custom design)

A two-pane mock on the teal panel: **left** a Grids group (`GroupChatMock`), **right** the Agent chat (`ChatCardMock`). Three chips: **Catch me up** · **Make a poll** · **Share an AI chat**.

**Chip 1: Catch me up** (plays first)
- Left pane: group "Physics study group" with 5 short messages scrolling in (made-up names: Priya, Kabir, Meera).
- Right pane, user: "Read my Grid and tell me what the Physics group agreed tonight"
- Step: "Read 32 recent messages in Physics study group"
- Result: "You agreed to: 1. Finish chapter 6 by Thursday. 2. Meera shares her notes. 3. Mock test day is still open."

**Chip 2: Make a poll**
- Right pane, user: "Make a poll in the group: which day for the mock test? Saturday or Sunday."
- The agent shows a draft card: question + 2 options and "Should I send this to the group?" with buttons **Send** / **Edit**.
- **Click Send**: a `GroupPollMock` appears in the left pane ("Which day for the mock test?", Saturday / Sunday). Votes tick up (Sat 4 · Sun 2).
- Then the user: "Who won?" → "Saturday won, 4 votes to 2."

**Chip 3: Share an AI chat**
- The right pane header shows the Share Grid icon. **Click it**: the `ShareGridMock` panel slides in: "Invite people", "Copy invite link", "Add from Grids", email box (`priya@example.com`), "People · 3 of 4" with message counts.
- The chat underneath shows sender tags ("Priya", "Kabir") and the line "Agent is responding to Priya. You can send when it's done."

---

## Feature blocks

### 1. Chats and groups that feel familiar
- **Text:** Message anyone on Classgrid AI, one to one or in groups. Choose who can join, who can post and who can add people. Send voice notes, photos, files and GIFs, pin what matters and see who has read it.
- **Facts:** "New chat" / "Contacts on Classgrid"; "New group" with types "General", "Class", "Department", "Team / Staff", "Official / Announcement"; privacy "Private (Hidden, Invite Only)", "Approval Required (Visible, Request to Join)", "Public / Open (Visible, Instant Join)"; "Explore Groups"; permissions "Who can send messages?", "Who can edit group info?", "Who can add members?", "Who can send attachments (Images, PDFs, etc)?"; voice notes, GIFs, "Photos & Videos", "Document", @mentions, reactions, reply, forward, "Pin message" (24 h / 7 d / 30 d), "Starred messages", "Search in chat", "Disappearing messages" (24 h / 7 d / 90 d); "Online", typing indicators; "Message Info" → "Read by", "Delivered to".
- **Mock:** text left, grey panel. Glass group settings card ("Who can send messages?" → "Only Admins" selected; privacy "Approval Required"). Floating "Message Info" card: "Read by 12 · Delivered to 14".

### 2. Polls, priority and scheduled messages
- **Text:** Ask the group with a poll. Mark a message Urgent so it stands out. Write it now and schedule it for later, or let it delete itself after a while.
- **Facts:** "Create a Poll" (2–10 options, "Allow Multiple Answers", "Poll Results"); "Message Options": "Priority" (Normal / High / Urgent), "Schedule For (Optional)", "Auto-Delete At (Optional)"; "Scheduled Messages". **People schedule these, not the AI.**
- **Mock:** text right, teal panel. `GroupPollMock` with results bars. Floating "Message Options" card: Priority = Urgent, Schedule For = Fri 8:00 AM.

### 3. Share Grid: one AI chat, up to 4 people
- **Text:** Bring friends or teammates into your AI chat. Everyone can read it, send messages and ask the AI together, and every message shows who sent it. Invite by link, by email, or pick people from your Grids.
- **Facts:** Share Grid button in the chat header; "Invite people", "Copy invite link", "Turn off invite link", "Add from Grids" → "Pick people from your Grids", email invite; "People · N of 4"; invite email "You can read the chat, send messages and ask the AI together" + "Accept invite"; join page "You're invited to a Classgrid AI chat" → "Join chat"; the AI answers one person at a time ("Agent is responding to X. You can send when it's done."); if the owner leaves, the next person becomes owner.
- **Mock:** text left, grey panel. `ShareGridMock` "People · 3 of 4". Floating invite card: "You're invited to a Classgrid AI chat" + "Join chat".

### 4. Your agent helps, with your OK
- **Text:** Ask your agent to catch you up on a group, make a poll and tell you the result, or draft an announcement. It always shows you the message first and posts only when you say yes. It asks before reading your private chats.
- **Facts:** tools `list_group_chats`, `read_group_chat_messages`, `create_group_poll`, `read_group_poll_details`, `send_group_chat_message`, `send_group_announcement`, `upload_file_to_group_chat`; reads only recent messages (last 1–2 hours, up to 50); must ask before reading 1:1 chats; must show a draft and ask "Should I send this to the group?"; works when you mention grid / chat / group / poll / announce (also in Hindi/Hinglish).
- **Mock:** text right, teal panel. Agent chat with the draft card "Should I send this to the group?" + **Send**. Floating group card showing the posted message.

### Small strip under the blocks: Share links
- One line + 4 round buttons mock: "Share any chat as a read-only link: Copy link, WhatsApp, LinkedIn or Email (sends it to you)." Facts: public page at `share.classgrid.in/shared/<id>` with "Shared by".

---

## Plugins strip

Grids itself is not a plugin. Show a short strip titled **"Bring in work from your apps"**: the agent can use these in the same chat before it posts to a group (after your OK).

| Plugin | One line |
|---|---|
| Google Calendar | Check free days before you make a poll |
| Google Drive | Read a file and share a summary with the group |
| Notion | Pull notes from a page into a group update |
| Gmail | Turn an email into a group announcement |

Link: "See all plugins" → `/plugins`.

---

## Example tasks grid

From the research (the app's tool rules use "Read my Grid"); the others are written for this page and marked *(new)*:
- "Read my Grid"
- "Catch me up on the team group"
- "Which day for the mock test?" (as a poll)
- "Make a poll in the trip group: Goa, Manali or Ooty?" *(new)*
- "Who voted in the poll?" *(new)*
- "Draft an announcement for the class group about Friday's test" *(new)*
- "Send my revision notes PDF to the study group" *(new)*

---

## FAQ

1. **Who can I chat with?** Anyone with a Classgrid AI account. Find them under "Contacts on Classgrid".
2. **Is there an AI inside my group chats?** No AI replies inside groups. Your own agent can read recent group messages, make polls and post for you after you say yes. To chat with the AI together, use Share Grid.
3. **How many people can share one AI chat?** Up to 4, including you. Incognito and Project Mode chats can't be shared.
4. **Can the agent post on a schedule?** No. You can schedule your own messages with "Schedule For".
5. **Can it summarise the whole group?** It reads the recent messages (about the last couple of hours), so it's best for "what did I miss today".
6. **Where do I find Grids?** In the main menu. If you're inside Agent, tap Back in the sidebar to see Grids.

---

## Images to capture (real app, light + dark)

1. **Grids page** (`/agent/chat`) with the chat list, filters "All / Unread / Groups / Archived" and one group open.
2. **New group** form with type and privacy options.
3. **Group settings** with the permission questions.
4. **A poll** in a group + "Poll Results".
5. **Share Grid panel** "People · 3 of 4" and **"Pick people from your Grids"**.
6. **Invite page** "You're invited to a Classgrid AI chat".
7. **Shared chat** with sender tags and "Agent is responding to …".
8. **Agent chat** where the agent asks "Should I send this to the group?".
9. **Share modal** with the 4 round buttons + a public shared page with "Shared by".
10. **Group audit log** with "Export CSV".
- Use only test accounts with made-up names. Blur: every real name, avatar, email and phone number. Don't show the Requests page if it has real people.

## Custom design needed (coded mocks)

- `GroupChatMock` (messages animate in), `GroupPollMock` (vote bars animate), group settings card, "Message Info" card, "Message Options" card, `ShareGridMock` (slide-in panel), invite card, agent draft card with Send, share modal with 4 round buttons. Two-pane demo layout.

## SEO

- **Title:** Grids: group chats, polls and shared AI chats | Classgrid AI
- **Description:** Chat one to one or in groups, run polls, schedule messages and share one AI chat with up to 4 people. Your agent catches you up and posts with your OK.

## Do not claim (this page)

- An AI bot inside groups, or "@AI" replies in groups.
- The AI posting on a schedule, or "every Monday".
- Summaries of the whole group history.
- More than 4 people in Share Grid. Sharing Incognito or Project Mode chats. Emailed invites working for a different email.
- The share "Email" button sending the chat to someone else (it emails you).
- Auto-summaries, suggested replies, notes, message approval, "Acknowledge", silent send, chat analytics, special styling for announcements.
- "Always posts as you".
- Chatting with people outside Classgrid AI, or a link to WhatsApp groups.
- File size limits. MCP Grid access (hold).

---

## What Grids can do, in plain English

Grids is the messaging part of Classgrid AI. You find it as "Grids" in the side menu of the app.
It works a lot like the chat apps you already know: you can talk one-to-one with anyone who has a
Classgrid AI account, or make groups with many people. The big difference is that your own AI
agent lives right next to your chats and can help you with them.

You can start a chat with any person on Classgrid AI by searching their name and pressing "Start
Chat". You can also make a group and give it a name and a short subject. A group can be a general
group, a class, a department, a team, or an official announcement group. You decide who can see it
and join it: it can be private and invite-only, visible but people must ask to join, or open so
anyone can join straight away. People can also explore open groups and send requests to join.

Group owners have real control. You choose who can send messages, who can change the group name
and picture, who can add new members and who can send files. If you set "Only Admins" for
messages, your group becomes a clean notice board where only you post and everyone else reads. You
can make other people admins too. Every change in the group is recorded in an audit log, and you
can download that log as a sheet.

Messages can do much more than text. You can send voice notes, photos, videos, documents and GIFs.
You can mention one person or everyone in the group, react to messages, reply to a message, forward
it, pin important ones for a day, a week or a month, and star messages to find them later. You can
search inside a chat. You can mark a message as high priority or urgent so it stands out, set it to
delete itself at a certain time, or schedule it to be sent later. You can also turn on
disappearing messages for chats you do not want to keep.

You always know what is happening. You can see who is online, who is typing or recording, and for
every message you can see who has received it and who has read it. New messages pop up even when
you are on another page, and you get a badge with the number of unread messages.

You can make polls. Ask a question, add between two and ten options, and choose if people can pick
more than one answer. Everyone votes in the group and you can see the results live. This is perfect
for picking a day for a test, a place for a trip or an idea for a project.

Your AI agent can help with your groups. You can ask it to catch you up on what a group talked about
recently, list the members, check a poll's results, write a message or an announcement, make a new
poll, or send a file to the group. The agent always shows you its draft first and asks "Should I
send this to the group?", and it only sends after you say yes. It looks at groups by default and
asks before it reads your private one-to-one chats.

You can share one AI chat with friends using Share Grid. Open any chat with the agent, press the
share button, and invite up to three other people by email, from your Grids contacts or with an
invite link you can send on WhatsApp. Then all four of you can read the chat, send messages and ask
the AI together. Each message shows who sent it, and the agent knows who asked what. It answers one
person at a time, so nothing gets mixed up. If the owner leaves, the chat passes to the next person.

You can also share a finished chat as a link. This makes a read-only copy of the chat that anyone
can open, and you can post it straight to WhatsApp or LinkedIn or copy the link. Great for showing
a good answer, a plan or a piece of research to people who do not use Classgrid yet.

In short: Grids lets you chat, run groups, take votes and post notices, with your AI agent helping
you catch up and write, but only posting when you say yes. And with Share Grid, up to four people
can work with the same AI chat together.
