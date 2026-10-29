# Solution page: For Creators

- **URL:** `/solutions/for-creators` (new)
- **Replaces:** nothing (new page)
- **Who it's for:** YouTubers, Instagram and Facebook creators, small brands, social media managers
- **Goal:** sign up and plan a week of content, or connect a Facebook Page / Instagram Business account
- **Sanity:** `solutionPage` slug `for-creators`, `category: role`, label "For creators"

---

## Hero

- **Eyebrow:** For creators
- **Headline:** Make more. Post more.
- **One line:** Plan a week of content, write captions, make thumbnails and post to your Facebook Page or Instagram, from one chat.
- **Buttons:** "Use Agent" → `https://chat.classgrid.in` · "Book a demo" → `/demo`

---

## Interactive demo (custom design)

Teal panel, `AgentRealWorkSection` layout. Three chips: **Content week** · **Thumbnail** · **Post it**.

**Chip 1: Content week** (plays first)
- Card title: "Goa travel series"
- User (home line, made specific): "Plan content for the whole week. I post budget travel videos about Goa."
- "Worked for 54s ›"
- Steps: "Planned 7 days" → "Wrote 7 captions" → "Added hashtags"
- Result: `PlannerMock` styled as a week: "Mon · Reel: 5 free beaches", "Tue · Post: Where to eat for cheap", "Wed · Short: Packing list", ... (no ₹ signs or money amounts anywhere in the mock)
- **Floating card:** the app's `copy` block: "Caption · Monday" with the text "5 beaches in Goa you can visit for free 🌊 Save this for your next trip." and a "Copy" button. **Click Copy**: it changes to "Copied".

**Chip 2: Thumbnail**
- User: "Make a bright thumbnail image for my video 'Goa on a budget'"
- Steps: "Created image"
- Result: a 16:9 image card (use a made-up generated image saved to our CDN; no real person's face)
- Floating card: "Created image · Ready to download"
- Note: don't show readable text inside the generated image. Image text from the model is not reliable.

**Chip 3: Post it** (Facebook logo chip)
- User (plugin demo prompt): "Post 'Happy Diwali' to my Facebook Page"
- Agent shows the post text and asks to confirm → **click "Post"**
- Step: "Facebook Pages · Published post"
- Floating card (Facebook logo): "Posted to FreshBox Foods" + "See insights" row with 3 small numbers (reach, reactions, comments; made-up)

---

## Feature blocks

### 1. From idea to content calendar
- **Text:** Tell the agent what you make. It plans a week of posts, writes hooks and captions in your voice, and gives you each one ready to copy.
- **Facts:** `planner`, `copy` and `message` answer blocks; Skills / Custom Instructions to set your tone ("How would you like Classgrid AI to respond?").
- **Mock:** text left, teal panel. Glass week planner + floating copy card.

### 2. Images, video and audio tools
- **Text:** Make thumbnails and posters from a prompt. Trim a video, change its format, or pull the audio out of it, without installing any software.
- **Facts:** `generate_image` (no image editing); sandbox with ffmpeg and moviepy for trim, convert, extract audio; `transcribe_audio` for voice notes and audio.
- **Mock:** text right, grey panel. Chat card "Trim this video to the first 30 seconds and give me the audio as MP3" → floating `CreatedFilesCard`: `clip-30s.mp4`, `audio.mp3`, `thumbnail.png`.

### 3. Post and check your pages
- **Text:** Connect your Facebook Page or Instagram Business account. The agent publishes posts, reads and replies to comments, and pulls your insights. Find and export your Canva designs, and check your YouTube channel stats and comments.
- **Facts:** Facebook Pages / Instagram Business: publish post (Instagram needs an image), list posts, messages, send message, comments, reply, insights. Canva: find designs, export (PNG, PDF, MP4…), upload images, fill brand templates; can't edit inside a design. YouTube: search videos, channel stats, read comments.
- **Mock:** text left, teal panel. Glass chat card "Reply to the top 3 comments on my last post" → 3 short replies. Floating card (Instagram logo): "Replied to 3 comments".

### 4. Work with your collaborators on Grids (Grids block)
- **Text:** Brainstorm with your editor or co-creator in one shared AI chat, with each person's messages tagged. Share a finished chat as a public link on LinkedIn or WhatsApp. Ask the agent to send the latest draft file to your team group.
- **Facts:** Share Grid (max 4 people, sender tags); Share → "Copy link", "WhatsApp", "LinkedIn", "Email" (Email sends the chat to yourself); public read-only page at `share.classgrid.in/shared/<id>` with "Shared by"; `upload_file_to_group_chat` (after you say yes).
- **Mock:** grey panel. Glass shared chat with tags "Aisha", "Rohan" and an AI answer. Floating share modal with the 4 round buttons.
- Link: "More about Grids" → `/solutions/grids`.

---

## Plugins strip

| Plugin | One line |
|---|---|
| Instagram Business | Publish posts with an image, reply to comments, see insights |
| Facebook Pages | Publish posts, reply to comments and messages, see insights |
| YouTube | Search videos, check channel stats, read comments |
| Canva | Find and export designs, fill brand templates |
| Google Drive | Find and save your files |
| Notion | Keep your content plans in pages |

Link: "See all plugins" → `/plugins`.

---

## Example tasks grid

Exact wording from the app (home lines and plugin demo prompt):
- "Plan content for the whole week."
- "Write captions for your posts."
- "Post 'Happy Diwali' to my Facebook Page"
- "Turn a voice note into text."
- "Build a landing page for your idea."
- "Make a portfolio site in one chat."
- "Summarise a YouTube video for you." **(show only after testing, see Do not claim)**
- "Create a PDF report in minutes."

---

## FAQ

1. **Can it post for me?** Yes, to your connected Facebook Page or Instagram Business account, when you ask it to. Instagram posts need an image.
2. **Can it schedule my posts?** No. It posts when you ask. Schedules can send you a reminder ("Post the Tuesday reel") by email or WhatsApp.
3. **Can it design inside Canva?** No. It can find your designs, export them, upload images and fill your brand templates. Editing inside a design isn't possible.
4. **Can it make videos?** It can trim, convert and pull audio from your videos. It doesn't make new videos from text.
5. **Can my editor work with me?** Yes. Share one AI chat with up to 3 people using Share Grid, or send them a read-only link.
6. **Is it free to start?** Yes. Sign up with your email. Top up only when you need more.

---

## Images to capture (real app, light + dark)

1. **AI Hub → Instagram Business** and **Facebook Pages** plugin pages.
2. **A week plan + caption `copy` blocks** answer.
3. **A generated image** answer (made-up prompt, no faces of real people).
4. **A video trim answer** with created files (a short test clip we own).
5. **Share modal** with Copy link / WhatsApp / LinkedIn / Email, and a public shared page with "Shared by".
- Blur: page names, follower numbers and comments from real accounts. Use a test Page.

## Custom design needed (coded mocks)

- Week `PlannerMock`, `copy` caption card with working Copy button, image result card, Facebook/Instagram "Posted" card with mini insights, `CreatedFilesCard` for media, shared chat with sender tags, share modal with 4 round buttons.

## SEO

- **Title:** AI content assistant for creators | Classgrid AI
- **Description:** Plan a week of content, write captions, make thumbnails, trim videos and post to Facebook and Instagram with one AI agent. Free to start.

## Do not claim (this page)

- Scheduled or automatic posting. Schedules only send your fixed reminder text to you.
- Making videos from text, or editing images (image editing is switched off).
- Editing inside a Canva design. Uploading to YouTube.
- Instagram posts without an image, Reels/Stories.
- Auto-replies to every comment or message ("Automate customer support replies" has nothing behind it).
- Clean, readable text inside generated images. Follower growth or reach promises.
- YouTube video summaries **until tested from our servers** (the downloader can be blocked).
- Facebook/Instagram through MCP. Any price or limit number (including image limits).
