# Solution page: For Students

- **URL:** `/solutions/for-students` (same URL as today, new content)
- **Replaces:** `/solutions/for-students` (same URL) · `/solutions/for-colleges` (301 to here)
- **Who it's for:** school and college students getting ready for exams, doing assignments, or learning to code
- **Goal:** sign up at chat.classgrid.in and give the first study task (a PDF to notes, or an exam plan)
- **Sanity:** `solutionPage` slug `for-students`, `category: role`, label "For students"

---

## Hero

- **Eyebrow:** For students
- **Headline:** Study smarter, not longer
- **One line:** Turn PDFs into notes and flashcards, plan your exams day by day, and get reminders on WhatsApp.
- **Buttons:** "Use Agent" → `https://chat.classgrid.in` · "Book a demo" → `/demo`

---

## Interactive demo (custom design)

Built on the `AgentRealWorkSection` panel (grey gradient). Three chips above the panel: **PDF to flashcards** · **Exam planner** · **Quiz me**.

**Chip 1: PDF to flashcards** (plays first)
- Glass chat card title: "Chapter 5 notes"
- File chip in the user bubble: `chapter-5.pdf` (PDF icon)
- User types: "Turn chapter-5.pdf into short notes and make 10 flashcards"
- "Worked for 48s ›"
- Step lines, one by one: "Read chapter-5.pdf" → "Wrote notes under 6 headings" → "Made 10 flashcards"
- Result (fades at the bottom): two note headings with 2 bullet lines each (e.g. "Cell organelles", "Mitochondria: makes energy (ATP) for the cell")
- **Floating card: flashcard** (`FlashcardMock`, like the app's `carousel` block): top "1 / 10", question "What does the mitochondria do?", button "Show answer". **Click flips it** to "It makes energy (ATP) for the cell." Small ‹ › arrows.

**Chip 2: Exam planner**
- User types the app's own starter text: "Make me a 2-week exam study planner with daily topics, revision days and short breaks."
- "Worked for 31s ›"
- Result: `PlannerMock` (the app's `planner` block): "Day 1 · Algebra basics ✓", "Day 2 · Linear equations ✓", "Day 3 · Revision day ☐", a "12 days left" chip, and the button "Set reminders"
- Floating card: `CountdownMock` (the app's `countdown` block): "Maths exam", "14 days · 06 hrs · 12 min"

**Chip 3: Quiz me**
- User: "Quiz me on chapter 5 before my test"
- Result: `QuizCardMock` (the app's `approval` "questions" card): "Question 2 of 5", "Which part of the cell makes energy?", options A–D as clickable rows, buttons "Skip" · "Next", and a link "Something else"
- **Click an option**: it turns green or red. Floating card: "Score 4 / 5", with "Nice work. Revise: cell wall vs cell membrane."

---

## Feature blocks

### 1. Notes from any file
- **Text:** Drop in a PDF, Word file, slides, a spreadsheet, a photo of your notes or a voice recording. The agent reads it and gives you clear notes, key points and flashcards. Slides include their speaker notes, and voice notes are turned into text first.
- **Facts behind it:** `parse_document` (PDF, .docx, .pptx with speaker notes, .xlsx/.xls, CSV, text), `analyze_image`, `transcribe_audio`; up to 6 files per message; PDF out via `generate_pdf`.
- **Mock:** text left, grey panel (`AgentRealWorkSection` pattern). Glass card: user bubble with 3 file chips (`chapter-5.pdf`, `lecture-3.pptx`, `voice-note.m4a`) → note headings. Floating `CreatedFilesCard`: "Created 1 file · Ready to download" → `chapter-5-notes.pdf`.

### 2. Plan it, then practise it
- **Text:** Tell the agent your exam date. It builds a day-by-day plan with revision days and breaks, counts down the days, and quizzes you with questions you can tap to answer.
- **Facts:** `planner` block (ticks, days left, "Set reminders"), `countdown` block, `approval` questions (Next / Skip / "Something else"), `carousel` flashcards.
- **Mock:** text right, teal panel (`AgentSchedulesSection` pattern). Glass `PlannerMock` + floating `QuizCardMock` with the score.

### 3. Reminders on WhatsApp and email
- **Text:** Set a study reminder once, daily, weekly or on the days you choose. At that time you get your reminder by email, and on WhatsApp too after you verify your number.
- **Facts:** `create_schedule` (one-time, daily, weekly, chosen weekdays, up to 90 days). The message is **written when you make the schedule**. The AI does not run again at that time.
- **Mock:** text left, grey panel. `ScheduleCardMock`: title "Revision reminder", "Active" badge, rows "Repeats · Every day, 7:00 PM", "Send to · WhatsApp and email", "Ends · 10 Nov". Floating `WhatsAppBubbleCard` (Classgrid AI · WhatsApp): "Time to revise! Tonight: Chapter 6, Electricity. 30 minutes of notes, then 10 flashcards." with "7:00 PM ✓✓".
- **Note for the build:** the bubble must show a fixed reminder, never a "your summary of today" style text.

### 4. Study together on Grids (Grids block)
- **Text:** Make a study group, ask "Which day for the mock test?" with a poll, and share one AI chat with up to 3 friends to solve a problem set together.
- **Facts:** groups with "Approval Required (Visible, Request to Join)"; `create_group_poll` and `read_group_poll_details`; Share Grid (max 4 people, "Add from Grids"); the agent drafts and asks "Should I send this to the group?" before posting; it reads only recent messages.
- **Mock:** teal panel (`AgentPluginsSection` pattern). Glass `GroupChatMock` "Physics study group" with a `GroupPollMock`: "Which day for the mock test?" Sat 6 · Sun 3. Floating `ShareGridMock`: "People · 3 of 4" with 3 avatars and "Copy invite link".
- Link: "More about Grids" → `/solutions/grids`.

---

## Plugins strip

| Plugin | One line on the tile |
|---|---|
| Google Classroom | See your assignments, announcements and class files |
| Google Drive | Find and read your files, save new ones |
| Google Calendar | See your day and add study blocks |
| Notion | Search, create and update your pages |
| Gmail | Read and send emails |

Link: "See all plugins" → `/plugins`.

---

## Example tasks grid

Exact wording from the app (`AgentHomeExtras.tsx` greeting lines and the starter text):
- "Turn a PDF into clear notes."
- "Make flashcards for your next test."
- "Create a quiz from a PDF."
- "Plan your exams, day by day."
- "Make me a 2-week exam study planner with daily topics, revision days and short breaks."
- "Solve a maths problem with working."
- "Turn a voice note into text."
- "Write Python and run it for you."

---

## FAQ

1. **Is it free to start?** Yes. Sign up with your email and start for free. Top up only when you need more.
2. **Which files can it read?** PDF, Word, PowerPoint (with speaker notes), Excel, CSV and text files, plus photos and audio. You can add up to 6 files in one message.
3. **Can it remind me on WhatsApp?** Yes. Verify your WhatsApp number once with a code, then set a reminder. It comes by email and on WhatsApp at the time you chose.
4. **Can I study with friends?** Yes. Make a study group in Grids, or share one AI chat with up to 3 friends using Share Grid.
5. **Does it show the working in maths?** Yes. It writes the steps with proper maths symbols, and can draw graphs by running Python.
6. **Can it see my Google Classroom?** Yes, once you connect it from Plugins. It can list your assignments, announcements and class files.

---

## Images to capture (real app, light + dark)

1. **Home screen**: greeting ("Good evening, {name}") + the box "Ask anything, analyse a file, or schedule a task…". Blur: the name if real, and the sidebar chat titles.
2. **Planner + countdown answer** from the 2-week planner prompt. Blur: nothing personal.
3. **Flashcard carousel** with "Show answer" open, and the **quiz card** with a score.
4. **File upload answer**: a PDF chip and the notes. Use a made-up chapter PDF.
5. **Verify WhatsApp screen** on chat.classgrid.in. Blur: the phone number.
6. **Schedule page** with one student reminder. Don't show the "Recommended" cards.
7. **Share Grid panel** "People · 3 of 4" + a study group with a poll. Blur: every real name, avatar and email (use test accounts with made-up names).

## Custom design needed (coded mocks)

- `FlashcardMock` (click to flip), `PlannerMock`, `CountdownMock`, `QuizCardMock` (click an option), `ScheduleCardMock`, `WhatsAppBubbleCard` (copy from `AgentSchedulesSection` with new text), `GroupChatMock` + `GroupPollMock`, `ShareGridMock`.
- Demo chips and the scripted player (`SolutionDemo`).

## SEO

- **Title:** AI study agent for students | Classgrid AI
- **Description:** Turn PDFs into notes and flashcards, plan exams day by day, take quick quizzes and get WhatsApp reminders with Classgrid AI. Free to start.

## Do not claim (this page)

- Reminders that "check your progress" or send a fresh plan each day. Schedules send the fixed text you set.
- A "Deep research" mode, or drawing/sketching.
- An AI that sits inside the study group and replies there. The agent reads recent messages and posts only after you say yes. AI together = Share Grid.
- More than 4 people in a shared AI chat. Summaries of the whole group history.
- Seeing classmates' submissions or grades in Classroom (that's teacher data).
- Better marks or exam results. Any upload size. Any price, token or credit number.
- School/ERP features (attendance, timetable, fees). Don't show `attendance` / `timetable` blocks.
- YouTube video summaries, until tested from our servers (see index, open questions).
