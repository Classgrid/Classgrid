# Solution page: For Teachers

- **URL:** `/solutions/for-teachers` (same URL as today, new content)
- **Replaces:** `/solutions/for-teachers` (same URL) · `/solutions/for-schools`, `/solutions/for-jr-colleges`, `/solutions/for-coaching` (301 to here)
- **Who it's for:** school and college teachers, private tutors, coaching teachers. It's a **personal** assistant for one teacher, not school software.
- **Goal:** sign up, connect Google Classroom (optional) and give the first teaching task
- **Sanity:** `solutionPage` slug `for-teachers`, `category: role`, label "For teachers"

---

## Hero

- **Eyebrow:** For teachers
- **Headline:** Less prep. More teaching.
- **One line:** Write lesson plans, make worksheets and quizzes, turn marks into reports and work with Google Classroom, all from one chat.
- **Buttons:** "Use Agent" → `https://chat.classgrid.in` · "Book a demo" → `/demo`

---

## Interactive demo (custom design)

Grey panel, `AgentRealWorkSection` layout. Three chips: **Worksheet** · **Marks to report** · **Classroom**.

**Chip 1: Worksheet** (plays first)
- Card title: "Photosynthesis worksheet"
- User: "Make a 20-question worksheet on photosynthesis for Class 9 with an answer key, as a PDF"
- "Worked for 1m 12s ›"
- Steps: "Wrote 20 questions (12 MCQ, 8 short answer)" → "Built worksheet.pdf" → "Built answer-key.pdf"
- Result text: "Questions go from easy to hard. The last 4 need a diagram."
- Floating `CreatedFilesCard`: "Created 2 files · Ready to download" → `worksheet.pdf` · `answer-key.pdf`

**Chip 2: Marks to report**
- File chip `class9-marks.xlsx`. User: "Turn these marks into a progress report with a chart"
- "Worked for 2m 05s ›"
- Steps: "Read 42 rows across 5 subjects" → "Ran Python" → "Drew 1 chart" → "Built progress-report.pdf"
- Result: `ChartMock` (bar chart of subject averages, app chart colours) + "6 students are below 40% in at least one subject. Listed them with their weakest subject."
- Floating `CreatedFilesCard`: `progress-report.pdf`, `subject_averages.png`, `needs_help.csv`

**Chip 3: Classroom** (Google Classroom logo chip in the step line)
- User (the plugin's own demo prompt): "Which students haven't submitted the homework?"
- Steps: "Google Classroom · Listed courses" → "Read submissions for 'Chapter 4 worksheet'"
- Result: list of 4 made-up names + the follow-up chip "Draft a reminder announcement?"
- **Click the chip**: the user bubble "Yes, post it" appears, then a floating card with the Classroom logo: "Announcement posted · Class 9 Biology", text preview "Reminder: Chapter 4 worksheet is due Friday."

---

## Feature blocks

### 1. Lesson plans, worksheets and papers
- **Text:** Ask for a lesson plan, a worksheet with answers or a set of MCQs. You get files you can print: PDF, Word or PowerPoint.
- **Facts:** `generate_pdf` (HTML to PDF); Word and PowerPoint made in the sandbox (python-docx, python-pptx); `approval` questions for quick in-chat MCQs.
- **Mock:** text left, grey panel. Glass chat card with "Write a lesson plan for tomorrow." → a short plan (Warm-up 5 min · Teach 20 min · Activity 10 min · Exit question 5 min). Floating `CreatedFilesCard`: `lesson-plan.docx`, `slides.pptx`, `worksheet.pdf`.

### 2. Marks to progress reports
- **Text:** Upload your marks sheet. The agent checks every row, finds who needs extra help, draws charts and writes a clear report you can share.
- **Facts:** Excel/CSV reading, `run_code` (pandas, matplotlib), `chart` block, `reportcard` block, PDF output.
- **Mock:** text right, teal panel. Glass `ChartMock` (subject averages) + floating "Needs extra help" list card (3 made-up names with weakest subject).

### 3. Google Classroom, from the chat
- **Text:** Connect Google Classroom and ask in plain words. See courses, assignments and who has submitted. Read class files. Post an announcement or create an assignment.
- **Facts (real operations):** list courses, assignments, coursework, submissions, teachers, announcements, topics, materials; read class files; create assignments; create announcements (with a link or Drive file).
- **Mock:** text left, grey panel. Glass card "Chapter 4 worksheet · 28 of 32 turned in" with 4 "Missing" rows. Floating card with the Classroom logo: "Announcement posted".

### 4. Your class group on Grids (Grids block)
- **Text:** Make a class group where only you can post, so it works like a notice board. The agent drafts the notice and posts it when you say yes. "Read by" shows who has seen it.
- **Facts:** group type "Class"; "Who can send messages?" = "Only Admins"; message "Priority" (Urgent / High); "Schedule For (Optional)" (you schedule it, not the AI); "Message Info" → "Read by", "Delivered to"; polls; the agent shows a draft and asks "Should I send this to the group?".
- **Mock:** teal panel. Glass `GroupChatMock` "Class 9B notices" with an "Urgent" badge message "Science test moved to Friday, 10 AM. Bring your lab book." Floating "Message Info" card: "Read by 28 · Delivered to 31".
- **Small print under the text:** "Students need a free Classgrid AI account to join."
- Link: "More about Grids" → `/solutions/grids`.

---

## Plugins strip

| Plugin | One line |
|---|---|
| Google Classroom | See submissions, post announcements, create assignments |
| Google Forms | Create a quiz form and read the answers |
| Google Drive | Find, read and save class files |
| Gmail | Read and send emails |
| Google Calendar | See your day and add events |
| Google Meet | Set up a class call with a Meet link |
| Zoom | List and create meetings |
| Microsoft Teams | Read and post in your team channels |

Link: "See all plugins" → `/plugins`.

---

## Example tasks grid

Exact wording from the app (home lines and plugin demo prompts):
- "Write a lesson plan for tomorrow."
- "Create a worksheet with answers."
- "Create a quiz from a PDF."
- "Turn marks into a progress report."
- "Which students haven't submitted the homework?"
- "Create a new announcement for tomorrow's quiz."
- "Draw a chart from your data."
- "Create a PDF report in minutes."

---

## FAQ

1. **Do I need a school account?** No. Any teacher can sign up with an email and use it on their own.
2. **Does it work with Google Classroom?** Yes. Connect it from Plugins. It can see courses, assignments and submissions, read class files, post announcements and create assignments. It doesn't grade or return work.
3. **Can it make files I can print?** Yes: PDF, Word and PowerPoint, plus Excel when you need a sheet.
4. **Can it send reminders to my students?** Reminders from Schedules go only to you (email, and WhatsApp if verified). To reach students, post in your Grids class group or a Classroom announcement.
5. **Can I make an activity for class?** Yes. Ask for a quick quiz, matching game or poll and it builds a small interactive card right in the chat.
6. **Is my class data safe?** You can disconnect any app and delete any chat at any time. Use Incognito for chats you don't want saved. (Link the Privacy Policy.)

---

## Images to capture (real app, light + dark)

1. **AI Hub → Google Classroom** plugin page with its "Try asking the AI" prompts.
2. **Worksheet answer** with "Created files" and the PDF preview open. Use made-up content.
3. **Chart answer** from a made-up marks sheet (no real student names).
4. **Grids class group** with an Urgent message + "Message Info" open (test accounts, made-up names).
5. **A widget answer** (e.g. a matching game) to show class activities.
- Blur everywhere: real student names, emails, avatars, Classroom course codes.

## Custom design needed (coded mocks)

- `CreatedFilesCard` (reuse), `ChartMock` (app chart colours), "Needs extra help" list card, Classroom submissions card (Classroom logo, "Missing" rows), "Announcement posted" card, `GroupChatMock` with Urgent badge, "Message Info" card.

## SEO

- **Title:** AI assistant for teachers | Classgrid AI
- **Description:** Write lesson plans, make worksheets and quizzes, turn marks into reports and work with Google Classroom from one chat. Free to start.

## Do not claim (this page)

- Any ERP feature: attendance, fees, timetables, admissions, exam management, "Classgrid Classroom", parent WhatsApp broadcasts. Don't show `attendance` / `timetable` blocks or the ERP schedule "Recommended" cards.
- Schedules that send reports or reminders to students or parents, or that "check" anything. They send your fixed text to you.
- Grading, returning or editing work in Google Classroom.
- An AI bot inside the class group. Scheduled AI posts to the group.
- Google Meet transcripts or summaries. Zoom recordings.
- "Default AI Skills" changing how the agent behaves.
- Any price, credit or limit number. Any upload size.
